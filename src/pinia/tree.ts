import {defineStore} from 'pinia';
import {TileService} from '@/data/TileService';
import {TileCollection} from "@/model/Tile.ts";
import {TreeNode} from "primevue/treenode";

interface CheckboxState {
    partialChecked: boolean;
    checked: boolean;
}

interface TreeStoreState {
    nodes: TreeNode[] | null;
    selectedValue: Record<string, CheckboxState> | null;
}

export const useTreeStore = defineStore('treeStore', {
    state: (): TreeStoreState => ({
        nodes: null,
        selectedValue: {
            '0': {
                partialChecked: false,
                checked: true
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
