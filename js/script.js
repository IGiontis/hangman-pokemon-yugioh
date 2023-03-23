"use strict";

const inputChecker = document.querySelector(".input-checker");
const btnStart = document.querySelector(".btn-start");
const btnCheck = document.querySelector(".btn-check");
const cotnainerUnderscores = document.querySelector(".container-underscores");
const gameMode = document.querySelector("#game");
const containerWrongAnswer = document.querySelector(".container-wrong-answer");

inputChecker.maxLength = 1;
let letterArrayHolder;
let hiddenUnderscore;
let letterDoesNotExistArray = [];
btnCheck.disabled = true;

// This button will start the game and hide the word

const startGame = function () {
  // This code disalows to enter anything else than a word and can enter only an English word
  inputChecker.addEventListener("input", (event) => {
    const regex = /[^a-zA-Z]/gi;
    event.target.value = event.target.value.replace(regex, "");
  });

  btnStart.addEventListener("click", function () {
    letterDoesNotExistArray = [];
    btnCheck.disabled = false;
    containerWrongAnswer.innerHTML = "";
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
    // Here is the btn that checks and puts the right letters in the underscores
    const answerGiven = inputChecker.value.toLowerCase();
    const replaceUnderscore = document.querySelectorAll(".underscores-lines");

    letterArrayHolder.forEach((element, i) => {
      if (answerGiven === element) replaceUnderscore[i].textContent = element;
    });

    // If theres a letter that already exists in the wrongLetter then dont do anything.
    if (!letterArrayHolder.includes(answerGiven)) {
      if (answerGiven !== "" && !letterDoesNotExistArray.includes(answerGiven)) {
        letterDoesNotExistArray.push(answerGiven);
        console.log(letterDoesNotExistArray);

        const letterDoesntExist = document.createElement("em");
        letterDoesntExist.classList.add("right-margin-s", "wrong-letter");
        letterDoesntExist.innerHTML = answerGiven;
        containerWrongAnswer.append(letterDoesntExist);
      }
      // Logika tha prepei na ftiaksw ena array pou tha apothikeuei mesa ta xamena grammata kai otan ksana pataei to start game na midenizei. etsi otan tha pataei lathos gramma tha koitaei mesa sto array an to exei ksana patisei kai an den to exei ksana patisei tote tha ekteleite alliws den tha kanei tpt
    }

    inputChecker.value = "";
  });
};
checkGame();

const resOfFetches = function (fetchData, gameMode) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;

    // Set a timeout to abort the fetch request after 10 seconds
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.log("Fetch request timed out.");
    }, 10000);

    fetch(fetchData, { signal })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log(data);

        let pokemonOrYuGiNames;
        // Here checks the mode and puts the right pokemon or card
        if (gameMode === "pokemon") {
          pokemonOrYuGiNames = data.results.map((result) => result.name);
        } else if (gameMode === "yu-gi-oh") {
          pokemonOrYuGiNames = data.data.map((card) => card.name);
        }
        const randomPokemonName =
          pokemonOrYuGiNames[Math.floor(Math.random() * pokemonOrYuGiNames.length)].toLowerCase();

        //  randomPokemonName is an array with each letter of the pokemon
        console.log(randomPokemonName);
        letterArrayHolder = randomPokemonName.split("");
        cotnainerUnderscores.innerHTML = "";
        console.log(letterArrayHolder);

        letterArrayHolder.forEach((element) => {
          console.log(element);
          hiddenUnderscore = document.createElement("em");
          hiddenUnderscore.classList.add("right-margin-s", "underscores-lines");

          if (element === " ") hiddenUnderscore.textContent = " ";
          else {
            hiddenUnderscore.textContent = "_";
          }
          cotnainerUnderscores.appendChild(hiddenUnderscore);
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch request aborted.");
        } else {
          console.log("Error:", error);
        }
      })
      .finally(() => {
        // Clear the timeout when the fetch request completes
        clearTimeout(timeoutId);
      });
  } catch (error) {
    console.log("Error:", error);
  }
};
