"use strict";
/** @type {CanvasRenderingContext2D} */
let context;
let canvas;

const apps = [];

// Home button position and size
const homeButton = { x: 690, y: 530, width: 50, height: 50 };

setup();
drawPhone();
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("click", handleMouseClick);

function setup() {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
}

function getRandomColor() {
    // Generate a random color
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawBackground(mouseX, mouseY) {
    const gradient = context.createRadialGradient(mouseX, mouseY, 50, mouseX, mouseY, 300);
    gradient.addColorStop(0, getRandomColor());
    gradient.addColorStop(1, "#000000");

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPhone() {
    // Draw the outer black rectangle
    context.fillStyle = 'black';
    context.fillRect(550, 100, 350, 500);

    // Draw the inner white rectangle
    context.fillStyle = 'white';
    context.fillRect(560, 110, 330, 480);

    // Draw the horizontal black rectangle
    context.fillStyle = 'black';
    context.fillRect(560, 510, 330, 10);

    // Draw the button black rectangle (home button)
    context.fillStyle = 'black';
    context.fillRect(homeButton.x, homeButton.y, homeButton.width, homeButton.height);

    // Draw small rectangles (apps) with random colors
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            let x = 585 + j * 100;
            let y = 120 + i * 100;
            let app = { x: x, y: y, width: 80, height: 80, color: getRandomColor() };
            apps.push(app);
            drawApp(app);
        }
    }
}

function drawApp(app, isHovered = false) {
    if (isHovered) {
        app.color = getRandomColor(); // Change color only on hover
    }
    context.fillStyle = app.color;
    let size = isHovered ? 100 : 80;
    let offset = isHovered ? -10 : 0; // Center the enlarged app
    context.fillRect(app.x + offset, app.y + offset, size, size);
}

function handleMouseMove(event) {
    // Get mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Clear the canvas and redraw everything
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the interactive background
    drawBackground(mouseX, mouseY);

    // Redraw the phone and check for hover on apps
    drawPhone();

    apps.forEach(app => {
        // Only hover if the mouse is within the app bounds
        let isHovered = mouseX >= app.x && mouseX <= app.x + app.width &&
            mouseY >= app.y && mouseY <= app.y + app.height;

        // Only redraw the app if it is hovered
        drawApp(app, isHovered);
    });
}

function handleMouseClick(event) {
    // Get mouse position to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the click is inside the home button bounds
    const isHomeButtonClicked = mouseX >= homeButton.x && mouseX <= homeButton.x + homeButton.width &&
        mouseY >= homeButton.y && mouseY <= homeButton.y + homeButton.height;

    if (isHomeButtonClicked) {
        // Change the color of all apps
        apps.forEach(app => {
            app.color = getRandomColor();
        });

        // Redraw the phone and apps
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(mouseX, mouseY);
        drawPhone();
    }
}

