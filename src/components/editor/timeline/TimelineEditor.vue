<template>
  <div class="timeline-container">
    <ul>
      <li v-for="(i, shape) in shapes" :key="shape">
        {{ i }} {{ shape.getName() }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Page } from "@/hwans-canvas/page";
import { BaseShape } from "@/hwans-canvas/shapes/baseShape";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimelineEditor",
  props: {
    page: Page,
  },
  computed: {
    shapes(): Array<BaseShape> {
      if (this.page) {
        return this.page.getShapes();
      } else {
        return [] as Array<BaseShape>;
      }
    },
  },
});
</script>

<style scoped>
.timeline-container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #313131;
}
</style>
