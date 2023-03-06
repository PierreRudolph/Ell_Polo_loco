class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    gainSpeedY = 20;
    speedY = 0;
    acceleration = 2.5;
    health = 100;
    lastHit = 0;
    imageIndex = 0;
    inBattle = false;
    noGravity = false;


    applyGravity(noGravity) {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (!noGravity) { //objCollided, damit throwableObject nicht mehr fällt, falls es mit einem gegner Kollidiert.
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                    if (this instanceof Character && this.y > 200) {// behelfs methode, um die y position zu reseten, falls y größer als 200 ist.
                        this.y = 200;
                    }
                } else {
                    this.speedY = 0;
                }
            }
        }, 1000 / 30);
        pushIntervalId(gravityInterval);
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
        this.imageIndex = this.currentImage % images.length;//iteriert durch Array,(% ist eine undendliche schleife)
        let path = images[this.imageIndex];
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


    moveRight() {
        this.X += this.speed;
    }


    moveLeft() {
        this.X -= this.speed;
    }


    jump() {
        this.speedY = 25;
    }


    throw() {
        this.X += this.speed;
    }


    hit() {
        this.health -= 20;

        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    kill() {
        this.health = 0;
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


    setOtherDirection(startX, endX) {
        if (this.X < startX && !this.inBattle) {
            this.otherDirection = true;
        }
        if (this.X > endX) {
            this.otherDirection = false;
        }
    }


    isColliding(obj) {
        if (!obj.health <= 0) {
            return (this.X + this.width) - this.offset.right >= (obj.X + obj.offset.left) &&
                (this.X + this.offset.left) <= (obj.X + obj.width) - obj.offset.right &&
                (this.y + this.height) - this.offset.bottom >= (obj.y - obj.offset.top) &&
                (this.y + this.offset.top) <= (obj.y + obj.height) - obj.offset.bottom;
        }
    }
}
