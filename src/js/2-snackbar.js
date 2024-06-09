import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document
  .querySelector('form.form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = parseInt(document.querySelector('input[name="delay"]').value);
    const state = document.querySelector('input[name="state"]:checked').value;

    createPromise(delay, state)
      .then(delay => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
        });
      });

    event.target.reset();

    const radioButtons = document.querySelectorAll('input[name="state"]');
    radioButtons.forEach(radio => {
      radio.blur();
    });
    document.activeElement.blur();
  });

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
