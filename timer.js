'use strict';

class Timer {
  constructor(durationInput, startButton, resetButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.resetButton = resetButton;

    this.startButton.addEventListener('click', this.start.bind(this));
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  start() {
    this.interval = setInterval(this.tick.bind(this), 20);
  }

  pause() {
    clearInterval(this.interval);
  }

  tick() {
    this.timeRemaining = this.timeRemaining - 0.02;
    if (this.timeRemaining <= 0) this.pause();
  }
}

export default Timer;
