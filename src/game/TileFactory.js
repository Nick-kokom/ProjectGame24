import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Tile } from './Tile.js';

export class TileFactory {
  constructor() {
    this.tileGeometry = new THREE.BoxGeometry(1, 0.2, 1);
    this.materials = {
      white: new THREE.MeshStandardMaterial({ color: 0xffffff }),
      black: new THREE.MeshStandardMaterial({ color: 0x000000 }),
      crystal: new THREE.MeshStandardMaterial({
        color: 0x88ffff,
        transparent: true,
        opacity: 0.8,
        metalness: 1,
        roughness: 0
      })
    };
  }

  createTile(floor) {
    const material = this.getTileMaterial(floor);
    const mesh = new THREE.Mesh(this.tileGeometry, material);
    
    const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.1, 0.5));
    const body = new CANNON.Body({
      mass: 1,
      shape: shape
    });

    return new Tile(mesh, body, floor);
  }

  getTileMaterial(floor) {
    switch(floor) {
      case 1:
        return this.materials.white;
      case 2:
      case 3:
        return this.materials.white.clone();
      case 4:
      case 5:
        return Math.random() > 0.8 ? this.materials.crystal : this.materials.black;
      default:
        return this.materials.white;
    }
  }
}