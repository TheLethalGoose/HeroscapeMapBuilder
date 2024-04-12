import {defineStore} from "pinia";
import {Grass, TileType} from "@/model/TileType.ts";

interface TileTypeState {
    selectedTileType: TileType;
}

export const useTileTypeStore = defineStore('tileType', {
    state: (): TileTypeState => ({
        selectedTileType: Grass,
    }),
    getters: {
        getSelectedTileType: (state) => state.selectedTileType
    },
    actions: {
        setSelectedTileType(tileType: TileType) {
            this.selectedTileType = tileType;
        }
    }
});