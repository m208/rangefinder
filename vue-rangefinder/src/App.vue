<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <div class="content">
    <app-header></app-header>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
