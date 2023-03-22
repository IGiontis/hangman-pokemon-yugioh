"use strict";

const inputChecker = document.querySelector(".input-checker");
const btnStart = document.querySelector(".btn-start");
const btnCheck = document.querySelector(".btn-check");
let cotnainerUnderscores = document.querySelector(".container-underscores");
const gameMode = document.querySelector("#game");

let nameHolder = [];
// This button will start the game and hide the word

const startGame = function () {
  btnStart.addEventListener("click", function () {
    const gameModeValue = gameMode.value;

    if (gameModeValue === "pokemon") {
      console.log("pokemon");

      fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        .then((response) => response.json())
        .then((data) => {
          // Get a random Pokémon name from the list
          const pokemonNames = data.results.map((result) => result.name);

          const randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

          // Use the random name for your hangman game
          console.log(randomPokemonName);
          const splitNameArray = randomPokemonName.split("");

          nameHolder.push(splitNameArray);
          console.log(nameHolder);

          nameHolder[0].forEach((letter) => {
            const hiddenUnderscore = document.createElement("div");
            hiddenUnderscore.textContent = "_";
            cotnainerUnderscores.insertAdjacentElement("afterend", hiddenUnderscore);
            nameHolder = [];
          });
        });
    } else if (gameModeValue === "yu-gi-oh") {
      console.log("yu gi oh");
      fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then((response) => response.json())
        .then((data) => {
          // Get a random card name from the list
          const cardNames = data.data.map((card) => card.name);
          const randomName = cardNames[Math.floor(Math.random() * cardNames.length)];
          console.log(randomName);
          // Use the random name for your hangman game
        });
    }
  });
};
startGame();

//? HELPERS
// !Disallow input of anything else than a word
//  bothInputs.forEach(function (currnetInput) {
//   currnetInput.addEventListener("input", (event) => {
//     const regex = /[^a-zA-Z]/gi;
//     event.target.value = event.target.value.replace(regex, "");
//   });
// });

// ?

//! Creates the _ for each letter
//   lettersOfWord.forEach(() => {
//     telitses = document.createElement("em");
//     telitses.textContent = "_";
//     telitses.className = "telitses";
//     telitses.classList.add("right-margin-s");
//     textAnswer.insertAdjacentElement("afterend", telitses);
//   });
