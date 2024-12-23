import * as THREE from 'three';
import { GAME_CONFIG } from './config.js';

export class TileManager {
  constructor(scene) {
    this.scene = scene;
    this.tiles = [];
    this.currentTile = null;
    this.speed = 1;
    this.direction = 1;
    this.tileSize = GAME_CONFIG.INITIAL_BOX_SIZE;
  }

  createTile(yPosition) {
    const geometry = new THREE.BoxGeometry(this.tileSize, GAME_CONFIG.BOX_HEIGHT, this.tileSize);
    const material = new THREE.MeshStandardMaterial({ 
      color: GAME_CONFIG.COLORS[Math.floor(Math.random() * GAME_CONFIG.COLORS.length)],
      roughness: 0.5,
      metalness: 0.1
    });
    
    const tile = new THREE.Mesh(geometry, material);
    tile.position.y = yPosition;
    tile.castShadow = true;
    tile.receiveShadow = true;
    
    this.scene.add(tile);
    return tile;
  }

  createInitialStack() {
    const baseBlock = this.createTile(0);
    baseBlock.position.set(0, 0, 0);
    this.tiles.push(baseBlock);
    this.spawnNewTile();
  }

  spawnNewTile() {
    const yPosition = (this.tiles.length + 1) * GAME_CONFIG.BOX_HEIGHT;
    this.currentTile = this.createTile(yPosition);
    this.currentTile.position.x = -10; // Start from left side
  }

  update() {
    if (!this.currentTile) return;

    // Move the current tile
    this.currentTile.position.x += this.speed * this.direction * 0.1;

    // Reverse direction at boundaries
    if (this.currentTile.position.x > 10) {
      this.direction = -1;
    } else if (this.currentTile.position.x < -10) {
      this.direction = 1;
    }
  }

  placeTile() {
    if (!this.currentTile) return false;

    const previousTile = this.tiles[this.tiles.length - 1];
    const overlap = this.checkOverlap(previousTile, this.currentTile);

    if (overlap > 0) {
      this.adjustTileSize(overlap);
      this.tiles.push(this.currentTile);
      return true;
    }

    // Remove the tile if placement fails
    this.scene.remove(this.currentTile);
    return false;
  }

  checkOverlap(previousTile, currentTile) {
    const previousBounds = {
      left: previousTile.position.x - previousTile.geometry.parameters.width / 2,
      right: previousTile.position.x + previousTile.geometry.parameters.width / 2
    };

    const currentBounds = {
      left: currentTile.position.x - currentTile.geometry.parameters.width / 2,
      right: currentTile.position.x + currentTile.geometry.parameters.width / 2
    };

    if (currentBounds.left > previousBounds.right || currentBounds.right < previousBounds.left) {
      return 0;
    }

    return Math.min(previousBounds.right - currentBounds.left, currentBounds.right - previousBounds.left);
  }

  adjustTileSize(overlap) {
    const newWidth = overlap;
    this.currentTile.scale.x = newWidth / this.currentTile.geometry.parameters.width;
    this.tileSize = newWidth;
  }

  resetStack() {
    this.tiles.forEach(tile => this.scene.remove(tile));
    this.tiles = [];
    this.currentTile = null;
    this.tileSize = GAME_CONFIG.INITIAL_BOX_SIZE;
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed;
  }
}