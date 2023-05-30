
class Introduction extends Phaser.Scene {
  constructor() {
    super('introduction');
    
  }

  preload() {
  }

  create() {
    this.cameras.main.fadeIn(1000);
    // player holding an orb
    this.player = this.add.rectangle(400,400,150,300,0x000000);
    this.orb = this.add.rectangle(500,400,100,100,0xff0000);
    this.orb2 = this.add.rectangle(1200,400,100,50,0xff0000).setAlpha(0);
    this.hole = this.add.rectangle(1300,500,130,90,0x000000).setDepth(-1);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(0);
    this.playerPast = this.add.rectangle(200,400,150,300,0x000000).setAlpha(0);
    this.orb2Past = this.add.rectangle(270,400,50,100,0xff0000).setAlpha(0);
    this.holePast = this.add.rectangle(500,500,130,90,0x000000).setDepth(-1).setAlpha(0);

    this.tweens.add({
      targets: [this.player],
      x: 1000,
      duration: 2500,
      delay: 1000,
      ease: 'Power2',
    });
    this.tweens.add({
      targets: [this.orb],
      x: 1100,
      duration: 2500,
      delay: 1000,
      ease: 'Power2',
  });
  this.tweens.add({
    targets: [this.orb],
    x: 1100,
    width: 50,
    duration: 2000,
    delay: 2500,
    ease: 'Power2',
      
  });
  this.tweens.add({
    targets: [this.orb2],
    x: 1300,
    y: 500,
    alpha: 1,
    duration: 2000,
    delay: 2700,
    ease: 'Power2',
  });

  this.tweens.add({
    targets: [this.orb2],
    alpha: 0,
    duration: 2000,
    delay: 3400,
    ease: 'Power2',
  });
  this.tweens.add({
    targets: [this.line, this.playerPast, this.orb2Past, this.holePast],
    alpha: 1,
    duration: 2000,
    delay: 3900,
    ease: 'Power2',
    onComplete: () => {
      this.cameras.main.fadeOut(2000);
      this.scene.start("ending");
    }
  });

}
 
  update() { }
}



class Ending extends Phaser.Scene {
  constructor() {
    super('ending');
    
  }

  preload() {
  }

  create() {
    this.cameras.main.fadeIn(1000);
    // player holding an orb
    this.player = this.add.rectangle(1000,400,150,300,0x000000);
    this.orb = this.add.rectangle(1070,400,50,100,0xff0000).setAlpha(1);
    // this.hole = this.add.rectangle(1300,500,130,90,0x000000).setDepth(-1);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(1).setDepth(-1);
    this.playerPast = this.add.rectangle(200,400,150,300,0x000000).setAlpha(1);
    this.orbPast = this.add.rectangle(270,400,50,100,0xff0000).setAlpha(1);
    // this.holePast = this.add.rectangle(500,500,130,90,0x000000).setDepth(-1).setAlpha(1);

    this.tweens.add({
      targets: [this.orb],
      x: 820,
      duration: 2500,
      delay: 1000,
      ease: 'Power2',
    });
    this.tweens.add({
      targets: [this.orbPast],
      x: 780,
      duration: 2500,
      delay: 1000,
      ease: 'Power2',
  });
  this.tweens.add({
    targets: [this.player, this.playerPast],
    x: 720,
    duration: 2000,
    delay: 2500,
    ease: 'Power2', 
  }); 

  this.tweens.add({
    targets: [this.line],
    alpha: 0,
    duration: 2000,
    delay: 3400,
    ease: 'Power2',
    onComplete: () => {
      this.cameras.main.fadeOut(2000);
    }
  });
}
 
  update() { }
}

var config = {
  scene: [Introduction, Ending],
  backgroundColor: 0x43D58C,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1600,
      height: 1200
  },
};

var game = new Phaser.Game(config);

