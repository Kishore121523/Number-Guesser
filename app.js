document.querySelector("#play").addEventListener("click", function (e) {
  const initMin = document.getElementById("initMin").value;
  const initMax = document.getElementById("initMax").value;
  guess(initMin, initMax);
  e.target.parentNode.parentElement.style.display = "none";
  document.querySelector(".card-body").style.display = "block";
  e.preventDefault();
});

// Game values
function guess(initMin, initMax) {
  const min = initMin;
  const max = initMax;
  const winningNum = Math.floor(Math.random() * (max - min)) + parseInt(min);
  console.log(winningNum);
  let guessesLeft = 3;

  // UI Elements
  const game = document.querySelector("#game");
  const minNum = document.querySelector(".min-num");
  const maxNum = document.querySelector(".max-num");
  const guessBtn = document.querySelector("#guess-btn");
  const guessInput = document.querySelector("#guess-input");
  const message = document.querySelector(".message");

  // Assign UI min and max
  minNum.textContent = min;
  maxNum.textContent = max;

  // play again event listeners
  game.addEventListener("mousedown", function (e) {
    if (e.target.className === "play-again") {
      window.location.reload();
    }
  });

  //Listen for guess
  guessBtn.addEventListener("click", function (e) {
    let guess = parseInt(guessInput.value);

    // validate
    if (isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }
    // check if won
    else if (guess === winningNum) {
      // disable input
      guessInput.disabled = true;
      // border green
      guessInput.style.borderColor = "green";
      //setMessage
      setMessage(`${winningNum} is correct!`, "green");
      guessBtn.value = "Play Again";
      guessBtn.className += "play-again";
    } else {
      //Wrong number
      guessesLeft -= 1;

      if (guessesLeft === 0) {
        //game over -lost
        // disable input
        guessInput.disabled = true;
        // border green
        guessInput.style.borderColor = "red";
        //setMessage
        setMessage(
          `Game Over, You lost. The correct number was ${winningNum}`,
          "red"
        );
        guessBtn.value = "Play Again";
        guessBtn.className += "play-again";
      } else {
        // border green
        guessInput.style.borderColor = "red";
        //clear input
        guessInput.value = "";
        //game continue answer wrong
        setMessage(
          `${guess} is not correct. ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
    // // setMessage
    function setMessage(msg, color) {
      message.style.color = color;
      message.textContent = msg;
    }
  });
}
