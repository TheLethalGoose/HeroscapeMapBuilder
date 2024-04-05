<template>
  <InputNumber highlightOnFocus class="h-2rem" v-model="value" :min="1" :max="30" input-class="w-3rem" showButtons buttonLayout="horizontal" :step="1" mode="decimal">
    <template #incrementbuttonicon>
      <span class="pi pi-plus "/>
    </template>
    <template #decrementbuttonicon>
      <span class="pi pi-minus" />
    </template>
  </InputNumber>
</template>

<script setup lang="ts">
import {ref} from "vue";

const value = ref(1);
</script>