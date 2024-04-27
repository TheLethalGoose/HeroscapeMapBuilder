<template>
  <div :ref="drop">
    <div ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {ItemTypes} from "@/types/ItemTypes.ts";
import {Container, SVG} from "@svgdotjs/svg.js"
import {Hex} from "@/model/grid/Hex.ts";
import {HexGroup, HexGroupManager} from "@/model/grid/HexGroup.ts";
import {toRefs, useMouseInElement} from "@vueuse/core";
import {useDrop} from "vue3-dnd";
import {DragItem} from "@/interfaces/interfaces.ts";
import {useGridStore} from "@/pinia/grid.ts";
import {throttle} from "@/util/throttle.ts";

const gridStore = useGridStore();

const canvasRef = ref<HTMLElement | null>(null);
const svgRef = ref<Container | null>(null);

const currentBaseGridHex = ref<Hex>();
const currentBaseGridGroup = ref<HexGroup>();

const {elementX, elementY} = useMouseInElement(canvasRef);

const initializeSvg = () => {
  if (canvasRef.value) {
    svgRef.value = SVG().addTo(canvasRef.value).size(gridStore.getGridWidth + 1, gridStore.getGridHeight).id('heroscape_map');
  }
}

const initializeGrids = () => {
  if (svgRef.value) {
    gridStore.flush();
    gridStore.initBaseGrid(svgRef.value);
    gridStore.addGrid(svgRef.value);
    gridStore.setActiveGrid(1);
    gridStore.getBaseGrid.drawHexes();
  }
}

const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop: (item: DragItem) => {
    if (gridStore.getActiveGrid) {
      let hex = gridStore.getActiveGrid.pointToHex(
          {x: elementX.value, y: elementY.value},
          {allowOutside: false}
      )

      if (hex && canDrop.value) {
        const newGroup = HexGroupManager.createGroup(hex, gridStore.getActiveGrid, item.tileShape, item.tileType);
        newGroup?.draw(gridStore.getActiveGrid.svgGroup);
      }
    }
  },
  hover: throttle((item: DragItem) => {
    if (isOver.value && canDrop.value) {
      let hex: Hex | undefined = gridStore.getBaseGrid.pointToHex(
          {x: elementX.value, y: elementY.value},
          {allowOutside: false}
      )

      if (hex && (!currentBaseGridHex.value || currentBaseGridHex.value !== hex)) {
        if (currentBaseGridGroup.value) {
          currentBaseGridGroup.value.erase(gridStore.getBaseGrid.svgGroup);
          currentBaseGridGroup.value.destroy();
        }
        currentBaseGridHex.value = hex;
        currentBaseGridGroup.value = HexGroupManager.createGroup(hex, gridStore.getBaseGrid, item.tileShape);
        currentBaseGridGroup.value?.draw(gridStore.getBaseGrid.svgGroup);

      }
    }
  }, 60),
  collect: monitor => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))

const {canDrop, isOver} = toRefs(collect)

onMounted(() => {
  initializeSvg();
  initializeGrids();
  window.scrollTo(gridStore.getGridWidth / 4, gridStore.getGridHeight / 4);
})

</script>