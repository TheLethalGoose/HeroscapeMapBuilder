import svgOne from "@/assets/terrain/types/hexOne.svg"
import svgTwo from "@/assets/terrain/types/hexTwo.svg"
import svgThree from "@/assets/terrain/types/hexThree.svg"
import svgSeven from "@/assets/terrain/types/hexSeven.svg"
import svgTwentyFour from "@/assets/terrain/types/hexTwentyFour.svg"

export type TileShape = {
    pattern: number[][];
    svg: string;
};
export const TileShapeOne: TileShape = {
    pattern: [
        [0, 0]
    ],
    svg: svgOne
};
export const TileShapeTwo: TileShape = {
    pattern: [
        [0, 0], [1, 0]
    ],
    svg: svgTwo
};
export const TileShapeThree: TileShape = {
    pattern: [
        [0, 0],
        [-1, 1], [-0, 1]
    ],
    svg: svgThree
};
export const TileShapeSeven: TileShape = {
    pattern: [
        [0, -1], [1, -1],
        [-1, 0], [0, 0], [1, 0],
        [-1, 1], [0, 1]
    ],
    svg: svgSeven
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
    svg: svgTwentyFour
}