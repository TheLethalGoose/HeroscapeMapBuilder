<template>
  <div :ref="drop">
    <div ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {rectangle} from "honeycomb-grid";
import {ItemTypes} from "@/types/ItemTypes.ts";
import {Container, SVG} from "@svgdotjs/svg.js"
import {Hex} from "@/model/grid/Hex.ts";
import {DrawableGrid} from "@/model/grid/DrawableGrid.ts";
import {HexGroup, HexGroupManager} from "@/model/grid/HexGroup.ts";
import {toRefs, useMouseInElement} from "@vueuse/core";
import {useDrop} from "vue3-dnd";
import {DragItem} from "@/interfaces/interfaces.ts";

const canvasRef = ref<HTMLElement | null>(null);

const baseGridSvgRef = ref<Container | null>(null);
const activeGridSvgRef = ref<Container | null>(null);
const currentBaseGridHex = ref<Hex>();
const currentBaseGridGroup = ref<HexGroup>();

const hexesPerRow = 50;
const hexesPerCol = 80;

const gridWidth = (Hex.prototype.width * hexesPerCol) + Hex.prototype.width / 2;
const gridHeight = ((hexesPerRow - 1) * (Hex.prototype.height * 3 / 4) + Hex.prototype.height);

const baseGrid = new DrawableGrid(Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));
const grid_1 = new DrawableGrid(Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));


function initializeSvg() {
  if (canvasRef.value) {
    const map = SVG().addTo(canvasRef.value).size(gridWidth + 1, gridHeight).id('heroscape_map');
    baseGridSvgRef.value = map.group().id('baseGrid');
    activeGridSvgRef.value = map.group().id('layer_0')
    baseGrid.drawHexes(baseGridSvgRef.value);
  }
}

function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>): void => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
}

const {elementX, elementY} = useMouseInElement(canvasRef);

const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop: (item: DragItem) => {
    let hex = grid_1.pointToHex(
        {x: elementX.value, y: elementY.value},
        {allowOutside: false}
    )

    if (hex && activeGridSvgRef.value && canDrop.value) {
      const newGroup = HexGroupManager.createGroup(hex, grid_1, item.tileShape, item.tileType);
      newGroup?.draw(activeGridSvgRef.value);
    }
  },
  hover: throttle((item: DragItem) => {
    if (isOver.value && canDrop.value) {
      let hex: Hex | undefined = baseGrid.pointToHex(
          {x: elementX.value, y: elementY.value},
          {allowOutside: false}
      )

      if (hex && (!currentBaseGridHex.value || currentBaseGridHex.value !== hex) && baseGridSvgRef.value) {
        if (currentBaseGridGroup.value) {
          currentBaseGridGroup.value.erase(baseGridSvgRef.value);
          currentBaseGridGroup.value.destroy();
        }
        currentBaseGridHex.value = hex;
        currentBaseGridGroup.value = HexGroupManager.createGroup(hex, baseGrid, item.tileShape);
        currentBaseGridGroup.value?.draw(baseGridSvgRef.value);

      }
    }
  }, 60),
  end: () => { // :(
    if (currentBaseGridGroup.value && baseGridSvgRef.value) {
      currentBaseGridGroup.value.erase(baseGridSvgRef.value);
      currentBaseGridGroup.value.destroy();
      currentBaseGridGroup.value = undefined;
    }
  },
  collect: monitor => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))

const {canDrop, isOver} = toRefs(collect)

onMounted(() => {
  initializeSvg();
  window.scrollTo(gridWidth / 4, gridHeight / 4);
})

</script>