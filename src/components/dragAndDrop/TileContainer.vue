<script setup lang="ts">
import { useDrop } from 'vue3-dnd'

const [,drop] = useDrop(() => ({
  accept: '',
}))
</script>

<template>
  <div :ref="drop">
    <slot/>
  </div>
</template>