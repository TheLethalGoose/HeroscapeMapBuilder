<template>
  <div id="dropRef" :ref="drop">
    <div id="svgRef" ref="canvasRef"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {ItemTypes} from "@/types/ItemTypes.ts";
import {Container, SVG} from "@svgdotjs/svg.js"
import '@svgdotjs/svg.filter.js'
import {Hex} from "@/model/grid/Hex.ts";
import {HexGroup, HexGroupManager} from "@/model/grid/HexGroup.ts";
import {toRefs, useMouseInElement} from "@vueuse/core";
import {useDrop} from "vue3-dnd";
import {DragItem} from "@/interfaces/interfaces.ts";
import {useLayerStore} from "@/pinia/layerStore.ts";
import {throttle} from "@/util/throttle.ts";

const layerStore = useLayerStore();

const canvasRef = ref<HTMLElement | null>(null);
const svgRef = ref<Container | null>(null);
const opacityLayerRef = ref<Container | null>(null);

const currentOutlineLayerHex = ref<Hex>();
const currentOutlineLayerGroup = ref<HexGroup>();

const {elementX, elementY} = useMouseInElement(canvasRef);

const initializeSvg = () => {
  if (canvasRef.value) {
    svgRef.value = SVG().addTo(canvasRef.value).size(layerStore.getLayerWidth + 1, layerStore.getLayerHeight).id('map');
  }
}

const initializeOpacityLayer = () => {
  const opacityLayer = layerStore.getOutlineLayer;

  opacityLayerRef.value = opacityLayer.svgGroup;
  opacityLayer.forEach((hex: Hex) => {
    hex.opacityMask = true;
  });
  opacityLayer.drawHexes();
}

const initializeLayers = () => {
  if (svgRef.value) {
    layerStore.flush();
    layerStore.initLayers(svgRef.value);
    layerStore.getBaseLayer.drawHexes();

    initializeOpacityLayer();
  }
}

const [collect, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop: (item: DragItem) => {
    if (layerStore.getActiveLayer) {
      let hex = layerStore.getActiveLayer.pointToHex(
          {x: elementX.value, y: elementY.value},
          {allowOutside: false}
      )

      if (hex && canDrop.value) {
        const newGroup = HexGroupManager.createGroup(hex, layerStore.getActiveLayer, item.tileShape, item.tileType);
        newGroup?.draw(layerStore.getActiveLayer.svgGroup);
        currentOutlineLayerGroup.value?.erase(layerStore.getOutlineLayer.svgGroup);
        currentOutlineLayerGroup.value?.destroy();
        currentOutlineLayerGroup.value = undefined;
      }
    }
  },
  hover: throttle((item: DragItem) => {
    if (isOver.value && canDrop.value) {
      let hex: Hex | undefined = layerStore.getOutlineLayer.pointToHex(
          {x: elementX.value, y: elementY.value},
          {allowOutside: false}
      )

      if (hex && (!currentOutlineLayerHex.value || currentOutlineLayerHex.value !== hex)) {
        if (currentOutlineLayerGroup.value) {
          currentOutlineLayerGroup.value.erase(layerStore.getOutlineLayer.svgGroup);
          currentOutlineLayerGroup.value.destroy();
        }
        currentOutlineLayerHex.value = hex;
        currentOutlineLayerGroup.value = HexGroupManager.createGroup(hex, layerStore.getOutlineLayer, item.tileShape);
        currentOutlineLayerGroup.value?.draw(layerStore.getOutlineLayer.svgGroup);

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
  initializeLayers();
  window.scrollTo(layerStore.getLayerWidth / 4, layerStore.getLayerHeight / 4);
});

watch(() => layerStore.activeLayerIndex, (newLayerIndex, oldLayerIndex) => {
  const oldLayer = layerStore.getLayer(oldLayerIndex + 1);
  const newLayer = layerStore.getLayer(newLayerIndex + 1);

  if (opacityLayerRef.value) {
    if (newLayerIndex < oldLayerIndex) {
      oldLayer.svgGroup.hide();
    }

    newLayer.svgGroup.show();
    newLayer.svgGroup.before(opacityLayerRef.value);
  }
})

</script>