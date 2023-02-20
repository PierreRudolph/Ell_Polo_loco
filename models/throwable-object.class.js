class ThrowableObject extends MovableObject {
    speedY


    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.X = 100;
        this.y = 100;
        this.height = 60;
        this.width = 50;
        this.throw(100, 150);
    }

    throw(X, y) {
        this.X = X;
        this.y = y;
        this.offsetY = 30
        this.applyGravity();
        setInterval(() => {

            if (this.isAboveGround()) {
                this.X += 10;
            }
        }, 25);
    }
}