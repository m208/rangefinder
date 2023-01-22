import gridSvg_8x8 from '@/assets/svg/grid-8x8.svg';
import gridSvg_4x4 from '@/assets/svg/grid-4x4.svg';
import type { mapSizes } from './mapsParams';

type gridSvgMap = {
    [key in mapSizes]: string
}

export const svgGrid: gridSvgMap = {
    "4x4" : gridSvg_4x4,
    "8x8" : gridSvg_8x8,
}
  
