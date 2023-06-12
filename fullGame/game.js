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
    let isMusicOn = data.isMusicOn;
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
    let isMusicOn = data.isMusicOn;
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
    this.isMusicOn = data.isMusicOn;
    // Music
    this.music = this.add.rectangle(1510,80,80,60,0x000000).setAlpha(1)
    .setInteractive({useHandCursor: true})
    .on('pointerdown', () => {
          if (this.isMusicOn == 1) { bgMusic.pause(); this.isMusicOn = 0;} else { bgMusic.play(); this.isMusicOn = 1;}
    });
    this.musicTxt = this.add.text(1480, 60, "🎵").setFontSize(50).setAlpha(1)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (this.isMusicOn == 1) { bgMusic.pause(); this.isMusicOn = 0;} 
            else { bgMusic.play(); this.isMusicOn = 1;}
        });
    // music is turned off
    this.noMusic = this.add.rectangle(1510, 80, 60,10, 0xff0000).setAngle(-50).setAlpha(0).setDepth(2);

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
        let isMusicOn = this.isMusicOn;
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
      // prefab
      this.water = this.add.image(170,1040,"waterkey").setScale(0.22).setDepth(2)
        .setInteractive()
        .on('pointerdown', () => {
          this.createWater();
        });      

      this.dirt = this.physics.add.image(1410, 710, "wall").setScale(0.85,0.25);
      this.sap = this.physics.add.image(1400, 550, "sapling").setScale(0.4);
      this.endTree = this.physics.add.image(600, 550, "sapling").setScale(0.4);
      
    }
    if (level == 4) {
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
          }
        });
      
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
    if (this.isMusicOn == 1) {
      this.noMusic.setAlpha(0);
    } else if (this.isMusicOn == 0){
      this.noMusic.setAlpha(1);
    }
    // Move to new levels
    if (level == 1 || level == 2) {
      if (this.ball1.y >= 1000 && this.ball2.y >= 1000) {
        let isMusicOn = this.isMusicOn;
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
    // if (level == 1) {
      if (this.isButtonOn == true) {
        this.button1.setAlpha(0);
        this.button2.setAlpha(0);
        this.physics.world.removeCollider(this.button1Collision);
        this.physics.world.removeCollider(this.button2Collision);
      }
    // }
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
            let isMusicOn = this.isMusicOn;
            this.sceneTransition("victory", isMusicOn);
          });
        });
        this.physics.add.collider(this.sap, prefab, () => {
          this.endTree.setTexture("doortree");
          this.physics.add.collider(this.ball1, this.endTree, () => {
            let isMusicOn = this.isMusicOn;
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
        let isMusicOn = this.isMusicOn;
        if (this.buttonsOn <= 3) {
        this.sceneTransition("losing", isMusicOn);
        } else {
          this.sceneTransition("victory", isMusicOn);
        }
      }
    }); 

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
    bgMusic.stop();   
    bgMusic = this.sound.add('audio');
    bgMusic.setLoop(true);
    bgMusic.play();
    let isMusicOn = data.isMusicOn;
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
