import {TileType} from "@/model/TileType.ts";
import {TileShape} from "@/model/TileShape.ts";

export interface DragItem {
    tileType: TileType;
    tileShape: TileShape;
}