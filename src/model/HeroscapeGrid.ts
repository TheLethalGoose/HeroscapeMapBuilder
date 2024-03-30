import {Direction, Grid, Hex, HexConstructor, HexCoordinates, Point, Traverser} from "honeycomb-grid";
import {HeroscapeHex} from "@/model/HeroscapeHex.ts";
import {Svg} from "@svgdotjs/svg.js";
import {HeroscapeTileShape} from "@/model/HeroscapeTileShape.ts";


export class HeroscapeGrid<T extends HeroscapeHex> extends Grid<T> {

    constructor(hexClass: HexConstructor<T>, traverser: Traverser<T>) {
        super(hexClass, traverser)
    }

    setHexagonsInShape(centerHexagon: T, shape: HeroscapeTileShape): HeroscapeHex[] {

        let updatedHexes: T[] = [];

        shape.getCoordinates().forEach(([q, r]) => {
            const newQ = q + centerHexagon.q;
            const newR = r + centerHexagon.r;

            const hex = this.getHex([newQ, newR]);

            if (hex && !hex.isSet) {
                updatedHexes.push(hex);
            }

        });

        if(updatedHexes.length !== shape.getCoordinates().length){
            console.log("Tile could not be placed")
            return [];
        }


        updatedHexes.forEach(hex => {
            hex.isSet = true;
            hex.group = {group: updatedHexes, center: centerHexagon};
        })


        updatedHexes.forEach(hex => {
            hex.borders = this.getBordersOfHexagon(hex);
        })

        return updatedHexes;
    }

    private getBordersOfHexagon(hexagon: T): Point[]{

        const cornerIndicesMap = new Map<Direction, [number, number]>([
            [Direction.E, [0, 1]],
            [Direction.SE, [1, 2]],
            [Direction.SW, [2, 3]],
            [Direction.W, [3, 4]],
            [Direction.NW, [4, 5]],
            [Direction.NE, [5, 0]]
        ]);

        let borders: Point[] = []


        for (let direction of [Direction.NE, Direction.E, Direction.SE, Direction.SW, Direction.W, Direction.NW]) {
            let neighbor = this.neighborOf([hexagon.q, hexagon.r], direction, {allowOutside: false});
            if (!neighbor?.isSet) {
                const cornerIndices = cornerIndicesMap.get(direction);
                if (cornerIndices) {
                    borders.push(hexagon.corners[cornerIndices[0]], hexagon.corners[cornerIndices[1]]);
                }
            }
        }

        return borders;

    }

    drawHexes(svg: Svg): void;
    drawHexes(svg: Svg, hexagons: T[]): void;

    drawHexes(svg: Svg, hexagons?: T[]): void {
        if (hexagons) {
            hexagons.forEach(hexagon => {
                hexagon.draw(svg)
            })
            return;
        }
        this.forEach(hex => {
            hex.draw(svg);
        })
    }

}