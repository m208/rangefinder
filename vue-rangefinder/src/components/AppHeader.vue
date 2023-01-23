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
    <div class="navbar__menu">
      <div class = "navbar__logo" @click="$router.push('/')">[PUBG] RangeFinder</div>
      <div 
        class="navbar__btns"
        v-for="map in mapList"
        :key="map"
      >
        <div 
          class = "navbar__btn" 
          @click="$router.push(`/${map}`)"
          >
            <span class="navbar_text">{{ map.toUpperCase() }}</span>
        </div>
      </div>
    </div>
    <div class="navbar__cr">
      © M208 2023
    </div>
    
    


  </div>
</template>
  
<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-shadow: 0px 4px 8px 0px rgb(0 0 0 / 65%);
  z-index: 1;
}
.navbar__menu {
  display: flex;
}
.navbar__logo {
  margin-right: 40px;
  cursor: pointer;
}
.navbar__btns {
  margin-left: 20px;
  display: flex;
  font-size: large;
}
.navbar_text {
  color: #df650d;
  font-weight: 600;
}
.navbar_text:hover {
  color: initial;
}
.navbar__btn {
    margin-left: 20px;
    cursor: pointer;
}
</style>
  