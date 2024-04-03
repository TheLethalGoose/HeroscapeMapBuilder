<script lang="ts" setup>
import {useDrag} from 'vue3-dnd'
import {ItemTypes} from '@/types/ItemTypes.ts'
import {toRefs} from '@vueuse/core'
import {getEmptyImage} from "react-dnd-html5-backend";
import Tile from "@/components/Tile.vue"
import {onMounted} from "vue";

const props = defineProps<{
  left: number;
  top: number;
}>();

const [collect, drag, preview] = useDrag(() => ({
  type: ItemTypes.BOX,
  item: props,
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
}))

onMounted(() => {
  preview(getEmptyImage(), {captureDraggingState: true})
})

const {isDragging} = toRefs(collect)

</script>

<template>
  <div :ref="drag"
       :style="{
        left: `${props.left}px`,
        top: `${props.top}px`,
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
        }"
       class="box"
       role="DraggableBox"
  >
    <Tile/>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  cursor: move;
}
</style>