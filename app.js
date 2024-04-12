let numbers = Array.from({ length: 6 }, (_, i) => i + 1);
numbers = numbers.concat(numbers);
numbers.sort(() => Math.random() - 0.5);

const buttonTexts = [
  "Don't Forget",
  "Remember",
  "Recall",
  "Memorize",
  "Remind",
  "Retain",
  "No Way",
  "Guess",
  "Ponder",
  "Puzzle",
  "You'll Forget",
  "Try Again",
];
buttonTexts.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("game-board");
const buttons = numbers.map((number, i) => {
  var button = document.createElement("button");
  button.dataset.number = number;
  button.textContent = buttonTexts[i];
  return button;
});

let lastClickedButton = null;
let score = 0;
let scoreBoard = document.querySelector(".score-board");
let canClick = true;

buttons.forEach((button, i) => {
  button.addEventListener("click", () => {
    if (!canClick) return;

    button.textContent = button.dataset.number;

    if (canClick) {
      button.style.transform = "scale(1.5)";
    }

    if (lastClickedButton) {
      canClick = false;

      if (button.dataset.number === lastClickedButton.dataset.number) {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
        button.style.animation = "matched 1s";
        lastClickedButton.style.animation = "matched 1s";
        button.classList.add("matched");
        lastClickedButton.classList.add("matched");
      }

      setTimeout(() => {
        button.textContent = buttonTexts[i];
        button.style.backgroundColor = "transparent";
        button.style.color = "greenyellow";
        button.style.border = "none";
        button.style.transform = "";
        lastClickedButton.textContent =
          buttonTexts[buttons.indexOf(lastClickedButton)];
        lastClickedButton.style.backgroundColor = "transparent";
        lastClickedButton.style.color = "greenyellow";
        lastClickedButton.style.border = "none";
        lastClickedButton.style.transform = "";
        lastClickedButton = null;
        canClick = true;
      }, 2000);
    } else {
      lastClickedButton = button;
    }
  });

  gameBoard.appendChild(button);
});
