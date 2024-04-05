<template>
    <HexOne :style="{fill: terrainStore.selectedTerrain.terrain}" class="w-2rem mr-2"/>
    <AutoComplete
        class="w-10rem h-2rem"
        v-model="terrainStore.selectedTerrain"
        dropdown
        optionLabel="name"
        :suggestions="filteredTerrain"
        @complete="search"
        append-to="self"
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <HexOne :style="{fill: slotProps.option.terrain}" class="w-1rem mr-2"/>
          <div class="align-self-center">{{ slotProps.option.name }}</div>
        </div>
      </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HexOne from "@/assets/terrain/types/hexOne.svg"
import {Grass, Rock, Sand, TileType, Water} from "@/model/TileType.ts";
import {useTerrainStore} from "@/pinia/terrain.ts";

interface Terrain {
  name: string;
  terrain: TileType;
}

const terrainStore = useTerrainStore();

const terrain = ref<Terrain[]>([
  { name: 'Grass', terrain: Grass },
  { name: 'Rock', terrain: Rock },
  { name: 'Sand', terrain: Sand },
  { name: 'Water', terrain: Water },
]);

const filteredTerrain = ref<Terrain[]>([]);

const search = (event: { query: string }) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredTerrain.value = [...terrain.value];
    } else {
      filteredTerrain.value = terrain.value.filter((t: Terrain) => {
        return t.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 150);
};

</script>