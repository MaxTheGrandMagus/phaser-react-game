export default class Coin extends Phaser.Physics.Matter.Sprite {
    constructor(data) {
      let { scene, x, y, texture, frame, resort_id } = data;
      super(scene.matter.world, x, y, texture, frame, resort_id);
      this.scene.add.existing(this);
  
      const { Body, Bodies } = Phaser.Physics.Matter.Matter;
      var coinCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'coinCollider', resort_id });
      var coinSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'coinSensor' });
      const compoundBody = Body.create({
        parts: [coinCollider, coinSensor],
        frictionAir: 0.35,
      });
      this.setExistingBody(compoundBody)
      .setFixedRotation().setStatic(true).setScale(.75);
    }
  
    
    static preload(scene) {
      scene.load.atlas('coin', 'src/assets/images/coin/coin.png', 'src/assets/images/coin/coin_atlas.json');
      scene.load.animation('coin_anim', 'src/assets/images/coin/coin_anim.json');
    }
  
  
    update() {
      this.anims.play('coin_shine', true);
    }
  }