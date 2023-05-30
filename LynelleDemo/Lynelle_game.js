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
        // Music on and off text
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
        this.add.text(this.cameras.main.centerX,this.cameras.main.centerY, "Programming:\nZane Chaplin, Mika Peer Shalem, Lynelle Goh\n\nMusic:\nZane Chaplin\n\nArt:\nSegolen Plihon")
            .setFontSize(58)
            .setOrigin(0.5); // using the above coordinates and this function will center
    
    }

    update(){
        
    }
}

var config = {
    scene: [Main_Title],
    backgroundColor: 0x43D58C,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 1200
    },
  };
  
var game = new Phaser.Game(config);