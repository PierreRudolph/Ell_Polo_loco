class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imgSrc, x) {
        super().loadImage(imgSrc);
        this.x = x;
        this.y = 480 - this.height;
    }
}