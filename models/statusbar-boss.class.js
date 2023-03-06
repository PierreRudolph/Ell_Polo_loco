class StatusbarBoss extends DrawableObject {
    percentage = 100;
    world;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.X = 600;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPosition();
    }


    setPosition() {
        setInterval(() => { this.X = this.world.level.enemies[5].X + 100 }, 1000 / 60);

    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}