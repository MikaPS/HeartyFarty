class TweenScene extends Phaser.Scene {

    constructor(key, name) {
        super(key);
        this.name = name;
    }
    // tween animation for fading in
    fade_in(targets, delay, duration) {
        this.tweens.add({
            targets: targets,
            alpha: 1,
            delay: delay,
            duration: duration,
            ease: 'Quart'
        });
    }
    // fade out
    fade_out(targets, delay, duration) {
        this.tweens.add({
            targets: targets,
            alpha: 0,
            delay: delay,
            duration: duration,
            ease: 'Quart'
        });
    }
    // tween for movement
    move(targets, delay, duration, xCoord, yCoord) {
        this.tweens.add({
            targets: targets,
            x: xCoord,
            y: yCoord,
            delay: delay,
            duration: duration,
            ease: 'Quart'
        });
    }
}