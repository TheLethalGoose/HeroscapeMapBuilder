<template>
  <div>
    <div ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {rectangle} from "honeycomb-grid";
import {Container, SVG} from "@svgdotjs/svg.js"
import {HeroscapeHex} from "@/model/HeroscapeHex.ts";
import {HeroscapeGrid} from "@/model/HeroscapeGrid.ts";
import {GroupManager} from "@/model/HeroscapeHexGroup.ts";
import {HeroscapeTileShapeTwo} from "@/model/HeroscapeTileShape.ts";

const canvasRef = ref<HTMLElement | null>(null);
const svgRef = ref<Container | null>(null);

const hexesColRow = 30;

const baseGrid = new HeroscapeGrid(HeroscapeHex, rectangle({width: hexesColRow, height: hexesColRow}));
const grid_1 = new HeroscapeGrid(HeroscapeHex, rectangle({width: hexesColRow, height: hexesColRow}));

const gridWidth = (HeroscapeHex.prototype.width * hexesColRow) + HeroscapeHex.prototype.width / 2;
const gridHeight = ((hexesColRow - 1) * (HeroscapeHex.prototype.height * 3 / 4) + HeroscapeHex.prototype.height);

function initializeSvg() {
  if (canvasRef.value) {
    const map = SVG().addTo(canvasRef.value).size(gridWidth, gridHeight).id('heroscape_map');
    const baseGridGroup = map.group().id('baseGrid');
    svgRef.value = map.group().id('layer_0')
    baseGrid.drawHexes(baseGridGroup);
  }
}

function handleMouseClick(event: any) {

  const hex = grid_1.pointToHex(
      {x: event.clientX, y: event.clientY},
      {allowOutside: false}
  )

  if (svgRef.value) {

    if (hex && !hex.group) {
      const group = GroupManager.createGroup(hex, grid_1, HeroscapeTileShapeTwo);
      group?.draw(svgRef.value);
      return;
    }

    if (hex && hex.group) {
      hex.group.rotate();
      hex.group.draw(svgRef.value);
      return
    }

  }
}

onMounted(() => {
  initializeSvg();
  window.addEventListener('click', handleMouseClick);
})

</script>