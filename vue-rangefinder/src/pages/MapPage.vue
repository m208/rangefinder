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
    }
}
</script>

<template>
    <div>
      <h1>Selected Map: {{ mapName }}</h1>
      <map-canvas></map-canvas>
    </div>
  </template>  

<style scoped>

</style>
  