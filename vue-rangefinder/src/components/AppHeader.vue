<script>
import { mapList } from '@/libs/mapsParams';

export default {
  data() {
    return {
      mapList
    }
  }
}
</script>

<template>
  <div class="navbar">
    <div class = "navbar__logo" @click="$router.push('/')">RangeFinder</div>
    <div 
      class="navbar__btns"
      v-for="map in mapList"
      :key="map"
    >
      <div 
        class = "navbar__btn" 
        @click="$router.push(`/${map}`)"
        >
          {{ map.toUpperCase() }}
        </div>
    </div>

  </div>
</template>
  
<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: 20px;
  display: flex;
}
.navbar__btn{
    margin-left: 20px;
    cursor: pointer;
}
</style>
  