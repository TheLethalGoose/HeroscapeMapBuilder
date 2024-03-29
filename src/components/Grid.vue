<template>
  <div>
    <div ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import {defineHex, Direction, Grid, Hex, rectangle, HexCoordinates} from "honeycomb-grid";
import {Svg, SVG} from "@svgdotjs/svg.js"

const canvasRef = ref();

let edgePoints = [];

const hexes = 25;
const dimension = 20;

class CustomHex extends defineHex({ dimensions: dimension, origin: 'topLeft' }) {
  static create(coordinates: HexCoordinates): CustomHex {
    const hex = new CustomHex(coordinates);
    return hex;
  }

  private _isSet: boolean = false;
  private _borders: [] = [];
  type: string = '';

  get isSet(): boolean {
    return this._isSet;
  }

  set isSet(value: boolean) {
    this._isSet = value;
  }

  get borders(): []{
    return this._borders;
  }

  set borders(value: []){
    this._borders = value;
  }

}

const grid = new Grid(CustomHex, rectangle({ width: hexes, height: hexes}));

const updateHexagon = (hexagon: CustomHex) => {
  const canvas = SVG('#map');
  drawHexagon(hexagon);
};
const drawHexagon = (hexagon: CustomHex) => {

  const canvas = SVG('#map');

  const hexId = `hex-${hexagon.q}-${hexagon.r}`;
  let group = canvas.findOne(`#${hexId}`);

  if (!group) {
    group = canvas.group().id(hexId);
  } else{
    group.clear();
  }

  const strokeColor = !hexagon.isSet ? '#a9a9a9' : '#f06';
  const fillColor = hexagon.isSet ? '#f06' : 'none';

  group?.polygon(hexagon.corners.map(({ x, y }) => [x, y]).flat())
      .stroke({width: 1, color: strokeColor})
      .fill(fillColor);

  group?.text(`Q: ${hexagon.q}, R: ${hexagon.r}\n ${hexagon.isSet}`).font({
    size:     dimension/5,
    anchor:   'middle',
  }).attr({ x: hexagon.x, y: hexagon.y, 'dominant-baseline': 'middle'}).fill('#fff')

  for (const [index, startPoint] of hexagon.borders.entries()) {
    if (index % 2 === 0) {
      const endPoint = hexagon.borders[index + 1];

      group?.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
          .stroke({ width: 1.5, color: '#ffffff' })
          .attr({ 'stroke-linecap': 'round' });
    }
  }

  //group.circle(1).attr({ cx: hexagon.x, cy: hexagon.y }).fill('#f06');
};

const shapeSeven = [
    [0,-1],[1,-1],
    [-1,0],[0,0],[1,0],
    [-1,1],[0,1]
]

function setHexagons(centerHexagon: CustomHex, shape: number[][], grid: Grid<CustomHex>) {

  let hexesToUpdate = [];

  shape.forEach(([q, r]) => {
    const newQ = q + centerHexagon.q;
    const newR = r + centerHexagon.r;

    const hex = grid.getHex([newQ, newR]);

    if (hex) {
      hex.isSet = true;
    }

    hexesToUpdate.push(hex);
  });

  hexesToUpdate.forEach((hex) => {
    getBorders(hex);
    drawHexagon(hex);
  })
}

function renderSVG(){

  SVG().addTo(canvasRef.value).size(1000, 1000).id('map');

  grid.forEach((hexagon: CustomHex) => {
    drawHexagon(hexagon);
  });

}


function getBorders(hex: CustomHex){

  const cornerIndicesMap = new Map<Direction, [number, number]>([
    [Direction.E, [0, 1]],
    [Direction.SE, [1, 2]],
    [Direction.SW, [2, 3]],
    [Direction.W, [3, 4]],
    [Direction.NW, [4, 5]],
    [Direction.NE, [5, 0]]
  ]);



  for (let direction of [Direction.NE, Direction.E, Direction.SE, Direction.SW, Direction.W, Direction.NW]) {
    let neighbor = grid.neighborOf([hex.q, hex.r], direction, {allowOutside: false});
    if (!neighbor?.isSet) {
      const cornerIndices = cornerIndicesMap.get(direction);
      if (cornerIndices) {
        hex.borders.push(hex.corners[cornerIndices[0]], hex.corners[cornerIndices[1]]);
      }
    }
  }


}

const handleMouseClick = (event: any) => {
  //console.log('Mouse X:', event.offsetX);
  //console.log('Mouse Y:', event.offsetY);

  const hex = grid.pointToHex(
      { x: event.offsetX, y: event.offsetY },
      { allowOutside: false }
  )

  if(hex){
    setHexagons(hex,shapeSeven,grid);
  }

}

onMounted(() => {
  renderSVG();
  window.addEventListener('click', handleMouseClick);
})
onUpdated(renderSVG)


</script>
