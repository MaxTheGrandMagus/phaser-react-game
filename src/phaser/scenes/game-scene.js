import Phaser from "phaser";
import { CST } from '../CST';

import terrain from "../../assets/terrain_atlas.png";
import street from '../../assets/Street.png';
import axe_gold from '../../assets/images/axe_gold.png';

import Player from "../game_objects/player";
import Axe from "../game_objects/axe";
import Coin from '../game_objects/coin';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }


  preload() {
    //for Player
    Player.preload(this);

    //for Axe
    Axe.preload(this);

    //for Coin
    Coin.preload(this);

    //map assets
    this.load.image('tiles', terrain);
    this.load.image('street', street);
    this.load.tilemapTiledJSON('game_map', 'src/assets/map.json');

    //map point
    // this.load.image('map_point', axe_gold);

    //rexui plugin initialization
    this.load.scenePlugin({
      key: 'rexuiplugin',
      url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      sceneKey: 'rexUI'
    });
  }
  

  create() {
    //scene transition
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    //creating player and axe
    this.player = new Player({ scene:this, x: 100, y: 100, texture: 'male', frame: '6.1idle_0' }).setDepth(1);
    this.axe1 = new Axe({ scene:this, x: 925, y: 1175, texture: 'axe', frame: 'axe_bronze', point_id: 1 }).setDepth(2);
    this.axe2 = new Axe({ scene:this, x: 2450, y: 190, texture: 'axe', frame: 'axe_gold', point_id: 2 }).setDepth(2);
    this.coin1 = new Coin({ scene:this, x: 1500, y: 510, texture: 'coin', frame: 'coin_gold', resort_id: 1 }).setDepth(2);

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
    // const map_point = this.matter.add.sprite(925, 1175, 'map_point', null, { label:'map_point' });
    // const map_point1 = this.matter.add.sprite(2450, 190, 'map_point', null, { label:'map_point1' });
    // map_point.setScale(.75).setFixedRotation().setStatic(true);
    // map_point1.setScale(.75).setFixedRotation().setStatic(true);

    let isCollided = false;

    this.matter.world.on('collisionstart', function(event, bodyA, bodyB) {
      isCollided = !isCollided;
      if (isCollided) {
        console.log('collided');
      }
      console.log(bodyA);
      console.log(bodyB);
      
      if(bodyB.label == 'axeCollider') {
        this.scene.start(CST.SCENES.INFO, { point_id: bodyB.point_id });
      }

      if(bodyB.label == 'coinCollider') {
        this.scene.start(CST.SCENES.INFO, { resort_id: bodyB.resort_id });
      }
    }, this)

    //added minimap 
    this.minimap = this.cameras.add(10, 200, 150, 150).setZoom(0.2).setName('mini');
    this.minimap.setBackgroundColor(0x002244).startFollow(this.player);
    this.minimap.scrollX = 1600;
    this.minimap.scrollY = 300;
  }


  update() {
    // console.log('update');

    this.player.update();

    this.axe1.update();
    this.axe2.update();
    
    this.coin1.update();
  }
}

export default GameScene;