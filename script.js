let body = document.body;
let section = document.querySelector("#section");
let countText = document.querySelector(".count");
let highestScore = document.querySelector(".highest-score");
let timer = document.querySelector(".timer");
let spacebarText = document.querySelector(".space-to-s");
let restartText = document.querySelector(".click-to-r");
let darkBtn = document.querySelector(".dark-btn");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let keybindBtn = document.querySelector(".keybind");
let letterB = document.querySelector(".letter-b");
let mouse = document.querySelector(".mouse");
let bg1 = document.querySelector(".bg1");
let bg2 = document.querySelector(".bg2");
let bg3 = document.querySelector(".bg3");
let radio1 = document.querySelector(".radio-1");
let radio2 = document.querySelector(".radio-2");
let radio3 = document.querySelector(".radio-3");
let radios = document.querySelectorAll("input[name='duration']");
let radioChecked = 0.16;
let plus = 1;
let count = 0;
let b = "b";

// Duration Form
for (const radio of radios) {
    radio.onchange = (e) => {
        radioChecked = radio.value;

        switch (e.target) {
            case radios[0]:
                timer.innerHTML = "00:10";
                break;
            case radios[1]:
                timer.innerHTML = "00:30";
                break;
            case radios[2]:
                timer.innerHTML = "01:00";
                break;
        }
    };
}

// Light-Dark Mode Button
function darkMode() {
    section.classList.toggle("light-bg");
    countText.classList.toggle("light-font");
    highestScore.classList.toggle("light-font");
    spacebarText.classList.toggle("light-font");
    restartText.classList.toggle("light-font");
    timer.classList.toggle("light-font");
    darkBtn.classList.toggle("light-font");
    keybindBtn.classList.toggle("light-font");
    moon.classList.toggle("appear");
    sun.classList.toggle("disappear");
}

// Keybind Button
function keybind() {
    mouse.classList.toggle("appear");
    letterB.classList.toggle("disappear");
    if (b === "b") {
        b = null;
        spacebarText.innerHTML = "Click anywhere to start";
        section.addEventListener("click", mouseClick);
        bg1.addEventListener("click", mouseClick);
        bg2.addEventListener("click", mouseClick);
        bg3.addEventListener("click", mouseClick);
    } else {
        b = "b";
        spacebarText.innerHTML = "Press b to start";
        section.removeEventListener("click", mouseClick);
        bg1.removeEventListener("click", mouseClick);
        bg2.removeEventListener("click", mouseClick);
        bg3.removeEventListener("click", mouseClick);
    }
}

// Refresh EventListener
countText.addEventListener("click", countRefresh);
function countRefresh() {
    window.location.reload();
}

// Key EventListener
window.addEventListener("keyup", keyPress);
function keyPress(k) {
    if (k.key == b) {
        count += plus;

        countText.style.transform = "scale(200%)";
        setTimeout(function () {
            countText.style.transform = "scale(100%)";
        }, 100);
    }

    if (count == 1) {
        var minutes = 60 * radioChecked,
            display = document.querySelector(".timer");
        startTimer(minutes, display);

        radio1.classList.add("none");
        radio2.classList.add("none");
        radio3.classList.add("none");
        spacebarText.classList.add("none");
        darkBtn.classList.add("none");
        keybindBtn.classList.add("none");
    }
    countText.innerText = count;
}

// Mouse Click EventListener
function mouseClick() {
    count += plus;

    countText.style.transform = "scale(200%)";
    setTimeout(function () {
        countText.style.transform = "scale(100%)";
    }, 100);

    if (count == 1) {
        var minutes = 60 * radioChecked,
            display = document.querySelector(".timer");
        startTimer(minutes, display);

        radio1.classList.add("none");
        radio2.classList.add("none");
        radio3.classList.add("none");
        spacebarText.classList.add("none");
        darkBtn.classList.add("none");
        keybindBtn.classList.add("none");
    }
    countText.innerText = count;
}

// Timer
function startTimer(duration, display) {
    var timer = duration,
        minutes,
        seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            plus = 0;
            score = count;

            // Highest Score Setter
            let highScore = localStorage.getItem("highscore");
            if (highScore == null) {
                localStorage.setItem("highscore", score);
                highestScore.innerText = score;
            } else if (highScore !== null) {
                if (score > highScore) {
                    localStorage.setItem("highscore", score);
                    highestScore.innerText = score;
                }
            } else {
                highestScore.innerText = getScore;
            }
        }
    }, 1000);
}

// Set Highest Score On-Screen
function setHighScore() {
    getScore = JSON.parse(localStorage.getItem("highscore"));
    highestScore.innerText = getScore;
}
setHighScore();
