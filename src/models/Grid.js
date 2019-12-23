import Phaser from 'phaser';
import Constants from './Constants';

class Grid {
  constructor(width, height, invalidLocations = []) {
    const grid = Array(width)
      .fill(Array(height)
        .fill(true));
    invalidLocations.forEach((location) => {
      this.base[location.x][location.y] = false;
    });
    this.validLocations = [];
    grid.forEach((subGrid, x) => {
      subGrid.filter(value => value)
        .forEach((value, y) => {
          this.validLocations.push({
            x,
            y,
          });
        });
    });
  }

  getRandomValidLocation(invalidLocations = []) {
    const locations = this.validLocations.filter(
      valid => !invalidLocations.some(invalid => valid.x === invalid.x && valid.y === invalid.y),
    );
    return Phaser.Math.RND.pick(locations);
  }

  static drawGrid(graphic) {
    graphic.lineStyle(2, Constants.color.GRID, 1);
    graphic.beginPath();
    for (
      let i = Constants.game.image.SIZE;
      i <= Constants.game.image.SIZE * Constants.game.block.WIDTH;
      i += Constants.game.image.SIZE
    ) {
      graphic.moveTo(i, 0);
      graphic.lineTo(i, Constants.game.image.SIZE * Constants.game.block.WIDTH);
    }
    for (
      let i = Constants.game.image.SIZE;
      i <= Constants.game.image.SIZE * Constants.game.block.HEIGHT;
      i += Constants.game.image.SIZE
    ) {
      graphic.moveTo(0, i);
      graphic.lineTo(Constants.game.image.SIZE * Constants.game.block.HEIGHT, i);
    }

    graphic.strokePath();
    graphic.closePath();
  }
}

export default Grid;
