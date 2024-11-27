const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;

// Game settings
const gravity = 0.5; // Gravity force

// Player settings
const player = {
    x: 10,
    y: 610,
    width: 30,
    height: 30,
    color: 'red',
    dy: 0, // vertical speed
    jumpStrength: -8,
    isJumping: false
};

// Platform settings
const platforms = [ 
    { x: 1, y: 690, width: 320, height: 88, color: 'transparent' }, // Ground platform
    { x: 386, y: 645, width: 55, height: 2, color: 'transparent' },
	{ x: 168, y: 555, width: 148, height: 2, color: 'transparent' },
	{ x: 27, y: 529, width: 53, height: 2, color: 'transparent' },
	{ x: 63, y: 466, width: 151, height: 2, color: 'transparent' },
	{ x: 105, y: 373, width: 25, height: 2, color: 'transparent' },
	{ x: 131, y: 379, width: 76, height: 2, color: 'transparent' },
	{ x: 313, y: 379, width: 204, height: 2, color: 'transparent' },
	{ x: 434, y: 290, width: 83, height: 2, color: 'transparent' },
	{ x: 239, y: 210, width: 163, height: 2, color: 'transparent' },
	{ x: 187, y: 194, width: 53, height: 2, color: 'transparent' },
	{ x: 129, y: 90, width: 8, height: 2, color: 'transparent' },
	{ x: 32, y: 68, width: 98, height: 2, color: 'transparent' },
	{ x: 136, y: 144, width: 51, height: 2, color: 'transparent' },
	{ x: 517, y: 145, width: 70, height: 2, color: 'transparent' },
	{ x: 586, y: 379, width: 84, height: 2, color: 'transparent' },
	{ x: 744, y: 497, width: 129, height: 2, color: 'transparent' },
	{ x: 803, y: 439, width: 91, height: 2, color: 'transparent' },
	{ x: 678, y: 555, width: 67, height: 2, color: 'transparent' },
	{ x: 855, y: 375, width: 77, height: 2, color: 'transparent' },
	{ x: 746, y: 282, width: 68, height: 4, color: 'transparent' },
	{ x: 737, y: 270, width: 10, height: 2, color: 'transparent' },
	{ x: 725, y: 210, width: 13, height: 2, color: 'transparent' },
	{ x: 853, y: 210, width: 67, height: 2, color: 'transparent' },
	{ x: 919, y: 171, width: 45, height: 2, color: 'transparent' },
	{ x: 963, y: 136, width: 37, height: 2, color: 'transparent' },
	{ x: 742, y: 107, width: 72, height: 2, color: 'transparent' },
	{ x: 749, y: 82, width: 24, height: 2, color: 'transparent' },
	{ x: 565, y: 647, width: 44, height: 2, color: 'transparent' },
	{ x: 607, y: 757, width: 141, height: 2, color: 'transparent' },
	{ x: 748, y: 782, width: 92, height: 2, color: 'transparent' },
	{ x: 892, y: 762, width: 68, height: 2, color: 'transparent' },
	{ x: 959, y: 736, width: 20, height: 2, color: 'transparent' },
	{ x: 961, y: 620, width: 39, height: 2, color: 'transparent' },
];

// Key press tracking
const keys = {};

// Game over settings
let targetX = 1000;
let targetY = 125;
let isGameOver = false;

// Handle player movement
function updatePlayer() {
    // Apply gravity
    player.dy += gravity;

    // Move player
    player.y += player.dy;

    // Collision detection
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y < platform.y + platform.height &&
            player.y + player.height > platform.y &&
            player.dy >= 0 // Ensures only collision from above
        ) {
            player.y = platform.y - player.height;
            player.dy = 0;
            player.isJumping = false;
        }
    });

    // Horizontal movement
    if (keys['ArrowLeft']) {
        player.x -= 5;
    }
    if (keys['ArrowRight']) {
        player.x += 5;
    }

    // Boundary checks
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}

// Jump function
function jump() {
    if (!player.isJumping) {
        player.dy = player.jumpStrength;
        player.isJumping = true;
    }
}

// Draw player and platforms
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw platforms
    platforms.forEach(platform => {
        ctx.fillStyle = platform.color;
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Check for game over conditions
function checkGameOver() {
    if (!isGameOver) {
        // Check if the player has reached the target coordinates within a small range
        if (
            player.x >= targetX - 15 && player.x <= targetX + 15 && // Allow a range for x
            player.y >= targetY - 15 && player.y <= targetY + 15  // Allow a range for y
        ) {
            triggerEndScreen();
        }
    }
}

// Trigger end screen
function triggerEndScreen() {
    isGameOver = true;
    displayEndScreen();
}

// Display end screen
function displayEndScreen() {
    console.log("Game Over! Thanks for playing!");
    // Show the end screen image
    const endScreen = document.querySelector('.end-screen');
    endScreen.style.display = 'flex'; // Display the end screen
}



// Main game loop
function gameLoop() {
    if (!isGameOver) {
        updatePlayer();
        checkGameOver();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

// Event listeners
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
    if (event.key === 'ArrowUp') {
        jump();
    }
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start the game
gameLoop();
