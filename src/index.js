import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import Phaser from "phaser";

import LoadScene from './phaser/load-scene';
import MenuScene from './phaser/menu-scene';
import GameScene from "./phaser/game-scene";

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  backgroundColor: '202020',  
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [LoadScene, GameScene],
  scale: {
    // mode: Phaser.Scale.MAX_ZOOM,
    // autoCenter: Phaser.Scale.CENTER_BOTH, 
    zoom: 2
  },
  physics: {
    default: 'matter',
    matter : {
      debug: true,
      gravity: { y: 0 }
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: 'matterCollision',
        mapping: 'matterCollision'
      }
    ]
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />
  , 
  document.getElementById("root") || document.createElement("div")
);
