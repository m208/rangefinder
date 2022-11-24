import { CanvasBg } from './components/CanvasBg/CanvasBg';
import ZoomImage from './components/ZoomImage/ZoomImage';

import pic from '@/assets/Erangel_Main_Low_Res.png';
import pic2 from '@/assets/Erangel_Main_No_Text_High_Res.jpg';

export const App = (): JSX.Element => (
  <div className='main'>
    <ZoomImage image={pic2}/>
  </div>
);
