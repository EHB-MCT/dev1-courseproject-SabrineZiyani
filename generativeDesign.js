"use strict";
/** @type {CanvasRenderingContext2D} */
let context;
let canvas;

const apps = [];
const homeButton = { x: 690, y: 530, width: 50, height: 50 };

// Store the default color of the "name" text
let nameColor = "black"; // 

setup();
drawPhone();
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleMouseClick);

function setup() {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");

    // Draw the Space Invader and the name text on load
    drawSpaceinvader();
    drawNameText();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPhone() {
    context.fillStyle = 'black';
    context.fillRect(550, 100, 350, 500);
    context.fillStyle = 'white';
    context.fillRect(560, 110, 330, 480);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let x = 585 + j * 100;
            let y = 120 + i * 100;
            let app = { x: x, y: y, width: 80, height: 80, color: getRandomColor() };
            apps.push(app);
            drawApp(app);
        }
    }

    context.fillStyle = 'black';
    context.fillRect(homeButton.x, homeButton.y, homeButton.width, homeButton.height);
}

function drawSpaceinvader() {
    const scale = 0.4;
    const originalWidth = 300;
    const originalHeight = 300;
    const offsetX = canvas.width - originalWidth * scale - 20;
    const offsetY = canvas.height - originalHeight * scale - 20;

    context.fillStyle = "#F5E3C7";
    context.fillRect(offsetX, offsetY, originalWidth * scale, originalHeight * scale);

    const centerX = offsetX + (originalWidth * scale) / 2;
    const centerY = offsetY + (originalHeight * scale) / 2;

    context.fillStyle = "#E0B49D";
    context.fillRect(centerX - 125 * scale, centerY - 75 * scale, 250 * scale, 50 * scale);  // Main block
    context.fillRect(centerX - 25 * scale, centerY - 125 * scale, 50 * scale, 50 * scale);  // Top center block
    context.fillRect(centerX - 125 * scale, centerY + 75 * scale, 50 * scale, 50 * scale);  // Bottom-left block
    context.fillRect(centerX + 75 * scale, centerY + 75 * scale, 50 * scale, 50 * scale);  // Bottom-right block
    context.fillRect(centerX - 75 * scale, centerY + 25 * scale, 50 * scale, 50 * scale);  // Mid-left block
    context.fillRect(centerX + 25 * scale, centerY + 25 * scale, 50 * scale, 50 * scale);  // Mid-right block
}

function drawApp(app, isHovered = false) {
    if (isHovered) {
        app.color = getRandomColor(); // Change color only on hover
    }
    context.fillStyle = app.color;
    let size = isHovered ? 100 : 80;
    let offset = isHovered ? -10 : 0;
    context.fillRect(app.x + offset, app.y + offset, size, size);
}

function drawNameText() {
    // Set font properties for the name text
    context.font = "30px Arial";
    context.fillStyle = nameColor;
    context.fillText("Sabrine Ziyani", 50, 50);  // Position the text at the top-left corner
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Clear the canvas and redraw everything
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the interactive background (changes with mouse movement)
    drawBackground(mouseX, mouseY);

    // Redraw the phone and apps
    drawPhone();

    apps.forEach(app => {
        let isHovered = mouseX >= app.x && mouseX <= app.x + app.width && mouseY >= app.y && mouseY <= app.y + app.height;
        drawApp(app, isHovered);
    });

    // Redraw the Space Invader and name text
    drawSpaceinvader();
    drawNameText();
}

function handleMouseClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const isHomeButtonClicked = mouseX >= homeButton.x && mouseX <= homeButton.x + homeButton.width &&
        mouseY >= homeButton.y && mouseY <= homeButton.y + homeButton.height;

    if (isHomeButtonClicked) {
        apps.forEach(app => app.color = getRandomColor());

        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPhone();
        drawSpaceinvader();
        drawNameText();
    }
}

function drawBackground(mouseX, mouseY) {
    const gradient = context.createRadialGradient(mouseX, mouseY, 50, mouseX, mouseY, 300);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, "#000000");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Change the color of the name when the mouse moves
    nameColor = getRandomColor();
}


