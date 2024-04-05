<script lang="ts" setup>
import {useDrag} from 'vue3-dnd'
import {ItemTypes} from '@/types/ItemTypes.ts'
import {toRefs} from '@vueuse/core'
import {getEmptyImage} from "react-dnd-html5-backend";
import {onMounted, ref} from "vue";

import One from "@/assets/terrain/types/hexOne.svg"
import Two from "@/assets/terrain/types/hexTwo.svg"
import Three from "@/assets/terrain/types/hexThree.svg"
import Seven from "@/assets/terrain/types/hexSeven.svg"
import TwentyFour from "@/assets/terrain/types/hexTwentyFour.svg"


const [collect, drag, preview] = useDrag(() => ({
  type: ItemTypes.BOX,
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
}))

const props = defineProps<{
  hexes: number;
}>();

onMounted(() => {
  preview(getEmptyImage(), {captureDraggingState: true})
})

const {isDragging} = toRefs(collect);
const fillColor = ref('#009b44');


</script>

<template>
  <div :ref="drag"
       :style="{
        opacity: isDragging ? 0.2 : 1,
        cursor: 'move'
        }"
       class="box mx-1"
       role="DraggableBox"
  >
    <One v-if="props.hexes === 1" :style="{fill: fillColor}"/>
    <Two v-if="props.hexes === 2" :style="{fill: fillColor}"/>
    <Three v-if="props.hexes === 3" :style="{fill: fillColor}"/>
    <Seven v-if="props.hexes === 7" :style="{fill: fillColor}"/>
    <TwentyFour v-if="props.hexes === 24" :style="{fill: fillColor}"/>
  </div>

</template>