class Bottle extends MovableObject {
    name = 'Bottle';
    height = 80;
    width = 60;
    y = 350;
    collectSound = new Audio('audio/collect_bottle.mp3');

    offset = {
        right: 20,
        left: 20,
        top: 10,
        bottom: 10
    }

    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImageCache(this.IMAGES);
        this.X = 200 + Math.random() * 2000;
        this.collectSound.volume = 1;
    }
}