<template>
  <div class="editor-canvas-container">
    <div class="tools">tools</div>
    <div class="canvas-container">
      <div class="canvas-wrapper" ref="canvasWrapper">
        <canvas width="1920" height="1080" :style="canvasStyle"></canvas>
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
          <input type="checkbox" v-model="autoScaleFactor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface CanvasStyle {
  width: string;
  height: string;
  marginLeft: string;
  marginTop: string;
}

export default defineComponent({
  name: "EditorCanvas",
  data() {
    return {
      scaleFactor: 0.8,
      marginLeft: 0,
      marginTop: 0,
      width: 1920,
      height: 1080,
      autoScaleFactor: true,
    };
  },
  computed: {
    canvasStyle(): CanvasStyle {
      return {
        width: `${this.width * this.scaleFactor}px`,
        height: `${this.height * this.scaleFactor}px`,
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
  },
  watch: {
    scaleFactor() {
      this.arrangeCanvas();
    },
    autoScaleFactor() {
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
              clientWidth / (this.width + 0),
              clientHeight / (this.height + 0)
            ) * 100.0
          ) / 100.0;
      }
      this.marginLeft = (clientWidth - this.scaleFactor * this.width) / 2.0;
      this.marginTop = (clientHeight - this.scaleFactor * this.height) / 2.0;
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

.canvas-wrapper > canvas {
  background: black;
  vertical-align: bottom;
  transform-origin: 0 0;
  width: 100px;
  height: 100px;
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
}
</style>
