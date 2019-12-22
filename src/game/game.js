import Phaser from 'phaser';
import PlayScene from '@/game/scenes/PlayScene';
import Constants from '@/models/Constants';


function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.WEBGL,
    width: Constants.screen.WIDTH,
    height: Constants.screen.HEIGHT,
    parent: containerId,
    backgroundColor: Constants.color.BACKGROUND,
    scene: [PlayScene],
  });
}

export default launch;
export { launch };
