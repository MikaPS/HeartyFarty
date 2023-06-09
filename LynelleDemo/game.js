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
  }
  create(data) {
    let isMusicOn = data.isMusicOn;

    // Option to have full screen
    this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
    const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
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
      this.add.text(600,600,"Restart?").setFontSize(80)
        .setInteractive()
        .on('pointerdown', () => {
          level = 1;
          console.log("Winning: ", isMusicOn);
          this.sceneTransition("main_title", isMusicOn);
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
  }
  create(data) {
    let isMusicOn = data.isMusicOn;
    // Option to have full screen
    this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
    const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
    this.fullScreen(fullScreen);
    
    this.bg = this.add.image(800,100, "forest").setScale(3.6).setDepth(-1);
    this.add.text(450,400,"YOU LOST!").setFontSize(150);
    this.add.text(600,600,"Restart?").setFontSize(80)
      .setInteractive()
      .on('pointerdown', () => {
        console.log("Losing: ", isMusicOn);
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
  }

  preload() {
    this.load.image('ball', '../assets/Player/RFront.png');
    this.load.image('wall', '../assets/Wall.png');
    this.load.image('forest', '../assets/forest_path.png');
    this.load.image('water', '../assets/Water/water3.png');
    this.load.image('arrowkey', '../assets/Keys/arrowkey.png');
    this.load.image('waterkey', '../assets/Keys/waterkey.png');
  }

  create(data) {
    // Option to have full screen
    this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
    const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
    this.fullScreen(fullScreen);
    
    // this is how we'll handle music
    // we're going to pass in the data
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

    

    // Calculate the position to center the square horizontally
    var x = (this.cameras.main.width - 2000) / 2;

    // Calculate the position to center the square vertically
    var y = (this.cameras.main.height - 1500) / 2;

    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x0000);

    // add in square that fills the scene
    let large_rect = this.graphics.fillRect(x,y,2000,1500).setDepth(3);

    // fade in the scene
    this.cameras.main.fadeIn(1800, 0, 0, 0);    

     // Tween chain to squish the rectangle into the diving line
     this.tweens.add({
      targets: this.graphics,
      delay: 150,
      duration: 1500,
      scaleX: 0.001,
      scaleY: 1,
      x: this.cameras.main.centerX,
      ease: 'Quad.easeInOut',
    });

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

    this.ball1.setScale(0.6).setDepth(1);
    this.ball2.setScale(0.6).setDepth(1);
    this.wall.setScale(.1,10).setDepth(1);
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
      const graphics = this.add.graphics();
      graphics.lineStyle(5,0xff0000); // set color of squares
      graphics.strokeRect(60,480,40,40); 
      graphics.strokeRect(130,430,40,40); 
      graphics.strokeRect(130,530,40,40); 
      graphics.strokeRect(200,480,40,40); 

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
      // Colliding with second button will remove the gates and buttons
      this.button2Collision = this.physics.add.collider(this.ball2, this.button2, () => {
        this.gate1.setAlpha(0);
        this.gate2.setAlpha(0);
        this.physics.world.removeCollider(this.gate1Collision);
        this.physics.world.removeCollider(this.gate2Collision);
        this.isButtonOn = true;
      });
    }
    if (level == 3) {
      // prefab
      this.water = this.add.image(170,1040,"waterkey").setScale(0.22).setDepth(2)
        .setInteractive()
        .on('pointerdown', () => {
          this.createWater();
        });      

      this.dirt = this.physics.add.image(1400, 550, "wall").setScale(0.65,0.25);
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
    // Music
    if (this.isMusicOn == 1) {
      this.noMusic.setAlpha(0);
    } else if (this.isMusicOn == 0){
      this.noMusic.setAlpha(1);
    }
    // Move to new levels
    if (this.ball1.y >= 1000 && this.ball2.y >= 1000) {
      let isMusicOn = this.isMusicOn;
      this.sceneTransition("victory", isMusicOn);
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

  createWater() {
    // Define the x and y positions for the prefabs
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
      this.gate2Collision = this.physics.add.collider(this.dirt, prefab, () => {
        this.add.rectangle(500,1200,200,200,0x00ff00);
      });
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

class Instructions extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  create(data) {
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

    let isMusicOn = data.isMusicOn;
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
  // };
  
  // var game = new Phaser.Game(config);
