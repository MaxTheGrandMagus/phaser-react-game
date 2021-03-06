import Phaser from "phaser";
import { CST } from '../CST';
import MenuScene from "../scenes/menu-scene";

import issykkul from "../../assets/images/issyk-kul.png";
import bluebutton from '../../assets/images/UI PACK/LargeButton/UI-03.png';
import redbutton from '../../assets/images/UI PACK/LargeButton/UI-8.png';
import pressedbutton from '../../assets/images/UI PACK/LargeButton/UI-04.png';
import logo from '../../assets/images/logo.png';

class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  init() {

  }

  preload() {             
    this.load.image('loadtitle', issykkul);

    this.load.image('play_button', bluebutton);
    this.load.image('hover_button', redbutton);
    this.load.image('pressed_button', pressedbutton);

    this.load.image('logo', logo);

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff //white
      }
    })
    for(let i=0; i<100; i++) {
      
    }
    this.load.on('progress', (percent) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
      console.log(percent);
    })

    this.load.on('complete', () => {
      console.log('done');
    })
  }

  create() {
    this.scene.add(CST.SCENES.MENU, MenuScene, false);
    this.scene.start(CST.SCENES.MENU, 'HELLO FROM LOADSCENE');
  }
}

export default LoadScene;