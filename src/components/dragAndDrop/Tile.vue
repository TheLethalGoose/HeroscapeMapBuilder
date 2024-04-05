<template>
  <div :ref="drag" class="box" :role="preview ? 'BoxPreview' : 'Box'"/>
</template>


<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { ItemTypes } from '@/types/ItemTypes.ts'
import { toRefs } from '@vueuse/core'

const props = defineProps<{
  preview?: boolean
}>();


const [collect, drag] = useDrag(() => ({
  type: ItemTypes.BOX,
  collect: monitor => ({
    isDragging: monitor.isDragging(),
    handlerId: monitor.getHandlerId(),
    position: monitor.getClientOffset()
  }),
}))

const { isDragging } = toRefs(collect)

</script>

<style scoped>
 .box{
   border: 1px dashed gray;
   background-color: #ee00ff;
   min-width: 50px;
   min-height: 50px;
   cursor: move;
   float: left;
 }
</style>