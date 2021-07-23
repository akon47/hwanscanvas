<template>
  <div class="nav">
    <div class="header">HwansCanvas</div>

    <div class="routers">
      <router-link to="/">Editor</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 100%;
}

.nav .header {
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 20px;

  color: white;
  font-weight: bold;
  font-size: 20pt;
}

.nav .routers {
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 10px;
}

.nav a {
  color: white;
}

.nav a.router-link-exact-active {
  font-weight: bold;
  color: darkorange;
}
</style>
