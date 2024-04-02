<template>
  <div class="fixed">
    <TileBox name="meh"/>
  </div>
</template>

<script setup lang="ts">
import TileBox from "@/components/TileBox.vue";

</script>

<style>
.fixed{
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #424242;
  padding: 15px;
  border: 1px solid #ccc;
  box-shadow: 0 9px 12px rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  width: 100px;
  min-height: 400px;
}
</style>