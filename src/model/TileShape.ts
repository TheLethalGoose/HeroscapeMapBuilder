export type TileShape = number[][];

export const TileShapeOne: TileShape = [[0, 0]];
export const TileShapeTwo: TileShape = [[0, 0], [1, 0]];
export const TileShapeThree: TileShape = [
    [0, 0],
    [-1, 1], [-0, 1]
];

export const TileShapeSeven: TileShape = [
    [0, -1], [1, -1],
    [-1, 0], [0, 0], [1, 0],
    [-1, 1], [0, 1]
];

export const TileShapeTwentyFour: TileShape = [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2],
    [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
    [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
    [-1, 1], [0, 1], [1, 1],
    [-1, 2], [0, 2], [1, 2],
    [-1, 3], [0, 3],
]