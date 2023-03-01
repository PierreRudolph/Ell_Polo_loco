class Endboss extends MovableObject {
    width = 400;
    height = 450;
    y = 20;
    speedY = 0;
    speed = 0.50;
    alert = false;
    attack = false
    chicken_hit_sound = new Audio('audio/boss_chicken_hit.mp3');
    chicken_alert_sound = new Audio('audio/boss_chicken_alert.mp3');
    chicken_attack_sound = new Audio('audio/woosh.mp3');

    alertImageIndex = 0;
    world;

    offset = {
        right: 150,
        left: 80,
        top: 120,
        bottom: 220
    }

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];


    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.X = 2600;
        this.animate();
        this.applyGravity();
    }


    animate() {
        let animationInterval = setInterval(() => {
            this.playRightAnimations();
        }, 250)

        let movingInterval = setInterval(() => {
            this.moveLeftOrRight();
            if (this.inBattle) {
                this.world.statusbarBoss.setPercentage(this.health);
            }
        }, 1000 / 60);
        intervalIds.push(animationInterval);
        intervalIds.push(movingInterval);
    }


    playRightAnimations() {
        this.walkIfNothingElse();
        this.ifAlert();
        this.attackIfAlertAnimationDone();
        this.IfIsHurt();
        this.ifIsDead();
    }


    walkIfNothingElse() {
        if (!this.isDead() && !this.isHurt() && !this.alert) {
            this.playAnimation(this.IMAGES_WALKING)
        }
    }


    ifAlert() {
        if (this.alert) {
            this.playAnimation(this.IMAGES_ALERT);
            this.endbossScreamAnimation();
            stopBgMusic('game-bg-sound');
            playBgMusic('boss-bg-sound');
            this.alertImageIndex++;
        }
    }


    attackIfNearChar() {
        this.offset.bottom = 0;
        if (!this.otherDirection && this.X <= (this.world.character.X + this.world.character.width + 80) && !this.isDead()) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossJumpAnimation();
        } else if (this.otherDirection && ((this.X + this.width) - this.offset.right) >= (this.world.character.X - 80) && !this.isDead()) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossJumpAnimation();
        }
    }


    endbossJumpAnimation() {
        if (this.imageIndex == 4 || this.imageIndex == 3) {
            this.chicken_attack_sound.play();
            this.attack = true;
            this.jump();
        }
    }


    endbossScreamAnimation() {
        if (this.imageIndex == 6) {
            this.chicken_alert_sound.play();
        }
    }


    moveLeftOrRight() {
        if (!this.isDead() && !this.isHurt() && !this.otherDirection && !this.alert && !this.attack) {
            this.moveLeft();
        } else if (!this.isDead() && !this.isHurt() && this.otherDirection && !this.alert && !this.attack) {
            this.moveRight();
        }
        if (this.inBattle && !this.isDead()) {
            this.huntCharacter();
            this.setOffsetBottomIfThrowingObject();
        } else {
            this.setOtherDirection(1700, 2590);
        }
    }


    setOffsetBottomIfThrowingObject() {
        if (this.world.throwableObjects.length > 0) {
            this.offset.bottom = 220;
        }
    }


    attackIfAlertAnimationDone() {
        if (this.alertImageIndex > 14) {
            this.alert = false;
            this.attackIfNearChar();
            this.speed = 2;
            this.attack = false;
        }
    }


    huntCharacter() {
        if (this.world.character.X > this.X + this.width) {
            this.otherDirection = true;
        } else if (this.world.character.X + this.world.character.width < this.X) {
            this.otherDirection = false;
        }
    }


    ifIsDead() {
        if (this.isDead()) {
            this.playAnimationOnce(this.IMAGES_DEAD);
            stopBgMusic('boss-bg-sound');
        }
    }


    IfIsHurt() {
        if (this.isHurt()) {
            if (!this.alert) {
                this.inBattle = true;
                this.alert = true;
                this.playIsHurtSound();
            }
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    playFullAnimation() {
        let i = 0;
    }


    playIsHurtSound() {
        this.chicken_alert_sound.play();
    }


    playAlertSound() {
        this.chicken_alert_sound.play();
    }
}