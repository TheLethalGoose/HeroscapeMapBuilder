<template>
  <div class="card flex justify-content-center">
    <TreeSelect
        ref="treeRef"
        append-to="self"
        v-model="treeStore.selectedValue"
        :options="treeStore.nodes"
        selectionMode="checkbox"
        panel-class="w-18rem"
        class="w-18rem"
        placeholder="Select Tiles"
    >
      <template #itemtogglericon="{ expanded, node }">
        <ChevronDownIcon v-if="expanded" @click.stop="onToggle(node, false)"/>
        <ChevronRightIcon v-else @click.stop="onToggle(node, true)"/>
      </template>
    </TreeSelect>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import ChevronDownIcon from 'primevue/icons/chevrondown';
import ChevronRightIcon from 'primevue/icons/chevronright';
import {useTreeStore} from "@/pinia/tree.ts";
import {TreeNode} from "primevue/treenode";

const treeRef = ref();

const onToggle = (node: TreeNode, expanded: boolean) => {
  // Workaround: https://github.com/primefaces/primevue/issues/4927
  if (node.key) {
    const expandedKeys = treeRef.value.expandedKeys;
    expandedKeys[node.key] = expanded;
    treeRef.value.onNodeToggle(expandedKeys);
  }
}

const treeStore = useTreeStore();

onMounted(() => {
  treeStore.fetchNodes();
});

</script>