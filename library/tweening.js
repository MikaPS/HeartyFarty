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
    fade_out(targets, delay, duration, onCompleteCallback) {
        this.tweens.add({
          targets: targets,
          alpha: 0,
          delay: delay,
          duration: duration,
          ease: 'Quart',
          onComplete: onCompleteCallback
        });
      }
      
    // tween for movement
    move(targets, delay, duration, xCoord, yCoord, onCompleteCallback) {
        this.tweens.add({
            targets: targets,
            x: xCoord,
            y: yCoord,
            delay: delay,
            duration: duration,
            ease: 'Quart',
            onComplete: onCompleteCallback
        });
    }
    sceneTransition(scene, isMusicOn) {
        this.cameras.main.fade(500, 0,0,0);
        this.time.delayedCall(500, () => this.scene.start(scene, {isMusicOn}));
    }

    fullScreen(button) {
        button.setInteractive()
      .on('pointerdown', () => {
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
        } else {
            this.scale.startFullscreen();
        }
      });
    }
}