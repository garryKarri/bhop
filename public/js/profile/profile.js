const userChangeButton = document.querySelector('#userChangeButton');
const addFormContainer = document.querySelector('#addFormContainer');
const profileContainer = document.querySelector('#profileContainer');
const chagneConfirmContainer = document.querySelector(
  '#chagneConfirmContainer'
);
const addPasswordContainer = document.querySelector('#addPasswordContainer');
const confirmJoinButton = document.querySelector('#confirmJoinButton');

// Функция для поиска маршрутов
const routes = (bar_address, user_address) => {
  ymaps.ready(function () {
    const myMap = new ymaps.Map('map', {
      center: [59.92979160258393, 30.339240775390625],
      zoom: 12.5,
      // Добавим панель маршрутизации.
      controls: ['routePanelControl'],
    });

    const control = myMap.controls.get('routePanelControl');

    // Зададим состояние панели для построения машрутов.
    control.routePanel.state.set({
      // Тип маршрутизации.
      type: 'masstransit',
      // Выключим возможность задавать пункт отправления в поле ввода.
      fromEnabled: false,
      // Адрес или координаты пункта отправления.
      from: user_address,
      // Включим возможность задавать пункт назначения в поле ввода.
      toEnabled: true,
      // Адрес или координаты пункта назначения.
      to: bar_address,
    });

    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
      // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
      allowSwitch: false,
      // Включим определение адреса по координатам клика.
      // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
      reverseGeocoding: true,
      // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
      types: { masstransit: true, pedestrian: true, taxi: true },
    });

    // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
    const switchPointsButton = new ymaps.control.Button({
      data: { content: 'Поменять местами', title: 'Поменять точки местами' },
      options: { selectOnClick: false, maxWidth: 160 },
    });
    // Объявляем обработчик для кнопки.
    switchPointsButton.events.add('click', function () {
      // Меняет местами начальную и конечную точки маршрута.
      control.routePanel.switchPoints();
    });
    myMap.controls.add(switchPointsButton);
  });
};

// Слушаем кнопку Изменить профиль
userChangeButton?.addEventListener('click', async (event) => {
  event.preventDefault();

  // method - get
  // action - /profile/lc/change/:user_id
  const action = event.target.href;

  const response = await fetch(action);
  const data = await response.text();

  addFormContainer.innerHTML = data;

  // Слушаем кнопку Отменить
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton?.addEventListener('click', (event) => {
    event.preventDefault();

    addFormContainer.innerHTML = '';
  });

  // Слушаем форму изменения Профиля
  const changeUserProfileForm = document.querySelector(
    '#changeUserProfileForm'
  );
  changeUserProfileForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    // method - post
    // action - /profile/lc/change/:user_id
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
    chagneConfirmContainer.innerHTML = data;

    setTimeout(() => {
      chagneConfirmContainer.innerHTML = '';
    }, 3000);
  });

  // Слушаем кнопку Изменить пароль
  const changeUserPasswordButton = document.querySelector(
    '#changeUserPasswordButton'
  );

  changeUserPasswordButton?.addEventListener('click', async (event) => {
    event.preventDefault();

    // method - get
    // action - /profile/lc/change/password/:user_id
    const action = event.target.href;
    const response = await fetch(action);
    const data = await response.text();
    addPasswordContainer.innerHTML = data;

    // Слушаем кнопку Отменить
    const cancelButton2 = document.querySelector('#cancelButton2');
    cancelButton2?.addEventListener('click', (event) => {
      event.preventDefault();

      addPasswordContainer.innerHTML = '';
    });

    // Слушаем форму изменения Пароля
    const changeUserPasswordForm = document.querySelector(
      '#changeUserPasswordForm'
    );
    changeUserPasswordForm?.addEventListener('submit', async (event) => {
      event.preventDefault();

      // method - post
      // action - /user/lc/change/password/:user_id
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

      console.log('data =>', data);
      console.log('chagneConfirmContainer =>', chagneConfirmContainer);

      chagneConfirmContainer.innerHTML = data;

      setTimeout(() => {
        chagneConfirmContainer.innerHTML = '';
      }, 3000);
    });
  });
});

// Слушаем всю страницу
profileContainer?.addEventListener('click', async (event) => {
  event.preventDefault();

  // Слушаем кнопку Удалить из избранных
  if (event.target.innerText.includes('Удалить')) {
    // method - get
    // action - /profile/delete/:id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.text();

      addFormContainer.innerHTML = data;

      // Слушаем кнопку Отменить
      const cancelButton = document.querySelector('#cancelButton');
      cancelButton?.addEventListener('click', (event) => {
        addFormContainer.innerHTML = '';
      });

      // Слушаем форму Удаления
      const addForm = document.querySelector('#addForm');
      addForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        // method - delete
        // action - /profile/delete/:id
        const response = await fetch(action, {
          method: 'delete',
        });
        const data = await response.text();

        profileContainer.innerHTML = data;
        addFormContainer.innerHTML = '';
      });
    }
  }

  // Слушаем кнопку Хочу сюда!
  if (event.target.innerText.includes('Хочу')) {
    // method - get
    // action - /map/routes/:bar_id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.json();

      routes(data.bar_address, data.user_address);
      mainMapRoutesContainer.classList.remove('invisible');

      // Слушаем кнопку Отменить
      cancelButton?.addEventListener('click', (event) => {
        mainMapRoutesContainer.classList.add('invisible');
        map.innerHTML = '';
      });
    }
  }

  // Слушаем кнопку Кто пойдет?
  if (event.target.innerText.includes('Кто')) {
    // method - get
    // action - /profile/group/:bar_id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.text();

      map.innerHTML = data;
      mainMapRoutesContainer.classList.remove('invisible');

      // Слушаем кнопку Отменить
      cancelButton?.addEventListener('click', (event) => {
        mainMapRoutesContainer.classList.add('invisible');
        map.innerHTML = '';
      });

      // Слушаем весь список пользователей
      const usersFavoriteList = document.querySelector('#usersFavoriteList');
      usersFavoriteList?.addEventListener('click', async (event) => {
        event.preventDefault();

        // Слушаем кнопки Позвать
        if (event.target.innerText.includes('Позвать')) {
          // method - get
          // action - /profile/lc/mail/:user_id/:bar_id
          const action = event.target.href;

          if (action) {
            const response = await fetch(action);
            const data = await response.text();

            confirmJoinButton.innerHTML = data;
            setTimeout(() => {
              confirmJoinButton.innerHTML = '';
            }, 3000);
          }
        }
      });
    }
  }
});

userChangeButton?.addEventListener('');
