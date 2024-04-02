<template>
  <div :ref="drag" class="box" role="row"/>
</template>

<script lang="ts" setup>
import { useDrag } from 'vue3-dnd'
import { ItemTypes } from '@/Types/ItemTypes.ts'
import { toRefs } from '@vueuse/core'


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
   background-color: white;
   min-width: 50px;
   min-height: 50px;
   cursor: move;
   float: left;
 }
</style>