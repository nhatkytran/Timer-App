import Timer from './timer.js';

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
const circleStart = function () {
  circle.setAttribute('stroke-dasharray', perimeter);
  circle.setAttribute('stroke-dashoffset', 0);
};
circleStart();

let velocity = 0;
new Timer(durationInput, startButton, resetButton, {
  onStart(duration) {
    startButton.innerHTML = '<i class="fas fa-pause"></i>';
    durationInput.style.animation = `colorChange linear ${duration}s`;
    durationInput.style.webkitAnimationPlayState = 'running';
  },
  onPause() {
    startButton.innerHTML = '<i class="fas fa-play"></i>';
    durationInput.style.color = 'red';
    durationInput.style.webkitAnimationPlayState = 'paused';
  },
  onTick(duration) {
    velocity -= (perimeter * 0.02) / duration;
    circle.setAttribute('stroke-dashoffset', velocity);
  },
  onChange() {
    this.onReset();
  },
  onReset() {
    circleStart();
    velocity = 0;
    durationInput.style.color = 'orange';
    durationInput.style.animation = `none`;
    circle.classList.remove('completed');
  },
  onComplete() {
    circleStart();
    durationInput.style.color = 'red';
    circle.classList.add('completed');
  },
});
