import svgOne from "@/assets/terrain/hexOne.svg?component"
import svgTwo from "@/assets/terrain/hexTwo.svg?component"
import svgThree from "@/assets/terrain/hexThree.svg?component"
import svgSix from "@/assets/terrain/hexSix.svg?component"
import svgSeven from "@/assets/terrain/hexSeven.svg?component"
import svgTwentyFour from "@/assets/terrain/hexTwentyFour.svg?component"
import svgRuinsTwo from "@/assets/terrain/ruinsTwo.svg?component"
import svgRuinsThree from "@/assets/terrain/ruinsThree.svg?component"
import {markRaw, Raw} from "vue";
import {Direction} from "honeycomb-grid";

export type TileShape = {
    pattern: number[][];
    obstacle?: Record<number, Direction[]>;
    svg: Raw<object>;
    id: string;
};
export const TileShapeOne: TileShape = {
    pattern: [
        [0, 0]
    ],
    svg: markRaw(svgOne),
    id: 'hexOne'
};
export const TileShapeTwo: TileShape = {
    pattern: [
        [0, 0], [1, 0]
    ],
    svg: markRaw(svgTwo),
    id: 'hexTwo'
};
export const TileShapeThree: TileShape = {
    pattern: [
        [0, 0],
        [-1, 1], [-0, 1]
    ],
    svg: markRaw(svgThree),
    id: 'hexThree'
};
export const TileShapeSix: TileShape = {
    pattern: [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
    ],
    svg: markRaw(svgSix),
    id: 'hexSix'
}
export const TileShapeSeven: TileShape = {
    pattern: [
        [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1]
    ],
    svg: markRaw(svgSeven),
    id: 'hexSeven'
};
export const TileShapeTwentyFour: TileShape = {
    pattern: [
        [-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [3, -2],
        [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1],
        [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
        [-1, 1], [0, 1], [1, 1],
        [-1, 2], [0, 2], [1, 2],
        [-1, 3], [0, 3],
    ],
    svg: markRaw(svgTwentyFour),
    id: 'hexTwentyFour'
};
export const RuinShapeTwo: TileShape = {
    pattern: [
        [0, -1], [1, -1], [2, -1],
        [-1, 0], [0, 0], [1, 0], [2, 0],
        [-1, 1], [0, 1], [1, 1],
    ],
    obstacle: {
        0: [Direction.W, Direction.SW, Direction.SE],
        5: [Direction.SW, Direction.SE]
    },
    svg: markRaw(svgRuinsTwo),
    id: 'obstacleTwo',
};
export const RuinShapeThree: TileShape = {
    pattern: [
        [0, -1], [1, -1], [2, -1], [3, -1],
        [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0],
        [-1, 1], [0, 1], [1, 1], [2, 1]
    ],
    obstacle: {
        6: [Direction.SW, Direction.SE],
        0: [Direction.W, Direction.SW, Direction.SE],
        7: [Direction.SW, Direction.SE]
    },
    svg: markRaw(svgRuinsThree),
    id: 'obstacleThree',
};