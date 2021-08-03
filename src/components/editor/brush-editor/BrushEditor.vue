<template>
  <div>
    {{ firstShape.fillBrush }}
  </div>
</template>

<script lang="ts">
import { BaseShape } from "@/hwans-canvas/shapes/baseShape";
import { defineComponent } from "vue";

export default defineComponent({
  name: "BrushEditor",
  props: {
    shapes: Array,
  },
  computed: {
    firstShape(): BaseShape | undefined {
      if (this.shapes && this.shapes.length > 0) {
        return this.shapes[0] as BaseShape;
      } else {
        return undefined;
      }
    },
  },
});
</script>

<style></style>
