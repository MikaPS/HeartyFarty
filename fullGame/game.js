var musicList = Array(10).fill(false);
let trueMusicList = [];
class WaterPrefab extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
  }
}

let level = 1;
class Victory extends TweenScene {
  constructor() {
    super('victory');
  }
  preload() {
    this.load.image('forest', '../assets/forest_path.png');
    this.load.image('fullscreen', '../assets/keys/fullscreen.png');

  }
  create(data) {
    isMusicOn = data.isMusicOn;
    // Option to have full screen
    const fullScreen = this.add.image(1540, 1140, "fullscreen").setScale(0.1);
    this.fullScreen(fullScreen);
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.add.text(450,400,"YOU WON!").setFontSize(150);
    if (level == 1) {
      this.add.text(600,600,"Next level?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 2;
          this.sceneTransition("intro", isMusicOn);
        });
    }
    if (level == 2) {
      this.add.text(600,600,"Next level?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 3;
          this.sceneTransition("intro", isMusicOn);
        });
    }
    if (level == 3) {
      this.add.text(200,900, "watch out because if a tree grows\nin the past where you are standing\nin the future you might end up\nstuck inside for eternity.").setFontSize(60);
      this.add.text(600,600,"Next level?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 4;
          this.sceneTransition("intro", isMusicOn);
        });
    }
    if (level == 4) {
      this.add.text(600,600,"Restart?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 1;
          this.sceneTransition("intro", isMusicOn);
        });
    }
  }
}

class Losing extends TweenScene {
  constructor() {
    super('losing');
  }
  preload() {
    this.load.image('forest', '../assets/forest_path.png');
    this.load.image('fullscreen', '../assets/keys/fullscreen.png');
  }
  create(data) {
    isMusicOn = data.isMusicOn;
    // Option to have full screen
    const fullScreen = this.add.image(1540, 1140, "fullscreen").setScale(0.1);
    this.fullScreen(fullScreen);
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.add.text(450,400,"YOU LOST!").setFontSize(150);
    this.add.text(600,600,"Restart?").setFontSize(80)
      .setInteractive()
      .on('pointerdown', () => {
        this.sceneTransition("intro", isMusicOn);
      });
  }
}


class Intro extends TweenScene {
  constructor() {
    super('intro');
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.track = 0;
    this.currentSide = 1; // 0 present, 1 past
    this.ball1;
    this.ball2;
    this.buttonsOn = 0;
    this.fourButtons = [false, false, false, false];
    this.musicText; 
    this.soundText; 
    this.waterText;
    this.sound1; this.sound2; this.sound3; this.sound4; this.sound5; this.sound6; this.sound7; this.sound8; this.sound9; this.sound10;
  }

  preload() {
    this.load.image('ball', '../assets/player/rfront.png');
    this.load.image('fullscreen', '../assets/keys/fullscreen.png');
    this.load.image('wall', '../assets/wall.png');
    this.load.image('forest', '../assets/forest_path.png');
    this.load.image('water', '../assets/water/water3.png');
    this.load.image('arrowkey', '../assets/keys/arrowkey.png');
    this.load.image('waterkey', '../assets/keys/waterkey.png');
    this.load.image('waterdrops', '../assets/water/waterdrops.png');
    this.load.audio('waterSound', '../assets/music/water_sound.mp3'); 
    // Gate and buttons
    this.load.image('newgate', '../assets/newgate.png'); 
    this.load.image('oldgate', '../assets/oldgate.png'); 
    this.load.image('onbutton', '../assets/keys/onbutton.png'); 
    this.load.image('offbutton', '../assets/keys/button.png'); 
    // tree
    this.load.image('sapling', '../assets/tree/sapling.png'); 
    this.load.image('smalltree', '../assets/tree/smalltree.png'); 
    this.load.image('bigtree', '../assets/tree/bigtree.png'); 
    this.load.image('doortree', '../assets/tree/btreewdoor.png'); 
    // Walk animation to right
    this.load.image('playerRight1', '../assets/player/rright.png');
    this.load.image('playerRight2', '../assets/player/right.png');
    this.load.image('playerRight3', '../assets/player/lright.png');
    // Walk animation to left
    this.load.image('playerLeft1', '../assets/player/rleft.png');
    this.load.image('playerLeft2', '../assets/player/left.png');
    this.load.image('playerLeft3', '../assets/player/lleft.png');
    // Walk animation to up
    this.load.image('playerFront1', '../assets/player/rfront.png');
    this.load.image('playerFront2', '../assets/player/front.png');
    this.load.image('playerFront3', '../assets/player/lfront.png');
    // Music for custom music
    this.load.audio('chords1', '../assets/music/chords1.m4a');
    this.load.audio('chords2', '../assets/music/chords2.m4a');
    this.load.audio('chords3', '../assets/music/chords3.m4a');
    this.load.audio('base1', '../assets/music/base1.m4a');
    this.load.audio('base2', '../assets/music/base2.m4a');
    this.load.audio('base3', '../assets/music/base3.m4a');
    this.load.audio('lead', '../assets/music/lead.m4a');
    this.load.audio('melody1', '../assets/music/melody1.m4a');
    this.load.audio('melody2', '../assets/music/melody2.m4a');
    this.load.audio('words', '../assets/music/words.m4a');
  }

