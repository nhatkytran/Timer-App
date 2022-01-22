import Timer from './timer.js';

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

new Timer(durationInput, startButton, resetButton);
