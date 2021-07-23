<template>
  <div class="about-container">
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </div>
</template>
<style scoped>
.about-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.about-container > .about {
  flex-basis: content;
  background: #313131;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid black;
}
</style>
