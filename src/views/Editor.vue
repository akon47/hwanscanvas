<template>
  <div class="editor">
    <slide-editor></slide-editor>
  </div>
</template>

<script lang="ts">
import SlideEditor from "@/components/editor/SlideEditor.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Editor",
  components: { SlideEditor },
});
</script>
<style scoped>
.editor {
  overflow: visible;
}
</style>
