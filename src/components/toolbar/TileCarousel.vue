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
          <TileDraggable :hexes="slotProps.data"/>
        </template>
    </Carousel>
</template>

<script setup lang="ts">
    import {ref} from "vue";
    import TileDraggable from "@/components/dragAndDrop/TileDraggable.vue";
    const tiles = ref([1,2,3,7,24]);

</script>