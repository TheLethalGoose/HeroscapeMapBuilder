<template>
  <DndProvider :backend="HTML5Backend">
    <FloatingMenu/>
    <Grid class="grid" ref="reference"/>
  </DndProvider>
</template>

<script setup lang="ts">
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";

import FloatingMenu from "@/components/FloatingMenu.vue";
import Grid from "@/components/Grid.vue";

</script>

<style>
  .grid {
    padding: 0.5em;
  }
</style>