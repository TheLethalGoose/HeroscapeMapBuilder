export abstract class HeroscapeTileShape {
    protected coordinates: number[][];

    protected constructor(coordinates: number[][]) {
        this.coordinates = coordinates;
    }

    abstract rotate(): void;

    getCoordinates(): number[][] {
        return this.coordinates;
    }
}

export class HeroscapeTileShapeOne extends HeroscapeTileShape {
    constructor() {
        super([
            [0, 0]
        ]);
    }

    rotate(): void {
        console.log('Rotating');
    }
}
export class HeroscapeTileShapeTwo extends HeroscapeTileShape {
    constructor() {
        super([
            [0, 0], [1, 0],
        ]);
    }

    rotate(): void {
        console.log('Rotating');
    }
}

export class HeroscapeTileShapeThree extends HeroscapeTileShape {
    constructor() {
        super([
            [0, 0], [1, 0],
            [0, 1]
        ]);
    }

    rotate(): void {
        console.log('Rotating');
    }
}

export class HeroscapeTileShapeSeven extends HeroscapeTileShape {
    constructor() {
        super([
            [0, -1], [1, -1],
            [-1, 0], [0, 0], [1, 0],
            [-1, 1], [0, 1]
        ]);
    }

    rotate(): void {
        console.log('Rotating');
    }
}

export class HeroscapeTileTwentyFour extends HeroscapeTileShape {
    constructor() {
        super([
            [-2, -2],[-1, -2], [0, -2], [1, -2], [2, -2],[3,-2],
            [-2, -1],[-1, -1], [0, -1], [1, -1], [2, -1],
            [-2, 0],[-1, 0], [0, 0], [1, 0], [2, 0],
            [-1, 1], [0, 1], [1, 1],
            [-1, 2], [0, 2], [1, 2],
            [-1, 3], [0, 3],
        ]);
    }

    rotate(): void {
        console.log('Rotating');
    }
}



