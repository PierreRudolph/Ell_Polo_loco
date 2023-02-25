class Coin extends MovableObject {
    name = 'Coin';
    height = 120;
    y = 290;


    offset = {
        right: 40,
        left: 20,
        top: 30,
        bottom: 60
    }


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor(X, y) {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        if (!X && !y) {
            this.X = 200 + Math.random() * 500;
        } else {
            this.X = X,
                this.y = y;
        }
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 250)
    }
}