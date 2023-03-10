function showInfoScreen() {
    let infoScreen = document.getElementById('info-screen');
    infoScreen.classList.remove('d-none');
    playSound('audio/click_sound.mp3');
}


function hideInfoScreen() {
    let infoScreen = document.getElementById('info-screen');
    infoScreen.classList.add('d-none');
    playSound('audio/click_sound.mp3');
}


function showKeyBindScreen() {
    let keybindingsScreen = document.getElementById('keybindings-screen');
    keybindingsScreen.classList.remove('d-none');
    playSound('audio/click_sound.mp3');
}


function hideKeyBindScreen() {
    let keybindingsScreen = document.getElementById('keybindings-screen');
    keybindingsScreen.classList.add('d-none');
    playSound('audio/click_sound.mp3');
}


function showFullscreenBtn() {
    let fullscreenBtn = document.getElementById('fullscreen-icon');
    fullscreenBtn.classList.remove('d-none');
}


function hideFullscreenBtn() {
    let fullscreenBtn = document.getElementById('fullscreen-icon');
    fullscreenBtn.classList.add('d-none');
}


function showYouLoseScreen() {
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
    let startScreen = document.getElementById('start-screen-div');
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