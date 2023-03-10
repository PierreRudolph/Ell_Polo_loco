let canvas;
let ctx;
let world;
let timeout;
let keyboard = new Keyboard();
let intervalIds = [];
let gamePaused = false;
let soundMuted = false;
let gameOverVar = false;


function startGame() {
    playSound('audio/click_sound.mp3');
    initLevel();
    world = new World(canvas, keyboard);
    setLongIdleTimeout();
    startMusic();
    prepareScreen();
    bindKeyboardAndTouch();
}


function prepareScreen() {
    hideStartScreen();
    checkIfFullscreen();
    hideVolumeBtn();
    hideFullscreenBtn();
}


function bindKeyboardAndTouch() {
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
    if (!gamePaused && world) {
        playSound('audio/click_sound.mp3');
        pauseActions();
    } else if (gamePaused && !gameOverVar) {
        playSound('audio/click_sound.mp3');
        unPauseActions();
    }
}


function pauseActions() {
    stopGame();
    showPauseScreen();
    showVolumeBtn();
    showFullscreenBtn();
}



function unPauseActions() {
    hidePauseScreen();
    continueGame();
    hideVolumeBtn();
    hideFullscreenBtn();
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
        reActivateAnimations();
        gamePaused = false;
        if (!soundMuted) {
            startMusic();
        }
    }
}


function reActivateAnimations() {
    world.throwableObjects.forEach(obj => { obj.throw() });
    world.level.enemies.forEach(enemy => { enemy.animate() });
    world.level.clouds.forEach(cloud => { cloud.animate() });
    world.character.animate();
}

/**
 * This function
 * 
 * @param {Number} intervalId - This is the number of the Inteval, to push.
 */
function pushIntervalId(intervalId) {
    intervalIds.push(intervalId);
}


function gameLose() {
    stopGame();
    showYouLoseScreen();
    gameOverVar = true;
    playSound('audio/game-lose.mp3');
}


function gameOver() {
    stopGame();
    showGameoverScreen();
    playSound('audio/game-win.mp3');
}


//--Keyboard-Binding---//
window.addEventListener('keydown', (event) => {
    if (event.code == 'KeyB') {
        setFullscreen();
    }
    if (event.code == 'KeyN') {
        setExitFullscreen();
    }
    if (event.code == 'Escape') {
        setExitFullscreen();
    }
    if (event.code == 'KeyP') {
        pauseUnpauseGame();
    }
})


function keyboardActions() {
    keydownEventListener();
    keyupEventListener();

}


function keydownEventListener() {
    window.addEventListener('keydown', (event) => {
        resetLongIdleTimeout();
        leftRightKeydownEvent(event);
        throwJumpKeydownEvent(event);
    })
}


function keyupEventListener() {
    window.addEventListener('keyup', (event) => {
        leftRightKeyupEvent(event);
        throwJumpKeyupEvent(event);
    })
}


function leftRightKeydownEvent(event) {
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
}


function throwJumpKeydownEvent(event) {
    if (event.code == 'Space') {
        keyboard.SPACE = true;
    }
    if (event.code == 'KeyD') {
        keyboard.D = true;
        world.checkThrowObjects();
    }
}


function leftRightKeyupEvent(event) {
    if (event.code == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.code == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
}


function throwJumpKeyupEvent(event) {
    if (event.code == 'Space') {
        keyboard.SPACE = false;
    }
    if (event.code == 'KeyD') {
        keyboard.D = false;
    }
}


//--Touch-Binding---//
function bindBtsPressEvents() {
    bindLeftPressEvent();
    bindRightPressEvent();
    bindThrowPressEvent();
    bindJumpPressEvent();
}


function bindLeftPressEvent() {
    document.getElementById('arrow-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        resetLongIdleTimeout();
        keyboard.LEFT = true;
    })
    document.getElementById('arrow-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })
}


function bindRightPressEvent() {
    document.getElementById('arrow-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        resetLongIdleTimeout();
        keyboard.RIGHT = true;
    })
    document.getElementById('arrow-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })
}


function bindThrowPressEvent() {
    document.getElementById('throw-icon').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
        world.checkThrowObjects();
    })
    document.getElementById('throw-icon').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })
}


