import {defineStore} from 'pinia';
import {DrawableGrid} from "@/model/grid/DrawableGrid.ts";
import {Hex} from "@/model/grid/Hex.ts";
import {rectangle} from "honeycomb-grid";
import {markRaw} from "vue";
import {Container} from "@svgdotjs/svg.js";

interface LayerStoreState {
    layers: Array<DrawableGrid<Hex>>;
    activeLayerIndex: number;
    maxLayers: number,
    hexesPerRow: number;
    hexesPerCol: number;
}

export const useLayerStore = defineStore('layerStore', {
    state: (): LayerStoreState => ({
        layers: markRaw(new Array<DrawableGrid<Hex>>()),
        activeLayerIndex: 1,
        maxLayers: 30,
        hexesPerCol: 80,
        hexesPerRow: 50,
    }),
    getters: {
        getLayers: (state) => state.layers,
        getBaseLayer: (state) => state.layers[0] as DrawableGrid<Hex>,
        getOutlineLayer: (state) => state.layers[state.maxLayers + 1] as DrawableGrid<Hex>,
        getActiveLayer: (state) => state.layers[state.activeLayerIndex] as DrawableGrid<Hex>,
        getLayer: (state) => {
            return (index: number) => state.layers[index] as DrawableGrid<Hex>
        },
        getHexesPerCol: (state) => state.hexesPerCol,
        getHexesPerRow: (state) => state.hexesPerRow,
        getLayerWidth: (state) => {
            return (Hex.prototype.width * state.hexesPerCol) + Hex.prototype.width / 2
        },
        getLayerHeight: (state) => {
            return ((state.hexesPerRow - 1) * (Hex.prototype.height * 3 / 4) + Hex.prototype.height)
        },
    },
    actions: {
        addLayer(svg: Container) {

            const layerId = this.layers.length === this.maxLayers + 1 ? 'layer_outline' :
                this.layers.length > 0 ? `layer_${this.layers.length}` :
                    'layer_base';

            const hexesPerCol = this.hexesPerCol;
            const hexesPerRow = this.hexesPerRow;

            const newLayer = new DrawableGrid(svg, layerId, Hex, rectangle({width: hexesPerCol, height: hexesPerRow}));
            this.layers.push(newLayer);
        },
        initLayers(svg: Container) {
            [...Array(this.maxLayers + 2)].forEach(() => this.addLayer(svg));
        },
        flush() {
            this.layers = markRaw(new Array<DrawableGrid<Hex>>())
        }
    }
});