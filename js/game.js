let canvas;
let ctx;
let world;
let timeout;
let keyboard = new Keyboard();
let intervalIds = [];
let gamePaused = false;
let soundMuted = false;
let totalImageCache = {};
let allImagesPaths = [
    characterImagePaths,
    chickenImagePaths,
    smallChickenImagePaths,
    endbossImagePaths,
    bottleImagePath,
    cloudImagePaths,
    coinImagePaths,
    statusbarBossImagePaths,
    statusbarBottleImagePaths,
    statusbarCoinImagePaths,
    statusbarHealthImagePaths,
    throwableObjectImagePaths,
    AIR,
    THIRD_LAYERV2,
    SECOND_LAYERV2,
    FIRST_LAYERV2,
    THIRD_LAYERV1,
    SECOND_LAYERV1,
    FIRST_LAYERV1
];

async function loadAllImagesToCache() {
    for (let i = 0; i < allImagesPaths.length; i++) {
        await loadImagesListToCache(allImagesPaths[i]);
    }
}
async function loadImagesListToCache(listList) {
    for (let i = 0; i < listList.length; i++) {
        const singleList = listList[i];
        for (let j = 0; j < singleList.length; j++) {
            const path = singleList[j];
            try {
                const img = await loadSingleImage(path);
                totalImageCache[path] = img;
            } catch (e) {
                console.log(path)
                console.log(e)
            }
        }
        //increaseCacheLoadingCounter();
    }
}

const loadSingleImage = path => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
        img.src = path
        img.onload = () => {
            resolve(img)
        }
        img.onerror = e => {
            reject(e)
        }
    })
}

function startGame() {
    playSound();
    init();
    hideStartScreen();
    playBgMusic('game-bg-sound');
    checkIfFullscreen();
    hideVolumeBtn();
}

async function awaitLoadingWorld() {
    showLoadingScreen();
    await loadAllImagesToCache();
    hideLoadingScreen();
}


function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    addCanvasBorderRadius();
    addCanvasBoxShadow();


    keyboardActions();
    bindBtsPressEvents();
    setLongIdleTimeout();
}


function pauseUnpauseGame() {
    if (!gamePaused) {
        playSound();
        stopGame();
        showPauseScreen();
        showVolumeBtn();
    } else if (gamePaused) {
        playSound();
        hidePauseScreen();
        continueGame();
        hideVolumeBtn();
    }
}


function stopGame() {
    intervalIds.forEach(clearInterval);
    document.querySelectorAll('audio').forEach(el => { el.pause() });
    gamePaused = true;
}

function restartGame() {
    gamePaused = false;
    startGame();
    hideYouLostScreen();
    hideGameoverScreen();
    hidePauseScreen();
}

function continueGame() {
    if (gamePaused) {
        world.throwableObjects.forEach(obj => { obj.throw() /*obj.noGravity = false*/ });
        world.level.enemies.forEach(enemy => { enemy.animate() });
        world.level.clouds.forEach(cloud => { cloud.animate() });
        world.character.animate();
        gamePaused = false;
        if (!soundMuted) {
            playBgMusic('game-bg-sound');
        }
    }
}

function showLoadingScreen() {
    let loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('d-none')
}

function hideLoadingScreen() {
    let loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('d-none')
}

function muteSound() {
    let volumeBtn = document.getElementById('volume-btn');
    if (!soundMuted) {
        playSound();
        soundMuted = true;
        volumeBtn.src = 'img/El_Pollo_Loco_icons/mute.png';
        stopBgMusic('game-bg-sound');
        stopBgMusic('boss-bg-sound');
    } else {
        playSound();
        soundMuted = false;
        volumeBtn.src = 'img/El_Pollo_Loco_icons/high-volume.png';
    }
}


function pushIntervalId(intervalId) {
    intervalIds.push(intervalId);
}

window.addEventListener('keydown', (event) => {
    if (event.code == 'KeyB') {
        fullscreen();
    }
    if (event.code == 'KeyN') {
        exitFullscreen();
    }
    if (event.code == 'Escape') {
        exitFullscreen();
    }
    if (event.code == 'KeyP') {
        pauseUnpauseGame();
    }
})

function keyboardActions() {
    window.addEventListener('keydown', (event) => {
        resetTimeout();
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
            world.checkThrowObjects();
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
}

function bindBtsPressEvents() {
    document.getElementById('arrow-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })
    document.getElementById('arrow-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })
    document.getElementById('arrow-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })
    document.getElementById('arrow-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })
    document.getElementById('throw-icon').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        world.checkThrowObjects();
    })
    document.getElementById('throw-icon').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
    document.getElementById('jump-icon').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('jump-icon').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    })
}

function isPaused(audelem) { return audelem.paused; }


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
    if (isPaused(music) && !soundMuted) {
        music.volume = 0.5;
        music.load();
        music.play();
        music.loop = true;
    }

}

function addCanvasBoxShadow() {
    canvas.classList.add('canvas-shadow');
}

function addCanvasBorderRadius() {
    canvas.classList.add('canvas-border-radius');
}

function removeCanvasBorderRadius() {
    canvas.classList.remove('canvas-border-radius');
}

function stopBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);
    music.pause();
}


function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    playSound();
}


function enterFullscreen(element) {
    removeCanvasBorderRadius();
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {//for IE 11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {//ios Safari
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if (checkIfFullscreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        playSound();
        addCanvasBorderRadius();
    }
}


function checkIfFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement) {
        return 1;
    } else {
        return 0;
    }
}

function playSound() {
    let sound = new Audio('audio/click_sound.mp3');
    sound.load();
    sound.volume = 0.5;
    sound.play();
}

//----SHOW HIDE SCREENS----//
function showYouLostScreen() {
    let youLostScreen = document.getElementById('lost-screen');
    youLostScreen.classList.remove('d-none');
}

function hideYouLostScreen() {
    let youLostScreen = document.getElementById('lost-screen');
    youLostScreen.classList.add('d-none');
}

function showGameoverScreen() {
    let gameoverScreen = document.getElementById('gameover-screen');
    gameoverScreen.classList.remove('d-none');
}


function hideStartScreen() {
    let startScreen = document.getElementById('start-screen');
    startScreen.classList.add('d-none');
}

function hideGameoverScreen() {
    let gameoverScreen = document.getElementById('gameover-screen');
    gameoverScreen.classList.add('d-none');
}

function showVolumeBtn() {
    let volumeBtn = document.getElementById('volume-btn');
    volumeBtn.classList.remove('d-none');
}

function hideVolumeBtn() {
    let volumeBtn = document.getElementById('volume-btn');
    volumeBtn.classList.add('d-none');
}

function showPauseScreen() {
    let pauseScreen = document.getElementById('pause-screen');
    pauseScreen.classList.remove('d-none');
}

function hidePauseScreen() {
    let pauseScreen = document.getElementById('pause-screen');
    pauseScreen.classList.add('d-none');
}







