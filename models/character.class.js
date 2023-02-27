class Character extends MovableObject {
    height = 220;
    width = 105;
    y = 200;
    X = 200;
    speed = 5;
    renderLongIdleImages = false;
    world;
    walking_sound = new Audio('audio/walking_fast_char.mp3');
    collected_bottles = [];
    collected_coins = [];
    currentPlaying;
    jumpSoundPathId = 0;

    offset = {
        right: 40,
        left: 20,
        top: 80,
        bottom: 0
    }

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    jump_sounds = [
        'audio/char_jump/jump_1.mp3',
        'audio/char_jump/jump_2.mp3',
        'audio/char_jump/jump_3.mp3',
        'audio/char_jump/jump_4.mp3',
        'audio/char_jump/jump_5.mp3',
        'audio/char_jump/jump_6.mp3',
        'audio/char_jump/jump_7.mp3',
        'audio/char_jump/jump_8.mp3',
        'audio/char_jump/jump_9.mp3',
        'audio/char_jump/jump_10.mp3'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.ifKeyboardRight();
            this.ifKeyboardLeft();
            this.ifKeyboardSpace();

        }, 1000 / 60);


        setInterval(() => {
            this.animationIfIsDead();
            this.animationIfIsHurt();
            this.animationIfWalking();
        }, 1000 / 60)

        setInterval(() => {
            this.animationIfJumping();

        }, 1000 / 12)

        setInterval(() => {
            this.animationLongIdleOrIdle();
        }, 225)
    }


    ifKeyboardRight() {
        if (this.world.keyboard.RIGHT && this.X < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playCharWalkingSound();
            this.world.camera_x = -this.X + 200;
        }
    }


    ifKeyboardLeft() {
        if (this.world.keyboard.LEFT && this.X > -100) {
            this.moveLeft();
            this.otherDirection = true;
            this.playCharWalkingSound();
            this.world.camera_x = -this.X + 200;
        }
    }


    ifKeyboardSpace() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.playJumpSounds();
        }
    }


    animationIfIsDead() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        }
    }


    animationIfIsHurt() {
        if (this.isHurt()) {
            this.speed = 5;
            this.world.statusbarHealth.setPercentage(this.health);
            this.playAnimation(this.IMAGES_HURT);
        }
    }


    animationIfWalking() {
        if (!this.isAboveGround()) {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.speed = 10;
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }


    animationIfJumping() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }


    animationLongIdleOrIdle() {
        if (this.renderLongIdleImages) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    playCharWalkingSound() {
        this.walking_sound.play();
    }


    playJumpSounds() {
        if (this.currentPlaying) {
            if (!this.currentPlaying.ended) {//set Time to be sure Audio is ended, before play next jumpSound
                this.currentPlaying.currentTime = 10.000;
            }
            this.playJumpSound();
        } else {
            this.playJumpSound();
        }
    }


    playJumpSound() {
        this.currentPlaying = new Audio(this.jump_sounds[this.jumpSoundPathId]);
        this.currentPlaying.play();
        this.setJumpSoundPathId();
    }


    setJumpSoundPathId() {
        this.jumpSoundPathId++;
        if (this.jumpSoundPathId >= this.jump_sounds.length) {
            this.jumpSoundPathId = 0;
        }
    }
}

