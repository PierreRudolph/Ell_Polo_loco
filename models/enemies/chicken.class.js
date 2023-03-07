class Chicken extends MovableObject {
    height = 70;
    width = 100;
    y = 345;

    offset = {
        right: 25,
        left: 15,
        top: 15,
        bottom: 35
    }

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
        this.loadImageCache(this.IMAGES_WALKING);
        this.X = 800 + Math.random() * 1400; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.35; // Zahl zwischen 0 und 0.25
        this.animate();
        this.chicken_sound.volume = 0.1;
        this.chicken_hit_sound.volume = 0.4;

    }


    pauseAudioIfGameOver() {
        this.chicken_sound.pause();
    }


    animate() {
        this.playChickenSoundDisplaced();
        let animationInterval = setInterval(() => {
            this.animationIfIdle();
            this.animationIfIsHurt();
            this.animationIfIsDead();
        }, 250);

        let movingInterval = setInterval(() => {
            this.moveLeftIfTrue();
            this.moveRightIfTrue();
            this.setOtherDirection(100, 2200);
        }, 1000 / 60);
        setInterval(() => {
            this.checkIfSoundMuted();
        }, 1000 / 30);
        pushIntervalId(animationInterval);
        pushIntervalId(movingInterval);
    }


    animationIfIdle() {
        if (!this.isDead() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_WALKING);

        }
    }


    animationIfIsHurt() {
        if (this.isHurt() && !soundMuted) {
            this.chicken_hit_sound.play();
        }
    }


    animationIfIsDead() {
        if (this.isDead()) {
            this.chicken_sound.pause();
            this.loadImage(this.IMAGE_DEAD);
        }
    }


    moveLeftIfTrue() {
        if (!this.isDead() && !this.isHurt() && !this.otherDirection) {
            this.moveLeft();
        }
    }


    moveRightIfTrue() {
        if (!this.isDead() && !this.isHurt() && this.otherDirection) {
            this.moveRight();
        }
    }


    playChickenSoundDisplaced() {
        if (this.chicken_sound && !soundMuted) {
            //this.chicken_sound.start = 0.01 + Math.random() * 0.07;
            this.chicken_sound.play();
        }
    }


    checkIfSoundMuted() {
        if (soundMuted || gamePaused) {
            this.chicken_sound.pause();
        }
    }
}