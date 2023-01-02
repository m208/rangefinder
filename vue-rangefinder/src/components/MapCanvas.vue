<script lang = 'ts'>
import pic from '@/assets/img/Erangel_Main_Low_Res.png';

declare interface BaseComponentData {
  wrapper: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
}

export default {
  data(): BaseComponentData {
    return {
      wrapper: null,
      canvas: null,
      context: null,
      image: null
    }
  },
  mounted() {
    this.wrapper = this.$refs.canvaWrapperRef as HTMLDivElement;
    this.canvas = this.$refs.canvaRef as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    const img = new Image();
    this.image = img;
    this.image.src = pic;

    this.image.onload = () => {
      if (this.image !== null) {

        this.canvas!.width = this.wrapper!.offsetWidth;
        this.canvas!.height = this.wrapper!.offsetHeight;
        this.context!.drawImage(
          // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
          //drawImage(image, dx, dy, dWidth, dHeight)

          this.image, 0, 0,
          // this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height,
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
    <p></p>
    <div class="map__canvas" ref = "canvaWrapperRef">
          <canvas class = "" ref = "canvaRef"></canvas>
    </div>

  </div>
</template>
  
<style scoped>
.map__canvas{
  height: 100%;
  width: 100%;
  flex: 1 0 auto;
}
.map__wrapper {
  flex: 1 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
  