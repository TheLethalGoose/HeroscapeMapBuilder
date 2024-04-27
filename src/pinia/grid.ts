import {defineStore} from 'pinia';
import {DrawableGrid} from "@/model/grid/DrawableGrid.ts";
import {Hex} from "@/model/grid/Hex.ts";
import {rectangle} from "honeycomb-grid";
import {markRaw} from "vue";
import {Container} from "@svgdotjs/svg.js";

interface GridStoreState {
    grids: Array<DrawableGrid<Hex>>;
    activeGrid?: DrawableGrid<Hex>;
    hexesPerRow: number;
    hexesPerCol: number;
}

export const useGridStore = defineStore('gridStore', {
    state: (): GridStoreState => ({
        grids: markRaw(new Array<DrawableGrid<Hex>>()),
        activeGrid: undefined,
        hexesPerCol: 80,
        hexesPerRow: 50,
    }),
    getters: {
        getGrids: (state) => state.grids,
        getBaseGrid: (state) => state.grids[0] as DrawableGrid<Hex>,
        getActiveGrid: (state) => state.activeGrid as DrawableGrid<Hex>,
        getHexesPerCol: (state) => state.hexesPerCol,
        getHexesPerRow: (state) => state.hexesPerRow,
        getGridWidth: (state) => {
            return (Hex.prototype.width * state.hexesPerCol) + Hex.prototype.width / 2
        },
        getGridHeight: (state) => {
            return ((state.hexesPerRow - 1) * (Hex.prototype.height * 3 / 4) + Hex.prototype.height)
        },
    },
    actions: {
        addGrid(svg: Container) {
            const gridId = `layer_${this.grids.length}`;
            const hexesPerCol = this.hexesPerCol;
            const hexesPerRow = this.hexesPerRow;

            const newGrid = new DrawableGrid(svg, gridId, Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));
            this.grids.push(newGrid);
        },
        setActiveGrid(index: number) {
            if (index < this.grids.length || index >= 1) {
                this.activeGrid = markRaw(this.grids[index]);
            }
        },
        initBaseGrid(svg: Container) {
            this.addGrid(svg);
        },
        flush() {
            this.grids = markRaw(new Array<DrawableGrid<Hex>>())
        }
    }
});