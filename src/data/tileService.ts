import {
    RuinShapeThree,
    RuinShapeTwo,
    TileShapeOne,
    TileShapeSeven,
    TileShapeSix,
    TileShapeThree,
    TileShapeTwentyFour,
    TileShapeTwo
} from "@/model/tile/TileShape.ts";
import {Grass, Rock, Ruins, Sand, Swamp, SwampWater, Water} from "@/model/tile/TileType.ts";
import {TileSetFactory} from "@/model/tile/TileSetFactory.ts";
import {TileCollection} from "@/model/tile/TileCollection.ts";

export const TileService = {
    getTreeNodesData() {
        return [
            {
                key: '0',
                label: 'Master Sets',
                children: [
                    {
                        key: '0-0',
                        label: 'Rise Of The Valkyrie',
                        data: TileSetFactory.createTileCollectionRotV()
                    },
                    {
                        key: '0-1',
                        label: 'Swarm of the Marro',
                        data: TileSetFactory.createTileCollectionSotM()
                    },
                ]
            },
            {
                key: '1',
                label: 'Tile Shapes',
                children: [
                    {
                        key: '1-0',
                        label: 'Hex One',
                        data: TileCollection.getTileCollectionForShape(TileShapeOne, [Grass, Rock, Sand, Water, SwampWater])
                    },
                    {
                        key: '1-1',
                        label: 'Hex Two',
                        data: TileCollection.getTileCollectionForShape(TileShapeTwo, [Grass, Rock, Sand, Swamp])
                    },
                    {
                        key: '1-2',
                        label: 'Hex Three',
                        data: TileCollection.getTileCollectionForShape(TileShapeThree, [Grass, Rock, Sand, Swamp])
                    },
                    {
                        key: '1-3',
                        label: 'Hex Seven',
                        data: TileCollection.getTileCollectionForShape(TileShapeSeven, [Grass, Rock, Sand, Swamp])
                    },
                    {
                        key: '1-4',
                        label: 'Hex Six',
                        data: TileCollection.getTileCollectionForShape(TileShapeSix, [SwampWater])
                    },
                    {
                        key: '1-5',
                        label: 'Hex Twenty-Four',
                        data: TileCollection.getTileCollectionForShape(TileShapeTwentyFour, [Grass, Rock, Sand, Swamp])
                    },

                ]
            },
            {
                key: '2',
                label: 'Tile Types',
                children: [
                    {
                        key: '2-0',
                        label: 'Solids',
                        children: [
                            {
                                key: '2-0-1',
                                label: 'Grass',
                                data: TileCollection.getTileCollectionForType(Grass, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour])
                            },
                            {
                                key: '2-0-2',
                                label: 'Sand',
                                data: TileCollection.getTileCollectionForType(Sand, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour])
                            },
                            {
                                key: '2-0-3',
                                label: 'Rock',
                                data: TileCollection.getTileCollectionForType(Rock, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour])
                            },
                            {
                                key: '2-0-4',
                                label: 'Swamp',
                                data: TileCollection.getTileCollectionForType(Swamp, [TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour])
                            },
                        ]
                    },
                    {
                        key: '2-1',
                        label: 'Liquids',
                        children: [
                            {
                                key: '2-1-0',
                                label: 'Water',
                                data: TileCollection.getTileCollectionForType(Water, [TileShapeOne])
                            },
                            {
                                key: '2-1-1',
                                label: 'Swamp Water',
                                data: TileCollection.getTileCollectionForType(SwampWater, [TileShapeOne])
                            },
                        ]
                    },
                    {
                        key: '2-2',
                        label: 'Obstacles',
                        children: [
                            {
                                key: '2-2-0',
                                label: 'Ruins Two',
                                data: TileCollection.getTileCollectionForType(Ruins, [RuinShapeTwo])
                            },
                            {
                                key: '2-2-1',
                                label: 'Ruins Three',
                                data: TileCollection.getTileCollectionForType(Ruins, [RuinShapeThree])
                            },
                        ]
                    }
                ]
            }
        ]
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }
};