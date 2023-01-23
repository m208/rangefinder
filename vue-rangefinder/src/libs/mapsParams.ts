import erangelMapPic from '@/assets/img/Erangel_Main_High_Res.jpg';
import miramarMapPic from '@/assets/img/Miramar_Main_High_Res.jpg';
import taegoMapPic from '@/assets/img/Taego_Main_High_Res.jpg';
import sanhokMapPic from '@/assets/img/sanhok_Main_High_Res.jpg';
import vikendiMapPic from '@/assets/img/Vikendi_Main_High_Res.jpg';
import destonMapPic from '@/assets/img/Deston_Main_High_Res.jpg';
import { svgGrid } from './mapGrids';

export type mapNamesUnion 
    = 'erangel'
    | 'miramar'
    | 'taego'
    | 'sanhok'
    | 'vikendi'
    | 'deston';

export const mapList : Array<mapNamesUnion> = [
    'erangel',
    'miramar',
    'taego',
    'sanhok',
    'vikendi',
    'deston'
];

export type mapSizes = '4x4' | '8x8';

interface MapsParam {
    mapName: string;
    size: mapSizes;
    layout: string;
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
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    miramar: {
        mapName: 'Miramar',
        size: "8x8", 
        layout: miramarMapPic,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    taego: {
        mapName: 'Taego',
        size: "8x8",
        layout: taegoMapPic,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    sanhok: {
        mapName: 'sanhok',
        size: "4x4",
        layout: sanhokMapPic,
        grid: svgGrid["4x4"],
        defaultZoom: zoomMap["4x4"],
    },
    vikendi: {
        mapName: 'Vikendi',
        size: "8x8",
        layout: vikendiMapPic,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    },
    deston: {
        mapName: 'Deston',
        size: "8x8",
        layout: destonMapPic,
        grid: svgGrid["8x8"],
        defaultZoom: zoomMap["8x8"],
    }
}


export const getMapParams = (map: string) => {
    if (Object.keys(mapsParams).includes(map)){
        return mapsParams[map as mapNamesUnion];
    }
}
