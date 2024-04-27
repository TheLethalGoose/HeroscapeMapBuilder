import {Grid, HexConstructor, Traverser} from "honeycomb-grid";
import {Hex} from "@/model/grid/Hex.ts";
import {Container} from "@svgdotjs/svg.js";

export class DrawableGrid<T extends Hex> extends Grid<T> {
    public readonly svgGroup: Container;

    constructor(svgContainer: Container, gridId: string, hexClass: HexConstructor<T>, traverser: Traverser<T>) {
        super(hexClass, traverser);
        this.svgGroup = svgContainer.group().id(gridId);
    }

    drawHexes(): void {
        super.forEach(hex => {
            hex.draw(this.svgGroup);
        })
    }
}