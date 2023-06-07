/*
Includes at least main title and credits scenes, 
along with at least two more kinds of gameplay and/or menu scenes.
Some data must be communicated between scenes 
(how you perform in one scene impacts what is possible in another).
All narrative endings or levels in progression are reachable 
within the scene flow prototype.
Prototype demonstrates at least one kind of fancy transition between scenes.
 */

// Global vars to check music status
let isMusicOn = 1; // 1 = true
let bgMusic;
class Main_Title extends TweenScene {
    constructor() {
      super('main_title');
    }

    preload() {
        this.load.image('clock', '../assets/Clock/Fullclock.png');
        this.load.image('forest', '../assets/forest_path.png');
        this.load.image('leftorb', '../assets/Leftorb.png');
        this.load.image('rightorb', '../assets/Rightorb.png');
        this.load.image('orb', '../assets/Crackedorb.png');
        this.load.audio('bgMusic', '../assets/Music/bgMusic.mp3');
    }

    create() {
        // Music
        bgMusic = this.sound.add('bgMusic');
        bgMusic.setLoop(true);
        bgMusic.play();

        // Option to have full screen
        this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
        const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
        this.fullScreen(fullScreen);

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


        let start_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                // Clock transition when clicking the start button
                this.clock = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "clock").setScale(0.05);
            
                this.tweens.add({
                    targets: this.clock,
                    angle: 360,
                    scale: 2.8,
                    duration: 1500, 
                    ease: 'Linear',
                    onComplete: () => { this.scene.start("instructions", {isMusicOn}); }
                });
            });
        let credits_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                // Clock transition when clicking the start button
                this.clock = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "clock").setScale(0.05);
            
                this.tweens.add({
                    targets: this.clock,
                    angle: 360,
                    scale: 2.8,
                    duration: 1500, 
                    ease: 'Linear',
                    onComplete: () => { this.scene.start("credits_screen"); }
                });
            });
        let options_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                // Clock transition when clicking the start button
                this.clock = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "clock").setScale(0.05);
            
                this.tweens.add({
                    targets: this.clock,
                    angle: 360,
                    scale: 2.8,
                    duration: 1500, 
                    ease: 'Linear',
                    onComplete: () => { this.scene.start("options_screen"); }
                });
            });

        // we should do a fade in for the title
        let title_text =this.add.text(this.cameras.main.centerX,380, "Time Split")
            .setFontSize(140)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
        let play_text =this.add.text(this.cameras.main.centerX,this.cameras.main.height + 100, "Play")
            .setFontSize(60)
            .setOrigin(0.5);

        let options_text = this.add.text(this.cameras.main.centerX,this.cameras.main.height + 100, "Options")
            .setFontSize(60)
            .setOrigin(0.5); 

        let credits_text =this.add.text(this.cameras.main.centerX,this.cameras.main.height + 100, "Credits")
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

        this.tweens.add({
            // tween for options button
            targets: [options_rect, options_text],
            x: this.cameras.main.centerX,
            y: 820,
            duration: 2000,
            delay: 1000,
            ease: 'Expo',
        });

        this.tweens.add({
            // tween for options button
            targets: [credits_rect, credits_text],
            x: this.cameras.main.centerX,
            y: 920,
            duration: 2000,
            delay: 1500,
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

class Start_Screen extends TweenScene {
    constructor() {
        super('start_screen');
    }
    preload() {}
    create() {
        // Option to have full screen
        this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
        const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
        this.fullScreen(fullScreen);

        // Music
        this.music = this.add.rectangle(1510,80,80,60,0x000000).setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.music.alpha > 0){
                    this.cameras.main.fadeOut(900);
                    this.time.delayedCall(900, () => this.scene.start('options_screen'));

                }
            });
        this.musicTxt = this.add.text(1480, 60, "🎵").setFontSize(50).setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.musicTxt.alpha > 0){
                    this.cameras.main.fadeOut(900);
                    this.time.delayedCall(900, () => this.scene.start('options_screen'));
                }
            });
        

        // music is turned off
        this.noMusic = this.add.rectangle(1510, 80, 60,10, 0xff0000).setAngle(-50).setAlpha(0);
        

        // Main menu
        this.main = this.add.rectangle(1400,80,80,60,0x000000).setAlpha(0)
        .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.main.alpha > 0){
                    this.cameras.main.fadeOut(900);
                    this.time.delayedCall(900, () => this.scene.start('main_title'));
                }
            });
        this.mainTxt = this.add.text(1370, 60, "㊂").setFontSize(50).setAlpha(0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (this.mainTxt.alpha > 0){
                this.cameras.main.fadeOut(900);
                this.time.delayedCall(900, () => this.scene.start('main_title'));
            }
        });

        this.dots = this.add.text(1405, 45, "...").setFontSize(60).setDepth(1);
        this.options = this.add.rectangle(1460,80,190,60,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.options.setAlpha(0);
                this.dots.setAlpha(0);
                this.fade_out([this.options, this.dots], 100, 300);
                this.fade_in([this.music, this.main, this.musicTxt, this.mainTxt], 200, 100);
                if (isMusicOn == 0) {
                    isMusicOn.pause();
                    this.fade_in(this.noMusic, 100, 200);
                }
            });
        
        
        

    }
    update() {}
}

