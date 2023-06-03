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
    this.currentSide = 1; // 0 present, 1 past
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('wall', 'assets/Wall.png');
    this.load.image('button', 'assets/Next.png');
    this.load.image('forest', 'assets/forest_path.png');

  }

  create(data) {
    
    // this is how we'll handle music
    // we're going to pass in the data
    let isMusicOn = data.isMusicOn;
    if (isMusicOn == 1) {
      // add in code here
    } else if (isMusicOn == 0){
      // add in code here
    };

    // Calculate the position to center the square horizontally
    var x = (this.cameras.main.width - 2000) / 2;

    // Calculate the position to center the square vertically
    var y = (this.cameras.main.height - 1500) / 2;

    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x0000);

    // add in square that fills the scene
    let large_rect = this.graphics.fillRect(x,y,2000,1500);

    // fade in the scene
    this.cameras.main.fadeIn(1800, 0, 0, 0);    

    // making a button that advances to the credits scene
    let advance = this.add.text(100,100, "Click me to win!")
      .setFontSize(60)
      .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.start('end_credits_screen');
        });


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
  this.button1.setScale(.5,.1).setAlpha(0.6); // The idea is that over time, something covered the button in the present
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
  // Colliding with second button will remove the gates and buttons
  this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
    this.gate1.setAlpha(0);
    this.gate2.setAlpha(0);
    this.physics.world.removeCollider(this.gate1Collision);
    this.physics.world.removeCollider(this.gate2Collision);
    this.isButtonOn = true;
  });

  // we're going to push these into a list so that i can fade them in
  // after my transition
  let fade_shape = [];
  fade_shape.push(this.ball1);
  fade_shape.push(this.ball2);

  this.ball1.setScale(0.7);
  this.ball2.setScale(0.7);
  this.wall.setScale(.1,10);
  this.ball1.setBounce(0);
  this.ball2.setBounce(0);
  this.wall.setBounce(0);
  this.ball1.setCollideWorldBounds(true);
  this.ball2.setCollideWorldBounds(true);
  this.wall.setCollideWorldBounds(true);

      // On screen controllers
      this.pastRightKey = this.add.rectangle(1520,1120,75,75, 0xff0000);
      this.pastDownKey = this.add.rectangle(1420,1120,75,75, 0xff0000)        
      this.pastLeftKey = this.add.rectangle(1320,1120,75,75, 0xff0000);
      this.pastUpKey = this.add.rectangle(1420,1020,75,75, 0xff0000);
      this.presentRightKey = this.add.rectangle(1520,1120,75,75, 0xff0000);
      this.presentDownKey = this.add.rectangle(1420,1120,75,75, 0xff0000)        
      this.presentLeftKey = this.add.rectangle(1320,1120,75,75, 0xff0000);
      this.presentUpKey = this.add.rectangle(1420,1020,75,75, 0xff0000);

  // adding into the queue the keys
  fade_shape.push(this.pastRightKey);
  fade_shape.push(this.pastDownKey);
  fade_shape.push(this.pastLeftKey);
  fade_shape.push(this.pastUpKey);
  fade_shape.push(this.presentRightKey);
  fade_shape.push(this.presentDownKey);
  fade_shape.push(this.presentLeftKey);
  fade_shape.push(this.presentUpKey);

  fade_shape.forEach(text => {
    text.alpha = 0;
  });
      
  // Add collision detection between ball and basket
    let graphics = this.add.graphics();
    graphics.lineStyle(4, 0xffffff, 1);
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

    // Tween chain to squish the rectangle into the diving line
    this.tweens.add({
      targets: this.graphics,
      delay: 150,
      duration: 1000,
      scaleX: 0.001,
      scaleY: 1,
      x: this.cameras.main.centerX,
      ease: 'Quad.easeInOut',
      onComplete: () => {
        // Tween to fade in the objects after the first tween
        fade_shape.forEach(text => {
          this.tweens.add({
            targets: text,
            duration: 500,
            alpha: 1,
          });
        });
      }
    });

  }

  update() {
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