  stopSound(sounds) {
    this.turnOffText();
    if (sounds[0] == true){
      if (this.sound1 != undefined) {
      this.sound1.stop();
      }
    }
    if (sounds[1] == true){
      if (this.sound9 != undefined) {
      this.sound9.stop(); }
    }
    if (sounds[2] == true){
      if (this.sound2 != undefined) {
      this.sound2.stop(); }
    }
    if (sounds[3] == true){
      if (this.sound3 != undefined) {
      this.sound3.stop(); }
    }
    if (sounds[4] == true){
      if (this.sound4 != undefined) {
      this.sound4.stop(); }
    }
    if (sounds[5] == true){
      if (this.sound5 != undefined) {
      this.sound5.stop(); }
    }
    if (sounds[6] == true){
      if (this.sound6 != undefined) {
      this.sound6.stop(); }
    }
    if (sounds[7] == true){
      if (this.sound7 != undefined) {
      this.sound7.stop();
      }
    }
    if (sounds[8] == true){
      if (this.sound8 != undefined) {
      this.sound8.stop();
      }
    }
    if (sounds[9] == true){
      if (this.sound10 != undefined) {
      this.sound10.stop();
      }
    }
  }

  playSoundCap(i, txt){
    if (customMusic == 1) {
      this.turnOffText();
      if (i==0) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "chords1]").setAlpha(1); }
      } else if (i == 1) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "chords2]").setAlpha(1); }
      } else if (i == 2) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "chords3]").setAlpha(1); }
      } else if (i == 3) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "base1]").setAlpha(1); }
      } else if (i == 4) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "base2]").setAlpha(1); }
      } else if (i == 5) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "base3]").setAlpha(1); }
      } else if (i == 6) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "lead]").setAlpha(1); }
        
      } else if (i == 7) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "melody1]").setAlpha(1); }
      } else if (i == 8) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "melody2]").setAlpha(1); }

      } else if (i == 9) {
          if (isCapOn == 1) { this.soundText.setText("["+ txt+ "words]").setAlpha(1); }
      }
  }
}

  playSound(sounds){
    if (customMusic == 1) {
      if (sounds[0] == true){
        this.sound1 = this.sound.add('chords1');
        if (this.sound1.isPlaying == false) {
        this.sound1.play();
        }
      }
      if (sounds[1] == true){
        this.sound9 = this.sound.add('chords2');
        this.sound9.volume -= .3;
        if (this.sound9.isPlaying == false) {
        this.sound9.play();
        }
      }
      if (sounds[2] == true){
        this.sound2 = this.sound.add('chords3');
        if (this.sound2.isPlaying == false) {
        this.sound2.play();
        }
      }
      if (sounds[3] == true){
        this.sound3 = this.sound.add('base1');
        if (this.sound3.isPlaying == false) {
        this.sound3.play();
        }
      }
      if (sounds[4] == true){
        this.sound4 = this.sound.add('base2');
        if (this.sound4.isPlaying == false) {
        this.sound4.play();
        }
      }
      if (sounds[5] == true){
        this.sound5 = this.sound.add('base3');
        if (this.sound5.isPlaying == false) {
        this.sound5.play();
        }
      }
      if (sounds[6] == true){
        this.sound6 = this.sound.add('lead');
        this.sound6.volume -= .7;
        if (this.sound6.isPlaying == false) {
        this.sound6.play();
        }
      }
      if (sounds[7] == true){
        this.sound7 = this.sound.add('melody1');
        if (this.sound7.isPlaying == false) {
        this.sound7.play();
        }
      }
      if (sounds[8] == true){
        this.sound8 = this.sound.add('melody2');
        if (this.sound8.isPlaying == false) {
        this.sound8.play();
        }
      }
      if (sounds[9] == true){
        this.sound10 = this.sound.add('words');
        this.sound10.volume += 2;
        if (this.sound10.isPlaying == false) {
        this.sound10.play();
        }
      }
    }
  }

  customMusicMethods() {
    if (customMusic == 1){
      this.addNewSound = this.add.rectangle(1320,870,450,50,0x000000).setAlpha(.5)
      .setInteractive({useHandCursor: true})  
      .on('pointerdown', () => {
        var rand = Math.floor(Math.random() * 10) + 1;
        let maxSearch =0;
        while (musicList[rand] == true && maxSearch != 8){
          maxSearch+=1;
          rand = Math.floor(Math.random() * 10) + 1;
        }
        trueMusicList.push(rand);
        musicList[rand] = true;
        this.stopSound(musicList);
        this.playSound(musicList);
        this.playSoundCap(rand, "Adding ");
      });
      this.newSound = this.add.text(1110, 850, 'Add instrument', { fontSize: '50px', fill: '#ffffff' })
      this.takeNewSound = this.add.rectangle(1320,960,450,50,0x000000).setAlpha(.5)
      .setInteractive({useHandCursor: true})  
      .on('pointerdown', () => {
        // Gets a random value from the array and deletes it
        var rand = Phaser.Utils.Array.GetRandom(trueMusicList);
        var index = trueMusicList.indexOf(rand);
        if (index !== -1) {
          trueMusicList.splice(index, 1);
        }
        this.turnOffText();
        this.stopSound(musicList);
        musicList[rand] = false;
        this.playSound(musicList);
        this.playSoundCap(rand, "Taking ");
      });
      this.takeSound = this.add.text(1110, 940, 'Take instrument', { fontSize: '50px', fill: '#ffffff' })
      // this.playNewSound = this.add.rectangle(1350,1070,500,50,0x000000).setAlpha(.5)
      // .setInteractive({useHandCursor: true})  
      // .on('pointerdown', () => {
      //   this.stopSound(musicList);
      //   this.playSound(musicList);
      // });
      // this.soundPlay = this.add.text(1110, 1050, 'Play instruments', { fontSize: '50px', fill: '#ffffff' })
    }
  }
  create(data) {
    // Player animation
    this.anims.create({
      key: 'walkRight',
      frames: [
        { key: 'playerRight1' },
        { key: 'playerRight2' },
        { key: 'playerRight3' }
      ],
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'walkFront',
      frames: [
        { key: 'playerFront1' },
        { key: 'playerFront2' },
        { key: 'playerFront3' }
      ],
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'walkLeft',
      frames: [
        { key: 'playerLeft1' },
        { key: 'playerLeft2' },
        { key: 'playerLeft3' }
      ],
      frameRate: 5,
      repeat: -1
    });
    // Intro animation
    // Calculate the position to center the square 
    var x = (this.cameras.main.width - 2000) / 2;
    var y = (this.cameras.main.height - 1500) / 2;
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x0000);
    // add in square that fills the scene
    let large_rect = this.graphics.fillRect(x,y,2000,1500).setDepth(3);
    // fade in the scene
    this.cameras.main.fadeIn(1500, 0, 0, 0);    
    // Tween chain to squish the rectangle into the diving line
    this.tweens.add({
      targets: this.graphics,
      delay: 150,
      duration: 1200,
      scaleX: 0.001,
      scaleY: 1,
      x: this.cameras.main.centerX,
      ease: 'Quad.easeInOut',
    });
    // Option to have full screen
    const fullScreen = this.add.image(1540, 1140, "fullscreen").setScale(0.1);
    this.fullScreen(fullScreen);

    // Music
    isMusicOn = data.isMusicOn;
    // Music
    this.musicText = this.add.text(470,1100, "").setFontSize(55).setDepth(2);
    this.waterText = this.add.text(500,1100, "").setFontSize(55).setDepth(2);
    this.soundText = this.add.text(550,1100, "").setFontSize(55).setDepth(2);

    this.music = this.add.rectangle(1510,80,80,60,0x000000).setAlpha(1)
    .setInteractive({useHandCursor: true})
    .on('pointerdown', () => {
          // console.log("clicking on music...", isMusicOn);
          if (musicType[0] == true) {
            if (isMusicOn == 1) { 
              this.turnOffText();
              bgMusic.pause(); isMusicOn = 0; this.updateMusicSetting(0); 
              if (isCapOn == 1) { this.musicText.setText("[Background Music stopped]").setAlpha(1); }
            } else { 
              this.turnOffText();
              bgMusic.play(); isMusicOn = 1; this.updateMusicSetting(1); 
              if (isCapOn == 1) { this.musicText.setText("[Background Music started]").setAlpha(1); }
            }
          }
          if (musicType[1] == true) {
            if (customMusic == 1) {
              customMusic = 0;
              this.updateCustomSetting(0);
              this.turnOffText();
              this.stopSound(musicList);
            } else {
              customMusic = 1;
              this.updateCustomSetting(1);
              this.customMusicMethods();
              this.playSound(musicList);
      
            }
          }
    });
    this.musicTxt = this.add.text(1480, 60, "🎵").setFontSize(50).setAlpha(1)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
          if (musicType[0] == true) {
            if (isMusicOn == 1) { 
              this.turnOffText();
              bgMusic.pause(); isMusicOn = 0; this.updateMusicSetting(0); 
              if (isCapOn == 1) { this.musicText.setText("[Background Music stopped]").setAlpha(1); }
            } else { 
              this.turnOffText();
              bgMusic.play(); isMusicOn = 1; this.updateMusicSetting(1); 
              if (isCapOn == 1) { this.musicText.setText("[Background Music started]").setAlpha(1); }
            }
          }
          if (musicType[1] == true) {
            if (customMusic == 1) {
              customMusic = 0;
              this.updateCustomSetting(0);
              this.turnOffText();
              this.stopSound(musicList);
            } else {
              customMusic = 1;
              this.updateCustomSetting(1);
              this.customMusicMethods();
              this.playSound(musicList);
      
            }
          }
        });
    // music is turned off
    this.noMusic = this.add.rectangle(1510, 80, 60,10, 0xff0000).setAngle(-50).setAlpha(0).setDepth(2);
    this.customMusicMethods();
    // Background
    this.leftBg = this.add.image(375,570, "forest").setScale(1.9).setDepth(-1);
    this.cameras.main.setBackgroundColor('#000000');
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1).setAlpha(0.4);

    // Switch between past/present. Clicking on each side of the screen switches the current view
    this.present = this.add.rectangle(395,600,800,1200,0x000000).setDepth(-2)
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => {
          this.currentSide = 1;
      });
    this.past = this.add.rectangle(1200,600,800,1200,0x00000).setDepth(-2)
      .setInteractive({useHandCursor: true})  
      .on('pointerdown', () => {
        this.currentSide = 0;
      });
   
    // General settings we will need for all levels
    this.ball1 = this.physics.add.sprite(400, 150, 'ball');
    this.ball2 = this.physics.add.sprite(1200, 150, 'ball');
    this.wall = this.physics.add.image(800, 600, 'wall');
    this.wall.body.setImmovable(true);
    this.wall.setScale(.1,10);

    this.physics.add.collider(this.ball1, this.wall, () => {
    });
    this.physics.add.collider(this.ball2, this.wall, () => {
    });

    this.ball1.setScale(0.6).setDepth(1);
    this.ball2.setScale(0.6).setDepth(1);
    this.wall.setScale(.1,10).setDepth(1);
    this.ball1.setBounce(0);
    this.ball2.setBounce(0);
    this.wall.setBounce(0);
    this.ball1.setCollideWorldBounds(true);
    this.ball2.setCollideWorldBounds(true);
    this.wall.setCollideWorldBounds(true);

    // particles so the player knows what the objective is
    const shape1 = new Phaser.Geom.Circle(0, 0, 100);

    // make the particles to get to the bottom of the screen
    let emitter_bottom = this.add.particles(50, 1180, 'waterdrops', {
      blendMode: 'ADD',
      scale: { start: 0.1, end: 0.09 },
      // rotate: { start: 0, end: 360 },
      speed: { min: 10, max: 30 },
      lifespan: 6000,
      frequency: 10,
      gravityY: 90,
      x: { start: 10, end: 1500, steps: 110, yoyo: true },
      emitting: false,
      alpha: 0.2
      // alpha: 0
  });

  // make the particles around button for the 1st & 2nd level
  let emitter_first_second = this.add.particles(950, 450, 'waterdrops', {
    blendMode: 'ADD',
    lifespan: 2400,
    quantity: 1,
    scale: { start: 0.2, end: 0.09 },
    frequency: 40,
    alpha: 0.2,
    emitting: false
  });

    // Level 1 design
    if (level == 1) {
      // stop the bottom emitter before it begins
      emitter_bottom.stop();
      emitter_first_second.stop();

      // Create a gate for both players
      this.gate1 = this.physics.add.image(400, 620, 'newgate');
      this.gate1.body.setImmovable(true);
      this.gate2 = this.physics.add.image(1200, 620, 'oldgate');
      this.gate2.body.setImmovable(true);
      // Button for both players, but in the past it's usable, and in the future it isn't
      this.button1 = this.physics.add.image(150, 450, 'offbutton').setScale(0.4);
      this.button1.body.setImmovable(true);
      this.button2 = this.physics.add.image(950, 450, 'onbutton').setScale(0.4);
      this.button2.body.setImmovable(true);

      // Gate collision
      this.gate1Collision = this.physics.add.collider(this.ball1, this.gate1, () => {
      });
      this.gate2Collision = this.physics.add.collider(this.ball2, this.gate2, () => {
      });
      // Button collision
      this.isButtonOn = false;
      this.button1Collision = this.physics.add.collider(this.ball1, this.button1, () => {
        
      });

      // make the particles go in a circle
      emitter_first_second.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 1 });

      // delay before the emitter begins (so the player can figure it out themselves)
      this.time.delayedCall(12000, () => {
        emitter_first_second.start();
      }, [], this);

      // Colliding with second button will remove the gates and buttons
      this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
        this.gate1.setAlpha(0);
        this.gate2.setAlpha(0);
        this.physics.world.removeCollider(this.gate1Collision);
        this.physics.world.removeCollider(this.gate2Collision);
        this.isButtonOn = true;

        // stop emitter
        emitter_first_second.stop();
        emitter_bottom.start();
      });

    }
    // Level 2 Design
    if (level == 2) {
      // make the particles around button for the 1st & 2nd level
      let emitter_second = this.add.particles(950, 400, 'waterdrops', {
        blendMode: 'ADD',
        lifespan: 2400,
        quantity: 1,
        scale: { start: 0.2, end: 0.09 },
        frequency: 40,
        alpha: 0.2,
        emitting: false
      });

      // stopping the both emitter before it begins
      emitter_bottom.stop();
      
      // Create a gate for both players
      this.gate1 = this.physics.add.image(400, 620, 'newgate');
      this.gate1.body.setImmovable(true);
      this.gate2 = this.physics.add.image(1200, 620, 'oldgate');
      this.gate2.body.setImmovable(true);
      // Button for both players, but in the past it's usable, and in the future it isn't
      this.button1 = this.physics.add.image(150, 400, 'offbutton').setScale(0.4);
      this.button1.body.setImmovable(true);
      this.button2 = this.physics.add.image(950, 400, 'onbutton').setScale(0.4);
      this.button2.body.setImmovable(true);
      // Cover the present button in barriers that will kill the player
      this.group = this.add.group();
      this.barrier1 = this.physics.add.image(55,400,'wall').setScale(0.4,0.15); this.barrier1.body.setImmovable(true); this.group.add(this.barrier1);
      this.barrier2 = this.physics.add.image(150,300,'wall').setScale(0.4,0.15); this.barrier2.body.setImmovable(true); this.group.add(this.barrier2);
      this.barrier3 = this.physics.add.image(150,500,'wall').setScale(0.4,0.15); this.barrier3.body.setImmovable(true); this.group.add(this.barrier3);
      this.barrier4 = this.physics.add.image(240,400,'wall').setScale(0.4,0.15); this.barrier4.body.setImmovable(true); this.group.add(this.barrier4);
      const graphics = this.add.graphics();
      graphics.lineStyle(5,0xff0000); // set color of squares
      graphics.strokeRect(35,380,40,40); 
      graphics.strokeRect(130,280,40,40); 
      graphics.strokeRect(130,480,40,40); 
      graphics.strokeRect(220,380,40,40); 

      this.gate1Collision = this.physics.add.collider(this.ball1, this.group, () => {
        this.sceneTransition("losing", isMusicOn);
      });

      // Gate collision
      this.gate1Collision = this.physics.add.collider(this.ball1, this.gate1, () => {
      });
      this.gate2Collision = this.physics.add.collider(this.ball2, this.gate2, () => {
      });
      // Button collision
      this.isButtonOn = false;
      this.button1Collision = this.physics.add.collider(this.ball1, this.button1, () => {
        
      });

      // make the particles go in a circle
      emitter_second.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 1 });

      // delay before the emitter begins
      this.time.delayedCall(12000, () => {
        emitter_second.start();
      }, [], this);

      // Colliding with second button will remove the gates and buttons
      this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
        this.gate1.setAlpha(0);
        this.gate2.setAlpha(0);
        this.physics.world.removeCollider(this.gate1Collision);
        this.physics.world.removeCollider(this.gate2Collision);
        this.isButtonOn = true;

        // stopping and starting the next emitter
        emitter_second.stop();
        emitter_bottom.start();
      });
    }
    if (level == 3) {
      // i literally hate emitters
      let emitter_third = this.add.particles(1400, 700, 'waterdrops', {
        blendMode: 'ADD',
        lifespan: 2400,
        quantity: 1,
        scale: { start: 0.2, end: 0.09 },
        frequency: 40,
        alpha: 0.2,
        emitting: false
      });
      emitter_third.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 1 });


      // delay before the emitter begins
      this.time.delayedCall(12000, () => {
        emitter_third.start();
      }, [], this);

      // prefab
      this.water = this.add.image(170,1040,"waterkey").setScale(0.22).setDepth(2)
        .setInteractive()
        .on('pointerdown', () => {
          this.createWater();
          emitter_third.stop();
        });      

      this.dirt = this.physics.add.image(1410, 710, "wall").setScale(0.85,0.25);
      this.sap = this.physics.add.image(1400, 550, "sapling").setScale(0.4);
      this.endTree = this.physics.add.image(600, 550, "sapling").setScale(0.4);
      
    }
    if (level == 4) {
      // i push these different positions into a list
      const positions = [
        { x: 1000, y: 650 },
        
        { x: 1250, y: 400 }, 
        
        
        { x: 1250, y: 900 }, 
        { x: 1500, y: 650 },
        
        

      ];

      // create the emitter to go around the tree
      let emitter_four = this.add.particles(400, 800, 'waterdrops', {
        blendMode: 'ADD',
        lifespan: 2400,
        quantity: 1,
        scale: { start: 0.2, end: 0.09 },
        frequency: 40,
        alpha: 0.2,
        emitting: false
      });

      const emitters = [];
      const emitterSettings = {
        blendMode: 'ADD',
        lifespan: 2400,
        quantity: 1,
        scale: { start: 0.2, end: 0.09 },
        frequency: 40,
        alpha: 0.2,
        emitting: false
      };
      
      for (const position of positions) {
        const emitter1234 = this.add.particles(position.x, position.y, 'waterdrops', emitterSettings);
        emitter1234.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 1 });
        emitters.push(emitter1234);
        
        this.time.delayedCall(12000, () => {
          emitter1234.start();
          
        });
      }
      

      // 5 buttons that old player needs to click, as more buttons are clicked, the tree will grow
        // over time, the buttons will turn off
      // present player can press a button that will increase the time it takes for the buttons to turn off
      this.tree = this.physics.add.image(400, 650, "sapling").setScale(0.3); this.tree.body.setImmovable(true);

      this.button1tree = this.physics.add.image(1000, 650, 'offbutton').setScale(0.4); this.button1tree.body.setImmovable(true);
      this.button2tree = this.physics.add.image(1250, 400, 'offbutton').setScale(0.4); this.button2tree.body.setImmovable(true);
      this.button3 = this.physics.add.image(1250, 900, 'offbutton').setScale(0.4); this.button3.body.setImmovable(true);
      this.button4 = this.physics.add.image(1500, 650, 'offbutton').setScale(0.4); this.button4.body.setImmovable(true);
      this.water = this.add.image(170,1040,"waterkey").setScale(0.22).setDepth(2)
        .setInteractive()
        .on('pointerdown', () => {
          this.createWater();
        })
        .on('pointerup', () => {
          this.buttonsOn = 0;
          for (let i = 0; i < this.fourButtons.length; i++) {
            if (this.fourButtons[i] == true) {
              this.buttonsOn += 1;
              emitters[i].stop();
            }
          }
          if (this.buttonsOn == 1) { 
            this.tree.setTexture("smalltree"); 
            this.treeCollision();
            

          }
          if (this.buttonsOn == 2) {
            this.tree.setTexture("bigtree"); 
            this.treeCollision();
          }
          if (this.buttonsOn == 3) { 
            this.tree.setTexture("bigtree"); 
            this.treeCollision();
          }
          if (this.buttonsOn == 4) { 
            this.tree.setTexture("doortree"); 
            // console.log("here");
            this.treeCollision();
            emitter_four.start();
          }
        });

        emitter_four.addEmitZone({ type: 'edge', source: shape1, quantity: 64, total: 1 });
      
    }


    // On screen controllers
    this.pastRightKey = this.add.image(270,1040, "arrowkey").setScale(0.2).setAngle(90).setDepth(2);
    this.pastDownKey = this.add.image(171,1140, "arrowkey").setScale(0.2).setAngle(180).setDepth(2);  
    this.pastLeftKey = this.add.image(70,1040, "arrowkey").setScale(0.2).setAngle(270).setDepth(2);
    this.pastUpKey = this.add.image(171,940, "arrowkey").setScale(0.2).setDepth(2);
    this.presentRightKey = this.add.image(270,1040, "arrowkey").setScale(0.2).setAngle(90).setDepth(2);
    this.presentDownKey = this.add.image(171,1140, "arrowkey").setScale(0.2).setAngle(180).setDepth(2);  
    this.presentLeftKey = this.add.image(70,1040, "arrowkey").setScale(0.2).setAngle(270).setDepth(2);
    this.presentUpKey = this.add.image(171,940, "arrowkey").setScale(0.2).setDepth(2);


    // detect up and down arrow key presses
    const cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', (event) => {
      // if current side is the past, can control both characters
      if (this.currentSide == 0) {
        if (event.code === 'ArrowUp') {
          this.ball1.play('walkFront');
          this.ball2.play('walkFront');

          this.ball1.setVelocity(0, -150);
          this.ball2.setVelocity(0, -150);
        } else if (event.code === 'ArrowDown') {
          this.ball1.play('walkFront');
          this.ball2.play('walkFront');

          // move ball down
          this.ball1.setVelocity(0, 150);
          this.ball2.setVelocity(0, 150);
        } else if (event.code === 'ArrowLeft') {
          this.ball1.play('walkLeft');
          this.ball2.play('walkLeft');

          // move ball left
          this.ball1.setVelocity(-150, 0);
          this.ball2.setVelocity(-150, 0);
        } else if (event.code === 'ArrowRight') {
          this.ball1.play('walkRight');
          this.ball2.play('walkRight');

          // move ball right
          this.ball1.setVelocity(150, 0);
          this.ball2.setVelocity(150, 0);
        }
      // if current side is the present, can control one character
      } else {
        if (event.code === 'ArrowUp') {
          this.ball1.play('walkFront');
          this.ball1.setVelocity(0, -150);
        }
        else if (event.code === 'ArrowDown') {
          this.ball1.play('walkFront');
          this.ball1.setVelocity(0, 150);
        }      
        else if (event.code === 'ArrowLeft') {
          this.ball1.play('walkLeft');
          this.ball1.setVelocity(-150, 0);
        }
        else if (event.code === 'ArrowRight') {
          // stop moving down
          this.ball1.play('walkRight');
          this.ball1.setVelocity(150, 0);
        }
      }
    });
    
    this.input.keyboard.on('keyup', (event) => {
      this.ball1.setTexture('ball').setScale(0.6);
      this.ball2.setTexture('ball').setScale(0.6);
      this.ball1.anims.stop();
      this.ball2.anims.stop();


      if (this.currentSide == 0) {
        if (event.code === 'ArrowUp') {
          this.ball1.setVelocity(0, 0);
          this.ball2.setVelocity(0, 0);
        } else if (event.code === 'ArrowDown') {
          // move ball down
          this.ball1.setVelocity(0, 0);
          this.ball2.setVelocity(0, 0);
        } else if (event.code === 'ArrowLeft') {
          // move ball left
          this.ball1.setVelocity(0, 0);
          this.ball2.setVelocity(0, 0);
        } else if (event.code === 'ArrowRight') {
          // move ball right
          this.ball1.setVelocity(0, 0);
          this.ball2.setVelocity(0, 0);
        }
      }
      else {
        if (event.code === 'ArrowUp') {
          // stop moving left
          this.ball1.setVelocity(0, 0);
        }
        else if (event.code === 'ArrowDown') {
          // stop moving right
          this.ball1.setVelocity(0, 0);
        }
        else if (event.code === 'ArrowLeft') {
          // stop moving up
          this.ball1.setVelocity(0, 0);
        }
        else if (event.code === 'ArrowRight') {
          // stop moving down
          this.ball1.setVelocity(0, 0);
        }
      }
    });
  }

  update() {
    // Music
    if (isMusicOn == 1 || customMusic == 1) {
      this.noMusic.setAlpha(0);
    } else if (isMusicOn == 0 && customMusic == 0){
      this.noMusic.setAlpha(1);
    }
    // Move to new levels
    if (level == 1 || level == 2) {
      if (this.ball1.y >= 1000 && this.ball2.y >= 1000) {
        this.sceneTransition("victory", isMusicOn);
      }
    }
    // On screen controllers 
    if (this.currentSide == 0) {
      this.pastKeyboardMovement(this.pastRightKey, this.ball1, this.ball2,150,0);
      this.pastKeyboardMovement(this.pastLeftKey, this.ball1, this.ball2,-150,0);
      this.pastKeyboardMovement(this.pastUpKey, this.ball1, this.ball2,0,-150);
      this.pastKeyboardMovement(this.pastDownKey, this.ball1, this.ball2,0,150);
    }
    else {
      this.presentKeyboardMovement(this.presentRightKey, this.ball1,150,0);
      this.presentKeyboardMovement(this.presentLeftKey, this.ball1,-150,0);
      this.presentKeyboardMovement(this.presentUpKey, this.ball1,0,-150);
      this.presentKeyboardMovement(this.presentDownKey, this.ball1,0,150);
    }

    // checking collision with button to remove the objects upon collision
      if (this.isButtonOn == true) {
        this.button1.setAlpha(0);
        this.button2.setAlpha(0);
        this.physics.world.removeCollider(this.button1Collision);
        this.physics.world.removeCollider(this.button2Collision);
      }
  }


  
  pastKeyboardMovement(item, ball1, ball2, vel1, vel2) {
    this.presentRightKey.disableInteractive();
    this.presentLeftKey.disableInteractive();
    this.presentUpKey.disableInteractive();
    this.presentDownKey.disableInteractive();

    item.setInteractive()
    .on('pointerdown', () => {
      ball1.setVelocity(vel1, vel2);
      ball2.setVelocity(vel1, vel2);
      if (item == this.pastRightKey) {
        ball1.play('walkRight');
        ball2.play('walkRight');
      } else if (item == this.pastLeftKey) {
        ball1.play('walkLeft');
        ball2.play('walkLeft');
      } else {
        ball1.play('walkFront');
        ball2.play('walkFront');
      }
    })
    .on('pointerup', () => {
      // Stop player when button is released
      ball1.setVelocity(0);
      ball2.setVelocity(0);
      ball1.setTexture('ball').setScale(0.6);
      ball2.setTexture('ball').setScale(0.6);
      ball1.anims.stop();
      ball2.anims.stop();
    });
  }

  presentKeyboardMovement(item, ball1, vel1, vel2) {
    this.pastRightKey.disableInteractive();
    this.pastLeftKey.disableInteractive();
    this.pastUpKey.disableInteractive();
    this.pastDownKey.disableInteractive();

    item.setInteractive()
    .on('pointerdown', () => {
      ball1.setVelocity(vel1, vel2);
      if (item == this.presentRightKey) {
        ball1.play('walkRight');
      } else if (item == this.presentLeftKey) {
        ball1.play('walkLeft');
      } else {
        ball1.play('walkFront');
      }
    })
    .on('pointerup', () => {
      // Stop player when button is released
      ball1.setVelocity(0);
      ball1.setTexture('ball').setScale(0.6);
      ball1.anims.stop();
    });
  }

  
  createWater() {
    // Define the x and y positions for the prefabs
    this.waterSound = this.sound.add('waterSound');
    this.waterSound.play();
    this.turnOffText();
    if (isCapOn == 1) {
      this.waterText.setText("[Water sound is played]").setAlpha(1);
      this.time.addEvent({
        delay: 1200, 
        callback: () => { this.waterText.setAlpha(0); }, 
      });
    }
    const prefabPositions = [
      { x: this.ball2.x+70, y: this.ball2.y-10 },
      { x: this.ball2.x+110, y: this.ball2.y-30 },
      { x: this.ball2.x+170, y: this.ball2.y-10 }
      // Add more positions as needed
    ];

    // Instantiate the prefab at each position
    for (const position of prefabPositions) {
      const prefab = new WaterPrefab(this, position.x, position.y, 'water');
      prefab.rotation = Phaser.Math.DegToRad(-45);
      this.time.addEvent({
        delay: 1500, 
        callback: () => { prefab.destroy(); }, 
      });
      this.physics.world.enable(prefab);
      if (level ==3) {
        this.physics.add.collider(this.dirt, prefab, () => {
          this.endTree.setTexture("doortree");
          this.physics.add.collider(this.ball1, this.endTree, () => {
            this.sceneTransition("victory", isMusicOn);
          });
        });
        this.physics.add.collider(this.sap, prefab, () => {
          this.endTree.setTexture("doortree");
          this.physics.add.collider(this.ball1, this.endTree, () => {
            this.sceneTransition("victory", isMusicOn);
          });
        });
      }
      else if (level == 4) {
        this.button1treeCollision = this.physics.add.collider(this.button1tree, prefab, () => {
          this.button1tree.setTexture("onbutton");
          this.fourButtons[0] = true;
        });
        this.button2treeCollision = this.physics.add.collider(this.button2tree, prefab, () => {
          this.button2tree.setTexture("onbutton");
          this.fourButtons[1] = true;
        });
        this.button3Collision = this.physics.add.collider(this.button3, prefab, () => {
          this.button3.setTexture("onbutton");
          this.fourButtons[2] = true;
        });
        this.button4Collision = this.physics.add.collider(this.button4, prefab, () => {
          this.button4.setTexture("onbutton");
          this.fourButtons[3] = true;
        });
      } 
    }
  }

  treeCollision() {
    this.fade_out(this.tree, 0, 300); 
    this.fade_in(this.tree, 400, 300); 
    this.fade_out(this.tree, 800, 300); 
    this.fade_in(this.tree, 1200, 300); 
    this.fade_out(this.tree, 1600, 300); 
    this.fade_in(this.tree, 2000, 300); 
    
    this.enableCollision = false;
    this.time.addEvent({
      delay: 2000, 
      callback: () => { this.enableCollision = true; }, 
    });

   
    this.physics.add.collider(this.ball1, this.tree, () => {
      if (this.enableCollision) {
        if (this.buttonsOn <= 3) {
        this.sceneTransition("losing", isMusicOn);
        } else {
          this.sceneTransition("victory", isMusicOn);
        }
      }
    }); 

  }

  turnOffText() {
    this.waterText.setAlpha(0);
    this.musicText.setAlpha(0);
    this.soundText.setAlpha(0);
    this.soundText.setText("");
  }
}

