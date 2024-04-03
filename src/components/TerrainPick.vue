<template>
  <img draggable="false" :alt="selectedTerrain?.name" :src="selectedTerrain?.path" class="mr-2 w-2"/>
  <AutoComplete
      class="w-8"
      v-model="selectedTerrain"
      dropdown
      optionLabel="name"
      :suggestions="filteredTerrain"
      @complete="search"
      append-to="self"
  >
    <template #option="slotProps">
      <div class="flex align-options-center">
        <img :alt="slotProps.option.name" :src="slotProps.option.path" class="mr-2 w-2"/>
        <div class="align-self-center">{{ slotProps.option.name }}</div>
      </div>
    </template>
  </AutoComplete>
</template>

<script setup lang="ts">

import { ref } from "vue";

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
  }, 250);
};

</script>