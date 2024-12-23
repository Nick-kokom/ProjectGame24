export class Tile {
    constructor(mesh, body, floor) {
      this.mesh = mesh;
      this.body = body;
      this.floor = floor;
      this.isSpecial = false;
      this.isCrystallized = false;
      this.color = mesh.material.color.getHex();
    }
  
    update(delta) {
      this.mesh.position.copy(this.body.position);
      this.mesh.quaternion.copy(this.body.quaternion);
      
      if (this.floor >= 2) {
        this.updateColor(delta);
      }
    }
  
    updateColor(delta) {
      if (this.isCrystallized) return;
      
      // Color shifting logic for floors 2-5
      const hue = (Date.now() * 0.001) % 1;
      this.mesh.material.color.setHSL(hue, 1, 0.5);
      this.color = this.mesh.material.color.getHex();
    }
  
    crystallize() {
      if (this.isSpecial) {
        this.isCrystallized = true;
        this.mesh.material = this.materials.crystal.clone();
      }
    }
  }