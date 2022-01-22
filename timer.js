'use strict';

class Timer {
  constructor(durationInput, startButton, resetButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.resetButton = resetButton;
    this.startingValue = this.durationInput.value;
    this.nuance = 'noPlaying';
    this.isChange = false;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onPause = callbacks.onPause;
      this.onTick = callbacks.onTick;
      this.onChange = callbacks.onChange;
      this.onReset = callbacks.onReset;
      this.onComplete = callbacks.onComplete;
    }

    this.durationInput.addEventListener('focus', () => {
      this.change();
    });

    this.startButton.addEventListener('click', () => {
      if (this.nuance === 'noPlaying' && this.timeRemaining > 0) {
        this.start();
      } else if (this.nuance === 'playing') {
        this.pause();
      }
    });

    this.resetButton.addEventListener('click', () => {
      this.durationInput.value = this.startingValue;
      this.pause();
      this.onReset();
    });
  }

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }

  start() {
    this.nuance = 'playing';
    if (this.onStart) this.onStart(this.timeRemaining);
    this.interval = setInterval(this.tick.bind(this), 20);

    if (this.isChange) {
      this.startingValue = this.durationInput.value;
      this.isChange = false;
    }
  }

  pause() {
    this.nuance = 'noPlaying';
    if (this.onPause) this.onPause();
    clearInterval(this.interval);
  }

  tick() {
    if (this.onTick) this.onTick(this.startingValue);
    this.timeRemaining = this.timeRemaining - 0.02;
    if (this.timeRemaining <= 0) {
      this.pause();
      this.onComplete();
    }
  }

  change() {
    if (this.onChange) this.onChange();
    this.pause();
    this.startingValue = this.durationInput.value;
    this.isChange = true;
  }
}

export default Timer;
