import {defineStore} from 'pinia';
import {TileService} from '@/data/tileService.ts';
import {TreeNode} from "primevue/treenode";
import {TileCollection} from "@/model/tile/TileCollection.ts";

interface CheckboxState {
    partialChecked: boolean;
    checked: boolean;
}

interface TreeStoreState {
    nodes: TreeNode[] | undefined;
    selectedValue: Record<string, CheckboxState> | undefined;
}

export const useTreeStore = defineStore('treeStore', {
    state: (): TreeStoreState => ({
        nodes: undefined,
        selectedValue: {
            '0': {
                partialChecked: true,
                checked: false
            },
            '0-0': {
                partialChecked: false,
                checked: true
            }
        }
    }),
    getters: {
        getSelectedValue: (state) => state.selectedValue,
        getSelectedNodesData: (state): TileCollection => {
            const selectedData: TileCollection = new TileCollection();

            if (!state.nodes || !state.selectedValue) {
                return selectedData;
            }

            function findNodeDataByKey(nodes: TreeNode[], key: string): TileCollection | null {
                for (const node of nodes) {
                    if (node.key === key && node.data) {
                        return node.data;
                    }
                    if (node.children) {
                        const result = findNodeDataByKey(node.children, key);
                        if (result) return result;
                    }
                }
                return null;
            }

            for (const key in state.selectedValue) {
                if (state.selectedValue[key].checked) {
                    const nodeData = findNodeDataByKey(state.nodes, key);
                    if (nodeData) {
                        nodeData.getTiles().forEach(tile => selectedData.addTile(tile))
                    }
                }
            }

            return selectedData;
        }
    },
    actions: {
        fetchNodes() {
            TileService.getTreeNodes().then(data => {
                this.nodes = data;
            });
        }
    }
});
