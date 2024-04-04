<template>
  <div class="fixed top-0 left-0 right-0 w-screen flex mt-5 justify-center ">
    <Toolbar
        class="border-primary w-full flex flex-nowrap"
        style="margin-left: 18vw; margin-right: 18vw; height: 8vh; min-height:4rem"
    >
      <template #start>
        <TerrainPick/>
      </template>
      <template #center>
          <TileCarousel/>
      </template>
      <template #end>
        <Button disabled icon="pi pi-print" class="mr-2" severity="secondary" />
        <Button disabled icon="pi pi-upload" class="mr-2" severity="secondary"/>
        <Button disabled icon="pi pi-download" class="mr-2" severity="secondary"/>
      </template>
    </Toolbar>
  </div>
</template>

<script setup lang="ts">

import TerrainPick from "@/components/TerrainPick.vue";
import TileCarousel from "@/components/TileCarousel.vue";

</script>