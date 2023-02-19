class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    X = 120;
    y = 280;
    height = 150;
    width = 100;


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
}