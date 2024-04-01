import {HeroscapeHex} from "./HeroscapeHex";
import {HeroscapeTileShape, HeroscapeTileShapeOne} from "./HeroscapeTileShape";
import {HeroscapeGrid} from "@/model/HeroscapeGrid.ts";
import {Container} from "@svgdotjs/svg.js";
import {Direction} from "honeycomb-grid";

export class GroupManager {
    static createGroup(center: HeroscapeHex, grid: HeroscapeGrid<HeroscapeHex>, shape: HeroscapeTileShape): HeroscapeHexGroup | null {

        let members = this.validateAndGenerateGroupMembers(center, grid, shape);

        if (!members) {
            console.log("Creation of Group failed: Hexagon blocked or outside grid.");
            return null;
        }

        return new HeroscapeHexGroup(center, members, shape, grid);
    }

    private static validateAndGenerateGroupMembers(center: HeroscapeHex, grid: HeroscapeGrid<HeroscapeHex>, shape: HeroscapeTileShape): HeroscapeHex[] {

        if (center.group) {
            return [];
        }

        let hexesToUpdate = [center];

        for (const [q, r] of shape) {

            if ((!(q === 0 && r === 0))) {
                const newQ = q + center.q;
                const newR = r + center.r;

                let hexToUpdate = grid.getHex([newQ, newR]);

                if (!hexToUpdate || hexToUpdate.group) {
                    return [];
                }

                if (hexToUpdate) {
                    hexesToUpdate.push(hexToUpdate);
                }
            }

        }

        return hexesToUpdate;

    }
}

export class HeroscapeHexGroup {
    members: Set<HeroscapeHex> = new Set();
    center: HeroscapeHex | null;
    shape: HeroscapeTileShape;
    grid: HeroscapeGrid<HeroscapeHex>;

    constructor(center: HeroscapeHex, members: HeroscapeHex[], shape: HeroscapeTileShape, grid: HeroscapeGrid<HeroscapeHex>) {
        this.center = center;
        this.shape = shape;
        this.grid = grid;

        members.forEach(member => this.addMember(member));
        this.setBorders();
    }

    destroy() {
        this.clearMembers();
        this.center = null;
    }

    groupId(): string{
        return `group-${this.center?.q}-${this.center?.r}`;
    }

    addMember(hex: HeroscapeHex): void {
        hex.group = this;
        this.members.add(hex);
    }

    addMembers(hexesToAdd: Set<HeroscapeHex>): void {
        hexesToAdd.forEach(hex => this.addMember(hex));
    }

    clearMembers(): void {
        this.members.forEach(member => {
            member.resetBorders();
            member.group = null;
        });
        this.members = new Set([]);
    }

    private setBorders(): void {
        this.members.forEach(member => {
            const cornerIndicesMap = new Map<Direction, [number, number]>([
                [Direction.E, [0, 1]],
                [Direction.SE, [1, 2]],
                [Direction.SW, [2, 3]],
                [Direction.W, [3, 4]],
                [Direction.NW, [4, 5]],
                [Direction.NE, [5, 0]]
            ]);

            for (let direction of [Direction.NE, Direction.E, Direction.SE, Direction.SW, Direction.W, Direction.NW]) {
                let neighbor = this.grid.neighborOf([member.q, member.r], direction, {allowOutside: true});
                if (neighbor && !this.members.has(neighbor)) {
                    const cornerIndices = cornerIndicesMap.get(direction);
                    if (cornerIndices) {
                        member.borders.push(member.corners[cornerIndices[0]], member.corners[cornerIndices[1]]);
                    }
                }
            }
        })
    }

    draw(container: Container) {

        let hexContainerGroup = this.findGroupInSvg(container);

        if (hexContainerGroup) {
            hexContainerGroup.clear();
        }

        if (!hexContainerGroup) {
            hexContainerGroup = container.group().id(this.groupId());
        }

        this.members.forEach(member => member.draw(hexContainerGroup));
    }

    findGroupInSvg(container: Container): Container{
        return container.findOne(`#${this.groupId()}`) as Container;
    }

    erase(container: Container){
        this.findGroupInSvg(container).remove();
    }

    rotate(center: HeroscapeHex): void {

        if(this.shape === HeroscapeTileShapeOne){
            return;
        }

        const newMembers = new Set<HeroscapeHex>();

        for (const member of this.members) {
            const [relQ, relR] = [member.q - center.q, member.r - center.r];
            const [newQRel, newRRel] = [-relR, relQ + relR];
            const [newQ, newR] = [newQRel + center.q, newRRel + center.r];

            const hexAfterRotation = this.grid.getHex([newQ, newR]);
            if (!hexAfterRotation || (hexAfterRotation.group && hexAfterRotation.group !== this)) {
                console.log("Rotation failed: Hexagon blocked or outside grid.");
                return;
            }
            newMembers.add(hexAfterRotation);
        }

        this.clearMembers();
        this.addMembers(newMembers);
        this.setBorders();
        this.center = center;

    }
}