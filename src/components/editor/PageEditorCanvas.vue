<template>
  <div class="page-editor-container">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <canvas
      ref="editorCanvas"
      :width="width"
      :height="height"
      :style="editorCanvasStyle"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BaseEditorTool } from "../../hwans-canvas/tools/baseEditorTool";
import { EditorToolType } from "../../hwans-canvas/tools/editorToolType";
import { EditorToolPointer } from "../../hwans-canvas/tools/editorToolPointer";
import { Page } from "../../hwans-canvas/page";

interface EditorCanvasStyle {
  cursor: string;
}

export default defineComponent({
  name: "PageEditorCanvas",
  props: {
    page: Page,
    scaleFactor: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      editorCursor: "default",
      tools: {} as { [type: number]: BaseEditorTool },
      selectedToolType: EditorToolType.Pointer,
    };
  },
  computed: {
    editorCanvasStyle(): EditorCanvasStyle {
      return {
        cursor: this.editorCursor,
      };
    },
    width(): number {
      return this.page?.getWidth() || 0;
    },
    height(): number {
      return this.page?.getHeight() || 0;
    },
    selectedTool(): BaseEditorTool {
      return this.tools[this.selectedToolType.valueOf()] as BaseEditorTool;
    },
  },
  watch: {
    page: function (newValue, oldValue) {
      if (oldValue) {
        const oldPage = oldValue as Page;
        if (oldPage) {
          oldPage.setRenderTarget(undefined);
        }
      }
      if (newValue) {
        const newPage = newValue as Page;
        if (newPage) {
          const canvas = this.$refs.canvas as HTMLCanvasElement;
          newPage.setRenderTarget(canvas);
        }
      }
    },
    selectedTool: function (newValue, oldValue) {
      if (oldValue) {
        const oldTool = oldValue as BaseEditorTool;
        if (oldTool) {
          oldTool.setRenderTarget(undefined);
        }
      }
      if (newValue) {
        const newTool = newValue as BaseEditorTool;
        if (newTool) {
          const canvas = this.$refs.editorCanvas as HTMLCanvasElement;
          newTool.setRenderTarget(canvas);
          newTool.setScaleFactor(this.scaleFactor);
        }
      }
    },
    scaleFactor() {
      this.selectedTool.setScaleFactor(this.scaleFactor);
    },
  },
  methods: {
    mouseDown(x: number, y: number, buttons: number): void {
      if (this.page) {
        this.selectedTool.onMouseDown(this.page, x, y, buttons);
        this.editorCursor = this.selectedTool.getCursor();
      }
    },
    mouseMove(x: number, y: number, buttons: number): void {
      if (this.page) {
        this.selectedTool.onMouseMove(this.page, x, y, buttons);
        this.editorCursor = this.selectedTool.getCursor();
      }
    },
    mouseUp(x: number, y: number, buttons: number): void {
      if (this.page) {
        this.selectedTool.onMouseUp(this.page, x, y, buttons);
        this.editorCursor = this.selectedTool.getCursor();
      }
    },
  },
  mounted() {
    this.tools[EditorToolType.Pointer] = new EditorToolPointer();

    this.$nextTick(function () {
      this.page?.setRenderTarget(this.$refs.canvas as HTMLCanvasElement);

      const editorCanvas = this.$refs.editorCanvas as HTMLCanvasElement;
      if (editorCanvas) {
        editorCanvas.onpointermove = (e: PointerEvent) => {
          this.mouseMove(
            e.offsetX / this.scaleFactor,
            e.offsetY / this.scaleFactor,
            e.buttons
          );
        };
        editorCanvas.onpointerdown = (e: PointerEvent) => {
          editorCanvas.setPointerCapture(e.pointerId);
          this.mouseDown(
            e.offsetX / this.scaleFactor,
            e.offsetY / this.scaleFactor,
            e.buttons
          );
        };
        editorCanvas.onpointerup = (e: PointerEvent) => {
          if (editorCanvas.hasPointerCapture(e.pointerId)) {
            this.mouseUp(
              e.offsetX / this.scaleFactor,
              e.offsetY / this.scaleFactor,
              e.buttons
            );
            editorCanvas.releasePointerCapture(e.pointerId);
          }
        };
      }
    });
  },
});
</script>

<style scoped>
.page-editor-container {
  background: black;
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
}

canvas {
  position: absolute;
  background: transparent;
  vertical-align: bottom;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}
</style>
