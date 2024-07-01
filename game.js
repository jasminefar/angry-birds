const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;
const bird = {
    x: 150,
    y: canvas.height - 200,
    radius: 20,
    color: 'red',
    velocityY: 0,
    isDragging: false
};

const pig = {
    x: canvas.width - 100,
    y: canvas.height - 200,
    radius: 20,
    color: 'green'
};

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();
}

function drawPig() {
    ctx.beginPath();
    ctx.arc(pig.x, pig.y, pig.radius, 0, Math.PI * 2);
    ctx.fillStyle = pig.color;
    ctx.fill();
    ctx.closePath();
}

function drawGround() {
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function update() {
    if (!bird.isDragging) {
        bird.velocityY += gravity;
        bird.y += bird.velocityY;
        if (bird.y + bird.radius >= canvas.height - 50) {
            bird.y = canvas.height - 50 - bird.radius;
            bird.velocityY = 0;
        }
    }

    checkCollision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawBird();
    drawPig();
    requestAnimationFrame(update);
}

function checkCollision() {
    const dx = bird.x - pig.x;
    const dy = bird.y - pig.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < bird.radius + pig.radius) {
        pig.color = 'black'; // Pig is hit
    }
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - bird.x;
    const dy = mouseY - bird.y;
    if (dx * dx + dy * dy <= bird.radius * bird.radius) {
        bird.isDragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (bird.isDragging) {
        const rect = canvas.getBoundingClientRect();
        bird.x = e.clientX - rect.left;
        bird.y = e.clientY - rect.top;
    }
});

canvas.addEventListener('mouseup', () => {
    if (bird.isDragging) {
        bird.isDragging = false;
        bird.velocityY = -10; // Launch bird
    }
});

update();
