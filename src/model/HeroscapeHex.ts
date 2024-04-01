import {defineHex, HexCoordinates, Point} from "honeycomb-grid";
import {Container, G} from "@svgdotjs/svg.js";
import {HeroscapeHexGroup} from "@/model/HeroscapeHexGroup.ts";
import {Grass, HeroscapeTileType, Rock} from "@/model/HeroscapeTileType.ts";

export class HeroscapeHex extends defineHex({dimensions: 20, origin: "topLeft"}) {

    static create(coordinates: HexCoordinates): HeroscapeHex {
        return new HeroscapeHex(coordinates);
    }

    private _borders: Point[] = [];
    private _group: HeroscapeHexGroup | null = null;

    private _type: HeroscapeTileType = Rock;
    private _verboose: boolean = false;

    eguals(o: HeroscapeHex) {
        return (this.q === o.q && this.r === o.r)
    }

    get borders(): Point[] {
        return this._borders;
    }

    set borders(value: Point[]) {
        this._borders = value;
    }

    get group(): HeroscapeHexGroup | null {
        return this._group;
    }

    set group(value: HeroscapeHexGroup | null) {
        this._group = value;
    }

    resetBorders(): void {
        this._borders = [];
    }

    draw(container: Container) {

        const hexId = `hex-${this.q}-${this.r}`;
        const hexContainerGroup: G = container.group().id(hexId);

        const strokeColor = this.group ? this._type : '#8a8486';
        const fillColor = this.group ? this._type : 'none';

        hexContainerGroup.polygon(this.corners.map(({x, y}) => [x, y]).flat())
            .stroke({width: 1, color: strokeColor})
            .fill(fillColor).opacity(90);

        for (const [index, startPoint] of this.borders.entries()) {
            if (index % 2 === 0) {
                const endPoint = this.borders[index + 1];
                hexContainerGroup.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y).stroke({width: 1.5, color: '#ffffff'}).attr({'stroke-linecap': 'round'});
            }
        }

        if (this._verboose) {
            hexContainerGroup.text(`Q: ${this.q}, R: ${this.r}\n ${this.group ? 'In Group' : ''}`).font({
                size: this.dimensions.xRadius / 5,
                anchor: 'middle',
            }).attr({x: this.x, y: this.y, 'dominant-baseline': 'middle'}).fill('#fff');
        }
    }
}