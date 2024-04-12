<template>
  <Carousel
      :value="tileTypeStore.getSelectedTileType.shapes"
      :key="tileTypeStore.getSelectedTileType.shapes.length"
      :numVisible="numsVisible"
      :numScroll="3"
      :circular="tileTypeStore.getSelectedTileType.shapes.length > numsVisible"
      :show-indicators="false"
      :pt:itemsContainer="tileTypeStore.getSelectedTileType.shapes.length < numsVisible ? 'justify-content-center' : '' "
      pt:item:class="align-self-center flex-grow-0"
      pt:itemCloned:class="align-self-center"
      content-class="w-23rem"
  >
    <template #item="slotProps">
      <TileDraggable :tile-shape="slotProps.data" :tile-type="tileTypeStore.getSelectedTileType"/>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import TileDraggable from "@/components/dragAndDrop/TileDraggable.vue";
import {useTileTypeStore} from "@/pinia/terrain.ts";
import {ref} from "vue";

const numsVisible = ref(6);
const tileTypeStore = useTileTypeStore();
</script>