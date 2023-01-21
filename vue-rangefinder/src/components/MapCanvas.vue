<script lang = 'ts'>
import pic from '@/assets/img/Erangel_Main_Low_Res.png';
import picH from '@/assets/img/Erangel_Main_High_Res.jpg';
import picM from '@/assets/img/Erangel_Main_Med.jpg';
import gridSvg from '@/assets/svg/grid.svg';

declare interface BaseComponentData {
  currentMap: string;
  currentZoom: number;
  prevZoom: number;
  wrapper: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  gridImage: HTMLImageElement | null;
  dragging: boolean;
  touchStart: ICoords;
  offset: ICoords;
  currentOffset: ICoords;
}

declare interface ICoords {
  x: number;
  y: number;
}

declare interface DrawOptions {
  centered?: boolean;
  offset?: ICoords;
}

const emptyCoords: ICoords = { x: 0, y: 0 };

const [MIN_ZOOM, MAX_ZOOM, ZOOM_STEP] = [0.25, 2, 0.25];

export default {
  props: {
    mapName: {
      type: String,
      required: true,
    },
    zoom: {
      type: Number,
      required: true,
    }
  },
  data(): BaseComponentData {
    return {
      currentMap: this.mapName,
      currentZoom: this.zoom,
      prevZoom: this.zoom,
      wrapper: null,
      canvas: null,
      context: null,
      image: null,
      gridImage: null,
      dragging: false,
      touchStart: { ...emptyCoords },
      offset: { ...emptyCoords },
      currentOffset: { ...emptyCoords },
    }
  },
  onUpdated() { console.log('onUpdated'); },
  mounted() {
    this.wrapper = this.$refs.canvaWrapperRef as HTMLDivElement;
    this.canvas = this.$refs.canvaRef as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    this.image = new Image();
    this.image.src = picH;

    this.image.onload = () => {
      if (this.image !== null) {
        this.canvas!.width = this.wrapper!.offsetWidth;
        this.canvas!.height = this.wrapper!.offsetHeight;

        this.gridImage = new Image();
        this.gridImage.src = gridSvg;

        this.gridImage.onload = () => {
          this.setZoom();
          this.draw({});
        }
      }
    }
  },
  methods: {
    setZoom() {
      const context = this.canvas?.getContext("2d");
      context!.setTransform(1, 0, 0, 1, 0, 0);
      context!.scale(this.currentZoom, this.currentZoom);
    },

    draw({ centered }: DrawOptions) {
      const canvas = this.$refs.canvaRef as HTMLCanvasElement;
      const context = canvas?.getContext("2d");
      context!.clearRect(0, 0, canvas!.width / this.currentZoom, canvas!.height / this.currentZoom);

      const x = (canvas!.width / this.currentZoom - this.image!.width) / 2;
      const y = (canvas!.height / this.currentZoom - this.image!.height) / 2;

      const zoom = centered ? this.prevZoom : this.currentZoom;

      context!.drawImage(
        this.image!,
        x - this.currentOffset.x / zoom,
        y - this.currentOffset.y / zoom,
      );

      context!.drawImage(
        this.gridImage!,
        x - this.currentOffset.x / zoom,
        y - this.currentOffset.y / zoom,
      );

    },

    handleZoom(direction: 'inc' | 'dec') {
      const limit = direction === "inc" ? MAX_ZOOM : MIN_ZOOM;
      if (this.currentZoom === limit) return;

      this.prevZoom = this.currentZoom;
      const delta = direction === "inc" ? ZOOM_STEP : -ZOOM_STEP;
      this.currentZoom = +(this.currentZoom + delta).toFixed(2);
      console.log(this.currentZoom);

      this.setZoom();
      this.draw({ centered: true });

    },

    incZoom() {
      this.handleZoom('inc');
    },

    decZoom() {
      this.handleZoom('dec');
    },

    handleWheel(event: WheelEvent) {
      if (this.dragging) return;
      const { deltaY } = event;
      (deltaY > 0) ? this.incZoom() : this.decZoom();
    },

    handleMouseDown(event: PointerEvent) {
      if (event.button !== 0) return;
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

        const currentOffset: ICoords = {
          x: this.offset.x + (this.touchStart.x - event.clientX),
          y: this.offset.y + (this.touchStart.y - event.clientY)
        }

        // Stick image to canvas borders ::

        // const deltaPos = {
        //   x: (this.canvas!.width / this.currentZoom - this.image!.width) / 2 - currentOffset.x / this.currentZoom,
        //   y: (this.canvas!.height / this.currentZoom - this.image!.height) / 2 - currentOffset.y / this.currentZoom
        // }

        // const rightCorner = {
        //   x: (this.image!.width - this.wrapper!.offsetWidth / this.currentZoom),
        //   y: (this.image!.height - this.wrapper!.offsetHeight / this.currentZoom)
        // }

        // if (deltaPos.x > 0 || (rightCorner.x + deltaPos.x) < 0) {
        //   currentOffset.x = this.currentOffset.x;
        // }
        // if (deltaPos.y > 0 || (rightCorner.y + deltaPos.y) < 0) {
        //   currentOffset.y = this.currentOffset.y;
        // }

        // Sticky image end -----------------------

        this.currentOffset = currentOffset;
        this.draw({});

      }

    },
  }
}
</script>

<template>
  <div class="map__wrapper">
    <div class="map__canvas" ref = "canvaWrapperRef">
      <button @click="incZoom">Zoom IN</button>
      <button @click="decZoom">Zoom OUT</button>
      <canvas 
        @pointerdown="handleMouseDown"
        @pointerup="handleMouseUp"
        @pointermove="handleMouseMove"
        @wheel="handleWheel"
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
  width: 99%;
  height: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
  