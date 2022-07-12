const mainContainer = document.querySelector('#mainContainer');
const regForm = document.querySelector('#regForm');
const regError = document.querySelector('#regError');
const secretWord = document.querySelector('#secretWord');
const tempInfo = document.querySelector('#tempInfo');

// Слушаем чек Дополнительная информация
let countInfo = 0;
regForm?.addEventListener('click', (event) => {
  if (event.target.id === 'info') {
    console.log('click 2 =>', event.target.id);
    countInfo++;

    if (countInfo % 2 === 1) {
      tempInfo.style.display = 'block';
    } else {
      tempInfo.style.display = 'none';
    }
  }
});

// Слушаем чек Рега как Админ
let countSecret = 0;
regForm?.addEventListener('click', (event) => {
  if (event.target.id === 'admin') {
    console.log('click 1 =>', event.target.id);
    countSecret++;

    if (countSecret % 2 === 1) {
      secretWord.style.display = 'block';
    } else {
      secretWord.style.display = 'none';
    }
  }
});

// Слушаем форму Регистрации
regForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  // method - post
  // action - /form/reg
  const {
    method,
    action,
    user_name,
    user_email,
    user_password,
    user_password_repeat,
    user_sex,
    user_age,
    user_city,
    user_street,
    user_house,
    user_secret_word,
  } = event.target;

  const response = await fetch(action, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_name: user_name.value,
      user_email: user_email.value,
      user_password: user_password.value,
      user_password_repeat: user_password_repeat.value,
      user_secret_word: user_secret_word.value,
      user_sex: user_sex.value,
      user_age: user_age.value,
      user_city: user_city.value,
      user_street: user_street.value,
      user_house: user_house.value,
    }),
  });

  const data = await response.text();

  if (data.includes('error')) {
    regError.innerHTML = data;
  } else {
    mainContainer.innerHTML = data;

    const loginForm = document.querySelector('#loginForm');
    const loginError = document.querySelector('#loginError');

    loginForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      // action - /form/login
      const { method, action, user_email, user_password } = event.target;

      const response = await fetch(action, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user_email.value,
          user_password: user_password.value,
        }),
      });

      const data = await response.text();

      if (data.includes('error')) {
        loginError.innerHTML = data;
      } else {
        mainContainer.innerHTML = data;
        setTimeout(() => {
          document.location.assign('/');
        }, 2000);
      }
    });
  }
});
