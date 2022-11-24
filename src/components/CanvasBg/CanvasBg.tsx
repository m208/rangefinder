import { useEffect, useRef } from 'react';
import './CanvasBg.pcss';

import pic from '@/assets/Erangel_Main_Low_Res.png';

export const CanvasBg = (): JSX.Element => {

  const posRefX = useRef(0);
  const posRefY = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    if (context){

      // Our first draw
      context.fillStyle = 'aliceblue';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      const img = new Image();
      img.src = pic;
      img.onload = () => { context.drawImage(
        img, posRefX.current, posRefY.current, img.width, img.height, 0, 0, img.width, img.height,
      ); };

    }

  }, []);

  const clickHandler = () => {
    posRefX.current += 100;
    posRefY.current += 100;
    const canvas = canvasRef.current;
    const context = canvas!.getContext('2d');
    if (context){

      // Our first draw
      context.fillStyle = 'aliceblue';
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);

      const img = new Image();
      img.src = pic;
      img.onload = () => { context.drawImage(
        img, posRefX.current, posRefY.current, img.width, img.height, 0, 0, img.width, img.height,
      ); };

    }
  };

  return (
    <div className='container'>
      <canvas ref={canvasRef} className='canvas-bg' />
      <button
        type ='button'
        onClick={clickHandler}
      >
            CLAC
      </button>
    </div>
  );

};
