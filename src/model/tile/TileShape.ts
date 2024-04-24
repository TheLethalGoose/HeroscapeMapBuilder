import svgOne from "@/assets/terrain/types/hexOne.svg?component"
import svgTwo from "@/assets/terrain/types/hexTwo.svg?component"
import svgThree from "@/assets/terrain/types/hexThree.svg?component"
import svgSix from "@/assets/terrain/types/hexSix.svg?component"
import svgSeven from "@/assets/terrain/types/hexSeven.svg?component"
import svgTwentyFour from "@/assets/terrain/types/hexTwentyFour.svg?component"
import {markRaw, Raw} from "vue";

export type TileShape = {
    pattern: number[][];
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
}