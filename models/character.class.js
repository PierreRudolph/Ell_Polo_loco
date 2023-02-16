class Character extends MovableObject {
    height = 220;
    width = 105;
    y = 205;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
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
        this.animate();
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
            if (this.world.keyboard.SPACE) {
                this.y = + this.speed;

                this.currentPlaying = this.jump_sounds[0];

                this.currentPlaying.play();
                this.i++;
                if (this.i > 3) {
                    this.i = 0;
                }

                setTimeout(() => {
                    this.y = 205;

                }, 200);
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                //Walking animation
                this.playAnimation(this.IMAGES_WALKING);

            }

        }, 1000 / 25)
    }

    jump() {

    }
}