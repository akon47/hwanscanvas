<template>
  <div class="editor-canvas-container">
    <div class="tools">tools</div>
    <div class="canvas-container">
      <div class="canvas">
        <canvas width="1920" height="1080"></canvas>
      </div>
      <div calss="status-bar">status-bar</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EditorCanvas",
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

.canvas-container > .canvas {
  grid-column: 1;
  grid-row: 1;
  padding: 10px;
  overflow: scroll;
}

.canvas > canvas {
  background: black;
  vertical-align: bottom;
}

.canvas-container > .status-bar {
  grid-column: 1;
  grid-row: 2;
  background: #878787;
}
</style>
