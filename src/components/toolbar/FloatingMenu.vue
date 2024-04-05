<template>
  <div class="fixed top-0 left-0 right-0 flex mt-3 justify-content-center">
    <Toolbar class="flex border-primary flex-nowrap" style="min-width: 60rem">
      <template #start>
        <TerrainPick/>
      </template>
      <template #center>
        <div class="flex align-items-center">
          <TileCarousel/>
          <LayerSelect/>
        </div>
      </template>
      <template #end>
        <div class="ml-5 flex gap-2">
          <Button disabled icon="pi pi-print" severity="secondary" />
          <Button disabled icon="pi pi-upload" severity="secondary"/>
          <Button disabled icon="pi pi-download" severity="secondary"/>
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">
import TerrainPick from "@/components/toolbar/TerrainPick.vue";
import TileCarousel from "@/components/toolbar/TileCarousel.vue";
import LayerSelect from "@/components/toolbar/LayerSelect.vue";

</script>