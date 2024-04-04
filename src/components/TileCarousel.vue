<template>
    <Carousel
        pt:item:style="width: 1px"
        pt:previousButton:class="mr-6"
        circular
        :value="tiles"
        :numVisible="4"
        :numScroll="1"
        :show-indicators="false"
        container-class="align-items-center justify-items-center">
      <template #item="slotProps">
          <TileDraggable/>
      </template>
    </Carousel>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import Tile from "@/components/Tile.vue";
    import TileDraggable from "@/components/TileDraggable.vue";
    const tiles = ref([1,2,3,4,5,6,7,8,9,10]);
</script>