let startTime, updatedTime, difference, tInterval;
let running = false;
let lapTimes = [];

// Buttons
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display');
const lapsList = document.getElementById('laps-list');

// Start the stopwatch
startButton.addEventListener('click', function() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 1000);
    running = true;
    
    // Enable pause, reset, and lap buttons
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;

    // Disable start button
    startButton.disabled = true;
  }
});

// Pause the stopwatch
pauseButton.addEventListener('click', function() {
  if (running) {
    clearInterval(tInterval);
    running = false;

    // Enable start button
    startButton.disabled = false;
    // Disable pause button
    pauseButton.disabled = true;
  }
});

// Reset the stopwatch
resetButton.addEventListener('click', function() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  lapTimes = [];
  timeDisplay.textContent = '00:00:00';
  lapsList.innerHTML = '';

  // Disable pause, reset, and lap buttons
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true;

  // Enable start button
  startButton.disabled = false;
});

// Lap functionality
lapButton.addEventListener('click', function() {
  const lapTime = timeDisplay.textContent;
  lapTimes.push(lapTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
  lapsList.appendChild(lapItem);
});

// Update the time displayed
function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  timeDisplay.textContent = 
    (hours < 10 ? '0' : '') + hours + ':' + 
    (minutes < 10 ? '0' : '') + minutes + ':' + 
    (seconds < 10 ? '0' : '') + seconds;
}
