import {Grass, Rock, Sand, TileType, Water} from "@/model/TileType.ts";
import {
    TileShape,
    TileShapeOne,
    TileShapeSeven,
    TileShapeThree,
    TileShapeTwentyFour,
    TileShapeTwo
} from "@/model/TileShape.ts";

class Tile {
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

export class TileSetFactory {
    static createTileCollectionRotV(): TileCollection {
        const collection = new TileCollection();

        let grass = TileCollection.getTileCollectionForType(Grass, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour]);
        let sand = TileCollection.getTileCollectionForType(Sand, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour]);
        let rock = TileCollection.getTileCollectionForType(Rock, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour]);
        let water = TileCollection.getTileCollectionForType(Water, [TileShapeOne]);

        collection.addTiles(grass.getTiles());
        collection.addTiles(sand.getTiles());
        collection.addTiles(rock.getTiles());
        collection.addTiles(water.getTiles());

        return collection;

    }

}