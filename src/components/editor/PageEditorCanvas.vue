<template>
  <canvas ref="canvas" :width="width" :height="height"> </canvas>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Page } from "../../hwans-canvas/page";

export default defineComponent({
  name: "PageEditorCanvas",
  props: {
    page: Page,
  },
  computed: {
    width(): number {
      return this.page?.getWidth() || 0;
    },
    height(): number {
      return this.page?.getHeight() || 0;
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
  },
  mounted() {
    this.$nextTick(function () {
      this.page?.setRenderTarget(this.$refs.canvas as HTMLCanvasElement);
    });
  },
});
</script>

<style scoped>
canvas {
  background: black;
  vertical-align: bottom;
  transform-origin: 0 0;
  width: 100%;
  height: 100%;
}
</style>
