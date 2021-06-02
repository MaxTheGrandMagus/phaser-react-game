import Phaser from "phaser";
import { CST } from './CST';
import ButtonRxJS from '../phaser/button';

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

    const button = new ButtonRxJS(this, 400, 250, ButtonUp)
			.setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setOrigin(0.75, 1.75).setDepth(1).setScale(2);

		this.add.existing(button)

    // this.add.text(400, 250, 'Text over Button', { color: 'black' })
		// .setOrigin(0.5, 0.5)

		button.onClick().subscribe(pointer => {
			this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start(CST.SCENES.GAME);
      })
		})
  }
}

export default MenuScene;