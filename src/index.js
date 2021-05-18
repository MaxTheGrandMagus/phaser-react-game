import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

import Phaser from "phaser";
import PlayGame from "./phaser/scene";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  backgroundColor: '202020',
  width: 4096,
  height: 2048,
  scene: [PlayGame],
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
