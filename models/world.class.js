class World {
    level = level1;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    statusbarBoss = new StatusbarBoss();
    throwableObjects = [];
    keyboard;
    character = new Character();
    BackgroundObjects = level1.BackgroundObjects;
    currentThrowingObject;
    ctx;
    canvas;
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
        this.statusbarBoss.world = this;
        this.level.enemies.forEach((enemy) => { enemy.world = this });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.BackgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        //---Space for fixed Objects---//
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        //---Space for fixed Objects---//
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.statusbarBoss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);

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
        this.drawCoinPyramid();
        setInterval(() => {
            this.checkIfObjectOutOfWorld();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkThrowingObjCollisions();
        }, 1000 / 60);
    }


    checkThrowObjects() {
        if (this.keyboard.D && !this.currentThrowingObject && !gamePaused /*&& this.character.collected_bottles.length > 0*/) {
            let positionX = this.checkThrowDirection();
            this.generateNewThrowingObject(positionX);
            this.character.collected_bottles.splice(0, 1);
            this.statusbarBottle.setPercentage(this.statusbarBottle.percentage -= 20);
        }
    }


    generateNewThrowingObject(positionX) {
        this.currentThrowingObject = new ThrowableObject(positionX, this.character.y + 90, this.character.otherDirection);
        this.throwableObjects.splice(-1, 0, this.currentThrowingObject);
        setTimeout(() => { this.currentThrowingObject = ''; }, 350);
    }


    checkThrowDirection(positionX) {
        if (this.character.otherDirection) {
            positionX = this.character.X;
        } else {
            positionX = this.character.X + 60;
        }
        return positionX;
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            this.checkCharCollisions(enemy);
            //this.checkThrowingObjCollisions(enemy);
        });
        this.collectBottleIfColliding();
    }


    checkCharCollisions(enemy) {
        if (this.character.isColliding(enemy)) {
            if (this.character.isAboveGround() && enemy instanceof Chicken || this.character.isAboveGround() && enemy instanceof SmallChicken) {
                enemy.kill();
                this.character.jump();
                //this.character.speedY = 0; //optional, sieht dann so aus als ob chicken zerquetscht werden.
                this.character.playJumpSounds();
            } else {
                if (!this.character.isHurt()) {
                    this.character.hit();
                }
            }
        }
    }


    /*checkThrowingObjCollisions(enemy) {
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(obj => {
                if (obj.isColliding(enemy)) {
                    obj.noGravity = true;//throwableObject bekommt noGravity = true, wenn es kollidiert.
                    if (!enemy.isHurt()) {
                        enemy.hit();
                    }
                }
            })
        }
    }*/


    checkThrowingObjCollisions() {
        if (this.throwableObjects.length > 0) {

            for (let i = 0; i < this.level.enemies.length; i++) {
                const enemy = this.level.enemies[i];

                for (let b =
                    0; b < this.throwableObjects.length; b++) {
                    const obj = this.throwableObjects[b];
                    this.checkIfObjectOutOfWorld(obj, b);
                    if (obj.isColliding(enemy)) {
                        obj.noGravity = true;//throwableObject bekommt noGravity = true, wenn es kollidiert.
                        if (!enemy.isHurt()) {
                            enemy.hit();
                        }
                        this.throwableObjects.splice(b, 1);
                        //this.spliceObjFromArray();
                    }
                }
            }
        }
    }


    checkIfObjectOutOfWorld(object, b) {
        if (object) {
            if (object.y > 480) {
                this.throwableObjects.splice(b, 1);
            }
        }
    }


    spliceObjFromArray() {
        setTimeout(() => {
            this.throwableObjects.splice(b, 1);
        }, 200);
    }


    collectBottleIfColliding() {
        for (let i = 0; i < this.level.collectables.length; i++) {
            const collectable = this.level.collectables[i];
            if (this.character.isColliding(collectable) && this.character.collected_bottles.length <= 4) {
                this.pushCollectable(collectable);
                this.level.collectables.splice(i, 1);
            }
        }
    }


    pushCollectable(collectable) {
        if (collectable.name == 'Coin') {
            if (!soundMuted) {
                collectable.collectSound.play();
            }
            this.character.collected_coins.push(collectable);
            this.statusbarCoin.setPercentage(this.statusbarCoin.percentage += 20);
        }
        if (collectable.name == 'Bottle') {
            if (!soundMuted) {
                collectable.collectSound.play();
            }
            this.character.collected_bottles.push(collectable);
            this.statusbarBottle.setPercentage(this.statusbarBottle.percentage += 20);
        }
    }
}