<template>
  <div ref="canvasRef" />
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import {Point, PointArray, SVG} from '@svgdotjs/svg.js'
import {defineHex, Grid, Hex, rectangle} from "honeycomb-grid";

const canvasRef = ref();

const Hexagon = defineHex({ dimensions: 50, origin: 'topLeft' })
const grid = new Grid(Hexagon, rectangle({ width: 2, height: 1 }))

function renderSVG(canvas: any, grid: Grid<Hex>){
  grid.forEach((hexagon: Hex) => {
    //console.log(hexagon)
    const hexagonToDraw = canvas.polygon(hexagon.corners.map(({ x, y }) => [x, y]).flat()).fill('none').fill('#f06');
    canvas.group().add(hexagonToDraw);
  });
}

function drawCanvas() {
  const canvas = SVG().addTo(canvasRef.value).size(1000, 1000);
  renderSVG(canvas, grid)

}

const handleMouseMove = (event: any) => {
  //console.log('Mouse X:', event.offsetX);
  //console.log('Mouse Y:', event.offsetY);

  const hex = grid.pointToHex(
      { x: event.offsetX, y: event.offsetY },
      { allowOutside: false }
  )
  console.log(hex)
}

onMounted(() => {
  drawCanvas();
  window.addEventListener('click', handleMouseMove);
})
onUpdated(drawCanvas)



</script>
<style scoped>
.gridArea {
  position: relative;
}

</style>
