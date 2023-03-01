class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 300;


    IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];


    constructor(i) {
        super();//.loadImages(this.IMAGES);
        if (i == 0) {
            this.loadImage('img/5_background/layers/4_clouds/1.png');
            this.X = 100 + Math.random() * 600;
            // Zahl zwischen 1steNum und 800 (1steNum(300) + 2teNum(500)=800);
        }
        if (i == 1) {
            this.loadImage('img/5_background/layers/4_clouds/2.png');
            this.X = 600 + Math.random() * 1500;
        }
        this.animate();
    }


    animate() {
        let movingInterval = setInterval(() => { this.moveLeft(); }, 1000 / 25);
        intervalIds.push(movingInterval);
    }
}