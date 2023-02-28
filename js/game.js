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
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }
    if (event.code == 'KeyD') {
        keyboard.D = true;
    }
    if (event.code == 'KeyB') {
        keyboard.B = true;
    }
    if (event.code == 'KeyN') {
        keyboard.N = true;
    }
    if (event.code == 'Escape') {
        keyboard.ESCAPE = true;
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
    if (event.code == 'KeyB') {
        keyboard.B = false;
    }
    if (event.code == 'KeyN') {
        keyboard.N = false;
    }
    if (event.code == 'Escape') {
        keyboard.ESCAPE = false;
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

function playBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);

    if (music.paused == true) {
        music.volume = 0.8;
        music.load();
        music.play();
        music.loop = true;
    }
}

function stopBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);
    music.pause();
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {//for IE 11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {//ios Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

}