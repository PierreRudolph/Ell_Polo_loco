class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    X = 120;
    y = 280;
    height = 150;
    width = 100;

    loadImage(path) {
        this.img = totalImageCache[path];
    }


    loadImageCache(arr) {
        arr.forEach((path) => {
            this.imageCache[path] = totalImageCache[path];
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.X, this.y, this.width, this.height);
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