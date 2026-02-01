var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ⭐ Stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;
var animationEnded = false;

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    });
}

function updateStars() {
    starArray.forEach(star => {
        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }
    });
}

const button = document.getElementById("valentinesButton");
button.style.display = "none";

button.addEventListener("click", () => {
    animationEnded = true;
    button.style.display = "none";

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "bold 38px Comic Sans MS";
    context.textAlign = "center";
    context.shadowColor = "rgba(255,105,180,1)";
    context.shadowBlur = 20;
    context.fillStyle = "rgb(255,182,193)";

    context.fillText("She said YES 💖", canvas.width / 2, canvas.height / 2 - 20);
    context.fillText("I love you, Noora 🌸", canvas.width / 2, canvas.height / 2 + 40);
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * (fontSize + lineHeight));
    });
}

function drawText() {
    if (animationEnded) return;

    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    context.shadowColor = "rgba(255,105,180,1)";
    context.shadowBlur = 12;

    if (frameNumber < 250) {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("every single day I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    } 
    else if (frameNumber < 500) opacity -= 0.01;
    else if (frameNumber < 1000) {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("amongst trillions and trillions of stars, over billions of years", canvas.width / 2, canvas.height / 2);
        opacity += frameNumber < 750 ? 0.01 : -0.01;
    } 
    else if (frameNumber < 1500) {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("to be alive, and to get to spend this life with you", canvas.width / 2, canvas.height / 2);
        opacity += frameNumber < 1250 ? 0.01 : -0.01;
    } 
    else if (frameNumber < 2000) {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("is so incredibly, unfathomably unlikely", canvas.width / 2, canvas.height / 2);
        opacity += frameNumber < 1750 ? 0.01 : -0.01;
    } 
    else if (frameNumber < 2500) {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("and yet here I am to get the impossible chance to get to know you", canvas.width / 2, canvas.height / 2);
        opacity += frameNumber < 2250 ? 0.01 : -0.01;
    } 
    else {
        context.fillStyle = `rgba(255,105,180,${opacity})`;
        context.fillText("I love you so much Noora, more than all the time and space in the universe can contain", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 2750) {
        context.fillStyle = `rgba(255,105,180,${secondOpacity})`;
        context.fillText("and I can't wait to spend all the time in the world to share that love with you!", canvas.width / 2, canvas.height / 2 + 50);
        secondOpacity += 0.01;
    }

    if (frameNumber >= 3000) {
        context.fillStyle = "rgba(0,0,0,0.35)";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (frameNumber >= 3100) {
        context.font = "bold " + (fontSize + 10) + "px Comic Sans MS";
        context.fillStyle = `rgba(255,182,193,${thirdOpacity})`;
        context.fillText("Noora, will you be my Valentine? 💕", canvas.width / 2, canvas.height / 2);
        thirdOpacity += 0.01;
        button.style.display = "block";
        button.textContent = "Say Yes 💖";
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    drawText();
    frameNumber++;
    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

requestAnimationFrame(draw);
