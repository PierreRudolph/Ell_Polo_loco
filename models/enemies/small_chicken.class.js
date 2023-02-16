class SmallChicken extends MovableObject {
    height = 50;
    width = 40;
    y = 380;
    chicken_sound = new Audio('audio/chicken_small.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 0 und 0.25
        this.animate();

    }

    animate() {
        this.chicken_sound.volume = 0.5;
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);

            if (this.chicken_sound.play() == false) {
                this.chicken_sound.play();
            }

        }, 250)


    }
}