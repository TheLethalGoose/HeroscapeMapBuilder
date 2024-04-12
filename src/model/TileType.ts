import {
    TileShape,
    TileShapeOne,
    TileShapeSeven,
    TileShapeThree,
    TileShapeTwentyFour,
    TileShapeTwo
} from "@/model/TileShape.ts";

export type TileType = {
    color: string;
    name: string;
    shapes: TileShape[]
};

// RotV
export const Grass: TileType = {
    color: '#009b44',
    name: 'Grass',
    shapes: [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour],
};
export const Rock: TileType = {
    color: '#687b85',
    name: 'Rock',
    shapes: [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour],
};
export const Sand: TileType = {
    color: '#dcb25d',
    name: 'Sand',
    shapes: [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour],
};
export const Water: TileType = {
    color: '#00c8fa',
    name: 'Water',
    shapes: [TileShapeOne],
};

// SotM
export const Swamp: TileType = {
    color: '#0c4410',
    name: 'Swamp',
    shapes: [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour],
};
export const SwampWater: TileType = {
    color: '#0c4410',
    name: 'Swamp Water',
    shapes: [TileShapeOne],
};

// TT
export const Snow: TileType = {
    color: '#ffffff',
    name: 'Snow',
    shapes: [TileShapeOne, TileShapeTwo],
};
export const Ice: TileType = {
    color: '#ace5ee',
    name: 'Ice',
    shapes: [TileShapeOne],
};

// VW
export const Lava: TileType = {
    color: '#ff4500',
    name: 'Lava',
    shapes: [TileShapeOne],
};
export const LavaField: TileType = {
    color: '#ff4500',
    name: 'Lava Field',
    shapes: [TileShapeOne, TileShapeTwo, TileShapeSeven],
};