import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GameState } from './GameState.js';
import { TileManager } from './TileManager.js';
import { PhysicsWorld } from './PhysicsWorld.js';
import { createScene } from './SceneSetup.js';
import { InputHandler } from './InputHandler.js';

export class Game {
  constructor() {
    this.gameState = new GameState();
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    const { scene, camera, renderer } = createScene();
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.physicsWorld = new PhysicsWorld();
    this.tileManager = new TileManager(this.scene, this.physicsWorld);
    this.inputHandler = new InputHandler(this.camera, this.tileManager);

    this.setupLights();
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);
  }

  animate() {
    const delta = this.clock.getDelta();
    
    this.physicsWorld.update(delta);
    this.tileManager.update(delta);
    this.gameState.update(delta);
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }
}