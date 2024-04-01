import {Hex} from "./Hex.ts";
import {TileShape, TileShapeOne} from "./TileShape.ts";
import {DrawableGrid} from "@/model/DrawableGrid.ts";
import {Container} from "@svgdotjs/svg.js";
import {Direction} from "honeycomb-grid";

export class HexGroupManager {
    static createGroup(center: Hex, grid: DrawableGrid<Hex>, shape: TileShape): HexGroup | null {

        let members = this.validateAndGenerateGroupMembers(center, grid, shape);

        if (!members.size) {
            console.log("Creation of Group failed: Hexagon blocked or outside grid.");
            return null;
        }

        return new HexGroup(center, members, shape, grid);
    }

    static validateAndGenerateGroupMembers(center: Hex, grid: DrawableGrid<Hex>, shape: TileShape): Set<Hex> {

        if (center.group) {
            return new Set<Hex>([]);
        }

        let hexesToUpdate = new Set<Hex>([center]);

        for (const [q, r] of shape) {

            if ((!(q === 0 && r === 0))) {
                const newQ = q + center.q;
                const newR = r + center.r;

                let hexToUpdate = grid.getHex([newQ, newR]);

                if (!hexToUpdate || hexToUpdate.group) {
                    return new Set<Hex>([]);
                }

                if (hexToUpdate) {
                    hexesToUpdate.add(hexToUpdate);
                }
            }

        }

        return hexesToUpdate;

    }

    static moveGroup(origin: HexGroup, targetCenter: Hex, grid: DrawableGrid<Hex>, container: Container){

        const newMembers = HexGroupManager.validateAndGenerateGroupMembers(targetCenter,grid,origin.shape);

        if(!newMembers.size){
            console.log("Moving failed: Hexagon blocked or outside grid.")
            return;
        }

        origin.clearMembers();
        origin.addMembers(newMembers);
        origin.setBorders();
        origin.erase(container);
        origin.center = targetCenter;
        origin.selected = false;

        origin.draw(container);

    }
}

export class HexGroup {
    private _members: Set<Hex> = new Set();
    private _center: Hex | null;
    private _grid: DrawableGrid<Hex>;
    private _selected: boolean = false;
    private readonly _shape: TileShape;

    constructor(center: Hex, members: Set<Hex>, shape: TileShape, grid: DrawableGrid<Hex>) {
        this._center = center;
        this._shape = shape;
        this._grid = grid;

        this.addMembers(members);
        this.setBorders();
    }


    get center(): Hex | null {
        return this._center;
    }

    set center(value: Hex | null) {
        this._center = value;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    get shape(): TileShape {
        return this._shape;
    }

    get members(): Set<Hex> {
        return this._members;
    }

    destroy() {
        this.clearMembers();
        this._center = null;
    }

    groupId(): string{
        return `group-${this._center?.q}-${this._center?.r}`;
    }

    addMember(hex: Hex): void {
        hex.group = this;
        this._members.add(hex);
    }

    addMembers(hexesToAdd: Set<Hex>): void {
        hexesToAdd.forEach(hex => this.addMember(hex));
    }

    clearMembers(): void {
        this._members.forEach(member => {
            member.resetBorders();
            member.group = null;
        });
        this._members = new Set([]);
    }

    setBorders(): void {

        this._members.forEach(member => {

            let borders = [];

            const cornerIndicesMap = new Map<Direction, [number, number]>([
                [Direction.E, [0, 1]],
                [Direction.SE, [1, 2]],
                [Direction.SW, [2, 3]],
                [Direction.W, [3, 4]],
                [Direction.NW, [4, 5]],
                [Direction.NE, [5, 0]]
            ]);

            for (let direction of [Direction.NE, Direction.E, Direction.SE, Direction.SW, Direction.W, Direction.NW]) {
                let neighbor = this._grid.neighborOf([member.q, member.r], direction, {allowOutside: true});
                if (neighbor && !this._members.has(neighbor)) {
                    const cornerIndices = cornerIndicesMap.get(direction);
                    if (cornerIndices) {
                        borders.push(member.corners[cornerIndices[0]], member.corners[cornerIndices[1]]);
                    }
                }
            }

            member.borders = borders;
        })

    }

    selectGroup(){
        this._selected = !this._selected;
        this.setBorders();
    }

    draw(container: Container) {

        let hexContainerGroup = this.findGroupInSvg(container);

        if (hexContainerGroup) {
            hexContainerGroup.clear();
        }

        if (!hexContainerGroup) {
            hexContainerGroup = container.group().id(this.groupId());
        }

        this._members.forEach(member => member.draw(hexContainerGroup));
    }

    findGroupInSvg(container: Container): Container{
        return container.findOne(`#${this.groupId()}`) as Container;
    }

    erase(container: Container){
        this.findGroupInSvg(container).remove();
    }

    rotate(center: Hex): void {

        if (this._shape === TileShapeOne) {
            return;
        }

        const newMembers = new Set<Hex>();

        for (const member of this._members) {
            const [relQ, relR] = [member.q - center.q, member.r - center.r];
            const [newQRel, newRRel] = [-relR, relQ + relR];
            const [newQ, newR] = [newQRel + center.q, newRRel + center.r];

            const hexAfterRotation = this._grid.getHex([newQ, newR]);
            if (!hexAfterRotation || (hexAfterRotation.group && hexAfterRotation.group !== this)) {
                console.log("Rotation failed: Hexagon blocked or outside grid.");
                return;
            }
            newMembers.add(hexAfterRotation);
        }

        this.clearMembers();
        this.addMembers(newMembers);
        this.setBorders();
        this._center = center;

    }
}