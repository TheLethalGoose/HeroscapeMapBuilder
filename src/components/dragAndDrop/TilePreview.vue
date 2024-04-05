<script setup lang="ts">
import TileBox from "@/components/dragAndDrop/Tile.vue";

</script>

<template>
  <div class="drag-preview">
    <TileBox :preview="true"/>
  </div>
</template>

<style scoped>

.drag-preview {
  display: inline-block;
}
</style>