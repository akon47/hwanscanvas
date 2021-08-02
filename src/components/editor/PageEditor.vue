<template>
  <div class="editor-canvas-container">
    <div class="tools">
      <button
        @click="selectTool('pointer')"
        :class="{ selected: selectedToolType == 'pointer' }"
      >
        <font-awesome-icon :icon="['fas', 'mouse-pointer']" />
      </button>
      <button
        @click="selectTool('rectangle-shape')"
        :class="{ selected: selectedToolType == 'rectangle-shape' }"
      >
        <font-awesome-icon :icon="['fas', 'square-full']" />
      </button>
      <button
        @click="selectTool('ellipse-shape')"
        :class="{ selected: selectedToolType == 'ellipse-shape' }"
      >
        <font-awesome-icon :icon="['fas', 'circle']" />
      </button>
    </div>
    <div class="canvas-container">
      <div class="canvas-wrapper" ref="canvasWrapper">
        <div :style="canvasStyle">
          <page-editor-canvas
            :page="page"
            :scaleFactor="scaleFactor"
            v-model:selectedToolType="selectedToolType"
          ></page-editor-canvas>
        </div>
      </div>
      <div class="status-bar">
        <div class="scale-factor">
          <span> {{ scaleFactorPercent }}% </span>
          <input
            type="range"
            v-model="scaleFactorPercent"
            min="1"
            max="200"
            :disabled="autoScaleFactor"
          />
          <input id="fit" type="checkbox" v-model="autoScaleFactor" />
          <label for="fit">자동 맞춤</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageEditorCanvas from "./PageEditorCanvas.vue";
import { Page } from "../../hwans-canvas/page";
import { EditorToolType } from "@/hwans-canvas/tools/editorToolType";

interface CanvasStyle {
  width: string;
  height: string;
  marginLeft: string;
  marginTop: string;
}

export default defineComponent({
  components: { PageEditorCanvas },
  name: "PageEditor",
  props: {
    page: Page,
  },
  data() {
    return {
      scaleFactor: 1,
      marginLeft: 0,
      marginTop: 0,
      autoScaleFactor: true,
      selectedToolType: EditorToolType.Pointer,
    };
  },
  computed: {
    canvasStyle(): CanvasStyle {
      return {
        width: `${this.pageWidth * this.scaleFactor}px`,
        height: `${this.pageHeight * this.scaleFactor}px`,
        marginLeft: `${this.marginLeft}px`,
        marginTop: `${this.marginTop}px`,
      };
    },
    scaleFactorPercent: {
      get(): number {
        return Math.floor(this.scaleFactor * 100.0);
      },
      set(newValue: number) {
        this.scaleFactor = newValue / 100.0;
      },
    },
    pageWidth(): number {
      return this.page?.getWidth() || 0;
    },
    pageHeight(): number {
      return this.page?.getHeight() || 0;
    },
  },
  watch: {
    scaleFactor() {
      this.arrangeCanvas();
    },
    autoScaleFactor() {
      this.arrangeCanvas();
    },
    page() {
      this.arrangeCanvas();
    },
  },
  methods: {
    handleWindowResize() {
      this.arrangeCanvas();
    },
    arrangeCanvas() {
      const { clientWidth, clientHeight } = this.$refs.canvasWrapper as Element;
      if (this.autoScaleFactor) {
        this.scaleFactor =
          Math.floor(
            Math.min(
              clientWidth / (this.pageWidth + 0),
              clientHeight / (this.pageHeight + 0)
            ) * 100.0
          ) / 100.0;
      }
      this.marginLeft = (clientWidth - this.scaleFactor * this.pageWidth) / 2.0;
      this.marginTop =
        (clientHeight - this.scaleFactor * this.pageHeight) / 2.0;
    },
    selectTool(toolType: EditorToolType) {
      this.selectedToolType = toolType;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.handleWindowResize();
  },
  beforeUnmount() {
    window.addEventListener("resize", this.handleWindowResize);
  },
});
</script>

<style scoped>
.editor-canvas-container {
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: minmax(0, 1fr);
  width: 100%;
  height: 100%;
}

.editor-canvas-container > .tools {
  grid-column: 1;
  grid-row: 1;
  background: #212121;
}

.editor-canvas-container > .canvas-container {
  grid-column: 2;
  grid-row: 1;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(0, 1fr) 30px;
}

.canvas-container > .canvas-wrapper {
  grid-column: 1;
  grid-row: 1;
  padding: 0px;
  overflow: scroll;
}

.canvas-container > .status-bar {
  grid-column: 1;
  grid-row: 2;
  background: #878787;
  display: flex;

  justify-content: flex-end;
  align-items: center;
}

.status-bar > .scale-factor {
  flex-grow: 0;
  flex-shrink: 1;
  margin-right: 5px;
}

.tools button {
  width: calc(100% - 6px);
  height: 44px;
  margin: 3px;
  padding: 5px;
  background: transparent;
  border: transparent;
  color: gray;
  transition: 0.3s;
}
.tools button:hover,
.tools button.selected {
  color: white;
  border: 1px solid white;
  transition: 0.3s;
}
</style>
