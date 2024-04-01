import {Grid,} from "honeycomb-grid";
import {Hex} from "@/model/Hex.ts";
import {Container} from "@svgdotjs/svg.js";

export class DrawableGrid<T extends Hex> extends Grid<T> {

    drawHexes(container: Container): void;
    drawHexes(container: Container, hexagons: T[]): void;

    drawHexes(container: Container, hexagons?: T[]): void {
        if (hexagons) {
            hexagons.forEach(hexagon => {
                hexagon.draw(container)
            })
            return;
        }
        this.forEach(hex => {
            hex.draw(container);
        })
    }
}