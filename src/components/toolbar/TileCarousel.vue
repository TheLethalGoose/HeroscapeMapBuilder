<template>
  <Carousel
      ref="mycarousel"
      :value="tileTypeStore.getSelectedTileType.shapes"
      :numVisible="numsVisible"
      :numScroll="4"
      :show-indicators="false"
      pt:item:class="align-self-center w-16rem flex-grow-0"
      pt:itemCloned:class="align-self-center"
      :pt:itemsContainer="tileTypeStore.getSelectedTileType.shapes.length < numsVisible ? 'justify-content-center' : '' "
      content-class="w-30rem"
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

const numsVisible = ref(8);
const tileTypeStore = useTileTypeStore();
</script>