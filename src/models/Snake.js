import Phaser from 'phaser';
import Constants from '@/models/Constants';

const Snake = new Phaser.Class({
  initialize(scene, x, y) {
    this.headPosition = new Phaser.Geom.Point(x, y);

    this.body = scene.add.group();

    this.head = this.body.create(
      x * Constants.game.image.SIZE,
      y * Constants.game.image.SIZE,
      'head',
    );
    this.head.setOrigin(0.5);
    this.head.angle = 90;

    this.tail = new Phaser.Geom.Point(x, y);

    this.alive = true;

    this.speed = Constants.game.SPEED;

    this.moveTime = 0;

    this.heading = Constants.direction.RIGHT;
    this.direction = Constants.direction.RIGHT;
  },

  update(time) {
    if (time >= this.moveTime) {
      return this.move(time);
    }
    return false;
  },

  faceLeft() {
    if (this.direction === Constants.direction.UP
      || this.direction === Constants.direction.DOWN) {
      this.heading = Constants.direction.LEFT;
      this.head.angle = 270;
    }
  },

  faceRight() {
    if (this.direction === Constants.direction.UP
      || this.direction === Constants.direction.DOWN) {
      this.heading = Constants.direction.RIGHT;
      this.head.angle = 90;
    }
  },

  faceUp() {
    if (this.direction === Constants.direction.LEFT
      || this.direction === Constants.direction.RIGHT) {
      this.heading = Constants.direction.UP;
      this.head.angle = 0;
    }
  },

  faceDown() {
    if (this.direction === Constants.direction.LEFT
      || this.direction === Constants.direction.RIGHT) {
      this.heading = Constants.direction.DOWN;
      this.head.angle = 180;
    }
  },

  move(time) {
    /**
     * Based on the heading property (which is the direction the pgroup pressed)
     * we update the headPosition value accordingly.
     *
     * The Math.wrap call allow the snake to wrap around the screen, so when
     * it goes off any of the sides it re-appears on the other.
     */
    if (this.heading === Constants.direction.LEFT) {
      this.headPosition.x = Phaser.Math.Wrap(
        this.headPosition.x - 1,
        0,
        Constants.game.block.WIDTH,
      );
    } else if (this.heading === Constants.direction.RIGHT) {
      this.headPosition.x = Phaser.Math.Wrap(
        this.headPosition.x + 1,
        0,
        Constants.game.block.WIDTH,
      );
    } else if (this.heading === Constants.direction.UP) {
      this.headPosition.y = Phaser.Math.Wrap(
        this.headPosition.y - 1,
        0,
        Constants.game.block.HEIGHT,
      );
    } else if (this.heading === Constants.direction.DOWN) {
      this.headPosition.y = Phaser.Math.Wrap(
        this.headPosition.y + 1,
        0,
        Constants.game.block.HEIGHT,
      );
    }

    this.direction = this.heading;

    //  Update the body segments
    Phaser.Actions.ShiftPosition(
      this.body.getChildren(),
      this.headPosition.x * Constants.game.image.SIZE,
      this.headPosition.y * Constants.game.image.SIZE,
      1,
      this.tail,
    );
    const hitBody = Phaser.Actions.GetFirst(
      this.body.getChildren(),
      { x: this.head.x, y: this.head.y },
      1,
    );

    if (hitBody) {
      this.alive = false;
      return false;
    }
    //  Update the timer ready for the next movement
    this.moveTime = time + this.speed;

    return true;
  },
  eat(action, times) {
    if (action === 'grow') {
      for (let i = 0; i < times; i += 1) {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'body');
        newPart.setOrigin(0.5);
      }
    }
  },
  collideWithFood(food, score) {
    if (this.head.x === food.x && this.head.y === food.y) {
      this.eat(food.action, food.multiplicator);

      food.eating(score);

      return true;
    }
    return false;
  },

  getLocations() {
    const locations = [];
    this.body.children.each((segment) => {
      locations.push({
        x: segment.x / Constants.game.image.SIZE - 0.5,
        y: segment.y / Constants.game.image.SIZE - 0.5,
      });
    });
    return locations;
  },
});


export default Snake;
