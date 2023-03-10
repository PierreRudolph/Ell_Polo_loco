class ThrowableObject extends MovableObject {
    speed = 15;

    offset = {
        right: 10,
        left: 10,
        top: 10,
        bottom: 10
    };


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
        this.loadImageCache(this.IMAGES_ROTATION);
        this.loadImageCache(this.IMAGES_SPLASH);
        this.X = X;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(otherDirection);
    }


    throw(otherDirection) {
        this.applyGravity();
        this.speedY = 20;
        if (!soundMuted) {
            playSoundPerId('woosh-sound');

            let throwInterval = setInterval(() => {
                if (!this.noGravity) {

                    this.playAnimation(this.IMAGES_ROTATION);
                    this.setObjectThrowingDirection(otherDirection);
                } else {
                    this.applyGravity(this.noGravity);
                    setInterval(() => { this.playAnimation(this.IMAGES_SPLASH); }, 50);
                    clearInterval(throwInterval);
                    if (!soundMuted) {
                        playSoundPerId('splash-sound');
                    }
                }
            }, 25);
            pushIntervalId(throwInterval);
        }
    }

    setObjectThrowingDirection(otherDirection) {
        if (otherDirection) {
            this.X -= this.speed;
        } else {
            this.X += this.speed;
        }
    }
}