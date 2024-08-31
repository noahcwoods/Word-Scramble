import Player, {checkCurrentGuess, checkWinner} from "./Player.js";
import Word, {createNewWord, randomizeWord} from "./Word.js";

//get html elements
const difficultySelector = document.getElementById('difficulty');
const displayWord = document.getElementById('scrambledWord');
const playerGuess = document.getElementById('guessInput');
const guessSubmitBtn = document.getElementById('guessSubmitBtn');
const newWordBtn = document.getElementById('newWordBtn');
const guessListUl = document.getElementById('guessList');
const guessResult = document.getElementById('guessResult');
const correctGuessCount = document.getElementById('correctGuessCount');

//create game objects
const word = new Word();
const player = new Player();

//detect change in difficulty level
difficultySelector.addEventListener("change", async function () {
  word.difficulty = difficultySelector.value;
  await reset();
});

//reset game
function reset(){
  while (guessListUl.firstChild){
    guessListUl.removeChild(guessListUl.firstChild);
  }
  updateWord();
}

//update the scrambled(encrypted) word
async function updateWord(){
  word.decryptedWord = await createNewWord(word.difficulty);
  word.encryptedWord = randomizeWord(word.decryptedWord);
  player.allGuesses = [];
  displayWord.innerHTML = await word.encryptedWord;

  console.log("ENCRYPTED WORD: " + await word.encryptedWord);
  console.log("BASE WORD: " + word.decryptedWord);
}

//detects submit of player guess
//calls the checkCurrentGuess function
//calls the checkWinner function
//display win/incorrect message to user
guessSubmitBtn.addEventListener('click', async function () {
    player.currentGuess = playerGuess.value.trim();
    playerGuess.value = "";

    if (await checkCurrentGuess(player)){
      guessResult.innerHTML = "You have already guessed this!";
    }else{
      player.allGuesses.unshift(player.currentGuess);
      displayGuesses();

      if (await checkWinner(word.decryptedWord, player)){
        guessResult.innerHTML = "Correct! You Win!";
        player.correctGuesses = 1;
        correctGuessCount.innerHTML = player.correctGuesses;
        reset();
      }else{
        guessResult.innerHTML = "Incorrect! Please try again.";
      }
    }
});

//provides new word if requested
newWordBtn.addEventListener('click', async function () {
  reset();
})

//display list of current guesses
function displayGuesses(){
    let li = document.createElement("li");
    li.innerHTML = player.allGuesses[0];
    guessListUl.appendChild(li);
}

//Populate a scrambled word on load.
window.onload = function (){
  updateWord();
}
