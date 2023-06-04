class Introduction extends TweenScene {
  constructor() {
    super('introduction');
    
  }

  preload() {
    this.load.image('orb', '../assets/Crackedorb.png');
    this.load.image('leftorb', '../assets/Leftorb.png');
    this.load.image('rightorb', '../assets/Rightorb.png');
    this.load.image('forest', '../assets/forest_path.png');
    
    this.load.image('playerWalk1', '../assets/Player/Rright.png');
    this.load.image('playerWalk2', '../assets/Player/right.png');
    this.load.image('playerWalk3', '../assets/Player/Lright.png');

    this.load.image('player', '../assets/Player/RFront.png');
  }

  create() {
    this.cameras.main.fadeIn(1000);
    // background
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setAlpha(0).setDepth(-1);
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setAlpha(0).setDepth(-1);
    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'playerWalk1' },
        { key: 'playerWalk2' },
        { key: 'playerWalk3' }
      ],
      frameRate: 5,
      repeat: -1
    });
  
    this.player = this.add.sprite(400,320, 'playerWalk1').setScale(0.9);
    this.player.play('walk');
  
    // player holding an orb
    this.playerFront = this.add.image(1000,320,"player").setScale(0.9).setAlpha(0);
    this.orb = this.add.image(520,400, 'orb').setScale(0.1); // cracked orb
    this.orbLeft = this.add.image(1200,400, 'leftorb').setScale(0.1).setAlpha(0); // left side
    this.orbRight = this.add.image(1120,400, 'rightorb').setScale(0.1).setAlpha(0); // right side
    this.hole = this.add.rectangle(1300,500,130,90,0x000000).setDepth(-1).setAlpha(2);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(0); // dividor
    this.playerPast = this.add.image(200,320,"player").setScale(0.9).setAlpha(0);
    this.orbLeftPast = this.add.image(270,400, 'leftorb').setScale(0.1).setAlpha(0);
    this.holePast = this.add.rectangle(500,500,130,90,0x000000).setDepth(-1).setAlpha(0);
    
    // Player and orb move from left side of the screen to the right side
    this.move(this.player, 1000, 3000, 1000, 320);
    this.move(this.orb, 1000, 3000, 1120, 400);

    // Make the cracked orb disappear, and show the two sides of it
    this.fade_out(this.orb, 3000, 2000);
    this.fade_in([this.orbLeft, this.orbRight], 3200, 1400);
    this.move(this.orbLeft, 3200, 1500, 1300, 500, () => {
      this.fade_out([this.bg, this.player,this.orbLeft, this.orbRight], 0, 400, () => {
          // In the split, change the background and add the left character
          this.tweens.add({
            targets: [this.line, this.playerPast, this.orbLeftPast, this.holePast, this.leftBg, this.rightBg, this.playerFront, this.orbRight],
            alpha: 1,
            duration: 2500,
            delay: 0,
            ease: 'Power2',
            onComplete: () => {
              this.cameras.main.fadeOut(1500);
              this.time.delayedCall(1500, () => this.scene.start('ending'));
            }
          });
      });
    });

    
  }
 
  update() { }
}



class Ending extends TweenScene {
  constructor() {
    super('ending');
    
  }

  preload() {
    this.load.image('orb', '../assets/Crackedorb.png');
    this.load.image('leftorb', '../assets/Leftorb.png');
    this.load.image('rightorb', '../assets/Rightorb.png');
    this.load.image('forest', '../assets/forest_path.png');
    
    this.load.image('lplayerWalk1', '../assets/Player/Rright.png');
    this.load.image('lplayerWalk2', '../assets/Player/right.png');
    this.load.image('lplayerWalk3', '../assets/Player/Lright.png');
    this.load.image('rplayerWalk1', '../assets/Player/Lleft.png');
    this.load.image('rplayerWalk2', '../assets/Player/left.png');
    this.load.image('rplayerWalk3', '../assets/Player/Rleft.png');

    this.load.image('player', '../assets/Player/RFront.png');

  }

  create() {
    // fade in
    this.cameras.main.fadeIn(1700);
    // forest background
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setAlpha(0).setDepth(-1);
    this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1);

    this.anims.create({
      key: 'walkLeft',
      frames: [
        { key: 'rplayerWalk1' },
        { key: 'rplayerWalk2' },
        { key: 'rplayerWalk3' }
      ],
      frameRate: 5,
      repeat: -1
    });
  
    this.player = this.add.sprite(1200,320, 'rplayerWalk1').setScale(0.9);
    this.player.play('walkLeft');

    this.anims.create({
      key: 'walkRight',
      frames: [
        { key: 'lplayerWalk1' },
        { key: 'lplayerWalk2' },
        { key: 'lplayerWalk3' }
      ],
      frameRate: 5,
      repeat: -1
    });
    this.playerPast = this.add.sprite(200,320, 'lplayerWalk1').setScale(0.9);
    this.playerPast.play('walkRight');


