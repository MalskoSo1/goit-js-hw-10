import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// ADD HERE CSS FOR OVERRIDE
import '../css/styles.css';

const refs = {
  selector: document.querySelector('#datetime-picker'),
  btn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// DISABLED FOR BUTTON
refs.btn.disabled = true;
refs.selector.disabled = false;

let userSelectedDate = 0;
let ms = 0;

// OPTIONS FOR FLATPICKR LIBRARY
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  //FUNCTION WHEN CALENDAR CLOSES
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
    if (userSelectedDate < new Date()) {
      iziToast.show({
        backgroundColor: '#EF4040',
        progressBarColor: '#b51b1b',
        position: 'topRight',
        messageColor: '#fff',
        message: 'Please choose a date in the future',
      });
      refs.btn.disabled = true;
    } else {
      refs.btn.disabled = false;
      ms = userSelectedDate - new Date();
    }
  },
};

// FUNCTION FOR CONVERT MS IN OBJECT (DAYS, HOURS, MINUTES, SECONDS)
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

// FUNCTION FOR ADDING 0 TO DAYS, HOURS, MINUTES OR SECONDS WHEN IT ALONE
const addLeadingZero = obj => {
  for (const key in obj) {
    if (obj[key] > 99) continue;
    obj[key] = String(obj[key]).padStart(2, '0');
  }
  return obj;
};

// FUNCTION WHEN START BUTTON FOR TIMER IS PRESSED
const onStart = () => {
  refs.selector.disabled = true;
  refs.btn.disabled = true;

  const intervalId = setInterval(() => {
    const delta = userSelectedDate - new Date();

    if (delta <= 0) {
      clearInterval(intervalId);
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      refs.selector.disabled = false;
      return;
    }

    const time = addLeadingZero(convertMs(delta));

    refs.days.textContent = time.days;
    refs.hours.textContent = time.hours;
    refs.minutes.textContent = time.minutes;
    refs.seconds.textContent = time.seconds;
  }, 1000);
};

// CREATING CALENDAR
flatpickr(refs.selector, options);

refs.btn.addEventListener('click', onStart);
