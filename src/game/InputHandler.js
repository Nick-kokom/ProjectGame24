import * as THREE from 'three';

export class InputHandler {
  constructor(camera, tileManager) {
    this.camera = camera;
    this.tileManager = tileManager;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('click', (event) => this.handleClick(event));
    window.addEventListener('touchstart', (event) => this.handleTouch(event));
  }

  handleClick(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.checkTileInteraction();
  }

  handleTouch(event) {
    event.preventDefault();
    const touch = event.touches[0];
    this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    this.checkTileInteraction();
  }

  checkTileInteraction() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.tileManager.tiles.map(tile => tile.mesh)
    );

    if (intersects.length > 0) {
      const clickedTile = this.tileManager.tiles.find(
        tile => tile.mesh === intersects[0].object
      );
      if (clickedTile) {
        this.tileManager.handleTileClick(clickedTile);
      }
    }
  }
}