let dollarBalance = parseFloat(localStorage.getItem('dollarBalance')) || 1000;
let currentCrypto = localStorage.getItem('currentCrypto') || 'BTC';

const cryptoBalances = JSON.parse(localStorage.getItem('cryptoBalances')) || {
    BTC: 0,
    ETH: 0,
    LTC: 0,
    HMSTR: 0
};

const cryptoPrices = JSON.parse(localStorage.getItem('cryptoPrices')) || {
    BTC: 65443,
    ETH: 2648,
    LTC: 69,
    HMSTR: 1
};

const dollarBalanceEl = document.getElementById('dollar-balance');
const tokenBalanceEl = document.getElementById('token-balance');
const buyTokenButton = document.getElementById('buy-token');
const sellTokenButton = document.getElementById('sell-token');

const cryptoButtons = document.querySelectorAll('.crypto-button');

// Функция для сохранения данных в localStorage
function saveData() {
    localStorage.setItem('dollarBalance', dollarBalance.toFixed(2));
    localStorage.setItem('currentCrypto', currentCrypto);
    localStorage.setItem('cryptoBalances', JSON.stringify(cryptoBalances));
    localStorage.setItem('cryptoPrices', JSON.stringify(cryptoPrices));
}

// Функция для создания графиков
function createCryptoChart(ctx, cryptoName) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [new Date().toLocaleTimeString()],
            datasets: [{
                label: `Цена ${cryptoName} ($)`,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Время',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Цена ($)',
                        color: 'white'
                    },
                    ticks: {
                        color: 'white',
                        beginAtZero: true
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                }
            }
        }
    });
}

const btcChartEl = document.getElementById('crypto-chart-btc').getContext('2d');
const ethChartEl = document.getElementById('crypto-chart-eth').getContext('2d');
const ltcChartEl = document.getElementById('crypto-chart-ltc').getContext('2d');
const hmstrChartEl = document.getElementById('crypto-chart-hmstr').getContext('2d');

let btcChart = createCryptoChart(btcChartEl, 'Bitcoin');
let ethChart = createCryptoChart(ethChartEl, 'Ethereum');
let ltcChart = createCryptoChart(ltcChartEl, 'Litecoin');
let hmstrChart = createCryptoChart(hmstrChartEl, 'Hamster');

// Функция для отображения графика для выбранной криптовалюты
function showChartForCrypto(crypto) {
    document.querySelectorAll('.crypto-chart').forEach(chart => {
        chart.style.display = 'none';
    });
    document.getElementById(`crypto-chart-${crypto.toLowerCase()}`).style.display = 'block';
}

// Функция для обновления балансов
function updateBalances() {
    tokenBalanceEl.textContent = cryptoBalances[currentCrypto];
    dollarBalanceEl.textContent = dollarBalance.toFixed(2);
    document.getElementById(currentCrypto.toLowerCase() + '-price').textContent = cryptoPrices[currentCrypto].toFixed(2);
    saveData();  // Сохраняем данные после обновления
}

// Функция для получения случайного значения криптовалюты
function randomCryptoValue() {
    const minChange = cryptoPrices[currentCrypto] * 0.95;
    const maxChange = cryptoPrices[currentCrypto] * 1.05;
    const randomValue = (Math.random() * (maxChange - minChange) + minChange).toFixed(2);
    return Math.max(randomValue, 0.4);
}

// Функция для обновления графика и цены
function updateChart() {
    const newValue = randomCryptoValue();
    cryptoPrices[currentCrypto] = parseFloat(newValue);
    const currentTime = new Date().toLocaleTimeString();

    let chartToUpdate;
    if (currentCrypto === 'BTC') {
        chartToUpdate = btcChart;
    } else if (currentCrypto === 'ETH') {
        chartToUpdate = ethChart;
    } else if (currentCrypto === 'LTC') {
        chartToUpdate = ltcChart;
    } else if (currentCrypto === 'HMSTR') {
        chartToUpdate = hmstrChart;
    }

    chartToUpdate.data.labels.push(currentTime);
    chartToUpdate.data.datasets[0].data.push(newValue);

    chartToUpdate.update();
    updateBalances();
}

cryptoButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentCrypto = button.getAttribute('data-symbol');
        showChartForCrypto(currentCrypto);
        updateBalances();
        updateChart();
    });
});

buyTokenButton.addEventListener('click', () => {
    if (dollarBalance >= cryptoPrices[currentCrypto]) {
        cryptoBalances[currentCrypto] += 1;
        dollarBalance -= cryptoPrices[currentCrypto];
        updateBalances();
    } else {
        alert('Недостаточно средств для покупки токена!');
    }
});

sellTokenButton.addEventListener('click', () => {
    if (cryptoBalances[currentCrypto] > 0) {
        cryptoBalances[currentCrypto] -= 1;
        dollarBalance += cryptoPrices[currentCrypto];
        updateBalances();
    } else {
        alert('Нет токенов для продажи!');
    }
});

// Запускаем обновление графика каждую секунду
setInterval(updateChart, 1000);

// При загрузке страницы обновляем балансы
updateBalances();
