export class GameState {
    constructor() {
      this.floor = 1;
      this.score = 0;
      this.currentColor = null;
      this.tilesPlaced = 0;
      this.gameSpeed = 1;
      this.isSpecialTileActive = false;
    }
  
    update(delta) {
      this.updateUI();
      this.checkLevelProgression();
    }
  
    updateUI() {
      document.getElementById('floor').textContent = this.floor;
      document.getElementById('score').textContent = this.score;
    }
  
    checkLevelProgression() {
      const tilesPerFloor = [10, 15, 20, 30, 50];
      if (this.tilesPlaced >= tilesPerFloor[this.floor - 1]) {
        this.advanceFloor();
      }
    }
  
    advanceFloor() {
      if (this.floor < 5) {
        this.floor++;
        this.tilesPlaced = 0;
        this.gameSpeed *= 1.2;
      }
    }
  }