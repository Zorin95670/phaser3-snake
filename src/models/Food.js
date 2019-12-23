import Phaser from 'phaser';
import Constants from './Constants';

const Food = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize(scene, x, y) {
    Phaser.GameObjects.Image.call(this, scene);

    this.setTexture('apple');
    this.setPosition(x * Constants.game.image.SIZE, y * Constants.game.image.SIZE);
    this.setOrigin(0.5);

    this.total = 0;
    this.multiplicator = 1;
    this.point = 1;
    this.action = 'grow';

    scene.children.add(this);
  },
  eating(score) {
    this.total += this.point;
    score.setText(`Score: ${this.total}`);
  },
});

export default Food;
