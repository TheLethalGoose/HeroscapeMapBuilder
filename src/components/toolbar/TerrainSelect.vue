<template>
  <component :is="TileShapeOne.svg" :style="{fill: terrainStore.getSelectedTileType.color}" class="w-2rem mr-2"/>
    <AutoComplete
        class="w-10rem h-2rem"
        v-model="selectedTileType"
        dropdown
        optionLabel="name"
        :suggestions="filteredTerrain"
        @complete="search"
        append-to="self"
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <component :is="TileShapeOne.svg" :style="{fill: slotProps.option.color}" class="w-1rem mr-2"/>
          <div class="align-self-center">{{ slotProps.option.name }}</div>
        </div>
      </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {Grass, Ice, Lava, LavaField, Rock, Sand, Snow, Swamp, SwampWater, TileType, Water} from "@/model/TileType.ts";
import {useTileTypeStore} from "@/pinia/terrain.ts";
import {TileShapeOne} from "@/model/TileShape.ts";

const terrainStore = useTileTypeStore();
const selectedTileType = ref<TileType>(terrainStore.selectedTileType);

const tileTypes = ref<TileType[]>([
  Grass,
  Rock,
  Sand,
  Water,
  Swamp,
  SwampWater,
  Lava,
  LavaField,
  Ice,
  Snow
]);

const filteredTerrain = ref<TileType[]>([]);

const search = (event: { query: string }) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredTerrain.value = [...tileTypes.value];
    } else {
      filteredTerrain.value = tileTypes.value.filter((t: TileType) => {
        return t.name.toLowerCase().startsWith(event.query.toLowerCase());
      });
    }
  }, 150);
};

watch(selectedTileType, (newValue) => {
  terrainStore.setSelectedTileType(newValue);
}, {deep: true});

</script>