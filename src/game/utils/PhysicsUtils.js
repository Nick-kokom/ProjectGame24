import * as CANNON from 'cannon-es';

export function createPhysicsBody(dimensions, mass = 1) {
  const shape = new CANNON.Box(new CANNON.Vec3(
    dimensions.x / 2,
    dimensions.y / 2,
    dimensions.z / 2
  ));
  
  return new CANNON.Body({
    mass,
    shape
  });
}