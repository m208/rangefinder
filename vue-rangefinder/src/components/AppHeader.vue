<template>
    <div class="navbar">
      <div class = "navbar__logo" @click="$router.push('/')">RangeFinder</div>
      <div class="navbar__btns">
        <div class = "navbar__btn" @click="$router.push('/erangel')">ERANGEL</div>
        <div class = "navbar__btn" @click="$router.push('/miramar')">MIRAMAR</div>
      </div>
    </div>
  </template>
  
<script>
export default {
}
</script>
  
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
  