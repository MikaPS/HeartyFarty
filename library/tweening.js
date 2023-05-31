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
}