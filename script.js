const buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// Sound Effects
const gameOverSound = new Audio("./static/gameover.mp3");

// Start game on key press
document.addEventListener("keydown", startGame);

// Event listeners for button clicks
document.querySelectorAll(".btn-circle").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

function startGame() {
    if (!started) {
        resetGame();
        document.getElementById("level-title").textContent = "Level " + level;
        document.getElementById("game-over-message").classList.add("d-none");
        nextSequence();
        started = true;
    }
}

function handleButtonClick(event) {
    if (!started) return;

    const userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").textContent = "Level " + level;

    const randomIndex = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomIndex];
    gamePattern.push(randomChosenColor);

    flashButton(randomChosenColor); // No sound here, only flashing
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    gameOverSound.play(); // Play game over sound
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);

    document.getElementById("level-title").textContent = "Game Over! Press Any Key to Restart";
    document.getElementById("game-over-message").classList.remove("d-none");

    started = false;
}

function resetGame() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound() {
    const audio = new Audio(`./static/button.mp3`);
    audio.play();
}

function animatePress(color) {
    const button = document.getElementById(color);
    button.classList.add("btn-flash");
    setTimeout(() => button.classList.remove("btn-flash"), 200);
}

function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add("btn-flash");
    setTimeout(() => button.classList.remove("btn-flash"), 200);
}
