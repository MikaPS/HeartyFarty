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
class Main_Title extends Phaser.Scene {
    constructor() {
      super('main_title');
    }

    preload() {

    }

    create() {
        let start_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("start_screen");
            });
        let credits_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("credits_screen");
            });
        let options_rect = this.add.rectangle(this.cameras.main.centerX,this.cameras.main.height + 100,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("options_screen");
            });

        // we should do a fade in for the title
        let title_text =this.add.text(this.cameras.main.centerX,380, "Title")
            .setFontSize(160)
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
    }

    update(){}
}

class Start_Screen extends Phaser.Scene {
    constructor() {
        super('start_screen');
    }
    preload() {}
    create() {
        // Music
        this.music = this.add.rectangle(1510,80,80,60,0x000000).setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.music.alpha > 0){
                    this.scene.start("options_screen");
                }
            });
        this.musicTxt = this.add.text(1480, 60, "🎵").setFontSize(50).setAlpha(0)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.musicTxt.alpha > 0){
                    this.scene.start("options_screen");
                }
            });
        

        // music is turned off
        this.noMusic = this.add.rectangle(1510, 80, 60,10, 0xff0000).setAngle(-50).setAlpha(0);
        

        // Main menu
        this.main = this.add.rectangle(1400,80,80,60,0x000000).setAlpha(0)
        .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.main.alpha > 0){
                    this.scene.start("main_title");
                }
            });
        this.mainTxt = this.add.text(1370, 60, "㊂").setFontSize(50).setAlpha(0)
        .setInteractive({useHandCursor: true})
        .on('pointerdown', () => {
            if (this.mainTxt.alpha > 0){
                this.scene.start("main_title");
            }
        });

        this.dots = this.add.text(1405, 45, "...").setFontSize(60).setDepth(1);
        this.options = this.add.rectangle(1460,80,190,60,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.options.setAlpha(0);
                this.dots.setAlpha(0);
                this.tweens.add({
                    targets: [this.options, this.dots],
                    alpha: 0,
                    duration: 300,
                    delay: 100,
                    ease: 'Power2',
                    onComplete: () => {
                    }
                });

                this.tweens.add({
                    targets: [this.music, this.main, this.musicTxt, this.mainTxt],
                    alpha: 1,
                    duration: 100,
                    delay: 200,
                    ease: 'Power2',
                    onComplete: () => {
                    }
                });
                if (isMusicOn == 0) {
                    this.tweens.add({
                        targets: [ this.noMusic ],
                        alpha: 1,
                        duration: 100,
                        delay: 200,
                        ease: 'Power2',
                        onComplete: () => {
                        }
                    });
                }
            });
        
        
        

    }
    update() {}
}

class Options_Screen extends Phaser.Scene {
    constructor() {
        super('options_screen');
    }

    preload(){}

    // i want the on and off buttons to be light or dark
    create(){
        // Go back to main screen
        this.add.rectangle(1410,80,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("main_title");
            });
        this.add.text(1340, 55, "Back").setFontSize(60);
        // Music on and off text
        this.onMusic = this.add.rectangle(1210,450,200,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                isMusicOn = 1;
                this.offMusic.setAlpha(0.25);
                this.onMusic.setAlpha(1);
            });

        this.offMusic = this.add.rectangle(1490,450,200,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                isMusicOn = 0; 
                this.onMusic.setAlpha(0.25);
                this.offMusic.setAlpha(1);
            });
            if (isMusicOn == 1) {
                this.onMusic.setAlpha(1);
                this.offMusic.setAlpha(0.25);
            } else {
                this.onMusic.setAlpha(0.25);
                this.offMusic.setAlpha(1);
            }

        this.add.text(300,450, "Music:")
            .setFontSize(100)
            .setOrigin(0.5);

        this.add.text(1200,450, "On")
            .setFontSize(100)
            .setOrigin(0.5);
        
        this.add.text(1490,450, "Off")
            .setFontSize(100)
            .setOrigin(0.5);

        this.add.text(1340,450, " / ")
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
        this.add.text(600,850, "Closed Captions:")
            .setFontSize(100)
            .setOrigin(0.5);

        this.add.text(1200,850, "On")
            .setFontSize(100)
            .setOrigin(0.5);
        
        this.add.text(1490,850, "Off")
            .setFontSize(100)
            .setOrigin(0.5);

        this.add.text(1340,850, " / ")
            .setFontSize(100)
            .setOrigin(0.5);
    }

    update(){
        
    }
}

class Credits_Screen extends Phaser.Scene {
    constructor() {
        super('credits_screen');
    }

    preload(){}

    create(data){
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
        this.tweens.add({
            targets: [credit_text, credits_back_rect, back_text],
            alpha: 1, 
            duration: 1500, 
            ease: 'Quart', 
        });
          
    }

    update(){
        
    }
}

var config = {
    scene: [Main_Title, Credits_Screen, Options_Screen, Start_Screen],
    // scene: [Start_Screen],
    backgroundColor: 0x43D58C,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 1200
    },
  };
  
var game = new Phaser.Game(config);