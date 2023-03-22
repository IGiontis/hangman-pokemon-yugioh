"use strict";

const inputChecker = document.querySelector(".input-checker");
const btnStart = document.querySelector(".btn-start");
const btnCheck = document.querySelector(".btn-check");
const cotnainerUnderscores = document.querySelector(".container-underscores");
const gameMode = document.querySelector("#game");

// To prevent someone change the HTML
inputChecker.maxLength = 1;

// This button will start the game and hide the word

const startGame = function () {
  btnStart.addEventListener("click", function () {
    const gameModeValue = gameMode.value;
    // here checks what game mode we have and sends the right fech to the function
    if (gameModeValue === "pokemon") {
      const pokemonFetchData = "https://pokeapi.co/api/v2/pokemon?limit=1000";
      resOfFetches(pokemonFetchData, gameModeValue);
    } else if (gameModeValue === "yu-gi-oh") {
      const yuGiOhFechData = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
      resOfFetches(yuGiOhFechData, gameModeValue);
    }
  });
};
startGame();

const checkGame = function () {
  btnCheck.addEventListener("click", function () {
    console.log("works");
  });
};
checkGame();

const resOfFetches = function (fetchData, gameMode) {
  fetch(fetchData)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let pokemonNames;
      // Here checks the mode and puts the right pokemon or card
      if (gameMode === "pokemon") {
        pokemonNames = data.results.map((result) => result.name);
      } else if (gameMode === "yu-gi-oh") {
        pokemonNames = data.data.map((card) => card.name);
      }
      const randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];

      //  randomPokemonName is an array with each letter of the pokemon
      console.log(randomPokemonName);
      const splitNameArray = randomPokemonName.split("");
      cotnainerUnderscores.innerHTML = "";
      console.log(splitNameArray);

      splitNameArray.forEach(() => {
        const hiddenUnderscore = document.createElement("em");
        hiddenUnderscore.classList.add("right-margin-s");
        hiddenUnderscore.textContent = "_";
        cotnainerUnderscores.appendChild(hiddenUnderscore);
      });
    });
};

//? HELPERS
// !Disallow input of anything else than a word
//  bothInputs.forEach(function (currnetInput) {
//   currnetInput.addEventListener("input", (event) => {
//     const regex = /[^a-zA-Z]/gi;
//     event.target.value = event.target.value.replace(regex, "");
//   });
// });

// ?
