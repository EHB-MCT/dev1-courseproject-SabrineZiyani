"use strict";
/** @type {CanvasRenderingContext2D} */
let context;

setup();
drawPhone();

function setup() {
    let canvas = document.querySelector("canvas");
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

function drawPhone() {
    // Draw the outer black rectangle
    context.fillStyle = 'black';
    context.fillRect(550, 100, 350, 500);


    // Draw the inner white rectangle
    context.fillStyle = 'white';
    context.fillRect(560, 110, 330, 480);

    // Draw the horizontal black rectangle
    context.fillStyle = 'black'
    context.fillRect(560, 510, 330, 10)
    // Draw the button black rectangle

    context.fillStyle = 'black'
    context.fillRect(690, 530, 50, 50)

    // Draw small rectangles (apps) with random colors
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            context.fillStyle = getRandomColor();
            context.fillRect(585 + j * 100, 120 + i * 100, 80, 80);

        }
    }
}