class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  preload() {
    // this.load.image('fullscreen', '../assets/keys/fullscreen.png');
    this.load.audio('audio', '../assets/music/now_and_then.mp3');
  }
  create(data) {
    isMusicOn = data.isMusicOn;
    bgMusic.stop();   
    if (checkTitle == 1 && isMusicOn == 1) {
      bgMusic = this.sound.add('audio');
      bgMusic.setLoop(true);
      bgMusic.play();
      checkTitle += 1;
    }
    if (checkTitle == 1 && isMusicOn == 0) {
      bgMusic = this.sound.add('audio');
      bgMusic.setLoop(true);
      checkTitle += 1;
    }
    // const fullScreen = this.add.image(1540, 1140, "fullscreen").setScale(0.1);
    // this.fullScreen(fullScreen);
    // Create the lines group
    const linesGroup = this.add.group();

    // Add lines to the group
    const line1 = this.add.text(-900, 300, "Instructions:").setFontSize(60).setAlpha(0);
    const line2 = this.add.text(-800, 450, "Use the arrow keys on the screen to move.").setFontSize(50).setAlpha(0);
    const line3 = this.add.text(-700, 600, "Clicking on the different halves of the\nscreen changes your movement.").setFontSize(50).setAlpha(0);
    const line4 = this.add.text(-300, 1100, "Click the screen to continue.").setFontSize(50).setAlpha(0);

    // Add lines to the group
    linesGroup.add(line1);
    linesGroup.add(line2);
    linesGroup.add(line3);
    linesGroup.add(line4);

    // Set initial delay and duration for the animation
    let delay = 500;
    const duration = 500; 

    // Slide in the lines one at a time
    linesGroup.getChildren().forEach((line) => {
      this.tweens.add({
        targets: line,
        alpha: 1,
        x: "+=1000", 
        duration: duration,
        ease: 'Power2', 
        delay: delay,
      });
      
      delay += 200; 
    });

    this.input.on('pointerdown', () => {
      this.scene.start('intro', {isMusicOn});
  });
  
  }
}

  // var config = {
  //   type: Phaser.AUTO,
  //   scale: {
  //     mode: Phaser.Scale.FIT,
  //     autoCenter: Phaser.Scale.CENTER_BOTH,
  //     width: 1600,
  //     height: 1200
  //   },
  //   physics: {
  //     default: 'arcade',
  //     arcade: {
  //       gravity: { y: 0 }
  //     }
  //   },
  //   scene: [Instructions,Intro, Losing, Victory]
  //   // scene: [Intro]
  // };
  
  // var game = new Phaser.Game(config);
