// Получение данных из localStorage
const dollarBalance = parseFloat(localStorage.getItem('dollarBalance')) || 1000;
const cryptoBalances = JSON.parse(localStorage.getItem('cryptoBalances')) || {
    BTC: 0,
    ETH: 0,
    LTC: 0,
    HMSTR: 0
};

// Отображаем информацию на странице профиля
document.getElementById('username').textContent = 'CryptoMaster'; // Имя пользователя по умолчанию
document.getElementById('profile-token-balance').textContent = cryptoBalances.BTC; // Можно изменить для других криптовалют
document.getElementById('profile-dollar-balance').textContent = dollarBalance.toFixed(2);

// Обработчик выхода
document.getElementById('logout').addEventListener('click', () => {
    window.location.href = 'index.html';
});
