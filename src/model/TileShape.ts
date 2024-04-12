import svgOne from "@/assets/terrain/types/hexOne.svg?component"
import svgTwo from "@/assets/terrain/types/hexTwo.svg?component"
import svgThree from "@/assets/terrain/types/hexThree.svg?component"
import svgSeven from "@/assets/terrain/types/hexSeven.svg?component"
import svgTwentyFour from "@/assets/terrain/types/hexTwentyFour.svg?component"
import {markRaw, Raw} from "vue";

export type TileShape = {
    pattern: number[][];
    svg: Raw<object>;
};
export const TileShapeOne: TileShape = {
    pattern: [
        [0, 0]
    ],
    svg: markRaw(svgOne)
};
export const TileShapeTwo: TileShape = {
    pattern: [
        [0, 0], [1, 0]
    ],
    svg: markRaw(svgTwo)
};
export const TileShapeThree: TileShape = {
    pattern: [
        [0, 0],
        [-1, 1], [-0, 1]
    ],
    svg: markRaw(svgThree)
};
export const TileShapeSeven: TileShape = {
    pattern: [
        [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1]
    ],
    svg: markRaw(svgSeven)
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
    svg: markRaw(svgTwentyFour)
}