<template>
  <div>
    <div ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {rectangle} from "honeycomb-grid";
import {Container, SVG} from "@svgdotjs/svg.js"
import {Hex} from "@/model/Hex.ts";
import {DrawableGrid} from "@/model/DrawableGrid.ts";
import {HexGroupManager, HexGroup} from "@/model/HexGroup.ts";
import {TileShapeTwo} from "@/model/TileShape.ts";

const canvasRef = ref<HTMLElement | null>(null);
const svgRef = ref<Container | null>(null);

let selectedHexGroup: HexGroup | null = null;

const hexesColRow = 15;

const baseGrid = new DrawableGrid(Hex, rectangle({width: hexesColRow, height: hexesColRow}));
const grid_1 = new DrawableGrid(Hex, rectangle({width: hexesColRow, height: hexesColRow}));

const gridWidth = (Hex.prototype.width * hexesColRow) + Hex.prototype.width / 2;
const gridHeight = ((hexesColRow - 1) * (Hex.prototype.height * 3 / 4) + Hex.prototype.height);

function initializeSvg() {
  if (canvasRef.value) {
    const map = SVG().addTo(canvasRef.value).size(gridWidth, gridHeight).id('heroscape_map');
    const baseGridGroup = map.group().id('baseGrid');
    svgRef.value = map.group().id('layer_0')
    baseGrid.drawHexes(baseGridGroup);
  }
}

function handleRightClick(event:any){
  event.preventDefault();
  const hex = grid_1.pointToHex(
      {x: event.clientX, y: event.clientY},
      {allowOutside: false}
  )

  if(svgRef.value){
    if (hex && hex.group) {
      hex.group.selectGroup();
      hex.group.draw(svgRef.value);
      selectedHexGroup = hex.group;
      return;
    }

    if(selectedHexGroup && hex && svgRef.value){
      HexGroupManager.moveGroup(selectedHexGroup, hex, grid_1, svgRef.value);
    }
  }

}

function handleMouseClick(event: any) {

  const hex = grid_1.pointToHex(
      {x: event.clientX, y: event.clientY},
      {allowOutside: false}
  )

  if (svgRef.value) {

    const rotate = true;
    const destroy = false;

    if (hex && !hex.group) {
      const group = HexGroupManager.createGroup(hex, grid_1, TileShapeTwo);
      group?.draw(svgRef.value);
      return;
    }

    if (hex && hex.group && rotate) {
      hex.group.erase(svgRef.value);
      hex.group.rotate(hex);
      hex.group.draw(svgRef.value);
      return;
    }

    if (hex && hex.group && destroy) {
      hex.group.erase(svgRef.value);
      hex.group.destroy();
      return;
    }

  }
}

onMounted(() => {
  initializeSvg();
  window.addEventListener('click', handleMouseClick);
  window.addEventListener('contextmenu', handleRightClick);
})

</script>