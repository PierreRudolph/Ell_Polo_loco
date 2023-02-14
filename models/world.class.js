class World {
    character = new Character();
    level = level1;

    BackgroundObjects = level1.BackgroundObjects;

    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(model) {
        if (model.otherDirection) {
            this.ctx.save();
            this.ctx.translate(model.width, 0);
            this.ctx.scale(-1, 1);
            model.x = model.x * -1;
        }
        this.ctx.drawImage(model.img, model.x, model.y, model.width, model.height);
        if (model.otherDirection) {
            model.x = model.x * -1;
            this.ctx.restore();
        }
    }

}