class ThrowableObject extends MovableObject {
    speed = 10;
    colliding = false;
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
        this.offsetY = 10;
        this.applyGravity();

        setInterval(() => {
            if (this.isAboveGround() && !this.colliding) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.setObjectThrowingDirection(otherDirection);
            }
            if (this.colliding) {
                this.applyGravity(this.colliding);
                this.playAnimationOnce(this.IMAGES_SPLASH);
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

    throwOtherDirection() {
        this.offsetY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATION);
                this.X += 10;
            }
        }, 25);
    }
}