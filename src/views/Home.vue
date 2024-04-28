<template>
  <DndProvider :backend="HTML5Backend">
    <DragContainer>
      <FloatingMenu/>
      <LinkButtons/>
      <Version/>
    </DragContainer>
    <Layers/>
  </DndProvider>
</template>

<script setup lang="ts">
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "vue3-dnd";
import FloatingMenu from "@/components/toolbar/FloatingMenu.vue";
import Layers from "@/components/Layers.vue";
import LinkButtons from "@/components/LinkButtons.vue";
import DragContainer from "@/components/dragAndDrop/TileContainer.vue";
import Version from "@/components/Version.vue";
</script>