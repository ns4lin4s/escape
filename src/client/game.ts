/// <reference path="./phaser.d.ts"/>

import "phaser";
import { BootScene } from "./scenes/bootScene";
import { MainMenuScene } from "./scenes/mainMenuScene";
import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
    title: "Blockade",
    url: "https://github.com/digitsensitive/phaser3-typescript",
    version: "1.0",
    width: 356,
    height: 324,
    zoom: 1.5,
    type: Phaser.AUTO,
    parent: "game",
    scene: [BootScene,MainMenuScene,GameScene],
    input: {
      keyboard: true,
      mouse: true,
      touch: false,
      gamepad: false
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        
      }
    },
    backgroundColor: "#000000",
    //pixelArt: true,
    //antialias: false
  };
  
  export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
      super(config);
    }
  }
  
  window.onload = () => {
    var game = new Game(config);
  };