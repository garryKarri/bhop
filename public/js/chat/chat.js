const chatMessageForm = document.querySelector('#chatMessageForm');
const chatPageWindow = document.querySelector('#chatPageWindow');
const overflowContainer = document.querySelector('#overflowContainer')

// socket connection
const socket = io();

// Слушаем форму в чате
chatMessageForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  // method - get
  // action - /chat/message/:user_id
  const { action, message } = event.target;

  const response = await fetch(action);
  const data = await response.json();

  socket.emit('chat:choiceBar', {
    message: message.value,
    user_name: data.user_name,
  });
  message.value = '';
});

// Отрисовываем сообщения
socket.on('chat:choiceBar', (data) => {
  // Создаем тэг для сообщения
  const messageTag = document.createElement('li');
  messageTag.classList.add('list-group-item');

  // Наполняем сообщение текстом и добавляем его в родительский тэг
  messageTag.innerHTML = `<b>${data.user_name}: </b>${data.message}`;

  chatPageWindow.appendChild(messageTag);

  // Автопрокрутка вниз
  overflowContainer.scrollTo(0, 9999);
});


