import Phaser from 'phaser';
import Constants from './Constants';

class FoodGenerator {
  static generate(food) {
    const value = Phaser.Math.Between(0, 99);
    const item = Constants.foods.find(conf => value >= conf.min && value <= conf.max);
    console.log(value, item);

    food.setTexture(item.image);
    food.multiplicator = item.multiplicator;
    food.point = item.point;
  }
}

export default FoodGenerator;
