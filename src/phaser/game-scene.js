import Phaser from "phaser";
import { CST } from './CST';

import terrain from "../assets/terrain_atlas.png";
import street from '../assets/Street.png';
import Player from "./player";
import axe_gold from '../assets/images/axe_gold.png';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }


  preload() {
    //for Player
    Player.preload(this);

    //map assets
    this.load.image('tiles', terrain);
    this.load.image('street', street);
    this.load.tilemapTiledJSON('game_map', 'src/assets/map.json');

    //map point
    this.load.image('map_point', axe_gold);
  }
  

  create() {
    //scene transition
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //creating player
    this.player = new Player({scene:this, x: 100, y: 100, texture: 'male', frame: '6.1idle_0'}).setDepth(1);

    //keyboard control for player
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

    //camera bounds
    this.cameras.main.setSize(760, 360).setName('main');

    //camera follow player
    this.cameras.main.startFollow(this.player);

    //adding map_point on the map
    const map_point = this.matter.add.sprite(2500, 300, 'map_point', null, { label:'map_point' });
    const map_point1 = this.matter.add.sprite(400, 400, 'map_point', null, { label:'map_point1' });
    map_point.setScale(.75).setFixedRotation().setStatic(true);
    map_point1.setScale(.75).setFixedRotation().setStatic(true);

    let isCollided = false;

    this.matter.world.on('collisionstart', function(event, bodyA, bodyB) {
      isCollided = !isCollided;
      if (isCollided) {
        console.log('collided');
      }
      console.log(bodyA);
      console.log(bodyB);
    })


    this.minimap = this.cameras.add(10, 200, 150, 150).setZoom(0.2).setName('mini');
    this.minimap.setBackgroundColor(0x002244).startFollow(this.player);
    this.minimap.scrollX = 1600;
    this.minimap.scrollY = 300;


  }


  update() {
    // console.log('update');

    this.player.update();
  }
}

export default GameScene;
