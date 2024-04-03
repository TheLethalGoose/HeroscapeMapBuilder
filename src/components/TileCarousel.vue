<template>
  <Carousel :value="tiles" :numVisible="1" :numScroll="1" :show-indicators="false" container-class="align-items-center">
    <template #item="slotProps">

    </template>
  </Carousel>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import Tile from "@/components/Tile.vue";
    const tiles = ref([]);
</script>