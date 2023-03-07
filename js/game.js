let canvas;
let ctx;
let world;
let timeout;
let keyboard = new Keyboard();
let intervalIds = [];
let gamePaused = false;
let soundMuted = false;
let gameOver = false;


function startGame() {
    playSound();
    initLevel();
    world = new World(canvas, keyboard);
    setLongIdleTimeout();
    hideStartScreen();
    playBgMusic('game-bg-sound');
    checkIfFullscreen();
    hideVolumeBtn();
    hideFullscreenBtn();
    keyboardActions();
    bindBtsPressEvents();
}

async function awaitLoadingImages() {
    showLoadingScreen();
    await loadAllImagesToCache();
    hideLoadingScreen();
}


function init() {
    canvas = document.getElementById('canvas');
    awaitLoadingImages();
    addCanvasBorderRadius();
    addCanvasBoxShadow();
}


function pauseUnpauseGame() {
    if (!gamePaused) {
        playSound();
        stopGame();
        showPauseScreen();
        showVolumeBtn();
        showFullscreenBtn();
    } else if (gamePaused && !gameOver) {
        playSound();
        hidePauseScreen();
        continueGame();
        hideVolumeBtn();
        hideFullscreenBtn();
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


function pushIntervalId(intervalId) {
    intervalIds.push(intervalId);
}


//--Keyboard-Binding---//
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
        if (world) {
            resetTimeout();
        }
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


//--Touch-Binding---//
function bindBtsPressEvents() {
    document.getElementById('canvas').addEventListener('touchend', (e) => {//longIdle Touchlistener
        e.preventDefault();
        if (world) {
            resetTimeout();
        }
    })
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


//---Character-LongIdleAnimation-Timout-//
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

//---Canvas-Style---//
function addCanvasBoxShadow() {
    canvas.classList.add('canvas-shadow');
}

function addCanvasBorderRadius() {
    canvas.classList.add('canvas-border-radius');
}

function removeCanvasBorderRadius() {
    canvas.classList.remove('canvas-border-radius');
}


//--Fullscreen--//
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
    setExitFullscreenIcon();
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
        setEnterFullscreenIcon();
    }
}


function checkIfFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement) {
        return true;
    } else {
        return false;
    }
}


function setEnterFullscreenIcon() {
    let fullscreenIcon = document.getElementById('fullscreen-icon');
    fullscreenIcon.src = 'img/El_Pollo_Loco_icons/enter-fullscreen.png';
    fullscreenIcon.setAttribute('onclick', 'fullscreen()');
}


function setExitFullscreenIcon() {
    let fullscreenIcon = document.getElementById('fullscreen-icon');
    fullscreenIcon.src = 'img/El_Pollo_Loco_icons/exit-fullscreen.png';
    fullscreenIcon.setAttribute('onclick', 'exitFullscreen()');
}


//---Sound---//
function playSound() {
    if (!soundMuted) {
        let sound = new Audio('audio/click_sound.mp3');
        sound.load();
        sound.volume = 0.5;
        sound.play();
    }
}


function muteSound() {
    if (!soundMuted) {
        soundMuted = true;
        changeVolumeBtnImg('img/El_Pollo_Loco_icons/mute.png')
        stopBgMusic('game-bg-sound');
        stopBgMusic('boss-bg-sound');
    } else {
        soundMuted = false;
        changeVolumeBtnImg('img/El_Pollo_Loco_icons/high-volume.png')
    }
    playSound();
}


function changeVolumeBtnImg(imgSrc) {
    let volumeBtn = document.getElementById('volume-btn');
    volumeBtn.src = imgSrc;
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

function stopBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);
    music.pause();
}

function isPaused(audelem) { return audelem.paused; }

//----SHOW HIDE SCREENS----//

function showInfoScreen() {
    let infoScreen = document.getElementById('info-screen');
    infoScreen.classList.remove('d-none');
    playSound();
}


function hideInfoScreen() {
    let infoScreen = document.getElementById('info-screen');
    infoScreen.classList.add('d-none');
    playSound();
}


function showKeyBindScreen() {
    let keybindingsScreen = document.getElementById('keybindings-screen');
    keybindingsScreen.classList.remove('d-none');
    playSound();
}


function hideKeyBindScreen() {
    let keybindingsScreen = document.getElementById('keybindings-screen');
    keybindingsScreen.classList.add('d-none');
    playSound();
}


function showFullscreenBtn() {
    let fullscreenBtn = document.getElementById('fullscreen-icon');
    fullscreenBtn.classList.remove('d-none');
}


function hideFullscreenBtn() {
    let fullscreenBtn = document.getElementById('fullscreen-icon');
    fullscreenBtn.classList.add('d-none');
}


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


function showLoadingScreen() {
    let loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('d-none')
}


function hideLoadingScreen() {
    let loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('d-none')
}







