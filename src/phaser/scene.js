import Phaser from "phaser";
import terrain from "../assets/terrain_atlas.png";
import street from '../assets/Street.png'
import Player from "./player";

class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }


  preload() {
    Player.preload(this);

    this.load.image('tiles', terrain);
    this.load.image('street', street);
    this.load.tilemapTiledJSON('game_map', 'src/assets/map.json');
  }
  

  create() {
    this.player = new Player({scene:this, x: 100, y: 100, texture: 'male', frame: '6.1idle_0'}).setDepth(1);

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    
    const map = this.make.tilemap({ key: 'game_map' });

    const tileset = map.addTilesetImage('terrain_atlas', 'tiles', 32, 32, 0, 0);
    const tileset2 = map.addTilesetImage('Street', 'street', 32, 32, 0, 0);

    const layer1 = map.createLayer('Слой тайлов 1', [tileset, tileset2], 0, 0);
    const layer2 = map.createLayer('Слой тайлов 2', [tileset, tileset2], 0, 0);

    layer1.setCollisionByProperty({collides: true});
    layer2.setCollisionByProperty({collides: true});
    this.matter.world.convertTilemapLayer(layer1);
    this.matter.world.convertTilemapLayer(layer2);

    this.cameras.main.setSize(760, 360)

    this.cameras.main.startFollow(this.player);
  }


  update() {
    // console.log('update');

    this.player.update();
  }
}

export default PlayGame;
