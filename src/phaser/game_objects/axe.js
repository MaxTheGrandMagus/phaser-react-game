export default class Axe extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame, point_id } = data;
    super(scene.matter.world, x, y, texture, frame, point_id);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var axeCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'axeCollider', point_id });
    var axeSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'axeSensor' });
    const compoundBody = Body.create({
      parts: [axeCollider, axeSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody)
    .setFixedRotation().setStatic(true).setScale(.75);
  }

  
  static preload(scene) {
    scene.load.atlas('axe', 'src/assets/images/axe/axe.png', 'src/assets/images/axe/axe_atlas.json');
    scene.load.animation('axe_anim', 'src/assets/images/axe/axe_anim.json');
  }


  update() {
    this.anims.play('axe_shine', true);
  }
}