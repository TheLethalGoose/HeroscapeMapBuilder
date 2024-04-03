<template>
  <DndProvider :backend="HTML5Backend">
    <FloatingMenu/>
    <Grid/>
  </DndProvider>
</template>

<script setup lang="ts">

import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import FloatingMenu from "@/components/FloatingMenu.vue";
import Grid from "@/components/Grid.vue";

</script>