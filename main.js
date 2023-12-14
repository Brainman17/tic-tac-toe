const spanWho = document.querySelector("#spanWho");
const blockWin = document.querySelector("#blockWin");
const spanWin = document.querySelector("#spanWin");
const btnNewGame = document.querySelector("#btnNewGame");
const blockArea = document.querySelector("#blockArea");
const blockItem = document.querySelectorAll(".blockItem");

let step = "";
let winner = "";
let counter = 0;

const nextWho = () => {
  if (step === "null") {
    step = "cross";
    localStorage.setItem("step", step);
    spanWho.innerText = "Крестики";
  } else {
    step = "null";
    localStorage.setItem("step", step);
    spanWho.innerText = "Нолики";
  }
};

nextWho();

blockItem.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("null") && !item.classList.contains("cross")) {
      item.classList.add(step);
      if (step === "cross") {
        item.innerText = "X";
      }

      if (step === "null") {
        item.innerText = "0";
      }
    }
    counter++;
    crossWin();
    nullWin();
    draw();

    nextWho();
  });
});

const winArray = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const nullWin = () => {
  for (let i = 0; i < winArray.length; i++) {
    if (
      blockItem[winArray[i][0]].classList.contains("null") &&
      blockItem[winArray[i][1]].classList.contains("null") &&
      blockItem[winArray[i][2]].classList.contains("null")
    ) {
      blockItem[winArray[i][0]].classList.add("winColor");
      blockItem[winArray[i][1]].classList.add("winColor");
      blockItem[winArray[i][2]].classList.add("winColor");

      winner = "Нолики";
      endGame(winner);

      return true;
    }
  }
};

const crossWin = () => {
  for (let i = 0; i < winArray.length; i++) {
    if (
      blockItem[winArray[i][0]].classList.contains("cross") &&
      blockItem[winArray[i][1]].classList.contains("cross") &&
      blockItem[winArray[i][2]].classList.contains("cross")
    ) {
      blockItem[winArray[i][0]].classList.add("winColor");
      blockItem[winArray[i][1]].classList.add("winColor");
      blockItem[winArray[i][2]].classList.add("winColor");

      winner = "Крестики";
      endGame(winner);

      return true;
    }
  }
};

const draw = () => {
  if (!crossWin() && !nullWin() && counter >= 9) {
    winner = "Ничья";
    endGame(winner);
  }
};

const endGame = (winner) => {
  blockArea.style.pointerEvents = "none";
  blockWin.style.display = "flex";
  spanWin.innerText = winner;
};

btnNewGame.addEventListener("click", () => {
  document.location.reload();
});
