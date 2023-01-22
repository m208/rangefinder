import type { ICoords } from "./types";

export const calcDistance = (dots: Array<ICoords>) => {
    if (dots.length !== 2) return 0;

    const dx = Math.max(dots[0].x, dots[1].x) - Math.min(dots[0].x, dots[1].x);
    const dy = Math.max(dots[0].y, dots[1].y) - Math.min(dots[0].y, dots[1].y);
    const distance = Math.sqrt(dx**2 + dy**2);
    
    return distance;
}

export const getMiddlePoint = (dots: Array<ICoords>) => {
    if (dots.length !== 2) return null;

    return ({
        x: (dots[0].x + dots[1].x) / 2,
        y: (dots[0].y + dots[1].y) / 2,
    });


}