import erangelMapPic from '@/assets/img/maps/Erangel_Main_High_Res.jpg';
import miramarMapPic from '@/assets/img/maps/Miramar_Main_High_Res.jpg';
import taegoMapPic from '@/assets/img/maps/Taego_Main_High_Res.jpg';
import sanhokMapPic from '@/assets/img/maps/Sanhok_Main_High_Res.jpg';
import vikendiMapPic from '@/assets/img/maps/Vikendi_Main_High_Res.jpg';
import destonMapPic from '@/assets/img/maps/Deston_Main_High_Res.jpg';
import rondoMapPic from '@/assets/img/maps/Rondo_Main_High_Res.jpg';

import erangelThumb from '@/assets/img/maps/thumbs/Erangel.jpg';
import miramarThumb from '@/assets/img/maps/thumbs/Miramar.jpg';
import taegoThumb from '@/assets/img/maps/thumbs/Taego.jpg';
import sanhokThumb from '@/assets/img/maps/thumbs/Sanhok.jpg';
import vikendiThumb from '@/assets/img/maps/thumbs/Vikendi.jpg';
import destonThumb from '@/assets/img/maps/thumbs/Deston.jpg';
import rondoThumb from '@/assets/img/maps/thumbs/Rondo.jpg';

import { svgGrid } from './mapGrids';

export type mapNamesUnion 
    = 'erangel'
    | 'miramar'
    | 'taego'
    | 'sanhok'
    | 'vikendi'
    | 'deston'
    | 'rondo';

export const mapList : Array<mapNamesUnion> = [
    'erangel',
    'miramar',
    'taego',
    'sanhok',
    'vikendi',
    'deston',
    'rondo',
];

export type mapSizes = '4x4' | '8x8';

interface MapsParam {
    mapName: string;
    size: mapSizes;
    layout: string;
    thumbnail: string;
    grid: string;
    defaultZoom: number;
}

type MapsParamsMap = {
    [key in mapNamesUnion]: MapsParam;
}

const zoomMap: {[key in mapSizes]: number} = {
    "4x4" : 0.4,
    "8x8" : 0.3,
}

const mapsParams: MapsParamsMap = {
    erangel: {
        mapName: 'Erangel',
        size: "8x8",
        layout: erangelMapPic,
        thumbnail: erangelThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    miramar: {
        mapName: 'Miramar',
        size: "8x8", 
        layout: miramarMapPic,
        thumbnail: miramarThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    taego: {
        mapName: 'Taego',
        size: "8x8",
        layout: taegoMapPic,
        thumbnail: taegoThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    sanhok: {
        mapName: 'Sanhok',
        size: "4x4",
        layout: sanhokMapPic,
        thumbnail: sanhokThumb,
        grid: svgGrid["4x4"],
        defaultZoom: zoomMap["4x4"],
    },
    vikendi: {
        mapName: 'Vikendi',
        size: "8x8",
        layout: vikendiMapPic,
        thumbnail: vikendiThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    deston: {
        mapName: 'Deston',
        size: "8x8",
        layout: destonMapPic,
        thumbnail: destonThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    rondo: {
        mapName: 'Rondo',
        size: "8x8",
        layout: rondoMapPic,
        thumbnail: rondoThumb,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    }
}


export const getMapParams = (map: string) => {
    if (Object.keys(mapsParams).includes(map)){
        return mapsParams[map as mapNamesUnion];
    }
}

export const getThumbnails = () => {
    return (Object.values(mapsParams)).map(el => ({
        name: el.mapName,
        thumb: el.thumbnail
      }))
}
