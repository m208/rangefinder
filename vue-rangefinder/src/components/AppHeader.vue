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
    <a href="https://github.com/m208" target="_blank">© m208 2023</a>
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
  transition-duration: 250ms;
}
.navbar__menu {
  display: flex;
}
.navbar__logo {
  margin-right: 40px;
  cursor: pointer;
  font-size: large;
  font-weight: 600;
  display: inline-block;
}
.navbar__logo:hover {
  color: rgb(113 191 26);
  transform: scale(1.1);
}
.navbar__btns {
  margin-left: 20px;
  display: flex;
  font-size: large;
}
.navbar_text {
  font-weight: 600;
  display: inline-block;
}
.navbar_text:hover {
  color: rgb(113 191 26);
  transform: scale(1.1);
}
.navbar__btn {
  margin-left: 20px;
  cursor: pointer;
}
.navbar__cr a{
  color: initial;
  background-color: initial;
  text-decoration: none;
}
</style>
