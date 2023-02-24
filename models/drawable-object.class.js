class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    X = 120;
    y = 280;
    height = 150;
    width = 100;
    offset = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    }

    //loadiMage('img/test.png);
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.X, this.y, this.width, this.height);
    }

    /**
     * @param {Array} arr - ['img/image1.png','img/image2.png'...] 
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawHitbox(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken ||
            this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject ||
            this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.X + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }
}