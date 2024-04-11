<template>
  <Carousel
      circular
      :value="tiles"
      :numVisible="5"
      :numScroll="5"
      :show-indicators="false"
      pt:item:class="align-self-center w-16rem flex-grow-0"
      pt:itemCloned:class="align-self-center"
      content-class="max-w-20rem"
  >
    <template #item="slotProps">
      <TileDraggable :tile-shape="slotProps.data" :tile-type="terrainStore.selectedTerrain.terrain"/>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import {shallowRef} from "vue";
import TileDraggable from "@/components/dragAndDrop/TileDraggable.vue";
import {TileShapeOne, TileShapeSeven, TileShapeThree, TileShapeTwentyFour, TileShapeTwo} from "@/model/TileShape.ts";
import {useTerrainStore} from "@/pinia/terrain.ts";

const terrainStore = useTerrainStore();
const tiles = shallowRef([TileShapeOne, TileShapeTwo, TileShapeThree, TileShapeSeven, TileShapeTwentyFour]);
</script>