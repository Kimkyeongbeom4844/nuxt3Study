<template>
  <div id="wrap">
    <ul>
      <li><NuxtLink to="/">index</NuxtLink></li>
      <li><NuxtLink to="about">about</NuxtLink></li>
      <li><NuxtLink to="product">product</NuxtLink></li>
    </ul>
    <slot />
    <footer>여기는 푸터입니다</footer>
  </div>
</template>

<script setup></script>
<style scoped>
#wrap {
  display: flex;
  flex-direction: column;
}
ul {
  background-color: yellow;
}
footer {
  position: fixed;
  background-color: red;
  bottom: 0;
  width: 100%;
}
.router-link-active {
  font-weight: bold;
}
</style>
