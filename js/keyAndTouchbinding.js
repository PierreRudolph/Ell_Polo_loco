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