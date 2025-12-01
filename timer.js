// Input fields

const hoursInput = document.getElementById("txtHours");
const minsInput = document.getElementById("txtMins");
const secsInput = document.getElementById("txtSecs");

// Display fields
const hoursDisplay = document.getElementById("disp_hours");
const minsDisplay = document.getElementById("disp_mins");
const secsDisplay = document.getElementById("disp_sec");

// Buttons
const controlButtonDiv = document.querySelector(".button-group");
const playpauseBtn = document.querySelector(".playpause");
const playPauseIcon = playpauseBtn.children[0];

//Progress bar container
const progressBarContainer = document.querySelector(".progress-bar-container");
const progressBar = document.getElementById("myProgressBar");
//console.log(progressBar);
let faPauseIcon = "fa-solid fa-pause";
let faPlayIcon = "fa-solid fa-play";

let inputTimerVal = 0;
let totalTimerinSec = 0;
let intervalId = null;
let progress = 0;
// Reset
const resetStopwatch = () => {
    hoursInput.value = "";
    minsInput.value = "";
    secsInput.value = "";

    hoursDisplay.textContent = "00";
    minsDisplay.textContent = "00";
    secsDisplay.textContent = "00";

    playPauseIcon.className = faPauseIcon;

    stopTimer();
    updateProgressBar(0);
    playpauseBtn.style.display = "none";
    // progressBarContainer.style.display = "none";
};

// Start/Reset buttons
controlButtonDiv.addEventListener("click", (event) => {
    const target = event.target;

    if (
        !target.classList.contains("settimer") &&
        !target.classList.contains("resettimer")
    ) {
        return;
    }

    // Start
    if (target.classList.contains("settimer")) {
        inputTimerVal = convertToSec(
            hoursInput.value,
            minsInput.value,
            secsInput.value
        );

        if (inputTimerVal <= 0) return;
        playpauseBtn.style.display = "block";
        progressBarContainer.style.display = "block";
        starttimer();
    }

    // Reset
    if (target.classList.contains("resettimer")) {
        resetStopwatch();
    }
});

// Play / Pause
playpauseBtn.addEventListener("click", () => {
    if (playPauseIcon.className.includes("fa-pause")) {
        playPauseIcon.className = faPlayIcon;
        stopTimer();
    } else {
        playPauseIcon.className = faPauseIcon;
        starttimer();
    }
});

// Convert to sec
function convertToSec(h, m, s) {
    totalTimerinSec = Number(h * 3600) + Number(m * 60) + Number(s);
    return totalTimerinSec;
}

// Start timer
function starttimer() {
    stopTimer();
    // Simulate progress over time
    progress = 0;
    intervalId = setInterval(() => {
        if (inputTimerVal <= 0) {
            resetStopwatch();
            return;
        }
        dispCountDown(inputTimerVal);
        inputTimerVal--;
    }, 1000);
}

// Stop timer
function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Display
function dispCountDown(sec) {
    updateProgressBar(sec);
    hoursDisplay.textContent = String(Math.floor(sec / 3600)).padStart(2, "0");
    minsDisplay.textContent = String(Math.floor((sec % 3600) / 60)).padStart(
        2,
        "0"
    );
    secsDisplay.textContent = String(sec % 60).padStart(2, "0");
}

// Function to update the progress

function updateProgressBar(remaining) {
    if (totalTimerinSec === 0) return;
    const percentage = (remaining / totalTimerinSec) * 100;
    progressBar.style.width = percentage + "%";
}
