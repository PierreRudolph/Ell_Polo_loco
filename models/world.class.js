class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];
    level = level1;
    BackgroundObjects = level1.BackgroundObjects;
    currentThrowingObject;

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
        //model.drawHitbox(this.ctx);
        if (model.otherDirection) {
            this.flipImageBack(model);
        }
    }

    //draws
    drawCoinPyramid() {
        let X = 250;
        let y = 290;
        for (let i = 0; i < 2; i++) {
            const coin = this.level.collectables[i];
            coin.X = X;
            coin.y = y;
            X += 80;
            y -= 40;
        }
        this.level.collectables[2].X = X;
        this.level.collectables[2].y = y;
        X += 80;
        y += 40;
        for (let i = 3; i < 5; i++) {
            const coin = this.level.collectables[i];
            coin.X = X;
            coin.y = y;
            X += 80;
            y += 40;
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
        }, 225);
        this.drawCoinPyramid();
    }

    checkThrowObjects() {
        if (this.keyboard.D /*&& this.character.collected_bottles.length > 0*/) {
            let positionX;
            if (this.character.otherDirection) {
                positionX = this.character.X;
            } else {
                positionX = this.character.X + 60;
            }
            this.currentThrowingObject = new ThrowableObject(positionX, this.character.y + 90, this.character.otherDirection);
            this.throwableObjects.push(this.currentThrowingObject);

            this.character.collected_bottles.splice(0, 1);
            this.statusbarBottle.setPercentage(this.statusbarBottle.percentage -= 20);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
            }

            if (this.throwableObjects.length > 0) {
                this.throwableObjects.forEach(obj => {
                    if (obj.isColliding(enemy)) {
                        obj.colliding = true;
                    }
                })
            }

            /*if (this.throwableObjects.length > 0) {
                if (this.throwableObjects.isColliding(enemy)) {
                    //this.throwableObjects.splice(0, 1);
                    //enemy.hit();
                    //bottle.playAnimation();
                    console.log('bottle is coliding enemy');
                }
            }*/
        });



        this.collectBottleIfColliding();

        //for each function, für collectBottle, ?wie bekommt man indexId in for each funciton
        /*this.level.collectables.forEach(collectable => {
            if (this.character.isColliding(collectable)) {
                this.character.collected_coins.push(collectable);
                this.level.collectables.splice(this.i, 1);
                this.statusbarCoin.setPercentage(this.statusbarCoin.percentage += 20)
            }
        })*/
    }

    collectBottleIfColliding() {
        for (let i = 0; i < this.level.collectables.length; i++) {
            const collectable = this.level.collectables[i];
            if (this.character.isColliding(collectable)) {
                this.pushCollectable(collectable);
                this.level.collectables.splice(i, 1);
            }
        }
    }

    pushCollectable(collectable) {
        if (collectable.name == 'Coin') {
            this.character.collected_coins.push(collectable);
            this.statusbarCoin.setPercentage(this.statusbarCoin.percentage += 20);
        }
        if (collectable.name == 'Bottle') {
            this.character.collected_bottles.push(collectable);
            this.statusbarBottle.setPercentage(this.statusbarBottle.percentage += 20);
        }
    }
}