let canvas;
let ctx;
let world;
let timeout;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    setCanvasXandY(canvas);
    world = new World(canvas, keyboard);
    setLongIdleTimeout();

    console.log('My Character is', world.character);
}

function setCanvasXandY(canvas) {
    canvas.style.width = '80%'
}


window.addEventListener('keydown', () => {
    keyboard.ACTIVE = true;
    resetTimeout();
})

window.addEventListener('keyup', () => {
    keyboard.ACTIVE = false
})

window.addEventListener('keydown', (event) => {

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.code == 'ArrowUp') {
        keyboard.Up = true;
    }
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }
    if (event.code == 'KeyD') {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) => {

    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.code == 'ArrowUp') {
        keyboard.Up = false;
    }
    if (event.code == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }
    if (event.code == 'KeyD') {
        keyboard.D = false;
    }
})

function isPlaying(audelem) { return !audelem.paused; }

function setLongIdleTimeout() {
    timeout = setTimeout(() => {
        world.character.renderLongIdleImages = true;
    }, 7000);
}

function resetTimeout() {
    world.character.renderLongIdleImages = false;
    clearTimeout(timeout);
    setLongIdleTimeout();
}

function playBossBgMusic() {
    let music = document.getElementById('boss-bg-sound');

    if (music.paused == true) {
        music.currentTime = 40;
        music.volume = 1;
        music.load();
        music.play();
        music.loop = true;
    }
}