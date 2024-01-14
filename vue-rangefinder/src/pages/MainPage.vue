<script>
import MapCard from "@/components/MapCard.vue";
import { getThumbnails } from '@/libs/mapsParams';
import bgImg from '@/assets/img/pubg-bg.jpg';

export default {
  data() {
    return {
      bgimg: `url(${bgImg})`,
      maps: getThumbnails(),
    };
  },
  components: {
    MapCard
  },
  mounted() {
    this.$store.commit('changeCurrentMap', '');
  }
}
</script>

<template>

<div class="main">
  <div class="main_cards">
    <map-card 
      v-for="map in maps" :key="map" 
        :map-img="map.thumb" 
        :map-name="map.name"
      @click="$router.push(`/${map.name.toLowerCase()}`)"
    />
  </div>
</div>

</template>

<style scoped>
.main{
  min-height: calc(100vh - 50px);
  background-color: black;
  background-image: v-bind(bgimg);
  background-size: cover;
  background-position: top;
  filter: brightness(0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main_cards{
  width: 100%;
  margin-top: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
