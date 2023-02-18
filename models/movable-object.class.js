class MovableObject {
    X = 120;
    y;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    gainSpeedY = 20;
    offsetY = 0;
    acceleration = 2.5;
    health = 100;
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.offsetY > 0) {
                this.y -= this.offsetY;
                this.offsetY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 200;
    }

    //loadiMage('img/test.png);
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png','img/image2.png'...] 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.X, this.y, this.width, this.height);
    }

    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "blue";
            ctx.rect(this.X, this.y, this.width, this.height);
            ctx.stroke();
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

    isDead(obj) {
        setInterval(() => {
            if (obj.health <= 0 && obj.health > -20) {
                this.isDeadAnimation(obj);
                console.log('isDEAD')
            }
        }, 1000 / 200)
    }

    isDeadAnimation(obj) {
        setInterval(() => {
            this.playAnimation(obj.IMAGES_DEAD);
        }, 1000 / 12)
    }

    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        if (!obj.health <= 0) {
            return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
                (this.y + this.offsetY + this.height) >= obj.y &&
                (this.y + this.offsetY) <= (obj.y + obj.height)
        }
        //&&
        //obj.onCollisionCourse;
    }
}// Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
        //Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.