    // player holding an orb
    this.playerFront = this.add.image(720,320,"player").setAlpha(0);
    this.orb = this.add.image(1070,400, 'rightorb').setScale(0.1);
    this.line = this.add.rectangle(800,600,20,1200, 0xffffff).setAlpha(1).setDepth(-1);
    // this.playerPast = this.add.rectangle(200,400,150,300,0x000000).setAlpha(1);
    this.orbPast = this.add.image(270,400, 'leftorb').setScale(0.1);

    // Orbs and players from the past and present combining
    this.move(this.orb, 1000, 3000, 825, 400);
    this.move(this.orbPast, 1000, 3000, 795, 400, () => {
      this.move([this.player, this.playerPast], 0, 1500, 720, 320, () => {
        // Change backgrounds
        this.fade_out([this.line, this.leftBg, this.rightBg, this.playerPast, this.player], 0, 2000);
        this.tweens.add({
          targets: [this.bg],
          alpha: 1,
          duration: 1500,
          delay: 750,
          ease: 'Power2',
          onComplete: () => {
            this.playerFront.setAlpha(1);
            this.cameras.main.fadeOut(4000);
          }
        });
      });
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
    this.fade_in([splash_text,white_square], 0,2200);
    this.fade_out([splash_text, white_square], 2200,2000);

    // go to the main menu...which we need to add
    this.time.delayedCall(3000, function() {
      this.scene.start('main_title');
    }, [], this);
  }
}

let isMusicOn = 1; // 1 = true
class Main_Title extends TweenScene {
    constructor() {
      super('main_title');
    }

    preload() {
        this.load.image('forest', '../assets/forest_path.png');
        this.load.image('leftorb', '../assets/Leftorb.png');
        this.load.image('rightorb', '../assets/Rightorb.png');
        this.load.image('orb', '../assets/Crackedorb.png');
    }

    create() {
        // background stuff
        this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
        this.cameras.main.setBackgroundColor('#000000');
        this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1).setAlpha(0.4);
        // this.orbLeft = this.add.image(400,300, 'leftorb').setScale(0.3).setAngle(20) // left side
        // this.orbRight = this.add.image(1200,450, 'rightorb').setScale(0.3).setAngle(20) // right side
    
        this.orb = this.add.image(800,400, 'orb').setScale(0.3); // cracked orb
        this.orbRight = this.add.image(850,400, 'rightorb').setScale(0.3).setAngle(20).setAlpha(0); // right side
        this.orbLeft = this.add.image(750,400, 'leftorb').setScale(0.3).setAngle(20).setAlpha(0); // left side
        this.fade_out(this.orb,200,2500);
        this.fade_in([this.orbLeft, this.orbRight],600,1000);
        this.move(this.orbRight,600,2000,1200,450);
        this.move(this.orbLeft,600,2000,400,300);

        // tween chain to make the orbs leave the screen
        let start_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.tweens.add({
              targets: this.orbLeft,
              x: -150,
              duration: 500,
              ease: 'Quint',
              onComplete: () => { 
                this.orbLeft.destroy();

                this.tweens.add({
                  targets: this.orbRight,
                  x: 1750,
                  duration: 500,
                  ease: 'Quint',
                  onComplete: () => {
                    this.orbRight.destroy();
                    this.scene.start("introduction");
                  }
                }); 
              }
            });

        });

        // this.time.addEvent({
        //     delay: 4000, 
        //     callback: () => {        
        //       start_rect.setStrokeStyle(5, 0x45fffc);
        //       this.cameras.main.fadeOut(900);
        //       this.time.delayedCall(900, () => this.scene.start('introduction'));
        //     }, 
        //     callbackScope: this,
        // });
        // we should do a fade in for the title
        let title_text =this.add.text(this.cameras.main.centerX,380, "Time Split")
            .setFontSize(138)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
        let play_text =this.add.text(this.cameras.main.centerX,this.cameras.main.height + 100, "Play")
            .setFontSize(60)
            .setOrigin(0.5);

        // start of the tweens code
        this.tweens.add({
            // tween for play button
            targets: [start_rect, play_text],
            x: this.cameras.main.centerX,
            y: 720,
            duration: 2000,
            delay: 500,
            ease: 'Expo',
          });


        // bouncing tween for right orb
        this.tweens.add({
            targets: [this.orbRight],
            y: '+=100', // Adjust the distance as desired
            duration: 2000, // Adjust the duration as desired
            ease: 'Sine.easeInOut',
            delay: 2000,
            yoyo: true,
            repeat: -1 // Set to -1 for infinite repeat
        });

        // bouncing tween for left orb
        this.tweens.add({
            targets: [this.orbLeft],
            y: '-=100', // Adjust the distance as desired
            duration: 2000, // Adjust the duration as desired
            ease: 'Sine.easeInOut',
            delay: 2000,
            yoyo: true,
            repeat: -1 // Set to -1 for infinite repeat
        });
    }

    update(){}
}

var config = {
  // scene: [Ending],
  scene: [SplashScreen, Main_Title, Introduction,Ending],
  // backgroundColor: 0x43D58C,
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1600,
      height: 1200
  },
};

var game = new Phaser.Game(config);

