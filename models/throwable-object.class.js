class ThrowableObject extends MovableObject {
    speed = 15;
    colliding = false;
    splashSound = new Audio('audio/glass_smash.mp3');
    throwSound = new Audio('audio/woosh.mp3');
    throwInterval;
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(X, y, otherDirection) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.X = X;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(otherDirection);
    }


    throw(otherDirection) {
        this.applyGravity();
        this.throwSound.volume = 0.5;
        this.splashSound.volume = 0.5;
        this.throwSound.play();
        this.throwInterval = setInterval(() => {
            if (!this.colliding) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.setObjectThrowingDirection(otherDirection);
            } else {
                this.applyGravity(this.colliding);
                this.correctLandingPoint(otherDirection);
                setInterval(() => { this.playAnimation(this.IMAGES_SPLASH); }, 10);
                this.splashSound.play();
                clearInterval(this.throwInterval);
            }
        }, 25);
    }

    setObjectThrowingDirection(otherDirection) {
        if (otherDirection) {
            this.X -= this.speed;
        } else {
            this.X += this.speed;
        }
    }

    correctLandingPoint(otherDirection) {
        this.y += 20;
        if (otherDirection) {
            this.X -= 20;
        } else {
            this.X += 20;
        }
    }
}