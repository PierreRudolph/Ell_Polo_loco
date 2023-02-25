class Endboss extends MovableObject {
    width = 400;
    height = 450;
    y = 20;
    speedY = 0;
    alert = false;
    chicken_hit_sound = new Audio('audio/boss_chicken_hit.mp3');
    chicken_alert_sound = new Audio('audio/boss_chicken_alert.mp3');
    offset = {
        right: 40,
        left: 30,
        top: 70,
        bottom: 100
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
        let imageIndex = 0;
        setInterval(() => {
            this.playRightAnimations(imageIndex);
        }, 250)

        setInterval(() => {
            this.moveLeftOrRight();
        }, 1000 / 60);
    }


    playRightAnimations(imageIndex) {
        if (!this.isDead() && !this.isHurt() && !this.alert) {
            this.playAnimation(this.IMAGES_WALKING)
        } else {
            imageIndex = this.ifAlert(imageIndex);
        }
        this.ifAlertAnimationDone(imageIndex);
        this.IfIsHurt();
        this.ifIsDead();
    }


    moveLeftOrRight() {
        if (!this.isDead() && !this.alert && this.X > 2000) {
            this.otherDirection = false;
            this.moveLeft();
        } else if (this.X > 2600 && !this.isDead() && !this.alert) {
            this.otherDirection = true;
            this.moveRight();
        }
    }


    ifAlert(imageIndex) {
        if (this.alert && imageIndex <= 10) {
            this.playAnimation(this.IMAGES_ALERT);
            stopBgMusic('game-bg-sound');
            playBgMusic('boss-bg-sound');
            imageIndex++;
        }
        return imageIndex;
    }


    ifAlertAnimationDone(imageIndex) {
        if (imageIndex > 10) {
            this.alert = false;
            this.playAnimation(this.IMAGES_ATTACK);
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