const confirmFavorite = document.querySelector('#confirmFavorite');
const mainPageCardsContainer = document.querySelector(
  '#mainPageCardsContainer'
);
const dropMenuButton = document.querySelector('#dropMenuButton')
const mainMapRoutesContainer = document.querySelector('#mainMapRoutesContainer')
const cancelButton = document.querySelector('#cancelButton')
const map = document.querySelector('#map')

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

// Слушаем весь главный контейнер
mainPageCardsContainer?.addEventListener('click', async (event) => {
  event.preventDefault();

  // Слушаем кнопку добавить в избранное
  if (event.target.innerText.includes('Добавить')) {
    // method - get
    // action - /main/favorite/:bar_id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.text();

      confirmFavorite.innerHTML = data;
      setTimeout(() => {
        confirmFavorite.innerHTML = '';
      }, 2000);
    }
  }

  // Слушаем кнопку Хочу сюда!
  if (event.target.innerText.includes('Хочу')) {

    // method - get
    // action - /map/routes/:bar_id
    const action = event.target.href

    if (action) {
      const response = await fetch(action)
      const data = await response.json()

      routes(data.bar_address, data.user_address)
      mainMapRoutesContainer.classList.remove('invisible')

      cancelButton?.addEventListener('click', (event) => {
        mainMapRoutesContainer.classList.add('invisible')
        map.innerHTML = ''
      })
    }
  }
});

// Слушаем кнопки сортировки заведений
dropMenuButton?.addEventListener('click', async (event) => {
  event.preventDefault()

  // method - post
  // action - /main/drop
  const response = await fetch('/main/drop', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: event.target.innerText
    })
  })

  const data = await response.text()
  mainPageCardsContainer.innerHTML = data
})

