import {TileType} from "@/model/tile/TileType.ts";
import {TileShape} from "@/model/tile/TileShape.ts";

export interface DragItem {
    tileType: TileType;
    tileShape: TileShape;
}