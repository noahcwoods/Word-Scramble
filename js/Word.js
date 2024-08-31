class Word {
  constructor() {
    this._difficulty = 'easy';
    this._decryptedWord = '';
    this._encryptedWord = '';
  }

  get decryptedWord() {
    return this._decryptedWord;
  }


  get encryptedWord() {
    return this._encryptedWord !== ''? this._encryptedWord : randomizeWord(this.decryptedWord);
  }

  set encryptedWord(encryptedWord) {
    this._encryptedWord = encryptedWord;
  }

  //handles change in difficulty
  set difficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    (async () => {
      this.decryptedWord = await createNewWord(this.difficulty);
      this.encryptedWord = await randomizeWord(this.decryptedWord);
    })();
  }

  get difficulty() {
    return this._difficulty;
  }

  set decryptedWord(newDecryptedWord) {
    this._decryptedWord = newDecryptedWord;
  }
}

//takes a word and scrambles it
export async function randomizeWord(decryptedWord) {
  decryptedWord = decryptedWord.split("");
  decryptedWord = decryptedWord.sort(() => (Math.random() - 0.5));
  return decryptedWord.join('');
}

//API call to grab a random word of length determined by difficulty
export async function createNewWord(difficulty) {
  const wordLength = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;

  const apiHost = 'https://random-word-api.herokuapp.com/word';
  const apiCall = apiHost + `?length=${wordLength}`;


  const response = await fetch(apiCall);
  const data = await response.json();
  return data[0];
}


export default Word;
