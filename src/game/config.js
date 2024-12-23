export const GAME_CONFIG = {
    BOX_HEIGHT: 1,
    INITIAL_BOX_SIZE: 3,
    COLORS: ["white", "red", "blue", "green", "yellow"],
    CAMERA_SETTINGS: {
      FOV: 75,
      NEAR: 0.1,
      FAR: 1000,
      POSITION: { x: 4, y: 8, z: 12 }
    },
    LEVELS: {
      1: { requiredTiles: 10, speed: 1 },
      2: { requiredTiles: 15, speed: 1.2 },
      3: { requiredTiles: 20, speed: 1.5 },
      4: { requiredTiles: 30, speed: 1.8 },
      5: { requiredTiles: 50, speed: 2 }
    }
  }