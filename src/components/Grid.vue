<template>
  <div>
    <div ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {rectangle} from "honeycomb-grid";
import {Svg, SVG} from "@svgdotjs/svg.js"
import {HeroscapeHex} from "@/model/HeroscapeHex.ts";
import {HeroscapeGrid} from "@/model/HeroscapeGrid.ts";
import {
  HeroscapeTileShapeOne,
  HeroscapeTileShapeSeven,
  HeroscapeTileShapeThree,
  HeroscapeTileShapeTwo, HeroscapeTileTwentyFour
} from "@/model/HeroscapeTileShape.ts";

const canvasRef = ref<HTMLElement | null>(null);
const svgRef = ref<Svg | null>(null);

const hexesColRow = 50;

const grid = new HeroscapeGrid(HeroscapeHex, rectangle({ width: hexesColRow, height: hexesColRow}));


const gridWidth = (HeroscapeHex.prototype.width*hexesColRow)+HeroscapeHex.prototype.width/2;
const gridHeight = ((hexesColRow-1) * ( HeroscapeHex.prototype.height * 3/4) + HeroscapeHex.prototype.height);

function initializeSvg() {
  if (canvasRef.value) {
    const svg = SVG().addTo(canvasRef.value).size(gridWidth, gridHeight).id('grid');
    svgRef.value = svg;
    grid.drawHexes(svg);
  }
}

const handleMouseClick = (event: any) => {
  if (svgRef.value) {
    const shapeOne = new HeroscapeTileShapeOne();
    const shapeTwo = new HeroscapeTileShapeTwo();
    const shapeThree = new HeroscapeTileShapeThree();
    const shapeSeven = new HeroscapeTileShapeSeven();
    const shapeTwentyFour = new HeroscapeTileTwentyFour();

    const hex = grid.pointToHex(
        { x: event.offsetX, y: event.offsetY },
        { allowOutside: false }
    )

    if (hex) {
      let updatedHexes = grid.setHexagonsInShape(hex, shapeTwentyFour);
      grid.drawHexes(svgRef.value, updatedHexes);
    }
  }
}

onMounted(() => {
  initializeSvg();
  window.addEventListener('click', handleMouseClick);
})


</script>
