import Phaser from "phaser";
import { CST } from '../CST';
import ButtonRxJS from '../game_objects/button';

const ButtonUp = 'play_button';
const ButtonHover = 'hover_button';
const ButtonDown = 'pressed_button';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  init(data) {
    console.log(data);
    console.log('I GOT IT');
  }

  create() {
    this.add.image(0, 0, 'loadtitle').setOrigin(0).setScale(.4);
    this.add.image(375, 50, 'logo').setDepth(1)

    // let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play_button').setOrigin(4.5, 5).setDepth(1).setScale(2);
  
    // playButton.setInteractive();
    // playButton.on('pointerover', (gameObj) => {
    //   console.log('Hover');
    // });
    // playButton.on('pointerout', () => {
    //   console.log('Out');
    // });
    // playButton.on('pointerup', () => {
    //   this.cameras.main.fadeOut(1000, 0, 0, 0);
    //   this.time.delayedCall(1000, () => {
    //     this.scene.start(CST.SCENES.GAME);
    //   })
    // })

    const button = new ButtonRxJS(this, 375, 125, ButtonUp)
			.setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setDepth(1).setScale(.2);
    const button1 = new ButtonRxJS(this, 375, 175, ButtonUp)
			.setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setDepth(1).setScale(.2);
    const button2 = new ButtonRxJS(this, 375, 225, ButtonUp)
			.setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setDepth(1).setScale(.2);
    const button3 = new ButtonRxJS(this, 375, 275, ButtonUp)
			.setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setDepth(1).setScale(.2);

		this.add.existing(button);
    this.add.existing(button1);
    this.add.existing(button2);
    this.add.existing(button3);

    // this.add.text(335, 185, 'Начать', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 24 })
		// .setDepth(2);
    this.add.text(305, 115, 'Достопримечательности', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 12 })
		.setDepth(2);
    this.add.text(325, 160, 'Курорты', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 24 })
		.setDepth(2);
    this.add.text(325, 210, 'История', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 24 })
		.setDepth(2);
    this.add.text(320, 265, 'Флора и Фауна', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 16 })
		.setDepth(2);

		button.onClick().subscribe(pointer => {
			this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start(CST.SCENES.GAME);
      })
		})
  }
}

export default MenuScene;