/// <reference path="./phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";

const config = {
  width: 500,
  height: 400,
  zoom: 1.3,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  pixelArt: true,
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: false
  },
  physics: {
      
      default: 'impact',
      impact: { gravity: 0 }
  },
  scene: [BootScene,MainMenuScene,GameScene]
};
  
export class Game extends Phaser.Game {
  constructor(config) {
    super(config);
  }
}

window.onload = () => {
  var game = new Game(config);
};