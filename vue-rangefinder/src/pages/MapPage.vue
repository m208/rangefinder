<template>
    <div>
      <h1>Selected Map: {{ mapName }}</h1>
    </div>
  </template>
  
<script>
export default {
    props: {
        mapName: {
            type: String,
            required: true,
        }
    }
}
</script>
  
<style scoped>

</style>
  