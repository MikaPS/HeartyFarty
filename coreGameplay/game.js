class intro extends Phaser.Scene {
  constructor() {
    super('intro');
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.track = 0;
    this.currentSide = 1; // 0 past, 1 present
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('wall', 'assets/Wall.png');
    this.load.image('button', 'assets/Next.png');
    this.load.image('forest', 'assets/forest_path.png');

  }

  create() {
    this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
    this.cameras.main.setBackgroundColor('#000000');
    this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1).setAlpha(0.4);

  // Switch between past/present 
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

  // Level 1 design
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
  this.button1.setScale(.5,.1).setAlpha(0.6); // The idea is that overtime, something covered the button in the present
  this.button2 = this.physics.add.image(950, 500, 'wall');
  this.button2.body.setImmovable(true);
  this.button2.setScale(.5,.1); 

   // Set depth to 0
  this.ball1 = this.physics.add.image(430, 330, 'ball');
  this.ball2 = this.physics.add.image(850, 330, 'ball');
  this.wall = this.physics.add.image(800, 600, 'wall');
  this.wall.body.setImmovable(true);
  this.wall.setScale(.1,10);

  this.physics.add.collider(this.ball1, this.wall, () => {
  });
  this.physics.add.collider(this.ball2, this.wall, () => {
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
  this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
    this.gate1.setAlpha(0);
    this.gate2.setAlpha(0);
    this.physics.world.removeCollider(this.gate1Collision);
    this.physics.world.removeCollider(this.gate2Collision);
    this.isButtonOn = true;
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
  // Add collision detection between ball and basket

    let graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff, 1);
    // detect up and down arrow key presses
    const cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown', (event) => {
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
    if (this.isButtonOn == true) {
      this.button1.setAlpha(0);
      this.button2.setAlpha(0);
      this.physics.world.removeCollider(this.button1Collision);
      this.physics.world.removeCollider(this.button2Collision);
    }
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
    scene: [intro]
  };
  
  var game = new Phaser.Game(config);
