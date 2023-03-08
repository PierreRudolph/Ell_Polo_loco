class Level {
    enemies;
    clouds;
    BackgroundObjects;
    collectables;
    level_end_x = 2360;

    constructor(enemies, clouds, BackgroundObjects, collectables) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgroundObjects = BackgroundObjects;
        this.collectables = collectables;
    }
}