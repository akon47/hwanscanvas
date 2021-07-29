<template>
  <div class="editor-container">
    <div class="editor-canvas">
      <editor-canvas :page="page"></editor-canvas>
    </div>
    <div class="editor-tools">tools</div>
    <div class="editor-timeline">timeline</div>
  </div>
</template>

<script lang="ts">
import EditorCanvas from "@/components/editor/PageEditor.vue";
import { RectangleShape } from "../hwans-canvas/shapes/rectangleShape";
import { SolidColorBrush } from "../hwans-canvas/brushes/solidColorBrush";
import { Page } from "../hwans-canvas/page";
import { defineComponent } from "vue";

export default defineComponent({
  components: { EditorCanvas },
  name: "Editor",
  data() {
    return {
      page: null as Page | null,
    };
  },
  mounted() {
    this.page = new Page(1920, 1080);
    this.page?.beginUpdate();
    for (let i = 0; i < 100; i++) {
      const width = Math.random() * 190 + 10;
      const height = Math.random() * 190 + 10;
      const x = Math.random() * (1920 - width);
      const y = Math.random() * (1080 - height);
      this.page?.addShape(
        new RectangleShape(
          SolidColorBrush.randomColorBrush(),
          undefined,
          x,
          y,
          width,
          height
        )
      );
    }
    this.page?.endUpdate();
  },
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
