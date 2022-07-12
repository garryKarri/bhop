const adminShowUsers = document.querySelector('#adminShowUsers');
const adminShowProfile = document.querySelector('#adminShowProfile');
const adminInfoContainer = document.querySelector('#adminInfoContainer');
const makeAdminConfirm = document.querySelector('#makeAdminConfirm');
const changePasswordFormContainer = document.querySelector(
  '#changePasswordFormContainer'
);

// Слушаем кнопку Списка пользователей
let count = 0;
adminShowUsers?.addEventListener('click', async (event) => {
  event.preventDefault();

  // method - get
  // action - /admin/lc/users
  const action = event.target.href;

  const response = await fetch(action);
  const data = await response.text();

  // Считаем кнопку чтобы показать Список
  if (event.target.innerText.includes('Список')) {
    count++;

    if (count % 2 === 1) {
      adminInfoContainer.innerHTML = data;
    } else {
      adminInfoContainer.innerHTML = '';
    }
  }

  // Слушаем карточки пользователей
  const adminShowUsersContainer = document.querySelector(
    '#adminShowUsersContainer'
  );
  adminShowUsersContainer?.addEventListener('click', async (event) => {
    event.preventDefault();

    // Слушаем кнопку Сделать Админом
    if (event.target.id === 'makeAdmin') {
      // method - get
      // action - /admin/lc/users/adminOn/:user_id
      const action = event.target.href;

      const response = await fetch(action);
      const data = await response.text();

      makeAdminConfirm.innerHTML = data;
      setTimeout(() => {
        makeAdminConfirm.innerHTML = '';
      }, 2000);
    }

    // Слушаем кнопку Снять Админа
    if (event.target.id === 'kickAdmin') {
      // method - get
      // action - /admin/lc/users/adminOn/:user_id
      const action = event.target.href;

      const response = await fetch(action);
      const data = await response.text();

      makeAdminConfirm.innerHTML = data;
      setTimeout(() => {
        makeAdminConfirm.innerHTML = '';
      }, 2000);
    }

    // Слушаем кнопку Забанить
    if (event.target.id === 'ban') {
      // method - get
      // action - /admin/lc/users/delete/:user_id
      const action = event.target.href;

      const response = await fetch(action);
      const data = await response.text();

      makeAdminConfirm.innerHTML = data;

      // Слушаем кнопку Отменить
      const cancelButton = document.querySelector('#cancelButton');
      cancelButton?.addEventListener('click', (event) => {
        makeAdminConfirm.innerHTML = '';
      });

      // Подтверждение Бана
      const adminShowUserDelete = document.querySelector(
        '#adminShowUserDelete'
      );
      adminShowUserDelete?.addEventListener('submit', async (event) => {
        event.preventDefault();

        // method - delete
        // action - /admin/lc/users/delete/:user_id
        const response = await fetch(action, {
          method: 'DELETE',
        });

        const data = await response.text();
        adminInfoContainer.innerHTML = data;
        makeAdminConfirm.innerHTML = '';
      });
    }

    // Слушаем кнопку Избранные
    if ((event.target.id = 'favorites')) {
      // method - get
      // action - /admin/lc/users/favorites/:user_id
      const action = event.target.href;

      const response = await fetch(action);
      const data = await response.text();

      const adminUsersFavoritesContainer = document.querySelector(
        '#adminUsersFavoritesContainer'
      );
      // const usersFavoritesList = document.querySelector('#usersFavoritesList');

      adminUsersFavoritesContainer.innerHTML = data;
      // adminUsersFavoritesContainer.classList.remove('invisible');

      // Слушаем кнопку Отменить
      const cancelButton4 = document.querySelector('#cancelButton4');
      cancelButton4?.addEventListener('click', (event) => {
        // event.preventDefault()
        // adminUsersFavoritesContainer.classList.add('invisible')
        adminUsersFavoritesContainer.innerHTML = ''
      });
    }
  });
});

// Слушаем кнопку Изменить личные данные
let secCount = 0;
adminShowProfile?.addEventListener('click', async (event) => {
  event.preventDefault();

  // method - get
  // action - /admin/lc/profile/:user_id
  const action = event.target.href;

  const response = await fetch(action);
  const data = await response.text();

  // Считаем кнопку чтобы показать Список
  if (event.target.innerText.includes('Изменить')) {
    secCount++;

    if (secCount % 2 === 1) {
      adminInfoContainer.innerHTML = data;
    } else {
      adminInfoContainer.innerHTML = '';
    }
  }

  // Слушаем кнопку Отменить
  const cancelButton2 = document.querySelector('#cancelButton2');
  cancelButton2?.addEventListener('click', (event) => {
    adminInfoContainer.innerHTML = '';
  });

  // Слушаем форму Изменения личных данных
  const adminShowUsersContainer = document.querySelector(
    '#adminShowUsersContainer'
  );
  const changeAdminProfile = document.querySelector('#changeAdminProfile');
  changeAdminProfile?.addEventListener('submit', async (event) => {
    event.preventDefault();

    // method - post
    // action - /admin/lc/change/:user_id
    const {
      method,
      action,
      user_name,
      user_email,
      user_sex,
      user_age,
      user_city,
      user_street,
      user_house,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: user_name.value,
        user_email: user_email.value,
        user_sex: user_sex.value,
        user_age: user_age.value,
        user_city: user_city.value,
        user_street: user_street.value,
        user_house: user_house.value,
      }),
    });

    const data = await response.text();
    changePasswordFormContainer.innerHTML = data;
    setTimeout(() => {
      changePasswordFormContainer.innerHTML = '';
    }, 3000);
  });

  // Слушаем кнопку Изменить пароль
  const changePasswordButton = document.querySelector('#changePasswordButton');
  changePasswordButton?.addEventListener('click', async (event) => {
    event.preventDefault();

    // method - get
    // action - /admin/lc/change/password/:user_id
    const action = event.target.href;
    const response = await fetch(action);
    const data = await response.text();

    makeAdminConfirm.innerHTML = data;

    // Слушаем кнопку Отменить
    const cancelButton3 = document.querySelector('#cancelButton3');
    cancelButton3?.addEventListener('click', (event) => {
      makeAdminConfirm.innerHTML = '';
    });

    // Слушаем Форму Изменения Пароля
    const changeAdminPasswordForm = document.querySelector(
      '#changeAdminPasswordForm'
    );
    changeAdminPasswordForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      // method - post
      // action - /admin/lc/change/password/:user_id
      const {
        method,
        action,
        user_old_password,
        user_password,
        user_password_repeat,
      } = event.target;

      const response = await fetch(action, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_old_password: user_old_password.value,
          user_password: user_password.value,
          user_password_repeat: user_password_repeat.value,
        }),
      });

      const data = await response.text();
      changePasswordFormContainer.innerHTML = data;

      setTimeout(() => {
        changePasswordFormContainer.innerHTML = '';
      }, 4000);
    });
  });
});
