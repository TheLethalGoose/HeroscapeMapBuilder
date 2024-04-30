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
    private _opacityMask: boolean = false;
    private _verbose: boolean = false;

    eguals(o: Hex) {
        return (this.q === o.q && this.r === o.r)
    }

    set opacityMask(value: boolean) {
        this._opacityMask = value;
    }

    set verbose(value: boolean) {
        this._verbose = value;
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

    public resetBorders(): void {
        this._borders = [];
    }

    private getFillColor() {

        if (this._group?.blocked) {
            return '#ff3f3f'
        }

        if (this._opacityMask && !this._group) {
            return '#1f2028'
        }

        if (this._opacityMask && this._group) {
            return '#fff'
        }

        if (this._group && this._type) {
            return this._type.color;
        }

        return 'none';
    }

    private getGridStrokeColor() {

        if (this._group && this._type) {
            return this._type.color
        }

        return '#6e6e6e';
    }

    private getGroupStrokeColor() {

        if (this._group?.selected) {
            return '#74ff5e'
        }

        if (this._group?.blocked) {
            return '#ff2323'
        }

        return '#fff'
    }

    private getOpacity() {

        if (this._opacityMask && !this._group) {
            //How dark are hidden tiles
            return 0.5
        }

        if (this._opacityMask && this._group) {
            //White shadow of dragged group
            return 0.1
        }

        return 1;
    }


    draw(container: Container) {
        const hexId = `hex_${this.q}_${this.r}`;
        const hexContainerGroup: G = container.group().id(hexId);

        const gridStrokeColor = this.getGridStrokeColor();
        const groupStrokeColor = this.getGroupStrokeColor();
        const fillColor = this.getFillColor();
        const opacity = this.getOpacity();

        hexContainerGroup.polygon(this.corners.map(({x, y}) => [x, y]).flat())
            .stroke({width: 1, color: gridStrokeColor})
            .fill(fillColor).opacity(opacity);

        for (const [index, startPoint] of this._borders.entries()) {
            if (index % 2 === 0) {
                const endPoint = this._borders[index + 1];
                hexContainerGroup.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y).stroke({width: 1.5, color: groupStrokeColor}).attr({'stroke-linecap': 'round'});
            }
        }

        if (this._verbose) {
            hexContainerGroup.text(`Q: ${this.q}, R: ${this.r}\n ${this._group ? 'In Group' : ''}`).font({
                size: this.dimensions.xRadius / 5,
                anchor: 'middle',
            }).attr({x: this.x, y: this.y, 'dominant-baseline': 'middle'}).fill('#fff');
        }
    }
}