function bindJumpPressEvent() {
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


function resetLongIdleTimeout() {
    world.character.renderLongIdleImages = false;
    clearTimeout(timeout);
    setLongIdleTimeout();
}
//--StartScreen Border-Radius--//
function addStartScreenBorderRadius() {
    let startScreen = document.getElementById('start-screen');
    startScreen.classList.add('border-radius');
}

function removeStartScreenBorderRadius() {
    let startScreen = document.getElementById('start-screen');
    startScreen.classList.remove('border-radius');
}

//---Canvas-Style---//
function addCanvasBoxShadow() {
    canvas.classList.add('canvas-shadow');
}


function addCanvasBorderRadius() {
    canvas.classList.add('border-radius');
}


function removeCanvasBorderRadius() {
    canvas.classList.remove('border-radius');
}


//--Fullscreen--//
function setFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    playSound('audio/click_sound.mp3');
}


function enterFullscreen(element) {
    removeCanvasBorderRadius();
    removeStartScreenBorderRadius()
    enterFullscreenCompatibility(element);
    setExitFullscreenIcon();
}


function enterFullscreenCompatibility(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {//for IE 11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {//ios Safari
        element.webkitRequestFullscreen();
    }
}


function setExitFullscreen() {
    if (checkIfFullscreen()) {
        exitFullscreenCompatibility();
        playSound('audio/click_sound.mp3');
        addStartScreenBorderRadius()
        addCanvasBorderRadius();
        setEnterFullscreenIcon();
    }
}


function exitFullscreenCompatibility() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
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
    fullscreenIcon.setAttribute('onclick', 'setFullscreen()');
}


function setExitFullscreenIcon() {
    let fullscreenIcon = document.getElementById('fullscreen-icon');
    fullscreenIcon.src = 'img/El_Pollo_Loco_icons/exit-fullscreen.png';
    fullscreenIcon.setAttribute('onclick', 'setExitFullscreen()');
}


//---Sound---//
function startMusic() {
    playBgMusic('game-bg-sound');
    playBgMusic('chicken-sound');
    playBgMusic('small-chicken-sound');
}


function playSound(imgSrc) {
    if (!soundMuted) {
        let sound = new Audio(`${imgSrc}`);
        sound.currentTime = 0;
        sound.volume = 0.5;
        sound.play();
    }
}


function pauseAllSounds() {
    if (!soundMuted) {
        soundMuted = true;
        changeVolumeBtnImg('img/El_Pollo_Loco_icons/mute.png')
        stopBgMusic('game-bg-sound');
        stopBgMusic('boss-bg-sound');
    } else {
        soundMuted = false;
        changeVolumeBtnImg('img/El_Pollo_Loco_icons/high-volume.png')
    }
    playSound('audio/click_sound.mp3');
}


function changeVolumeBtnImg(imgSrc) {
    let volumeBtn = document.getElementById('volume-btn');
    volumeBtn.src = imgSrc;
}


function playSoundPerId(audioId) {
    let sound = document.getElementById(`${audioId}`);
    sound.currentTime = 0;
    sound.play();
}


function playBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);
    if (isPaused(music) && !soundMuted && !gamePaused) {
        music.volume = 0.5;
        music.play();
        music.loop = true;
    }

}


function stopChickenSound() {
    let chickenSound = document.getElementById('chicken-sound');
    pauseSound(chickenSound);
}


function stopSmallChickenSound() {
    let smallChickenSound = document.getElementById('small-chicken-sound');
    pauseSound(smallChickenSound);
}


function stopBgMusic(audioId) {
    let music = document.getElementById(`${audioId}`);
    pauseSound(music);
}


function pauseSound(sound) { sound.pause() }


function unPauseSound(sound) { sound.pause() }


function isMuted(audelem) { return audelem.muted; }


function isPaused(audelem) { return audelem.paused; }







