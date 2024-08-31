class Player {
  constructor() {
    this._allGuesses = [];
    this._currentGuess = '';
    this._correctGuesses = 0;
  }

  get currentGuess() {
    return this._currentGuess;
  }

  set currentGuess(newGuess) {
    this._currentGuess = newGuess;
  }

  get correctGuesses() {
    return this._correctGuesses;
  }

  set correctGuesses(n) {
    this._correctGuesses += n;
  }

  get allGuesses() {
    return this._allGuesses;
  }

  set allGuesses(newGuesses) {
    this._allGuesses = newGuesses;
  }
}

//true if the guess matches the decrypted (unscrambled) word
export async function checkWinner(decryptedWord, player) {
  return player.currentGuess.toLowerCase() === decryptedWord;
}

//Checks the current guess against all previous guests
//true if the guess was already made, else false
export async function checkCurrentGuess(player) {
  for (const guess of player.allGuesses) {
    if (player.currentGuess === guess) {
      return true;
    }
  }
  return false;
}

export default Player;




