import {defineHex, HexCoordinates, Point} from "honeycomb-grid";
import {Container, G} from "@svgdotjs/svg.js";
import '@svgdotjs/svg.draggable.js'
import {HexGroup} from "@/model/grid/HexGroup.ts";
import {TileType} from "@/model/tile/TileType.ts";

export class Hex extends defineHex({dimensions: 20, origin: "topLeft"}) {

    static create(coordinates: HexCoordinates): Hex {
        return new Hex(coordinates);
    }

    private _borders: Point[] = [];
    private _group: HexGroup | null = null;

    private _type: TileType | undefined = undefined;
    private _verboose: boolean = false;

    eguals(o: Hex) {
        return (this.q === o.q && this.r === o.r)
    }

    get borders(): Point[] {
        return this._borders;
    }

    set type(value: TileType | undefined) {
        this._type = value;
    }

    set borders(value: Point[]) {
        this._borders = value;
    }

    get group(): HexGroup | null {
        return this._group;
    }

    set group(value: HexGroup | null) {
        this._group = value;
    }

    resetBorders(): void {
        this._borders = [];
    }

    draw(container: Container) {

        const hexId = `hex-${this.q}-${this.r}`;
        const hexContainerGroup: G = container.group().id(hexId);

        const gridStrokeColor = (this.group && this._type) ? this._type.color : '#8a8486';
        const groupStrokeColor = this.group?.selected ? '#fd5c5c': '#fff';
        const fillColor = (this.group && this._type) ? this._type.color : 'none';

        hexContainerGroup.polygon(this.corners.map(({x, y}) => [x, y]).flat())
            .stroke({width: 1, color: gridStrokeColor})
            .fill(fillColor).opacity(90);

        for (const [index, startPoint] of this.borders.entries()) {
            if (index % 2 === 0) {
                const endPoint = this.borders[index + 1];
                hexContainerGroup.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y).stroke({width: 1.5, color: groupStrokeColor}).attr({'stroke-linecap': 'round'});
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