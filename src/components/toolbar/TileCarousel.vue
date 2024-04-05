<template>
    <Carousel
        circular
        :value="tiles"
        pt:item:class="align-self-center"
        pt:itemCloned:class="align-self-center"
        container-class="align-items-center"
        :numVisible="5"
        :numScroll="1"
        :show-indicators="false"
        class="w-19rem"
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