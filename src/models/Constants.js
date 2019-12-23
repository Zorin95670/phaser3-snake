class Constants {
  static get direction() {
    return {
      UP: 0,
      DOWN: 1,
      LEFT: 2,
      RIGHT: 3,
    };
  }

  static get screen() {
    return {
      WIDTH: 480,
      HEIGHT: 480,
    };
  }

  static get game() {
    return {
      block: {
        WIDTH: 30,
        HEIGHT: 30,
      },
      SPEED: 100,
      image: {
        SIZE: 16,
      },
    };
  }

  static get color() {
    return {
      BACKGROUND: '#BFCC00',
      GRID: 0xDEE667,
      SCORE: '#000',
    };
  }

  static get foods() {
    return [{
      image: 'meat',
      min: 0,
      max: 1,
      point: 500,
      multiplicator: 10,
    }, {
      image: 'chicken',
      min: 2,
      max: 5,
      point: 100,
      multiplicator: 5,
    }, {
      image: 'strawberry',
      min: 6,
      max: 20,
      point: 10,
      multiplicator: 1,
    }, {
      image: 'water-melon',
      min: 21,
      max: 50,
      point: 5,
      multiplicator: 2,
    }, {
      image: 'apple',
      min: 51,
      max: 99,
      point: 1,
      multiplicator: 1,
    }];
  }
}

export default Constants;
