const socket = io("http://localhost:3000") // Устанавливаем соединение с сервером Socket.IO по адресу "http://localhost:3000"

const message = document.getElementById('message'); // Получаем ссылку на элемент с идентификатором 'message'
const messages = document.getElementById('messages'); // Получаем ссылку на элемент с идентификатором 'messages'

const handleSubmitNewMessage = () => { // Объявляем функцию для обработки отправки нового сообщения
  socket.emit('message', { data: message.value }) // Отправляем сообщение на сервер Socket.IO с содержимым из поля 'message'
}

socket.on('message', ({ data }) => { // Устанавливаем обработчик события 'message' на сокете
  handleNewMessage(data); // Вызываем функцию для обработки нового сообщения
})

const handleNewMessage = (message) => { // Объявляем функцию для обработки нового сообщения
  messages.appendChild(buildNewMessage(message)); // Добавляем новое сообщение в список сообщений
}

const buildNewMessage = (message) => { // Объявляем функцию для создания нового сообщения
  const li = document.createElement("li"); // Создаем новый элемент списка
  li.appendChild(document.createTextNode(message)) // Добавляем текст сообщения в элемент списка
  return li; // Возвращаем созданный элемент списка
}