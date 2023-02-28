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
    alertImageIndex = 0;
    world;

    offset = {
        right: 150,
        left: 80,
        top: 120,
        bottom: 150
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
        setInterval(() => {
            this.playRightAnimations();
        }, 250)

        setInterval(() => {
            this.moveLeftOrRight();
        }, 1000 / 60);
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

    endbossJumpAnimation() {
        if (this.imageIndex == 4) {
            this.attack = true;
            this.speed = 2;
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
        if (this.inBattle) {
            if (this.world.character.X > this.X + this.width) {
                this.otherDirection = true;
            } else if (this.world.character.X + this.world.character.width < this.X) {
                this.otherDirection = false;
            }
        } else {
            this.setOtherDirection(1700, 2590);
        }
    }

    attackIfAlertAnimationDone() {
        if (this.alertImageIndex > 14) {
            this.alert = false;
            this.resetOtherDirection();
            this.attackIfNearChar();
            this.resetAttackValues();
        }
    }

    attackIfNearChar() {
        if (this.X <= (this.world.character.X + this.world.character.width + 40)) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.endbossJumpAnimation();
        }
    }

    resetAttackValues() {
        this.speed = 1;
        this.attack = false;
    }

    resetOtherDirection() {
        if (this.otherDirection && !this.world.character.X > this.X + this.width) {
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