import Phaser from "phaser";
import { CST } from '../CST';
import ButtonRxJS from '../game_objects/button';

import bluebutton from '../../assets/images/UI PACK/LargeButton/UI-03.png';
import redbutton from '../../assets/images/UI PACK/LargeButton/UI-8.png';
import pressedbutton from '../../assets/images/UI PACK/LargeButton/UI-04.png';

import './info-scene.css';

const ButtonUp = 'play_button';
const ButtonHover = 'hover_button';
const ButtonDown = 'pressed_button';

class InfoScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.INFO });
  }

  init(data) {
    this.point_id = data.point_id;
    this.resort_id = data.resort_id;
  }

  preload() {
    this.load.image('play_button', bluebutton);
    this.load.image('hover_button', redbutton);
    this.load.image('pressed_button', pressedbutton);

    //rexui plugin initialization
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
  }

  create() {
    var tabs = this.rexUI.add.tabs({
      x: 400,
      y: 275,

      panel: this.rexUI.add.roundRectangle(0, 0, 400, 400, 15, 0x283593),

      topButtons: [
        this.rexUI.add.roundRectangle(0, 0, 100, 40, { tl: 15, tr: 15 }, 0x4c516d),
        this.rexUI.add.roundRectangle(0, 0, 100, 40, { tl: 15, tr: 15 }, 0x008ecc),
        this.rexUI.add.roundRectangle(0, 0, 100, 40, { tl: 15, tr: 15 }, 0x1034a6),
      ],

      space: {
        top: 20,
        topButtonsOffset: 40,
        topButton: 10,
      }
    }).layout();

    console.log(this);
  
    if(this.point_id == 1) {
      this.title = this.add.text(315, 30, 'Соленое Озеро', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 20, fontWeight: 'bold' } )
    } else if(this.point_id == 2) {
      this.title = this.add.text(315, 30, 'Григорьевское ущелье', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 20, fontWeight: 'bold' } )
    } else if(this.resort_id == 1) {
      this.title = this.add.text(315, 30, 'ЦО Радуга', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 20, fontWeight: 'bold' } )
    }
    
    this.print = this.add.text(245, 80, 'Фотографии', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 16 });
    this.print = this.add.text(365, 80, 'Описание', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 16 });
    this.print = this.add.text(475, 80, 'Услуги', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 16 });
      tabs
      .on('button.click', function (button, groupName, index) {
        // this.print.text += groupName + '-' + index + '\n';
        tabs.getElement('panel').setFillStyle(button.fillColor);
        console.log(tabs.getElement('panel'));
      }, this)

    const button = new ButtonRxJS(this, 90, 40, ButtonUp)
      .setDownTexture(ButtonDown)
      .setOverTexture(ButtonHover)
      .setDepth(1).setScale(.2);

    this.add.existing(button)

    this.add.text(55, 25, 'Назад', { color: 'white', fontFamily: 'Roboto, sans-serif', fontSize: 24 })
      .setDepth(2);

    button.onClick().subscribe(pointer => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.scene.start(CST.SCENES.GAME);
      })
    })
  }
}

export default InfoScene;