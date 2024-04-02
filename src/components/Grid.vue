<template>
  <div :ref="drop">
    <div ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue'
import {rectangle} from "honeycomb-grid";
import {ItemTypes} from "@/Types/ItemTypes.ts";
import {Container, SVG} from "@svgdotjs/svg.js"
import {Hex} from "@/model/Hex.ts";
import {DrawableGrid} from "@/model/DrawableGrid.ts";
import {HexGroup, HexGroupManager} from "@/model/HexGroup.ts";
import {TileShapeThree} from "@/model/TileShape.ts";
import {toRefs, useMouseInElement} from "@vueuse/core";
import {useDrop} from "vue3-dnd";
import {Grass} from "@/model/TileType.ts";

const canvasRef = ref<HTMLElement | null>(null);

const baseGridSvgRef = ref<Container | null>(null);
const activeGridSvgRef = ref<Container | null>(null);
const currentBaseGridHex = ref<Hex>();
const currentBaseGridGroup = ref<HexGroup>();

const hexesPerRow = 100;
const hexesPerCol = 100;

const gridWidth = (Hex.prototype.width * 100) + Hex.prototype.width / 2;
const gridHeight = ((100 - 1) * (Hex.prototype.height * 3 / 4) + Hex.prototype.height);

const baseGrid = new DrawableGrid(Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));
const grid_1 = new DrawableGrid(Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));


function initializeSvg() {
  if (canvasRef.value) {
    const map = SVG().addTo(canvasRef.value).size(gridWidth+1, gridHeight).id('heroscape_map');
    baseGridSvgRef.value = map.group().id('baseGrid');
    activeGridSvgRef.value = map.group().id('layer_0')
    baseGrid.drawHexes(baseGridSvgRef.value);
  }
}

const { elementX, elementY, isOutside  } = useMouseInElement(canvasRef);

const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop: () => {
    let hex = grid_1.pointToHex(
        {x: elementX.value, y: elementY.value},
        {allowOutside: false}
    )

    if(hex && activeGridSvgRef.value){
      const newGroup = HexGroupManager.createGroup(hex, grid_1, TileShapeThree, Grass);
      newGroup?.draw(activeGridSvgRef.value);
    }

  },
  collect: monitor => ({
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
}))

const { canDrop, isOver } = toRefs(collect)

onMounted(() => {
  initializeSvg();
})

watchEffect(() => {
  if(!isOutside.value && isOver && canDrop.value){
    let hex: Hex = baseGrid.pointToHex(
        {x: elementX.value, y: elementY.value},
        {allowOutside: true}
    )

      if ((!currentBaseGridHex.value || currentBaseGridHex.value !== hex) && baseGridSvgRef.value) {
        if (currentBaseGridGroup.value) {
          currentBaseGridGroup.value.erase(baseGridSvgRef.value);
          currentBaseGridGroup.value.destroy();
        }
        currentBaseGridHex.value = hex;
        currentBaseGridGroup.value = HexGroupManager.createGroup(hex, baseGrid, TileShapeThree);
        currentBaseGridGroup.value?.draw(baseGridSvgRef.value);

      }
  }

  if(!canDrop.value && currentBaseGridGroup.value && baseGridSvgRef.value){
    currentBaseGridGroup.value.erase(baseGridSvgRef.value);
    currentBaseGridGroup.value.destroy();
    currentBaseGridGroup.value = undefined;
  }
})

</script>