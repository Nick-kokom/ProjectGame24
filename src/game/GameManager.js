import * as THREE from 'three';
import { GAME_CONFIG } from './config.js';
import { SceneManager } from './SceneManager.js';
import { TileManager } from './TileManager.js';
import { UIManager } from './UIManager.js';

export class GameManager {
  constructor() {
    this.score = 0;
    this.currentLevel = 1;
    this.gameEnded = false;
    this.sceneManager = new SceneManager();
    this.tileManager = new TileManager(this.sceneManager.scene);
    this.uiManager = new UIManager();
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    // Removed createScene() call since scene is created in SceneManager constructor
    this.startGame();
    this.animate();
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') this.handleInput();
    });
    document.addEventListener('click', () => this.handleInput());
    this.uiManager.onStartClick(() => this.startGame());
  }

  startGame() {
    this.score = 0;
    this.currentLevel = 1;
    this.gameEnded = false;
    this.uiManager.hideGameOver();
    this.uiManager.updateScore(0);
    this.tileManager.resetStack();
    this.tileManager.createInitialStack();
  }

  handleInput() {
    if (this.gameEnded) return;

    const success = this.tileManager.placeTile();
    if (success) {
      this.score++;
      this.uiManager.updateScore(this.score);
      this.checkLevelProgress();
    } else {
      this.endGame();
    }
  }

  checkLevelProgress() {
    const currentLevelConfig = GAME_CONFIG.LEVELS[this.currentLevel];
    if (this.score >= currentLevelConfig.requiredTiles) {
      this.advanceLevel();
    } else {
      this.tileManager.spawnNewTile();
    }
  }

  advanceLevel() {
    this.currentLevel++;
    if (this.currentLevel > 5) {
      this.winGame();
      return;
    }
    this.tileManager.updateSpeed(GAME_CONFIG.LEVELS[this.currentLevel].speed);
    this.uiManager.showLevelMessage(this.currentLevel);
  }

  endGame() {
    this.gameEnded = true;
    this.uiManager.showGameOver(this.score);
  }

  winGame() {
    this.gameEnded = true;
    this.uiManager.showWinScreen(this.score);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (!this.gameEnded) {
      this.tileManager.update();
    }
    this.sceneManager.render();
  }
}