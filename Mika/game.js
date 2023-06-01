
class Introduction extends Phaser.Scene {
  constructor() {
    super('introduction');
    
  }

  preload() {
    this.load.image('orb', 'assets/Crackedorb.png');
    this.load.image('leftorb', 'assets/Leftorb.png');
    this.load.image('rightorb', 'assets/Rightorb.png');
    this.load.image('forest', 'assets/forest_path.png');

  }

  create() {
    this.cameras.main.fadeIn(1000);
    // background
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setAlpha(0).setDepth(-1);
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setAlpha(0).setDepth(-1);

    // player holding an orb
    this.player = this.add.rectangle(400,400,150,300,0x000000);
    this.orb = this.add.image(500,400, 'orb').setScale(0.1); // cracked orb
    this.orbLeft = this.add.image(1200,400, 'leftorb').setScale(0.1).setAlpha(0); // left side
    this.orbRight = this.add.image(1070,400, 'rightorb').setScale(0.1).setAlpha(0); // right side
    this.hole = this.add.rectangle(1300,500,130,90,0x000000).setDepth(-1);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(0); // dividor
    this.playerPast = this.add.rectangle(200,400,150,300,0x000000).setAlpha(0);
    this.orbLeftPast = this.add.image(270,400, 'leftorb').setScale(0.1).setAlpha(0);
    this.holePast = this.add.rectangle(500,500,130,90,0x000000).setDepth(-1).setAlpha(0);
    
    // Player and orb move from left side of the screen to the right side
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
  // Make the cracked orb disappear, and show the two sides of it
  this.tweens.add({
    targets: [this.orb],
    x: 1100,
    alpha: 0,
    duration: 2000,
    delay: 2500,
    ease: 'Power2',   
  });
  this.tweens.add({
    targets: [this.orbLeft],
    x: 1300,
    y: 500,
    alpha: 1,
    duration: 2000,
    delay: 2700,
    ease: 'Power2',
  });
  this.tweens.add({
    targets: [this.orbRight],
    alpha: 1,
    duration: 2000,
    delay: 2700,
    ease: 'Power2',
  });
  // In the split, change the background and add the left character
  this.tweens.add({
    targets: [this.orbLeft, this.bg],
    alpha: 0,
    duration: 2000,
    delay: 3400,
    ease: 'Power2',
  });
  this.tweens.add({
    targets: [this.line, this.playerPast, this.orbLeftPast, this.holePast, this.leftBg, this.rightBg],
    alpha: 1,
    duration: 2000,
    delay: 3500,
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
    this.load.image('orb', 'assets/Crackedorb.png');
    this.load.image('leftorb', 'assets/Leftorb.png');
    this.load.image('rightorb', 'assets/Rightorb.png');
    this.load.image('forest', 'assets/forest_path.png');
  }

  create() {
    // fade in
    this.cameras.main.fadeIn(1000);
    // forest background
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setAlpha(0).setDepth(-1);
    this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1);

    // player holding an orb
    this.player = this.add.rectangle(1000,400,150,300,0x000000);
    this.orb = this.add.image(1070,400, 'rightorb').setScale(0.1);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(1).setDepth(-1);
    this.playerPast = this.add.rectangle(200,400,150,300,0x000000).setAlpha(1);
    this.orbPast = this.add.image(270,400, 'leftorb').setScale(0.1);

    // Orbs and players from the past and present combining
    this.tweens.add({
      targets: [this.orb],
      x: 825,
      duration: 2500,
      delay: 1000,
      ease: 'Power2',
    });
    this.tweens.add({
      targets: [this.orbPast],
      x: 795,
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

  // Change backgrounds
  this.tweens.add({
    targets: [this.line, this.leftBg, this.rightBg],
    alpha: 0,
    duration: 2000,
    delay: 3400,
    ease: 'Power2',
    onComplete: () => {
      this.cameras.main.fadeOut(2000);
    }
  });
  this.tweens.add({
    targets: [this.bg],
    alpha: 1,
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

class SplashScreen extends TweenScene {
  constructor() {
    super('splash_screen');
    
  }

  create () {
    // Calculate the position to center the square horizontally
    var x = (this.cameras.main.width - 250) / 2;

    // Calculate the position to center the square vertically
    var y = (this.cameras.main.height - 250) / 2;

    // adding in a white square
    this.graphics = this.add.graphics();

    this.graphics.fillStyle(0xffffff);

    let white_square = this.graphics.fillRect(x,y,250,250);
    white_square.alpha = 0;

    // adding text onto the white square
    let splash_text = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY, "LMSZ")
      .setFontSize(100)
      .setOrigin(0.5)
      .setAlpha(0);
    splash_text.setStyle({ color: '#000000' });

    // fade in and fade out the logo
    this.fade_in([splash_text,white_square], 0,2500);
    this.fade_out([splash_text, white_square], 2600,2500);

    // go to the main menu...which we need to add
    this.time.delayedCall(3500, function() {
      this.scene.start('introduction');
    }, [], this);
  }
}

var config = {
  scene: [SplashScreen, Introduction,Ending],
  // scene: [SplashScreen, Introduction,Ending],
  backgroundColor: 0x43D58C,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1600,
      height: 1200
  },
};

var game = new Phaser.Game(config);

