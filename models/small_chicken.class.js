class SmallChicken extends MovableObject {
    height = 90;
    y = 340;
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

            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 1, Rest 1
            // let i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            if (this.chicken_sound.play() == false) {
                this.chicken_sound.play();
            }
            this.currentImage++;
        }, 250)


    }
}