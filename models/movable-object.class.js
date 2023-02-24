class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    gainSpeedY = 20;
    offsetY = -8;
    acceleration = 2.5;
    health = 100;
    lastHit = 0;
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    }

    applyGravity(objCollided) {
        setInterval(() => {
            if (this.isAboveGround() || this.offsetY > 0) {
                if (!objCollided) {
                    this.y -= this.offsetY;
                    this.offsetY -= this.acceleration;
                } else {
                    this.offsetY = 0;
                }
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {//throwable object should always fall
            return true;
        } else if (this instanceof Character) {
            return this.y < 200;
        } else if (this instanceof Endboss) {
            return this.y < 20;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 % 6; => 1, Rest 1
        // let i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
        let path = images[i];
        this.playImgAudioSyncEndbossScream(images, i);
        this.jumpOnJumpImg(images, i);

        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playAnimationOnce(images) {
        for (let i = 0; i < images.length; i++) {

            const path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    jumpOnJumpImg(images, i) {
        if (images == this.IMAGES_ATTACK && i == 4) {
            this.jump();
            //this.moveLeft();

        }
    }

    playImgAudioSyncEndbossScream(images, i) {
        if (images == this.IMAGES_ALERT && i == 6) {
            this.chicken_alert_sound.play();
        }
    }

    moveRight() {
        this.X += this.speed;
    }

    moveLeft() {
        this.X -= this.speed;
    }

    jump() {
        this.offsetY = 25;
    }

    throw() {
        this.X += this.speed;
    }

    setCoinBar() {
        this.status
    }

    hit() {
        this.health -= 20;

        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;//Difference in ms
        timepassed = timepassed / 1000; //ms geteilt durch Tausend, ergibt s.
        return timepassed < 0.5;
    }

    isDead() {
        return this.health == 0;

    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        if (!obj.health <= 0) {
            return (this.X + this.width - this.offset.right) > obj.X + obj.offset.left &&
                this.X + this.offset.left < (obj.X + obj.width - obj.offset.right) &&
                (this.y + this.height - this.offset.bottom) > obj.y + obj.offset.top &&
                (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom)
        }
    }
    //&&
    //obj.onCollisionCourse;
}// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
        //Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.