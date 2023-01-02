<script lang = 'ts'>
import pic from '@/assets/img/Erangel_Main_Low_Res.png';
import picH from '@/assets/img/Erangel_Main_High_Res.jpg';
import picM from '@/assets/img/Erangel_Main_Med.jpg';

declare interface BaseComponentData {
  wrapper: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  dragging: boolean;
  touchStart: ICoords;
  offset: ICoords;
  currentOffset: ICoords;
}
declare interface ICoords {
  x: number;
  y: number;
}

export default {
  data(): BaseComponentData {
    return {
      wrapper: null,
      canvas: null,
      context: null,
      image: null,
      dragging: false,
      touchStart: { x: 0, y: 0 },
      offset: { x: 0, y: 0 },
      currentOffset: { x: 0, y: 0 },
    }
  },
  mounted() {
    this.wrapper = this.$refs.canvaWrapperRef as HTMLDivElement;
    this.canvas = this.$refs.canvaRef as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    const img = new Image();
    this.image = img;
    this.image.src = picM;

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
    handleMouseDown(event: PointerEvent) {
      this.touchStart.x = event.clientX;
      this.touchStart.y = event.clientY;
      this.dragging = true;

    },
    handleMouseUp() {
      this.dragging = false;
      this.offset.x = this.currentOffset.x;
      this.offset.y = this.currentOffset.y;
    },
    handleMouseMove(event: PointerEvent) {
      if (this.dragging) {
        const offset: ICoords = {
          x: this.touchStart.x - event.clientX,
          y: this.touchStart.y - event.clientY
        }

        const currentOffset: ICoords = {
          x: this.offset.x + offset.x,
          y: this.offset.y + offset.y
        }

        if (currentOffset.x < 0 || currentOffset.x > this.image!.width - this.wrapper!.offsetWidth) {
          currentOffset.x = this.currentOffset.x
        }
        if (currentOffset.y < 0 || currentOffset.y > this.image!.height - this.wrapper!.offsetHeight) {
          currentOffset.y = this.currentOffset.y
        }

        this.currentOffset = currentOffset;

        this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        this.context!.drawImage(
          this.image!, currentOffset.x, currentOffset.y, this.image!.width, this.image!.height, 0, 0, this.image!.width, this.image!.height,
        );

      }

    },
  }
}
</script>

<template>
  <div class="map__wrapper">
    <div class="map__canvas" ref = "canvaWrapperRef">
      <canvas 
      @pointerdown="handleMouseDown"
      @pointerup="handleMouseUp"
      @pointermove="handleMouseMove"
      ref = "canvaRef"
      ></canvas>
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
  