<template>
  <Carousel
      :value="treeStore.getSelectedNodesData.getTiles()"
      :key="treeStore.getSelectedNodesData.getTiles().length"
      :numVisible="numsVisible"
      :numScroll="5"
      :circular="treeStore.getSelectedNodesData.getTiles().length > numsVisible"
      :show-indicators="false"
      :pt:itemsContainer="treeStore.getSelectedNodesData.getTiles().length < numsVisible ? 'justify-content-center min-h-full' : 'min-h-full'"
      pt:item:class="align-self-center flex-grow-0"
      pt:itemCloned:class="align-self-center"
      content-class="w-20rem"
  >
    <template #item="slotProps">
      <TileDraggable :tile-shape="slotProps.data.shape" :tile-type="slotProps.data.type"/>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import TileDraggable from "@/components/dragAndDrop/TileDraggable.vue";
import {ref} from "vue";
import {useTreeStore} from "@/pinia/tree.ts";

const treeStore = useTreeStore();
const numsVisible = ref(5);
</script>