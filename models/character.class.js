class Character extends MovableObject {
    height = 220;
    width = 105;
    y = 200;
    speed = 10;
    renderLongIdleImages = false;
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

    world;
    walking_sound = new Audio('audio/walking_fast_char.mp3');
    i = 0;
    currentPlaying;
    jump_sounds = [
        new Audio('audio/char_jump/jump_1.mp3'),
        new Audio('audio/char_jump/jump_2.mp3'),
        new Audio('audio/char_jump/jump_3.mp3'),
        new Audio('audio/char_jump/jump_4.mp3'),
    ]
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
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.otherDirection = false;
                //move Right
                this.x += this.speed;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.otherDirection = true;
                //move Left
                this.x -= this.speed;
                this.walking_sound.play();
            }

            console.log('this speedY', this.speedY)
            if (this.world.keyboard.SPACE) {
                this.speedY = 20;
                this.currentPlaying = this.jump_sounds[0];
                this.currentPlaying.play();
                this.i++;
                if (this.i > 3) {
                    this.i = 0;
                }
            }

            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            if (!this.isAboveGround()) {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //Walking animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }

        }, 1000 / 25)

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 1000 / 12)

        setInterval(() => {
            if (this.renderLongIdleImages) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }

        }, 1000 / 4)
    }

    jump() {

    }
}