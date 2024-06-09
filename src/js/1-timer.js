import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const timerElements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.disabled = true;

let countdownInterval;
let selectedDate;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => value.toString().padStart(2, '0');

const updateTimer = ({ days, hours, minutes, seconds }) => {
  timerElements.days.textContent = addLeadingZero(days);
  timerElements.hours.textContent = addLeadingZero(hours);
  timerElements.minutes.textContent = addLeadingZero(minutes);
  timerElements.seconds.textContent = addLeadingZero(seconds);
};

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = selectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeComponents = convertMs(timeLeft);
    updateTimer(timeComponents);
  }, 1000);
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: selectedDates => {
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  startCountdown();
});
