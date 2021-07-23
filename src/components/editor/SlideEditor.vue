<template>
  <div class="slide-editor-container">
    <div class="slide-editor">editor</div>
    <div class="object-propery">property</div>
    <div class="object-timeline">timeline</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.slide-editor-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-rows: 1fr 150px;

  width: 100%;
  height: 100%;
}

.slide-editor-container > div {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.slide-editor-container > .slide-editor {
  grid-column: 1;
  grid-row: 1;
}

.slide-editor-container > .object-propery {
  grid-column: 2;
  grid-row: 1 / span 2;

  background: chocolate;
  overflow-y: hidden;
}

.slide-editor-container > .object-timeline {
  grid-column: 1;
  grid-row: 2;

  background: cornflowerblue;
  overflow-y: hidden;
}
</style>
