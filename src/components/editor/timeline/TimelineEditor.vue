<template>
  <div class="timeline-container">
    <div class="timeline-bar" v-for="(shape, i) in shapes" :key="i">
      <div class="name">
        {{ shape.getName() }}
      </div>
      <div class="visible">
        <button>
          <font-awesome-icon :icon="['fas', 'eye']" />
        </button>
      </div>
      <div class="lock">
        <button>
          <font-awesome-icon :icon="['fas', 'lock']" />
        </button>
      </div>
      <div class="pin">
        <button>
          <font-awesome-icon :icon="['fas', 'thumbtack']" />
        </button>
      </div>
      <div class="timeline"></div>
    </div>
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

.timeline-container > .timeline-bar {
  width: 100%;
  height: 30px;
  padding: 1px;
  border: 0px solid transparent;

  display: grid;
  grid-template-columns: 150px 30px 30px 30px minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  transition: 0.3s;
}
.timeline-container > .timeline-bar:hover {
  background: #ffffff30;
  transition: 0.3s;
}

.timeline-bar button {
  width: 24px;
  height: 24px;
  margin: 3px;
  background: transparent;
  padding: 1px;
  border: 1px solid gray;
  color: gray;
  transition: 0.3s;
}
.timeline-bar button:hover,
.timeline-bar button.selected {
  color: white;
  border: 1px solid white;
  transition: 0.3s;
}

.timeline-bar > .name {
  grid-column: 1;
  grid-row: 1;
  margin: auto;
}

.timeline-bar > .visible {
  grid-column: 2;
  grid-row: 1;
}
.timeline-bar > .lock {
  grid-column: 3;
  grid-row: 1;
}
.timeline-bar > .pin {
  grid-column: 4;
  grid-row: 1;
}
.timeline-bar > .timeline {
  grid-column: 5;
  grid-row: 1;
}
</style>
