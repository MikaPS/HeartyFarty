
class intro extends Phaser.Scene {
  constructor() {
    super('intro');
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.text = null;
    this.ball = null;
    this.shot = 0;
    this.track = 0;
  }

  preload() {
    this.load.image('ball', 'assets/BALL.png');
    this.load.image('basket', 'assets/Basket.png');
    this.load.image('button', 'assets/Next.png');
    this.load.image('wall', 'assets/Wall.png');
  }

  create() {
    // Create sprite and set its initial position
    this.sprite1 = this.add.sprite(200, 300, 'ball');
    this.sprite1.setOrigin(0.5);
    this.sprite1.setScale(.25);
    this.sprite2 = this.add.sprite(500, 300, 'ball');
    this.sprite2.setOrigin(0.5);
    this.sprite2.setScale(.25);
    // this.wall = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'wall');
    // this.wall.setOrigin(0.5, 0);
    // this.wall.setScale(0.01, 10000); // Adjust scale to desired width and height
    this.wall = this.physics.add.sprite(400, this.cameras.main.centerY, 'wall');
    // Create a graphics object for drawing the line
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x800080, 1); // Set fill style to purple
    this.graphics.fillRect(400, 0, 1, this.cameras.main.height);
    // Create a wall sprite
    this.physics.world.enable([this.sprite1, this.sprite2]);
    this.sprite1.body.setAllowGravity(false);
    this.sprite2.body.setAllowGravity(false);
    this.wall.body.setAllowGravity(false);

  // Set collisions between sprites and the wall
    this.physics.add.collider(this.sprite1, this.wall);
    this.physics.add.collider(this.sprite2, this.wall);
    this.wall.body.immovable = true;
    this.wall.body.enable = false;
    // Enable arrow key input
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    // Move the sprite2 based on arrow key input
    if (this.cursors.left.isDown) {
      this.sprite2.x -= 1; // Move left
    }
    if (this.cursors.right.isDown) {
      this.sprite2.x += 1; // Move right
    }
  
    if (this.cursors.up.isDown) {
      this.sprite2.y -= 1; // Move up
    }
    if (this.cursors.down.isDown) {
      this.sprite2.y += 1; // Move down
    }
  
    // Get keyboard input
    var keyboard = this.input.keyboard;
  
    // Move the sprite1 based on keyboard input
    if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown) {
      this.sprite1.x -= 1; // Move left
    }
    if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.sprite1.x += 1; // Move right
    }
    if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown) {
      this.sprite1.y -= 1; // Move up
    }
    if (keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown) {
      this.sprite1.y += 1; // Move down
    }
  }
}
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: [intro]
  };
  
  var game = new Phaser.Game(config);
