import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// CREATED MARKUP
const newFields = `<label>
          Delay (ms)
          <div class="input-wrapper">
            <input type="number" name="delay" required min="0" />
            <span class="arrow-up arrow">
              <svg width="16" height="16">
                <use href="./sprite.svg#icon-arrow-up"></use>
              </svg>
            </span>
            <span class="arrow-down arrow">
              <svg width="16" height="16">
                <use href="./sprite.svg#icon-arrow-down"></use>
              </svg>
            </span>
          </div>
        </label>

        <fieldset>
          <legend>State</legend>
          <label>
            <input
              type="radio"
              name="state"
              value="fulfilled"
              class="visually-hidden"
              required
            />
            <span class="custom">
              <svg class="icon-custom-rectangle" width="12" height="12">
                <use href="./sprite.svg#icon-rectangle"></use>
              </svg>
            </span>
            Fulfilled
          </label>
          <label>
            <input
              type="radio"
              name="state"
              value="rejected"
              class="visually-hidden"
              required
            />
            <span class="custom">
              <svg class="icon-custom-rectangle" width="12" height="12">
                <use href="./sprite.svg#icon-rectangle"></use>
              </svg>
            </span>
            Rejected
          </label>
        </fieldset>

        <button type="submit">Create notification</button>`;

const refs = {
  form: document.querySelector('.form'),
};

// ADD MARKUP IN HTML
refs.form.innerHTML = newFields;

const inputWrapper = document.querySelector('.input-wrapper');

// FUNCTION FOR CUSTOM SVG ARROWS
const changeValueInput = event => {
  const arrow = event.target.closest('.arrow');

  if (!arrow) return;

  const input = inputWrapper.querySelector('input');

  if (arrow.classList.contains('arrow-up')) {
    input.stepUp();
  }
  if (arrow.classList.contains('arrow-down') && input.value > 0) {
    input.stepDown();
  }
};

// FUNCTION FOR PROMISE
const func = event => {
  event.preventDefault();
  const delay = document.querySelector('input[name="delay"]').value;

  const state = document.querySelector('.form input[name="state"]:checked');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });

  promise
    .then(() =>
      iziToast.show({
        backgroundColor: '#59a10d',
        progressBarColor: '#326101',
        messageColor: '#fff',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(() =>
      iziToast.show({
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        messageColor: '#fff',
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      })
    );
};

// ADD EVENTS
refs.form.addEventListener('submit', func);
inputWrapper.addEventListener('click', changeValueInput);
