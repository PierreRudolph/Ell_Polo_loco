class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
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
        this.setWorld();
        this.draw();
        this.run();
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

        this.ctx.translate(-this.camera_x, 0);
        //---Space for fixed Objects---//
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        //this.addToMap(this.throwableObjects);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);

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
            this.flipImage(model);
        }
        model.draw(this.ctx);
        model.drawHitbox(this.ctx);
        if (model.otherDirection) {
            this.flipImageBack(model);
        }
    }

    flipImage(model) {
        this.ctx.save();
        this.ctx.translate(model.width, 0);
        this.ctx.scale(-1, 1);
        model.X = model.X * -1;
    }

    flipImageBack(model) {
        model.X = model.X * -1;
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 500);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.X + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.checkCollisions(bottle);
        }
    }

    checkCollisions(bottle) {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                console.log(this.character.health);
            }
            if (bottle) {
                if (bottle.isColliding(enemy)) {
                    enemy.health -= 100;
                }
            }
        });

        this.level.collectables.forEach(collectable => {
            if (this.character.isColliding(collectable)) {
                this.character.collected_coins.push(collectable);
                this.level.collectables.splice(0, 1);
                this.statusbarCoin.setPercentage(this.statusbarCoin.percentage += 20)
            }
        })
    }
}