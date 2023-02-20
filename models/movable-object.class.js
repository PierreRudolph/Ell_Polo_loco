class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    gainSpeedY = 20;
    offsetY = 0;
    acceleration = 2.5;
    health = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.offsetY > 0) {
                this.y -= this.offsetY;
                this.offsetY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {//throwable object should always fall
            return true;
        } else {
            return this.y < 200;

        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 % 6; => 1, Rest 1
        // let i = 0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
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
        timepassed = timepassed / 1000; //ms geteilt durch Tausen, ergibt s.
        return timepassed < 1;
    }

    isDead() {
        return this.health == 0;

    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        if (!obj.health <= 0) {
            return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height)
        }
    }
    //&&
    //obj.onCollisionCourse;
}// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
        //Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.