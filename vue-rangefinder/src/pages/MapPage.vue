<script>
import MapCanvas from "@/components/MapCanvas.vue";

export default {
  components: {
    MapCanvas
  },
  props: {
    mapName: {
      type: String,
      required: true,
    }
  },
}
</script>

<template>
    <div class="page__wrapper">
      <map-canvas 
        :mapName="mapName"
      />
    </div>
  </template>  

<style scoped>
.page__wrapper {
    flex: 1 0 auto;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
  