const inputName = document.getElementById("inputName");
const startBtn = document.getElementById("start");
const nameSpan = document.getElementById("nameSpan");
const gameStart = document.getElementById("gameStart");
const screenGame = document.getElementById("screen");
const bubbleBtn = document.getElementById("bubble");
const easyLevel = document.getElementById("easy");
const mediumLevel = document.getElementById("medium");
const hardLevel = document.getElementById("hard");
const stopGame = document.getElementById("stopGame");
const highScore = document.getElementById("highScore");
let score = document.getElementById("score");
let playerName = "";

startBtn.addEventListener("click", () => {
  playerName = inputName.value;
  if (!playerName) {
    inputName.style.border = "2px solid red";
    return;
  }
  nameSpan.innerText = playerName;
  document.getElementById("first-page").classList.add("dsNone");
  document.getElementById("second-page").classList.add("dsBlock");
  highScore.innerText = window.localStorage.getItem("highScore");
});

easyLevel.setAttribute("disabled", true);
mediumLevel.setAttribute("disabled", true);
hardLevel.setAttribute("disabled", true);
stopGame.setAttribute("disabled", true);

gameStart.addEventListener("click", () => {
  generateBubble();
  gameStart.setAttribute("disabled", true);
  easyLevel.setAttribute("disabled", true);
  mediumLevel.removeAttribute("disabled");
  hardLevel.removeAttribute("disabled");
  stopGame.removeAttribute("disabled");
});

let interval;
let speedLevel = 800;

const generateBubble = () => {
  let count = 0;
  interval = setInterval(() => {
    let width = Math.floor(Math.random() * (270 - 20));
    let height = Math.floor(Math.random() * (300 - 20));
    const bubble = document.createElement("button");
    bubble.setAttribute("id", "bubble");
    screenGame.appendChild(bubble);
    bubble.style.top = height + "px";
    bubble.style.left = width + "px";
    count++;
    if (count == 50) {
      clearInterval(interval);
      let gameOver = document.createElement("h1")
      gameOver.innerText = "Game Over"
      screenGame.appendChild(gameOver)

    }
    bubble.addEventListener("click", () => {
      count--;
      score.innerText = +score.innerText + 1;
      screenGame.removeChild(bubble);
      let audio = new Audio("./audio/bubbleSound.wav");
      audio.play();
      fromLocalStorage();
    });
  }, speedLevel);
};

const fromLocalStorage = () => {
  if (+score.innerText > +highScore.innerText) {
    window.localStorage.setItem("highScore", score.innerText);
    highScore.innerText = score.innerText;
  }
};

easyLevel.addEventListener("click", () => {
  speedLevel = 800;
  clearInterval(interval);
  easyLevel.setAttribute("disabled", true);
  hardLevel.removeAttribute("disabled");
  mediumLevel.removeAttribute("disabled");
  generateBubble();
});

mediumLevel.addEventListener("click", () => {
  speedLevel = 550;
  clearInterval(interval);
  mediumLevel.setAttribute("disabled", true);
  easyLevel.removeAttribute("disabled");
  hardLevel.removeAttribute("disabled");
  generateBubble();
});

hardLevel.addEventListener("click", () => {
  speedLevel = 350;
  clearInterval(interval);
  hardLevel.setAttribute("disabled", true);
  easyLevel.removeAttribute("disabled");
  mediumLevel.removeAttribute("disabled");
  generateBubble();
});

stopGame.addEventListener("click", () => {
  screenGame.innerHTML = "";
  speedLevel = 800;
  score.innerText = 0;
  clearInterval(interval);
  gameStart.removeAttribute("disabled");
  stopGame.setAttribute("disabled", true);
  easyLevel.setAttribute("disabled", true);
  mediumLevel.setAttribute("disabled", true);
  hardLevel.setAttribute("disabled", true);
});
