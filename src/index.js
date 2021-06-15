import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import Phaser from "phaser";

import LoadScene from './phaser/scenes/load-scene';
import MenuScene from './phaser/scenes/menu-scene';
import GameScene from './phaser/scenes/game-scene';
import InfoScene from './phaser/scenes/info-scene';

import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';


export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  backgroundColor: '202020',  
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [
    LoadScene, 
    GameScene, 
    InfoScene
  ],
  scale: {
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
      },
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      },
    ]
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />
  , 
  document.getElementById("root") || document.createElement("div")
);