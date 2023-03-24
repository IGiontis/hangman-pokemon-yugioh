"use strict";

const inputChecker = document.querySelector(".input-checker");
const btnStart = document.querySelector(".btn-start");
const btnCheck = document.querySelector(".btn-check");
const cotnainerUnderscores = document.querySelector(".container-underscores");
const gameMode = document.querySelector("#game");
const containerWrongAnswer = document.querySelector(".container-wrong-answer");
const hangman = document.querySelectorAll(".hangmanAll");
const hangmanContainer = document.querySelector(".hangman-container");
const fire = document.querySelector(".fire");

inputChecker.maxLength = 1;
let letterArrayHolder;
let hiddenUnderscore;
let letterDoesNotExistArray = [];
btnCheck.disabled = true;
let lifesCounter = 0;
let hangmanCounter = 0;
let winningCounter = 0;

// This button will start the game and hide the word

const startGame = function () {
  // This code disalows to enter anything else than a word and can enter only an English word

  inputChecker.addEventListener("input", (event) => {
    const regex = /[^a-zA-Z]/gi;
    event.target.value = event.target.value.replace(regex, "");
  });

  btnStart.addEventListener("click", function () {
    addHiddenClass();
    inputChecker.focus();
    letterDoesNotExistArray = [];
    btnCheck.disabled = false;
    lifesCounter = 0;
    hangmanCounter = 0;
    inputChecker.value = "";
    containerWrongAnswer.innerHTML = "";
    const gameModeValue = gameMode.value;
    winningCounter = 0;
    // here checks what game mode we have and sends the right fech to the function
    if (gameModeValue === "pokemon") {
      const pokemonFetchData = "https://pokeapi.co/api/v2/pokemon?limit=10001";
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

    // Replace the underscore with the letter if the guess was correct
    letterArrayHolder.forEach((element, i) => {
      if (answerGiven === element) {
        replaceUnderscore[i].textContent = element;
        winningCounter++;
      }
    });

    // Here is the winning solution and actions

    if (letterArrayHolder.length === winningCounter) {
      btnCheck.disabled = true;
    }

    // If theres a letter that already exists in the wrongLetter then dont do anything.

    if (!letterArrayHolder.includes(answerGiven)) {
      if (answerGiven !== "" && !letterDoesNotExistArray.includes(answerGiven)) {
        letterDoesNotExistArray.push(answerGiven);
        console.log(letterDoesNotExistArray);

        // Here is the check of the lifes counter
        lifesCounter++;

        //  ! Twra prepei na kanw kati wste otan ftanei ola ta lathi na kanei kati.
        // Here shows for each mistake a piece of the hangman
        hangmanContainer.classList.remove("hidden");
        hangman[hangmanCounter].classList.remove("hidden");
        console.log(hangman[hangmanCounter]);
        hangmanCounter++;
        if (lifesCounter === 6) {
          fire.classList.remove("hidden");
          btnStart.focus();
          letterArrayHolder.forEach((value, i) => {
            // Here checks the left _ and adds a class to show with red the undercovered letters
            if (replaceUnderscore[i].textContent === "_") {
              replaceUnderscore[i].classList.add("show-wrong-letter");
              replaceUnderscore[i].textContent = value;
            } else replaceUnderscore[i].textContent = value;
          });

          console.log("you lost");
          btnCheck.disabled = true;
        }

        console.log(lifesCounter);
        const letterDoesntExist = document.createElement("em");
        letterDoesntExist.classList.add("right-margin-s", "wrong-letter");
        letterDoesntExist.innerHTML = answerGiven;
        containerWrongAnswer.append(letterDoesntExist);
      }
    }

    inputChecker.value = "";
  });
};
checkGame();

// Triggers the enter button when the user is inside the input and clicks it
inputChecker.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    btnCheck.click();
  }
});

// Heres the fetches
const resOfFetches = function (fetchData, gameMode) {
  try {
    // Abortcontroler stops the fetch request
    const controller = new AbortController();
    const signal = controller.signal;

    // Set a timeout to abort the fetch request after 15 seconds
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.log("Fetch request timed out.");
    }, 15000);

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

          if (element === "'") {
            winningCounter++;
            hiddenUnderscore.textContent = "'";
          } else if (element === "0") {
            winningCounter++;
            hiddenUnderscore.textContent = "0";
          } else if (element === "1") {
            winningCounter++;
            hiddenUnderscore.textContent = "1";
          } else if (element === "2") {
            winningCounter++;
            hiddenUnderscore.textContent = "2";
          } else if (element === "3") {
            winningCounter++;
            hiddenUnderscore.textContent = "3";
          } else if (element === "4") {
            winningCounter++;
            hiddenUnderscore.textContent = "4";
          } else if (element === "5") {
            winningCounter++;
            hiddenUnderscore.textContent = "5";
          } else if (element === "6") {
            winningCounter++;
            hiddenUnderscore.textContent = "6";
          } else if (element === "7") {
            winningCounter++;
            hiddenUnderscore.textContent = "7";
          } else if (element === "8") {
            winningCounter++;
            hiddenUnderscore.textContent = "8";
          } else if (element === "9") {
            winningCounter++;
            hiddenUnderscore.textContent = "9";
          } else if (element === ",") {
            winningCounter++;
            hiddenUnderscore.textContent = ",";
          } else if (element === ".") {
            winningCounter++;
            hiddenUnderscore.textContent = ".";
          } else if (element === "'") {
            winningCounter++;
            hiddenUnderscore.textContent = "'";
          } else if (element === "-") {
            winningCounter++;
            hiddenUnderscore.textContent = "-";
          } else if (element === " ") {
            winningCounter++;
            hiddenUnderscore.textContent = " ";
          } else {
            hiddenUnderscore.textContent = "_";
          }
          cotnainerUnderscores.appendChild(hiddenUnderscore);
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.error("Fetch request aborted.");
        } else {
          console.error("Error:", error);
        }
      })
      .finally(() => {
        // Clear the timeout when the fetch request completes
        clearTimeout(timeoutId);
      });
  } catch (error) {
    console.error("Error:", error);
  }
};

const addHiddenClass = function () {
  hangmanContainer.classList.add("hidden");
  fire.classList.add("hidden");
  hangman.forEach((element) => {
    element.classList.add("hidden");
  });
};
