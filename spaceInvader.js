let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext("2d");

    drawSpaceinvader
    function drawSpaceinvader () {

        context.beginPath();

    }

    context.fillRect (50,50,300,300);
    context.fillStyle = "#E0B49D"
    context.fillRect(75,125,250,50);
    context.fillRect(175,75,50,50);
    context.fillRect(75,275,50,50);
    context.fillRect(275,275,50,50);
    context.fillRect(125,225,50,50);
    context.fillRect(225,225,50,50);