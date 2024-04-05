<template>
    <Carousel
        circular
        :value="tiles"
        :numVisible="5"
        :numScroll="1"
        :show-indicators="false"
        class="w-18rem"
        >
        <template #item="slotProps">
          <TileDraggable :hexes="slotProps.data"/>
        </template>
    </Carousel>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import Tile from "@/components/dragAndDrop/Tile.vue";
    import TileDraggable from "@/components/dragAndDrop/TileDraggable.vue";
    import GrassTile from "@/assets/terrain/grass.svg";
    const tiles = ref([1,2,3,7,24]);
</script>