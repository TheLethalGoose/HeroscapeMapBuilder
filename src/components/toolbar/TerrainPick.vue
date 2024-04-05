<template>
    <HexOne style="fill: #009b44;" class="w-2rem mr-2"/>
    <AutoComplete
        class="w-10rem h-2rem"
        v-model="selectedTerrain"
        dropdown
        optionLabel="name"
        :suggestions="filteredTerrain"
        @complete="search"
        append-to="self"
    >
      <template #option="slotProps">
        <div class="flex align-options-center">
          <HexOne style="fill: #1aff00;" class="w-1rem mr-2"/>
          <div class="align-self-center">{{ slotProps.option.name }}</div>
        </div>
      </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HexOne from "@/assets/terrain/types/hexOne.svg"

interface Terrain {
  name: string;
  path: string;
}

const terrain = ref<Terrain[]>([
  { name: 'Grass', path: 'src/assets/terrain/grass.svg' },
  { name: 'Rock', path: 'src/assets/terrain/rock.svg' },
  { name: 'Sand', path: 'src/assets/terrain/sand.svg' },
  { name: 'Water', path: 'src/assets/terrain/water.svg' },
]);

const selectedTerrain = ref<Terrain | null>(terrain.value[0]);
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