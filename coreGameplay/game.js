let level = 1;
class Victory extends Phaser.Scene {
  constructor() {
    super('victory');
  }
  preload() {
    this.load.image('forest', 'assets/forest_path.png');
  }
  create() {
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.add.text(450,400,"YOU WON!").setFontSize(150);
    if (level == 1) {
      this.add.text(600,600,"Next level?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 2;
          this.cameras.main.fade(500, 0,0,0);
          this.time.delayedCall(500, () => this.scene.start('intro'));
        });
    } else {
      this.add.text(600,600,"Restart?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 1;
          this.cameras.main.fade(500, 0,0,0);
          this.time.delayedCall(500, () => this.scene.start('intro'));
        });
    }
  }
}

class Losing extends Phaser.Scene {
  constructor() {
    super('losing');
  }
  preload() {
    this.load.image('forest', 'assets/forest_path.png');
  }
  create() {
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.add.text(450,400,"YOU LOST!").setFontSize(150);
    this.add.text(600,600,"Restart?").setFontSize(80)
      .setInteractive()
      .on('pointerdown', () => {
        this.cameras.main.fade(500, 0,0,0);
        this.time.delayedCall(500, () => this.scene.start('intro'));
      });
  }
}


class Intro extends Phaser.Scene {
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
    // level = 1;
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('wall', 'assets/Wall.png');
    this.load.image('button', 'assets/Next.png');
    this.load.image('forest', 'assets/forest_path.png');

  }

  create() {
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
    this.ball1 = this.physics.add.image(400, 150, 'ball');
    this.ball2 = this.physics.add.image(1200, 150, 'ball');
    this.wall = this.physics.add.image(800, 600, 'wall');
    this.wall.body.setImmovable(true);
    this.wall.setScale(.1,10);

    this.physics.add.collider(this.ball1, this.wall, () => {
    });
    this.physics.add.collider(this.ball2, this.wall, () => {
    });

    this.ball1.setScale(0.7);
    this.ball2.setScale(0.7);
    this.wall.setScale(.1,10);
    this.ball1.setBounce(0);
    this.ball2.setBounce(0);
    this.wall.setBounce(0);
    this.ball1.setCollideWorldBounds(true);
    this.ball2.setCollideWorldBounds(true);
    this.wall.setCollideWorldBounds(true);

    // Level 1 design
    if (level == 1) {
      // Create a gate for both players
      this.gate1 = this.physics.add.image(400, 600, 'wall');
      this.gate1.body.setImmovable(true);
      this.gate1.setScale(7.5,.1);
      this.gate2 = this.physics.add.image(1200, 600, 'wall');
      this.gate2.body.setImmovable(true);
      this.gate2.setScale(7.5,.1);
      // Button for both players, but in the past it's usable, and in the future it isn't
      this.button1 = this.physics.add.image(150, 500, 'wall');
      this.button1.body.setImmovable(true);
      this.button1.setScale(.5,.1).setAlpha(0.6); // The idea is that over time, something covered the button in the present
      this.button2 = this.physics.add.image(950, 500, 'wall');
      this.button2.body.setImmovable(true);
      this.button2.setScale(.5,.1); 

      // Gate collision
      this.gate1Collision = this.physics.add.collider(this.ball1, this.gate1, () => {
      });
      this.gate2Collision = this.physics.add.collider(this.ball2, this.gate2, () => {
      });
      // Button collision
      this.isButtonOn = false;
      this.button1Collision = this.physics.add.collider(this.ball1, this.button1, () => {
        
      });
      // Colliding with second button will remove the gates and buttons
      this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
        this.gate1.setAlpha(0);
        this.gate2.setAlpha(0);
        this.physics.world.removeCollider(this.gate1Collision);
        this.physics.world.removeCollider(this.gate2Collision);
        this.isButtonOn = true;
      });
    }
    // Level 2 Design
    if (level == 2) {
      // Create a gate for both players
      this.gate1 = this.physics.add.image(400, 600, 'wall');
      this.gate1.body.setImmovable(true);
      this.gate1.setScale(7.5,.1);
      this.gate2 = this.physics.add.image(1200, 600, 'wall');
      this.gate2.body.setImmovable(true);
      this.gate2.setScale(7.5,.1);
      // Button for both players, but in the past it's usable, and in the future it isn't
      this.button1 = this.physics.add.image(150, 500, 'wall');
      this.button1.body.setImmovable(true);
      this.button1.setScale(.5,.1).setAlpha(0.6); // The idea is that over time, something covered the button in the present
      this.button2 = this.physics.add.image(950, 500, 'wall');
      this.button2.body.setImmovable(true);
      this.button2.setScale(.5,.1); 
      // Cover the present button in barriers that will kill the player
      this.group = this.add.group();
      this.barrier1 = this.physics.add.image(80,500,'wall').setScale(0.4,0.15); this.barrier1.body.setImmovable(true); this.group.add(this.barrier1);
      this.barrier2 = this.physics.add.image(150,450,'wall').setScale(0.4,0.15); this.barrier2.body.setImmovable(true); this.group.add(this.barrier2);
      this.barrier3 = this.physics.add.image(150,550,'wall').setScale(0.4,0.15); this.barrier3.body.setImmovable(true); this.group.add(this.barrier3);
      this.barrier4 = this.physics.add.image(220,500,'wall').setScale(0.4,0.15); this.barrier4.body.setImmovable(true); this.group.add(this.barrier4);
      this.add.rectangle(80,500,40,40,0xff0000);
      this.add.rectangle(150,450,40,40,0xff0000);
      this.add.rectangle(150,550,40,40,0xff0000);
      this.add.rectangle(220,500,40,40,0xff0000);

      this.gate1Collision = this.physics.add.collider(this.ball1, this.group, () => {
        this.cameras.main.fade(500, 0,0,0);
        this.time.delayedCall(500, () => this.scene.start('losing'));
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
      // Colliding with second button will remove the gates and buttons
      this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
        this.gate1.setAlpha(0);
        this.gate2.setAlpha(0);
        this.physics.world.removeCollider(this.gate1Collision);
        this.physics.world.removeCollider(this.gate2Collision);
        this.isButtonOn = true;
      });
    }


    // On screen controllers
    this.pastRightKey = this.add.rectangle(1520,1120,75,75, 0xff0000);
    this.pastDownKey = this.add.rectangle(1420,1120,75,75, 0xff0000)        
    this.pastLeftKey = this.add.rectangle(1320,1120,75,75, 0xff0000);
    this.pastUpKey = this.add.rectangle(1420,1020,75,75, 0xff0000);
    this.presentRightKey = this.add.rectangle(1520,1120,75,75, 0xff0000);
    this.presentDownKey = this.add.rectangle(1420,1120,75,75, 0xff0000)        
    this.presentLeftKey = this.add.rectangle(1320,1120,75,75, 0xff0000);
    this.presentUpKey = this.add.rectangle(1420,1020,75,75, 0xff0000);


    // detect up and down arrow key presses
    const cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', (event) => {
      // if current side is the past, can control both characters
      if (this.currentSide == 0) {
        if (event.code === 'ArrowUp') {
          this.ball1.setVelocity(0, -150);
          this.ball2.setVelocity(0, -150);
        } else if (event.code === 'ArrowDown') {
          // move ball down
          this.ball1.setVelocity(0, 150);
          this.ball2.setVelocity(0, 150);
        } else if (event.code === 'ArrowLeft') {
          // move ball left
          this.ball1.setVelocity(-150, 0);
          this.ball2.setVelocity(-150, 0);
        } else if (event.code === 'ArrowRight') {
          // move ball right
          this.ball1.setVelocity(150, 0);
          this.ball2.setVelocity(150, 0);
        }
      // if current side is the present, can control one character
      } else {
        if (event.code === 'ArrowUp') {
          // stop moving left
          this.ball1.setVelocity(0, -150);
        }
        else if (event.code === 'ArrowDown') {
          // stop moving right
          this.ball1.setVelocity(0, 150);
        }
      
        else if (event.code === 'ArrowLeft') {
          // stop moving up
          this.ball1.setVelocity(-150, 0);
        }
        else if (event.code === 'ArrowRight') {
          // stop moving down
          this.ball1.setVelocity(150, 0);
        }
      }
    });
    
    this.input.keyboard.on('keyup', (event) => {
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
    // Move to new levels
    if (this.ball1.y >= 1150 && this.ball2.y >= 1150) {
        this.cameras.main.fade(500, 0,0,0);
        this.time.delayedCall(500, () => this.scene.start('victory'));
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
    })
    .on('pointerup', () => {
      // Stop player when button is released
      ball1.setVelocity(0);
      ball2.setVelocity(0);
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
    })
    .on('pointerup', () => {
      // Stop player when button is released
      ball1.setVelocity(0);
    });
  }
}

  var config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1600,
      height: 1200
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: [Intro, Losing, Victory]
  };
  
  var game = new Phaser.Game(config);
