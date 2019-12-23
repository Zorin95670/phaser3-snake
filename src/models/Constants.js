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
}

export default Constants;
