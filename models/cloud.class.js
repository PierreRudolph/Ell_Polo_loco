class Cloud extends MovableObject {
    y = 20;
    width = 400;
    height = 300;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = 400 + Math.random() * 500; // Zahl zwischen 200 und 700;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60)
    }
}