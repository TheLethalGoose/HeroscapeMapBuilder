import {defineStore} from "pinia";
import {Grass, TileType} from "@/model/TileType.ts";

interface Terrain {
    name: string;
    terrain: TileType;
}

interface TerrainState {
    selectedTerrain: Terrain;
}

export const useTerrainStore = defineStore('terrain', {
    state: (): TerrainState => ({
        selectedTerrain: { name: 'Grass', terrain: Grass },
    }),
    getters: {
        getSelectedTerrain: (state) => state.selectedTerrain
    },
    actions: {
        setSelectedTerrain(terrain: Terrain) {
            this.selectedTerrain = terrain;
        }
    }
});