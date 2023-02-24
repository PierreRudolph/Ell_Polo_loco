class Bottle extends MovableObject {
    name = 'Bottle';
    height = 80;
    width = 60;
    y = 350;
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
        this.loadImages(this.IMAGES);
        this.X = 200 + Math.random() * 1000;

    }


}