function clearDisplay() {
  document.getElementById('display').value = '';
}

function deleteLast() {
  let currentDisplay = document.getElementById('display').value;
  document.getElementById('display').value = currentDisplay.slice(0, -1);
}

function appendNumber(number) {
  document.getElementById('display').value += number;
}

function appendOperator(operator) {
  let currentDisplay = document.getElementById('display').value;
  // Добавляем оператор, только если последний символ не является оператором
  if (currentDisplay && !isNaN(currentDisplay[currentDisplay.length - 1])) {
    document.getElementById('display').value += operator;
  }
}

function calculate() {
  let expression = document.getElementById('display').value;
  try {
    let result = eval(expression);
    document.getElementById('display').value = result;

    // Проверяем, если результат равен 993
    if (result == 993) {
      showImageAndPlaySound();
    }
  } catch (e) {
    document.getElementById('display').value = 'Ошибка';
  }
}

// Функция для отображения картинки и воспроизведения звука
function showImageAndPlaySound() {
  // Создаём и отображаем картинку на весь экран
  let img = document.createElement('img');
  img.src = 'img/ghoul2.png'; // Замени на ссылку на твое изображение
  img.style.position = 'fixed';
  img.style.top = '0';
  img.style.left = '0';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.zIndex = '1000';

  document.body.appendChild(img);

  // Воспроизведение звука
  let audio = new Audio('img/Я - Гуль..mp3'); // Замени на ссылку на твой звук
  audio.play();

  // Добавляем обработчик для скрытия картинки и остановки звука при клике
  img.addEventListener('click', function() {
    document.body.removeChild(img);
    audio.pause();
    audio.currentTime = 0; // Сброс звука в начало
  });
}
