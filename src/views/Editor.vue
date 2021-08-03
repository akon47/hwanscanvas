<template>
  <div class="editor-container">
    <div class="editor-canvas">
      <editor-canvas :page="page"></editor-canvas>
    </div>
    <div class="editor-tools">
      <shape-prop-editor></shape-prop-editor>
    </div>
    <div class="editor-timeline">
      <timeline-editor :page="page"></timeline-editor>
    </div>
  </div>
</template>

<script lang="ts">
import EditorCanvas from "@/components/editor/PageEditor.vue";
import ShapePropEditor from "@/components/editor/ShapePropEditor.vue";
import TimelineEditor from "@/components/editor/timeline/TimelineEditor.vue";
import { Page } from "../hwans-canvas/page";
import { defineComponent } from "vue";
import { BaseShape } from "@/hwans-canvas/shapes/baseShape";

export default defineComponent({
  components: {
    EditorCanvas,
    ShapePropEditor,
    TimelineEditor,
  },
  name: "Editor",
  data() {
    return {
      page: null as Page | null,
      selectedShapes: null as Array<BaseShape> | null,
    };
  },
  mounted() {
    this.page = new Page(1920, 1080);
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
