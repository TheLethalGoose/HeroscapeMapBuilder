export type HeroscapeTileShape = number[][];

export const HeroscapeTileShapeOne: HeroscapeTileShape = [[0, 0]];
export const HeroscapeTileShapeTwo: HeroscapeTileShape = [[0, 0], [1, 0]];
export const HeroscapeTileShapeThree: HeroscapeTileShape = [
    [0, 0],
    [-1, 1], [-0, 1]
];

export const HeroscapeTileShapeSeven: HeroscapeTileShape = [
    [0, -1], [1, -1],
    [-1, 0], [0, 0], [1, 0],
    [-1, 1], [0, 1]
];

export const HeroscapeTileShapeTwentyFour: HeroscapeTileShape = [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2],
    [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
    [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
    [-1, 1], [0, 1], [1, 1],
    [-1, 2], [0, 2], [1, 2],
    [-1, 3], [0, 3],
]