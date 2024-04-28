<template>
  <InputNumber
      highlightOnFocus
      class="h-2rem"
      v-model="layerStore.activeLayerIndex"
      :min="1"
      :max="layerStore.maxLayers"
      input-class="w-3rem"
      showButtons
      buttonLayout="horizontal"
      :step="1"
      mode="decimal"
  >
    <template #incrementbuttonicon>
      <span class="pi pi-plus "/>
    </template>
    <template #decrementbuttonicon>
      <span class="pi pi-minus" />
    </template>
  </InputNumber>
</template>

<script setup lang="ts">
import {useLayerStore} from "@/pinia/layerStore.ts";

const layerStore = useLayerStore();
</script>