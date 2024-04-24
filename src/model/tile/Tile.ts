import {TileType} from "@/model/tile/TileType.ts";
import {TileShape} from "@/model/tile/TileShape.ts";

export class Tile {
    public id: string;
    public shape: TileShape;
    public type: TileType;

    constructor(shape: TileShape, type: TileType) {
        this.shape = shape;
        this.type = type;
        this.id = this.createId(shape, type);
    }

    private createId(shape: TileShape, type: TileType): string {
        return `${shape.id + type.id}`;
    }

    public equals(other: Tile): boolean {
        return this.id === other.id;
    }
}