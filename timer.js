//All Variable declaration

/**INPUT VARIABLES */
const hoursInput = document.getElementById("txtHours");
const minsInput = document.getElementById("txtMins");
const secsInput = document.getElementById("txtSecs");

/***DISPLAY VARIABLES */
const hoursDisplay = document.getElementById("disp_hours");
const minsDisplay = document.getElementById("disp_mins");
const secsDisplay = document.getElementById("disp_sec");

/**BUTTONS set and reset*/
const controlButtonDiv = document.querySelector(".controlButton");

const playpauseBtn = document.querySelector(".playpause");
const playPauseIcon = playpauseBtn.children[0];
let faPauseIcon = "fa-pause";
let faPlayIcon = "fa-play";
let inputTimerVal = 0;
let intervalId = null;
/***ACTIONS */

const resetStopwatch = () => {
    hoursInput.value = "";
    minsInput.value = "";
    secsInput.value = "";
    hoursDisplay.textContent = "00";
    minsDisplay.textContent = "00";
    secsDisplay.textContent = "00";

    stopTimer();
    playpauseBtn.style.display = "none";
};
controlButtonDiv.addEventListener("click", (event) => {
    const target = event.target;
    //console.log(target);
    //guard control
    if (
        !target.classList.contains("settimer") &&
        !target.classList.contains("resettimer")
    ) {
        return;
    }
    /**** ON settime clicked */
    if (target.classList.contains("settimer")) {
        inputTimerVal = convertToSec(
            hoursInput.value,
            minsInput.value,
            secsInput.value
        );
        starttimer();
        playpauseBtn.style.display = "block"; //showing the pause button
    }

    //Reset Timer clicked
    if (target.classList.contains("resettimer")) {
        resetStopwatch();
    }
});

/**PLAY PAUSE BUTTON CONTROL */
playpauseBtn.addEventListener("click", () => {
    playpauseBtn.style.display = "block";
    if (playPauseIcon.classList.contains(faPauseIcon)) {
        playPauseIcon.classList.remove(faPauseIcon);
        playPauseIcon.classList.add(faPlayIcon);
        stopTimer();
    } else if (playPauseIcon.classList.contains(faPlayIcon)) {
        playPauseIcon.classList.remove(faPlayIcon);
        playPauseIcon.classList.add(faPauseIcon);
        // console.log("Starting :", inputTimerVal);
        starttimer();
    }
});
//common functions
function convertToSec(h, m, s) {
    return Number(h * 3600) + Number(m * 60) + Number(s) - 1;
}

//Timer functionality
function starttimer() {
    intervalId = setInterval(() => {
        if (inputTimerVal == 0) {
            clearInterval(intervalId);
            playpauseBtn.style.display = "none"; //hiding the play/pause button
            resetStopwatch();
        }
        dispCountDown(inputTimerVal);
        //console.log(inputTimerVal);
        inputTimerVal--;
    }, 1000);
}

function stopTimer() {
    if (intervalId !== null) {
        //console.log("Clearing the interval");
        clearInterval(intervalId);
        intervalId = null;
    }
}

//display the count down
function dispCountDown(balanceTime_secs) {
    hoursDisplay.textContent = Math.floor(balanceTime_secs / 3600)
        .toString()
        .padStart(2, "0");
    minsDisplay.textContent = Math.floor((balanceTime_secs % 3600) / 60)
        .toString()
        .padStart(2, "0");

    secsDisplay.textContent = (balanceTime_secs % 60)
        .toString()
        .padStart(2, "0");
}
