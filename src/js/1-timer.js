import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputText = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start');

const clockface = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;
const currentDate = Date.now();
let userSelectedDate = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      return;
    }
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  },

  onChange(selectedDates, dateStr, instance) {
    if (selectedDates[0] > currentDate) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  },
};

function startTimer() {
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    const timeLeft = convertMs(deltaTime);
    console.log('timeLeft: ', timeLeft);
    updateClockface(timeLeft);
    startBtn.disabled = true;
    inputText.disabled = true;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      updateClockface({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      inputText.disabled = false;
      return;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateClockface({ days, hours, minutes, seconds }) {
  clockface.days.textContent = pad(days);
  clockface.hours.innerHTML = pad(hours);
  clockface.minutes.innerHTML = pad(minutes);
  clockface.seconds.innerHTML = pad(seconds);
}
function pad(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputText, options);
startBtn.addEventListener('click', startTimer);
