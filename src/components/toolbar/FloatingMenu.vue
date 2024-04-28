<template>
  <div class="fixed top-0 left-0 right-0 flex mt-3 justify-content-center">
    <Toolbar class="flex border-primary flex-nowrap" style="min-width: 70rem">
      <template #start>
        <TileSelect/>
      </template>
      <template #center>
          <TileCarousel/>
      </template>
      <template #end>
        <LayerSelect/>
        <div class="ml-3 flex gap-2">
          <Button disabled icon="pi pi-print" severity="secondary" />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import TileCarousel from "@/components/toolbar/TileCarousel.vue";
import LayerSelect from "@/components/toolbar/LayerSelect.vue";
import TileSelect from "@/components/toolbar/TileSelect.vue";
</script>