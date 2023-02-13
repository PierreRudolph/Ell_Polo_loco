let canvas;
let ctx;
let world;


function init() {
    canvas = document.getElementById('canvas');
    setCanvasXandY(canvas);
    world = new World(canvas);

    console.log('My Character is', world.character);
}

function setCanvasXandY(canvas) {
    canvas.style.width = '80%'
}