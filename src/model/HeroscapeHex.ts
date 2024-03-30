import {defineHex, HexCoordinates, Point} from "honeycomb-grid";
import {G, Svg} from "@svgdotjs/svg.js";

export type HeroscapeHexGroup = {
    group: HeroscapeHex[];
    center: HeroscapeHex;
};

export class HeroscapeHex extends defineHex({ dimensions: 20, origin: "topLeft" }) {

    static create(coordinates: HexCoordinates): HeroscapeHex {
        return new HeroscapeHex(coordinates);
    }

    private _isSet: boolean = false;
    private _group?: HeroscapeHexGroup;
    private _borders: Point[] = [];
    private _type: string = '#00a43d';

    private _verboose :boolean = false;

    get isSet(): boolean {
        return this._isSet;
    }

    set isSet(value: boolean) {
        this._isSet = value;
    }

    get borders(): Point[]{
        return this._borders;
    }

    set borders(value: Point[]){
        this._borders = value;
    }

    get group(): HeroscapeHexGroup | undefined {
        return this._group;
    }

    set group(value: HeroscapeHexGroup) {
        this._group = value;
    }

    draw(svg: Svg) {
        const hexesGroup = svg.findOne('#hexes-group') as G || svg.group().id('hexes-group');
        const bordersGroup = svg.findOne('#borders-group') as G || svg.group().id('borders-group');

        const hexId = `hexId-${this.q}-${this.r}`;
        let hexGroup: G = hexesGroup.findOne(`#${hexId}`) as G;

        if (!hexGroup) {
            hexGroup = hexesGroup.group().id(hexId);
        }

        if(hexGroup){
            hexGroup.clear();
        }

        const strokeColor = this.isSet ? this._type : '#ff6bec';
        const fillColor = this.isSet ? this._type : 'none';

        hexGroup.polygon(this.corners.map(({ x, y }) => [x, y]).flat())
            .stroke({ width: 1, color: strokeColor })
            .fill(fillColor);

        if(this._verboose){
            hexGroup.text(`Q: ${this.q}, R: ${this.r}\n ${this.isSet}`).font({
                size: this.dimensions.xRadius / 5,
                anchor: 'middle',
            }).attr({ x: this.x, y: this.y, 'dominant-baseline': 'middle'}).fill('#fff');
        }

        // Zeichne die Grenzen in der `bordersGroup`
        for (const [index, startPoint] of this.borders.entries()) {
            if (index % 2 === 0) {
                const endPoint = this.borders[index + 1];

                bordersGroup.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
                    .stroke({ width: 1.5, color: '#ffffff' })
                    .attr({ 'stroke-linecap': 'round' });
            }
        }
    }


}