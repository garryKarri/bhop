const addAdminButton = document.querySelector('#addAdminButton');
const addAdminButtonContainer = document.querySelector(
  '#addAdminButtonContainer'
);
const addAdminFormContainer = document.querySelector('#addAdminFormContainer');

addAdminButton?.addEventListener('click', async (event) => {
  event.preventDefault();

  // method - get
  // action - /admin/add
  const action = event.target.href;
  const response = await fetch(action);
  const data = await response.text();

  addAdminButtonContainer.innerHTML = data;

  // Слушаем кнопку Отменить
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton?.addEventListener('click', (event) => {
    addAdminButtonContainer.innerHTML = '';
  });

  // Слушаем форму добавления
  const addAdminForm = document.querySelector('#addAdminForm');
  addAdminForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    // method - post
    // action - /admin/add
    const { method, action } = event.target;
    const formData = new FormData(event.target);

    const response = await fetch(action, {
      method,
      body: formData,
    });

    const data = await response.text();
    addAdminFormContainer.innerHTML = data;
    addAdminButtonContainer.innerHTML = '';
  });
});

addAdminFormContainer?.addEventListener('click', async (event) => {
  event.preventDefault();

  // Изменить
  if (event.target.innerText.includes('Изменить')) {
    // method - get
    // action - /admin/change/:bar_id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.text();

      addAdminButtonContainer.innerHTML = data;

      // Слушаем кнопку Отменить
      const cancelButton = document.querySelector('#cancelButton');
      cancelButton?.addEventListener('click', (event) => {
        addAdminButtonContainer.innerHTML = '';
      });

      // Слушаем форму изменения
      const addAdminForm = document.querySelector('#addAdminForm');
      addAdminForm?.addEventListener('submit', async (event) => {
        event.preventDefault();

        // method - post
        // method - /admin/change/:bar_id
        const { method } = event.target;
        const formData = new FormData(event.target);

        const response = await fetch(action, {
          method,
          body: formData,
        });

        const data = await response.text();
        addAdminFormContainer.innerHTML = data;
        addAdminButtonContainer.innerHTML = '';
      });
    }
  }

  // Удалить
  if (event.target.innerText.includes('Удалить')) {
    // method - get
    // action - /profile/delete/:bar_id
    const action = event.target.href;

    if (action) {
      const response = await fetch(action);
      const data = await response.text();

      addAdminButtonContainer.innerHTML = data;

      // Слушаем кнопку Отменить
      const cancelButton = document.querySelector('#cancelButton');
      cancelButton?.addEventListener('click', (event) => {
        addAdminButtonContainer.innerHTML = '';
      });

      // Слушаем форму подтверждения удаления
      addAdminForm?.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // method - delete
        // action - /profile/delete/:bar_id
        const response = await fetch(action, {
          method: 'DELETE'
        })

        const data = await response.text()
        addAdminFormContainer.innerHTML = data
        addAdminButtonContainer.innerHTML = ''        
      });
    }
  }
});
