import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const valueFulfilled = document.querySelector('input[value="fulfilled"]');

const valueRejected = document.querySelector('input[value="rejected"]');

function createPromise(delay) {
  return new Promise((fulfilled, rejected) => {
    setTimeout(() => {
      if (valueFulfilled.checked) {
        fulfilled(`✅ Fulfilled promise in ${delay}ms`);
        iziToast.show({
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      } else if (valueRejected.checked) {
        rejected(`❌ Rejected promise in ${delay}ms`);
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
        });
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();
  const delay = delayInput.value;
  console.log('delay: ', delay);
  createPromise(delay)
    .then(fulfilled => {
      console.log(fulfilled);
    })
    .catch(rejected => {
      console.log(rejected);
    })
    .finally(() => {
      form.reset();
    });
}

form.addEventListener('submit', onSubmitForm);
