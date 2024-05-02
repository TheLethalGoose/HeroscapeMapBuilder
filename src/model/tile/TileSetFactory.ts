import {
    RuinShapeThree,
    RuinShapeTwo,
    TileShape,
    TileShapeOne,
    TileShapeSeven,
    TileShapeSix,
    TileShapeThree,
    TileShapeTwentyFour,
    TileShapeTwo
} from "@/model/tile/TileShape.ts";
import {Grass, Rock, Ruins, Sand, Swamp, SwampWater, Water} from "@/model/tile/TileType.ts";
import {TileCollection} from "@/model/tile/TileCollection.ts";

export class TileSetFactory {

    static createTileCollectionRotV(): TileCollection {
        const collection: TileCollection = new TileCollection();
        const commonShapes: TileShape[] = [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour];
        const obstacleShapes: TileShape[] = [RuinShapeTwo, RuinShapeThree]

        const types = [
            {type: Grass, shapes: commonShapes},
            {type: Sand, shapes: commonShapes},
            {type: Rock, shapes: commonShapes},
            {type: Water, shapes: [TileShapeOne]}
        ];

        types.forEach(({type, shapes}) => {
            const tiles = TileCollection.getTileCollectionForType(type, shapes);
            collection.addTiles(tiles.getTiles());
        });

        const ruins = TileCollection.getTileCollectionForType(Ruins, obstacleShapes);

        collection.addTiles(ruins.getTiles());

        return collection;
    }

    static createTileCollectionSotM(): TileCollection {
        const collection: TileCollection = new TileCollection();
        const commonShapes: TileShape[] = [TileShapeOne, TileShapeTwo];
        const unCommonShapes: TileShape[] = [TileShapeThree, TileShapeSeven];

        const types = [
            {type: Grass, shapes: commonShapes},
            {type: Sand, shapes: [...commonShapes, ...unCommonShapes]},
            {type: Rock, shapes: [...commonShapes, ...unCommonShapes]},
            {type: Swamp, shapes: [...commonShapes, ...unCommonShapes, TileShapeTwentyFour]},
            {type: Water, shapes: [TileShapeOne]},
            {type: SwampWater, shapes: [TileShapeOne, TileShapeSix]}
        ];

        types.forEach(({type, shapes}) => {
            let tiles = TileCollection.getTileCollectionForType(type, shapes);
            collection.addTiles(tiles.getTiles());
        });

        return collection;
    }
}