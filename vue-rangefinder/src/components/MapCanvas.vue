<script lang = 'ts'>
import markerSvg from '@/assets/svg/map-marker.svg';
import gridBg from '@/assets/svg/microgrid.svg';
import type { ICoords } from '@/libs/types';
import { calcDistance, getMiddlePoint } from '@/libs/distance';
import { getMapParams } from '@/libs/mapsParams';

declare interface BaseComponentData {
  currentMap: string;
  currentZoom: number;
  wrapper: HTMLDivElement | null;
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  backgroundImg: HTMLImageElement | null;
  markerImg: HTMLImageElement | null;
  gridImage: HTMLImageElement | null;
  dragging: boolean;
  touchStart: ICoords;
  offset: ICoords;
  currentOffset: ICoords;
  coordsStart: ICoords;
  dots: Array<ICoords>
}

const emptyCoords: ICoords = { x: 0, y: 0 };

const [MIN_ZOOM, MAX_ZOOM, ZOOM_STEP] = [0.2, 1.5, 0.1];

export default {
  props: {
    mapName: {
      type: String,
      required: true,
    }
  },
  data(): BaseComponentData {
    return {
      currentMap: this.mapName,
      currentZoom: 0,
      wrapper: null,
      canvas: null,
      context: null,
      image: null,
      backgroundImg: null,
      markerImg: null,
      gridImage: null,
      dragging: false,
      touchStart: { ...emptyCoords },
      offset: { ...emptyCoords },
      currentOffset: { ...emptyCoords },
      coordsStart: { ...emptyCoords },
      dots: [],
    }
  },
  onUpdated() { console.log('onUpdated'); },
  mounted() {
    const mapParams = getMapParams(this.mapName);
    if (!mapParams) return;

    this.currentZoom = mapParams.defaultZoom;

    this.wrapper = this.$refs.canvaWrapperRef as HTMLDivElement;
    this.canvas = this.$refs.canvaRef as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d');

    this.image = new Image();
    this.image.src = mapParams.layout;

    this.markerImg = new Image();
    this.markerImg.src = markerSvg;

    this.backgroundImg = new Image();
    this.backgroundImg.src = gridBg;

    this.image.onload = () => {
      if (this.image !== null) {
        this.canvas!.width = this.wrapper!.offsetWidth;
        this.canvas!.height = this.wrapper!.offsetHeight;

        this.gridImage = new Image();
        this.gridImage.src = mapParams.grid;

        this.gridImage.onload = () => {
          this.setZoom();
          this.draw();
        }
      }
    }
  },
  methods: {
    drawBackground() {
      const context = this.canvas?.getContext("2d");
      context!.clearRect(0, 0, this.canvas!.width / this.currentZoom, this.canvas!.height / this.currentZoom);
      context!.drawImage(this.backgroundImg!, 0, 0, this.canvas!.width / this.currentZoom, this.canvas!.height / this.currentZoom);
    },

    setZoom() {
      const context = this.canvas?.getContext("2d");
      context!.setTransform(1, 0, 0, 1, 0, 0);
      context!.scale(this.currentZoom, this.currentZoom);
    },

    draw() {
      this.drawBackground();

      const canvas = this.$refs.canvaRef as HTMLCanvasElement;
      const context = canvas?.getContext("2d");

      const x = (canvas!.width / this.currentZoom - this.image!.width) / 2;
      const y = (canvas!.height / this.currentZoom - this.image!.height) / 2;

      this.coordsStart = {
        x: x - this.currentOffset.x / this.currentZoom,
        y: y - this.currentOffset.y / this.currentZoom,
      };

      context!.drawImage(
        this.image!,
        this.coordsStart.x,
        this.coordsStart.y,
      );

      context!.drawImage(
        this.gridImage!,
        this.coordsStart.x,
        this.coordsStart.y,
      );

      this.drawMarks();
    },

    drawMarks() {
      for (const dot of this.dots) {
        this.context!.drawImage(
          this.markerImg!,
          this.coordsStart.x + dot.x - this.markerImg!.width / this.currentZoom / 2,
          this.coordsStart.y + dot.y - this.markerImg!.height / this.currentZoom,

          this.markerImg!.width / this.currentZoom,
          this.markerImg!.height / this.currentZoom
        );
      }

      if (this.dots.length === 2) {
        const range = calcDistance(this.dots);
        this.drawLine();
        this.drawRangeValue(range);
      }
    },

    drawLine() {
      this.context!.beginPath();
      this.context!.moveTo(this.coordsStart.x + this.dots[0].x, this.coordsStart.y + this.dots[0].y);
      this.context!.lineTo(this.coordsStart.x + this.dots[1].x, this.coordsStart.y + this.dots[1].y);
      this.context!.strokeStyle = "yellow";
      this.context!.lineWidth = 1.5 / this.currentZoom;
      this.context!.stroke();
    },

    drawRangeValue(distance: number) {
      const middlePoint = getMiddlePoint(this.dots);
      if (!middlePoint) return;

      const labelPos: ICoords = {
        x: this.coordsStart.x + middlePoint.x - 30 / this.currentZoom,
        y: this.coordsStart.y + middlePoint.y + 10 / this.currentZoom
      }

      const labelWidth = distance > 999 ? 80 : 65;

      const path = new Path2D();
      path.rect(
        labelPos.x - 5 / this.currentZoom,
        labelPos.y - 25 / this.currentZoom,
        labelWidth / this.currentZoom,
        30 / this.currentZoom
      );

      this.context!.fillStyle = "gray";
      this.context!.shadowBlur = 20;
      this.context!.shadowColor = "black";
      this.context!.fill(path);
      this.context!.shadowBlur = 0;

      const textSize = (28 / this.currentZoom).toFixed(0);

      this.context!.font = `${textSize}px Verdana`;
      this.context!.fillStyle = "yellow";
      this.context!.fillText(distance.toFixed(0), labelPos.x, labelPos.y);
    },

    placeMarks(coords: ICoords) {
      if (this.dots.length < 2) {
        this.dots.push(coords);
        this.drawMarks();
      }
      else {
        this.dots = [coords];
        this.draw();
      }
    },

    handleZoom(direction: 'inc' | 'dec') {
      const limit = direction === "inc" ? MAX_ZOOM : MIN_ZOOM;
      if (this.currentZoom === limit) return;

      const delta = direction === "inc" ? ZOOM_STEP : -ZOOM_STEP;
      this.currentZoom = +(this.currentZoom + delta).toFixed(2);
      console.log(this.currentZoom);

      this.setZoom();
      this.draw();
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
      (deltaY > 0) ? this.decZoom() : this.incZoom();
    },

    handleMouseDown(event: PointerEvent) {
      if (event.button == 0) {
        this.touchStart.x = event.clientX;
        this.touchStart.y = event.clientY;
        this.dragging = true;
      }
      else if (event.button == 2) {
        const boundingRect = this.canvas!.getBoundingClientRect();

        const dotCoords: ICoords = {
          x: -this.coordsStart.x + (event.clientX - boundingRect.x) / this.currentZoom,
          y: -this.coordsStart.y + (event.clientY - boundingRect.y) / this.currentZoom
        }

        this.placeMarks(dotCoords);
      }
    },

    handleMouseUp() {
      this.dragging = false;
      this.offset.x = this.currentOffset.x;
      this.offset.y = this.currentOffset.y;
    },

    disableContextMenu(event: MouseEvent) {
      event.preventDefault();
    },

    handleMouseMove(event: PointerEvent) {
      if (this.dragging) {

        const currentOffset: ICoords = {
          x: this.offset.x + (this.touchStart.x - event.clientX) / this.currentZoom,
          y: this.offset.y + (this.touchStart.y - event.clientY) / this.currentZoom
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
        this.draw();

      }

    },
  }
}
</script>

<template>
  <div class="map__wrapper">
    <div class="map__canvas" ref = "canvaWrapperRef">
      <div class="map_buttons">
        <button @click="incZoom" class="map_bttn">+</button>
        <button @click="decZoom" class="map_bttn">-</button>
      </div>
      <canvas 
        @contextmenu="disableContextMenu"
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.map_buttons{
  position: absolute;
  top: 60px;
  right: 60px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.map_bttn{
  background-color: black;
  color: white;
  font-size: xx-large;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border: 1px solid white;
}

</style>
  