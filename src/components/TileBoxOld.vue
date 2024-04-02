<script lang="ts" setup>
import {ConnectDragPreview, DragPreviewImage, DragPreviewOptions, useDrag} from 'vue3-dnd'
import { toRefs } from '@vueuse/core'
import {onBeforeMount, onMounted, ref} from "vue";
import {Svg, SVG} from "@svgdotjs/svg.js";

const pngSrc = ref('');

function convertSvgToPng(svg: Svg) {

  const svgBase64 = new XMLSerializer().serializeToString(svg.node);
  const svgDataUrl = `data:image/svg+xml;base64,${window.btoa(svgBase64)}`;

  const image = new Image();
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width * 2;
    canvas.height = image.height * 2;

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Fehler beim Erhalten des Canvas-Kontexts');
      return;
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    pngSrc.value = canvas.toDataURL('image/png');

  };
  image.src = svgDataUrl;
}


onMounted(() => {
  const svg = SVG().addTo('#fuck').size(10,10);

  svg.rect(10,10).fill('#fff')

  convertSvgToPng(svg);

});

onBeforeMount(() => {

})




const ItemTypes = {
  BOX: 'box',
}

const [collect, drag, preview] = useDrag(() => ({
  type: ItemTypes.BOX,
  collect: monitor => ({
    opacity: monitor.isDragging() ? 0.4 : 1,
  }),
}))

const { opacity } = toRefs(collect)
</script>
<template>
  <DragPreviewImage :connect="preview as ConnectDragPreview<unknown>" :src="pngSrc" />
  <div id="fuck" :ref="drag" class="box" :style="{ opacity }"/>
</template>

<style scoped>
.box {
  display: inline-flex;
  border: 1px dashed gray;
  padding: 1px;
  cursor: move;
}
</style>
