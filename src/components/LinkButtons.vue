<template>
  <div class="fixed bottom-0 right-0 flex m-3 justify-center">
    <Button
        icon="pi pi-github"
        severity="contrast"
        outlined
        @click="openLink('https://github.com/TheLethalGoose/HeroscapeMapBuilder')"
    />
  </div>
</template>

<script setup lang="ts">

function openLink(link: string) {
  window.open(link, '_blank');
}

</script>