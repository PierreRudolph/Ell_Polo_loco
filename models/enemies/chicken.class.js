class Chicken extends MovableObject {
    height = 70;
    y = 350;
    chicken_sound = new Audio('audio/chicken_normal.mp3');
    chicken_hit_sound = new Audio('audio/chicken_hit.mp3');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.X = 800 + Math.random() * 1400; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 0 und 0.25
        this.animate();
    }


    animate() {
        this.chicken_sound.volume = 0.1;
        this.chicken_hit_sound.volume = 0.1;
        setInterval(() => {
            if (!this.isDead() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING)
                this.playChickenSoundDisplaced();

            } else if (this.isDead()) {
                this.chicken_sound.pause();
                this.loadImage(this.IMAGE_DEAD);
            }
            if (this.isHurt()) {
                this.chicken_hit_sound.play();
            }
        }, 250)

        setInterval(() => {
            if (!this.isDead() && !this.isHurt() && !this.otherDirection) {
                this.moveLeft();
            }
            if (!this.isDead() && !this.isHurt() && this.otherDirection) {
                this.moveRight();
            }
            if (this.X < 100) {
                this.otherDirection = true;
            }
            if (this.X > 2200) {
                this.otherDirection = false;
            }
        }, 1000 / 60);
    }
    playChickenSoundDisplaced() {
        this.chicken_sound.start = 0.01 + Math.random() * 0.07;
        this.chicken_sound.play();
    }
}