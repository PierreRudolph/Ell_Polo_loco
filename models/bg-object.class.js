class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    constructor(imgSrc, X) {
        super().loadImage(imgSrc);
        this.X = X;
        this.y = 480 - this.height;
    }
}