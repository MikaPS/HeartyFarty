/*
Includes at least main title and credits scenes, 
along with at least two more kinds of gameplay and/or menu scenes.
Some data must be communicated between scenes 
(how you perform in one scene impacts what is possible in another).
All narrative endings or levels in progression are reachable 
within the scene flow prototype.
Prototype demonstrates at least one kind of fancy transition between scenes.
 */

class Main_Title extends Phaser.Scene {
    constructor() {
      super('main_title');
    }

    preload() {

    }

    create() {
        this.add.rectangle(this.cameras.main.centerX,720,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            // this.scene.start("start_screen");
            });
        this.add.rectangle(this.cameras.main.centerX,920,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("options_screen");
            });
        this.add.rectangle(this.cameras.main.centerX,820,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("credits_screen");
            });

        this.add.text(this.cameras.main.centerX,380, "Title")
            .setFontSize(160)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
        this.add.text(this.cameras.main.centerX,720, "Play")
            .setFontSize(60)
            .setOrigin(0.5);

        this.add.text(this.cameras.main.centerX,820, "Options")
            .setFontSize(60)
            .setOrigin(0.5); 

        this.add.text(this.cameras.main.centerX,920, "Credits")
            .setFontSize(60)
            .setOrigin(0.5); 
    }

    update(){}
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
                this.offMusic.setAlpha(0.25);
                this.onMusic.setAlpha(1);
            });

        this.offMusic = this.add.rectangle(1490,450,200,90,0x000000).setAlpha(0.25)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.onMusic.setAlpha(0.25);
                this.offMusic.setAlpha(1);
            });

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
        this.add.rectangle(1410,80,300,90,0x000000)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
            this.scene.start("main_title");
            });
        this.add.text(1340, 55, "Back").setFontSize(60);
        this.add.text(this.cameras.main.centerX,this.cameras.main.centerY, "Programming:\nZane Chaplin, Mika Peer Shalem, Lynelle Goh\n\nMusic:\nZane Chaplin\n\nArt:\nSegolen Plihon")
            .setFontSize(58)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
    }

    update(){
        
    }
}

var config = {
    scene: [Main_Title, Credits_Screen, Options_Screen],
    // scene: [Credits_Screen],
    backgroundColor: 0x43D58C,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 1200
    },
  };
  
var game = new Phaser.Game(config);