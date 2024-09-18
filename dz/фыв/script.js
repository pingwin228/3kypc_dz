// script.js
window.onload = function() {
    const canvas = document.getElementById('fortune-wheel');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin-button');
    const resultDiv = document.getElementById('result');
    const radius = canvas.width / 2;

    const sections = [
        'Выигрыш 1',
        'Выигрыш 2',
        'Выигрыш 3',
        'Выигрыш 4',
        'Выигрыш 5',
        'Выигрыш 6'
    ];

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A2', '#A233FF', '#33FFF7'];

    const drawWheel = (rotation = 0) => {
        const numSections = sections.length;
        const arc = Math.PI * 2 / numSections;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(rotation);

        for (let i = 0; i < numSections; i++) {
            const startAngle = arc * i;
            const endAngle = arc * (i + 1);

            // Рисование секции
            ctx.beginPath();
            ctx.arc(0, 0, radius, startAngle, endAngle);
            ctx.lineTo(0, 0);
            ctx.fillStyle = colors[i];
            ctx.fill();

            // Рисование текста
            ctx.save();
            ctx.rotate(startAngle + arc / 2);
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';

            // Позиция текста
            const text = sections[i];
            const textWidth = ctx.measureText(text).width;
            ctx.translate(radius / 2 - 10, 0);
            ctx.fillText(text, textWidth / 2, 0);

            ctx.restore();
        }

        ctx.restore();
    };

    drawWheel();

    spinButton.onclick = () => {
        const randomDegree = Math.random() * 360;
        const rotation = 360 * 5 + randomDegree; // Spin 5 times + random
        const duration = 3000; // 3 seconds
        const start = performance.now();

        const animate = (time) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const rotationDegree = rotation * progress;

            drawWheel((rotationDegree * Math.PI) / 180);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                const index = Math.floor(((rotationDegree % 360) / 360) * sections.length);
                resultDiv.textContent = `Вы выиграли: ${sections[sections.length - index - 1]}`;
            }
        };

        requestAnimationFrame(animate);
    };
};
