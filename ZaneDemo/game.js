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
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('wall', 'assets/Wall.png');
    this.load.image('button', 'assets/Next.png');
  }

  create() {
   // Set depth to 0
  this.ball1 = this.physics.add.image(30, 600, 'ball');
  this.ball2 = this.physics.add.image(450, 30, 'ball');
  this.wall = this.physics.add.image(400, 300, 'wall');
  this.wall.body.setImmovable(true);
  this.wall.setScale(.1,10);

  this.wall.setScale(.5);

  this.physics.add.collider(this.ball1, this.wall, () => {
  });
  this.physics.add.collider(this.ball2, this.wall, () => {
    //this.scene.start('level2B'); // Replace this with your desired action
  });
  this.add.text(150, 10, `Maybe you can knock the walls out of the way with your first attempt`, { font: '16px Arial', fill: '#ffffff' });
  this.ball1.setScale(0.5);
  this.ball2.setScale(0.5);
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
      if (event.code === 'ArrowUp') {
        this.ball1.setVelocity(0, -100);
        this.ball2.setVelocity(0, -100);
      } else if (event.code === 'ArrowDown') {
        // move ball down
        this.ball1.setVelocity(0, 100);
        this.ball2.setVelocity(0, 100);
      } else if (event.code === 'ArrowLeft') {
        // move ball left
        this.ball1.setVelocity(-100, 0);
        this.ball2.setVelocity(-100, 0);
      } else if (event.code === 'ArrowRight') {
        // move ball right
        this.ball1.setVelocity(100, 0);
        this.ball2.setVelocity(100, 0);
      }
      else if (event.code === 'KeyW') {
        // stop moving left
        this.ball1.setVelocity(0, -100);
      }
      else if (event.code === 'KeyS') {
        // stop moving right
        this.ball1.setVelocity(0, 100);
      }
    
      else if (event.code === 'KeyA') {
        // stop moving up
        this.ball1.setVelocity(-100, 0);
      }
      else if (event.code === 'KeyD') {
        // stop moving down
        this.ball1.setVelocity(100, 0);
      }
    });
    this.input.keyboard.on('keyup', (event) => {
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
      else if (event.code === 'KeyA') {
        // stop moving left
        this.ball1.setVelocity(0, 0);
      }
      else if (event.code === 'KeyD') {
        // stop moving right
        this.ball1.setVelocity(0, 0);
      }
      else if (event.code === 'KeyW') {
        // stop moving up
        this.ball1.setVelocity(0, 0);
      }
      else if (event.code === 'KeyS') {
        // stop moving down
        this.ball1.setVelocity(0, 0);
      }
    });
  }

  update() {
  }
}

  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: [intro]
  };
  
  var game = new Phaser.Game(config);
