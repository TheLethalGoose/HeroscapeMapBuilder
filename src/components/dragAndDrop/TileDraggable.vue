<script lang="ts" setup>
import {useDrag} from 'vue3-dnd'
import {ItemTypes} from '@/types/ItemTypes.ts'
import {toRefs} from '@vueuse/core'
import {getEmptyImage} from "react-dnd-html5-backend";
import {onMounted} from "vue";

import {TileType} from "@/model/TileType.ts";
import {TileShape} from "@/model/TileShape.ts";

const props = defineProps<{
  tileType: TileType;
  tileShape: TileShape;
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

const {isDragging} = toRefs(collect);

</script>

<template>
  <div :ref="drag"
       :style="{
        opacity: isDragging ? 0.2 : 1,
        cursor: 'move'
        }"
       class="box mx-1 flex"
       role="DraggableBox"
  >
    <component :is="props.tileShape.svg" :style="{fill: props.tileType.color}"/>
  </div>
</template>