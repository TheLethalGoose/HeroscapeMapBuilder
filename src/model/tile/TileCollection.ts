import {TileType} from "@/model/tile/TileType.ts";
import {TileShape} from "@/model/tile/TileShape.ts";
import {Tile} from "@/model/tile/Tile.ts";

export class TileCollection {
    private readonly tiles: Tile[] = [];

    constructor(tiles?: Tile[]) {
        if (tiles) {
            this.tiles = tiles;
        }
    }

    addTile(tile: Tile) {
        if (!this.tiles.some(existingTile => existingTile.equals(tile))) {
            this.tiles.push(tile);
        }
    }

    addTiles(tiles: Tile[]) {
        tiles.forEach(tile => this.addTile(tile))
    }

    getTiles(): Tile[] {
        return this.tiles;
    }

    static getTileCollectionForType(tileType: TileType, tileShapes: TileShape[]): TileCollection {
        const collection = new TileCollection();

        tileShapes.forEach(shape => {
            collection.addTile(new Tile(shape, tileType));
        });

        return collection;
    }

    static getTileCollectionForShape(tileShape: TileShape, tileTypes: TileType[]): TileCollection {
        const collection = new TileCollection();

        tileTypes.forEach(type => {
            collection.addTile(new Tile(tileShape, type));
        });

        return collection;
    }
}