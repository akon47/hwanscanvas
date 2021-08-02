<template>
  <div class="shape-prop-editor-container">
    <brush-editor></brush-editor>
  </div>
</template>

<script lang="ts">
import BrushEditor from "./brush-editor/BrushEditor.vue";
export default {
  components: { BrushEditor },
};
</script>

<style scoped>
.shape-prop-editor-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  background: #454545;
}
</style>
