"use strict";

const inputWord = document.querySelector("#word");
const inputChecker = document.querySelector(".input-checker");
const btnStart = document.querySelector(".btn-start");
const btnCheck = document.querySelector(".btn-check");
const textAnswer = document.querySelector(".text-answer");
// const secondPlayerAnswer = document.querySelector("#second-player");
const bothInputs = document.querySelectorAll(".both-inputs");
const wordArray = [];

let lettersOfWord = [];
let telitses;

// This button will start the game and hide the word
const startGame = function () {
  // Disallow input of anything else than a word
  bothInputs.forEach(function (currnetInput) {
    currnetInput.addEventListener("input", (event) => {
      const regex = /[^a-zA-Z]/gi;
      event.target.value = event.target.value.replace(regex, "");
    });
  });

  // Gets the word from the input field
  btnStart.addEventListener("click", (e) => {
    // Checks if the answer is empty
    if (inputWord.value === "") {
      return;
    } else {
      const rightWordInput = inputWord.value.toLowerCase();

      // splits each letter to the array
      wordArray.push(rightWordInput);
      console.log(wordArray);
      lettersOfWord = [...wordArray[0]];
      console.log(lettersOfWord);

      // Creates the _ for each letter
      lettersOfWord.forEach(() => {
        telitses = document.createElement("em");
        telitses.textContent = "_";
        telitses.className = "telitses";
        telitses.classList.add("right-margin-s");
        textAnswer.insertAdjacentElement("afterend", telitses);
      });
    }
    inputWord.textContent = "";
    btnStart.disabled = true;
  });

  // Second button

  btnCheck.addEventListener("click", function () {
    const allTelitses = document.querySelectorAll(".telitses");

    lettersOfWord.forEach(function (letter, i) {
      // Change the _ to the right letter
      if (inputChecker.value === letter) {
        allTelitses[i].textContent = letter;
      }
    });

    inputChecker.value = "";
  });
};

startGame();

fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
  .then((response) => response.json())
  .then((data) => {
    // Get a random Pokémon name from the list
    const pokemonNames = data.results.map((result) => result.name);
    const randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

    // Use the random name for your hangman game
    console.log(randomPokemonName);
  });

fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
  .then((response) => response.json())
  .then((data) => {
    // Get a random card name from the list
    const cardNames = data.data.map((card) => card.name);
    const randomName = cardNames[Math.floor(Math.random() * cardNames.length)];

    // Use the random name for your hangman game
    console.log(randomName);
  });