class Options_Screen extends TweenScene {
    constructor() {
        super('options_screen');
    }

    preload(){
        this.load.image('forest', '../assets/forest_path.png');
    }

    // i want the on and off buttons to be light or dark
    create(){
        // Option to have full screen
        this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
        const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
        this.fullScreen(fullScreen);

        this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
        this.cameras.main.setBackgroundColor('#000000');
        this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1).setAlpha(0.4);

         // Clock transition on entering the scene
         this.clock = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "clock").setScale(3.2);

         this.tweens.add({
             targets: this.clock,
             angle: 360,
             scale: 0.2,
             duration: 1500, 
             ease: 'Linear',
             onComplete: () => { this.clock.setAlpha(0); }
         });
        // creating a text array for the text and button
        let fade_objects = [];

        // Go back to main screen
        let a = this.add.rectangle(1410,80,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("main_title");
            });
        let b = this.add.text(1340, 55, "Back").setFontSize(60);

        // Music on and off text
        this.onMusic = this.add.rectangle(1210,450,200,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                isMusicOn = 1;
                console.log("this.onMusic? ", isMusicOn);
                bgMusic.play();
                this.offMusic.setAlpha(0.25);
                this.onMusic.setAlpha(1);
            });

        this.offMusic = this.add.rectangle(1490,450,200,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                isMusicOn = 0; 
                console.log("this.offMusic? ", isMusicOn);
                bgMusic.pause();
                this.onMusic.setAlpha(0.25);
                this.offMusic.setAlpha(1);
            });
            if (isMusicOn == 1) {
                console.log("Options Music play?: ", isMusicOn);
                bgMusic.play();
                this.onMusic.setAlpha(1);
                this.offMusic.setAlpha(0.25);
            } else {
                console.log("Options Music pause?: ", isMusicOn);
                bgMusic.pause(); 
                this.onMusic.setAlpha(0.25);
                this.offMusic.setAlpha(1);
            }

        let c = this.add.text(300,450, "Music:")
            .setFontSize(100)
            .setOrigin(0.5);

        let d =this.add.text(1200,450, "On")
            .setFontSize(100)
            .setOrigin(0.5);
        
        let e= this.add.text(1490,450, "Off")
            .setFontSize(100)
            .setOrigin(0.5);

        let f=this.add.text(1340,450, " / ")
            .setFontSize(100)
            .setOrigin(0.5);

        // Captions
        this.onCap = this.add.rectangle(1210,850,200,90,0x000000)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.offCap.setAlpha(0.25);
            this.onCap.setAlpha(1);
        });

        this.offCap = this.add.rectangle(1490,850,200,90,0x000000).setAlpha(0.25)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            this.onCap.setAlpha(0.25);
            this.offCap.setAlpha(1);
        });
        let i =this.add.text(600,850, "Closed Captions:")
            .setFontSize(100)
            .setOrigin(0.5);

        let j=this.add.text(1200,850, "On")
            .setFontSize(100)
            .setOrigin(0.5);
        
        let k=this.add.text(1490,850, "Off")
            .setFontSize(100)
            .setOrigin(0.5);

        let l=this.add.text(1340,850, " / ")
            .setFontSize(100)
            .setOrigin(0.5);

        // push the variables into the array
        // i am so sorry for its ungliness
        fade_objects.push(a);
        fade_objects.push(b);
        fade_objects.push(f);
        fade_objects.push(e);
        fade_objects.push(d);
        fade_objects.push(c);
        fade_objects.push(i);
        fade_objects.push(j);
        fade_objects.push(k);
        fade_objects.push(l);
        fade_objects.push(this.onMusic);
        fade_objects.push(this.onCap);
        fade_objects.push(this.offMusic);
        fade_objects.push(this.offCap);

        // make all the objects have an alpha of 0
        fade_objects.forEach(text => {
            text.alpha = 0;
          });

        // tween animation for options text and back button
        this.fade_in(fade_objects,1900,1700)
        this.tweens.add({
            targets: [this.offCap, this.offMusic],
            alpha: 0.25,
            delay: 1900,
            duration: 1700,
            ease: 'Quart'
        });
    }

    update(){
        
    }
}

