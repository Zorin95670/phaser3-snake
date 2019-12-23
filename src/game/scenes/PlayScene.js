import Phaser from 'phaser';
import Snake from '../../models/Snake';
import Food from '../../models/Food';
import Grid from '../../models/Grid';
import Constants from '../../models/Constants';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
    this.snake = null;
    this.food = null;
    this.cursors = null;
    this.grid = null;
    this.score = null;
  }

  preload() {
    this.load.image('body', 'img/body.png');
    this.load.image('head', 'img/head.png');
    this.load.image('food', 'img/food.png');
  }

  create() {
    this.grid = new Grid(Constants.game.block.WIDTH, Constants.game.block.HEIGHT);
    let location = this.grid.getRandomValidLocation();
    this.snake = new Snake(this, location.x + 0.5, location.y + 0.5);
    location = this.grid.getRandomValidLocation([location]);
    this.food = new Food(this, location.x + 0.5, location.y + 0.5);
    const graphics = this.add.graphics();
    Grid.drawGrid(graphics);
    this.score = this.add.text(5, 5, 'Score: 0', {
      fontSize: '16px',
      fill: Constants.color.SCORE,
    });

    //  Create our keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    if (!this.snake.alive) {
      return;
    }

    /**
     * Check which key is pressed, and then change the direction the snake
     * is heading based on that. The checks ensure you don't double-back
     * on yourself, for example if you're moving to the right and you press
     * the LEFT cursor, it ignores it, because the only valid directions you
     * can move in at that time is up and down.
     */
    if (this.cursors.left.isDown) {
      this.snake.faceLeft();
    } else if (this.cursors.right.isDown) {
      this.snake.faceRight();
    } else if (this.cursors.up.isDown) {
      this.snake.faceUp();
    } else if (this.cursors.down.isDown) {
      this.snake.faceDown();
    }

    //  If the snake updated, we need to check for collision against food
    if (this.snake.update(time) && this.snake.collideWithFood(this.food, this.score)) {
      const invalidLocations = this.snake.getLocations();
      const location = this.grid.getRandomValidLocation(invalidLocations);

      this.food.setPosition(
        (location.x + 0.5) * Constants.game.image.SIZE,
        (location.y + 0.5) * Constants.game.image.SIZE,
      );
    }
  }
}
