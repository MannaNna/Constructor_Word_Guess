// Constructor initialize
var Word = require("./Word.js");
var inquirer = require("inquirer");

//Letters entry
var letterArray = "abcdefghijklmnopqrstuvwxyz";

//List of words to choose from
var ListOfAnimals = ["akita", "bear", "bat", "camel", "deer", "cat", "dodo", "dolphin", "donkey", "eagle", "falcon", "giraffe", "jaguar"];

//Pick random index from ListOfAnimals array
var randomIndex = Math.floor(Math.random() * ListOfAnimals.length);
var randomWord = ListOfAnimals[randomIndex];

//Pass random word through Word constuctor
computerWord = new Word(randomWord);

var requireNewWord = false;

//Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

//Guesses left
var guessesLeft = 10;
function knowledge() {

//Generates new word for Word constructor if true
if (requireNewWord) {
    //Selects random ListOfAnimals array
    var randomIndex = Math.floor(Math.random() * ListOfAnimals.length);
    var randomWord = ListOfAnimals[randomIndex];

    //Passes random word through the Word constructor
    computerWord = new Word(randomWord);

    requireNewWord = false;
}

//Tests if a letter guessed is correct
var wordComplete = [];
computerWord.objArray.forEach(completeCheck);

//Letters remaining to be guessed
if (wordComplete.includes(false)) {
    inquirer
    .prompt([
        {
            type: "input",
            message: "Guess a letter between a-z!",
            name: "userinput"
        }
    ])
    .then(function (input) {
        if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
            console.log("\nPlease try again!\n");
            knowledge();
        } else {
            if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                console.log("\nTry again!\n");
                knowledge();
        } else {
            //Check if guess is correct
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            //Check if guess is correct
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
                console.log("\nIncorrect\n");

                incorrectLetters.push(input.userinput);
                guessesLeft--;
            } else {
                console.log("\nCorrect!\n");
                correctLetters.push(input.userinput);
            }


            computerWord.log();

            //Print guesses left
            console.log("Guesses Left: " + guessesLeft + "\n");

            //Print letter guessed already
            console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");


            //Guesses left
            if (guessesLeft > 0) {
                //Call function
                knowledge();
            } else {
                console.log("Sorry, you lost!\n");

                restartGame();
            }

            function wordCheck(key) {
                wordCheckArray.push(key.guessed);
            }
          }
      }
 })

        } else {
            console.log("YOU WON!\n");

            restartGame();
        }

        function completeCheck(key) {
            wordComplete.push(key.guessed);
        }

     }

     function restartGame() {
         inquirer
         .prompt([
             {
                 type: "list",
                 message: "Would you like to:",
                 choices: ["Play Again", "Exit"],
                 name: "restart"
             }
         ])
         .then(function (input) {
             if (input.restart === "Play Again") {
                 requireNewWord = true;
                 incorrectLetters = [];
                 correctLetters = [];
                 guessesLeft = 10;
                 knowledge();
             } else {
                 return
             }
         })
     }
     knowledge();