class Credits_Screen extends TweenScene {
    constructor() {
        super('credits_screen');
    }

    preload(){
        this.load.image('forest', '../assets/forest_path.png');
    }

    create(){
        // Option to have full screen
        this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
        const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
        this.fullScreen(fullScreen);

        this.leftBg = this.add.image(370,570, "forest").setScale(1.9).setDepth(-1);
        this.cameras.main.setBackgroundColor('#000000');
        this.rightBg = this.add.image(1220,570, "forest").setScale(1.9).setDepth(-1).setAlpha(0.4);

        // Clock transition on entering the scene
        this.clock = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "clock").setScale(3.2);

        this.tweens.add({
            targets: this.clock,
            angle: 360,
            scale: 0.2,
            duration: 1500, 
            ease: 'Linear',
            onComplete: () => { this.clock.setAlpha(0); }
        });
        // Go back to main screen
        let credits_back_rect = this.add.rectangle(1410,80,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("main_title");
            });
        credits_back_rect.alpha = 0;
        
        let back_text = this.add.text(1340, 55, "Back").setFontSize(60);
        back_text.alpha = 0;

        // text for the credits
        let credit_text = this.add.text(this.cameras.main.centerX,this.cameras.main.centerY, "Programming:\nZane Chaplin, Mika Peer Shalem, Lynelle Goh\n\nMusic:\nZane Chaplin\n\nArt:\nSegolen Plihon")
            .setFontSize(58)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
        credit_text.alpha = 0;

        // tween for the credits text and the back button
        this.fade_in([credit_text, credits_back_rect, back_text],1900,1700 );
          
    }

    update(){
        
    }
}

class Ending_Credits_Screen extends TweenScene {
    constructor() {
        super('end_credits_screen');
    }

    create() {
        // Option to have full screen
        this.add.text(1505,1120, "full\nscreen").setDepth(1).setFontSize(20);
        const fullScreen = this.add.rectangle(1540, 1140, 75, 75, 0xff0000)
        this.fullScreen(fullScreen);

        // create the text
        let end_credit_text = this.add.text(this.cameras.main.centerX,this.cameras.main.height + 230, "Programming:\nZane Chaplin, Mika Peer Shalem, Lynelle Goh\n\nMusic:\nZane Chaplin\n\nArt:\nSegolen Plihon")
            .setFontSize(58)
            .setOrigin(0.5); 

        // tween to slide the text all the way up and destroy
        this.tweens.add({
            targets: end_credit_text,
            y: -end_credit_text.height,
            duration: 8300,
            ease: 'Linear',
            onComplete: () => {
                end_credit_text.destroy();
                this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Return to menu?")
                    .setFontSize(58)
                    .setOrigin(0.5)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerdown', () => {
                        this.scene.start('main_title');
                    });
            }
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
    scene: [Main_Title, Instructions, Intro, Victory, Losing, Options_Screen, Credits_Screen, Ending_Credits_Screen]
    // Main_Title, Instructions, Intro, Victory, Losing, Options_Screen, Credits_Screen, Ending_Credits_Screen
  };
  
  var game = new Phaser.Game(config);
