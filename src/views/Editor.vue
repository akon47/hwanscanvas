<template>
  <div class="editor-container">
    <div class="editor-canvas">
      <editor-canvas></editor-canvas>
    </div>
    <div class="editor-tools">tools</div>
    <div class="editor-timeline">timeline</div>
  </div>
</template>

<script lang="ts">
import EditorCanvas from "@/components/editor/EditorCanvas.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { EditorCanvas },
  name: "Editor",
});
</script>
<style scoped>
.editor-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 1fr 150px;

  width: 100%;
  height: 100%;
}

.editor-container > div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.editor-container > .editor-canvas {
  grid-column: 1;
  grid-row: 1;
}

.editor-container > .editor-tools {
  grid-column: 2;
  grid-row: 1 / span 2;

  background: chocolate;
  overflow-y: auto;
}

.editor-container > .editor-timeline {
  grid-column: 1;
  grid-row: 2;

  background: cornflowerblue;
  overflow-y: auto;
}
</style>
