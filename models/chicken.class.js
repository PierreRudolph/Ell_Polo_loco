class Chicken extends MovableObject {
    height = 90;
    y = 340;
    squeek_sound = new Audio('audio/squeek_toy.mp3');
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 0 und 0.25
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            if (world.keyboard.ACTIVE == false) {
                this.squeek_sound.pause();
            }

            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 1, Rest 1
            // let i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            if (world.keyboard.ACTIVE == true) {
                this.squeek_sound.play();
            }

            this.currentImage++;
        }, 250)

    }
}