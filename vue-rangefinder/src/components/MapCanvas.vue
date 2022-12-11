<script lang = 'ts'>
import pic from '@/assets/img/Erangel_Main_Low_Res.png';

declare interface BaseComponentData {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
}

export default {
  data(): BaseComponentData {
    return {
      canvas: null,
      context: null,
      image: null
    }
  },
  mounted() {
    // this.$refs.ref2.style.backgroundColor = '#66bb6a';
    this.canvas = this.$refs.canvaRef as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    const img = new Image();
    this.image = img;
    this.image.src = pic;

    this.image.onload = () => {
      if (this.image !== null) {
        this.context!.drawImage(
          this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height,
        );
      }
    }


  },
  methods: {
    bttnHandler() {
      this.context!.drawImage(
        this.image!, 200, 200, this.image!.width, this.image!.height, 0, 0, this.image!.width, this.image!.height,
      );
    }
  }
}
</script>

<template>
  <div class="map__wrapper">
    <button @click="bttnHandler">BTTN</button>
    <canvas class = "map__canvas" ref = "canvaRef"></canvas>
  </div>
</template>
  
<style scoped>
.map__wrapper {
    width: 100%;
    height: 100%;
}
.map__canvas {
    width: 100%;
    height: 100%;
}
</style>
  