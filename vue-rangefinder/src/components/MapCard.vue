<script>
export default {
  props: {
    mapName: {
      type: String,
      required: true,
    },
    mapImg: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      thumb: this.mapImg,
      name: this.mapName
    }
  }
}
</script>

<template>
<div class="card">
  <div class="img__wrapper">
    <img :src="thumb" :alt="name" class="card__img">
  </div>
  <div class="text_wrapper">
    <p>{{ name }}</p>
  </div>
</div>
</template>

<style scoped>
.card{
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 250ms;
}
.card:hover{
  background-color: rgb(144 231 48);
  transform: scale(1.1);
}
.card__img{
  padding: 3px;
  width: 250px;
  height: 250px;
}
.text_wrapper{
  margin-bottom: 5px;
  text-align: center;
  font-size: x-large;
}
</style>
