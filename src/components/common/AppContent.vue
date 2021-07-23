<template>
  <div class="content-container">
    <router-view class="content" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content-container,
.content-container > .content {
  width: 100%;
  height: 100%;
}
</style>
