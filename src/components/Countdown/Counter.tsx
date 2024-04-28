import { useRef } from 'react';

import { motion, useInView, useScroll } from 'framer-motion';

import paddingNumber from '../../utils/paddingNumber';

import useTimeRemaining from '../../hooks/useTimeRemaining';
import useWindowDimensions from '../../utils/useWindowDimensions';

interface Props {
  targetDate: Date;
}

const Counter: React.FC<Props> = ({ targetDate }) => {
  const { width, height } = useWindowDimensions();
  const dinoRef = useRef<HTMLDivElement>(null);

  const dinosaurInView = useInView(dinoRef);
  const scrollPos = useScroll();

  const { timeRemaining } = useTimeRemaining(targetDate);

  const renderDigits = (value: number, index: number) => {
    const transition = {
      type: 'spring',
      y: {
        duration: 0.2,
        ease: 'linear'
      }
    };

    return (
      <motion.span
        className="tracking-tight text-center text-4xl md:text-4xl lg:text-8xl my-4 font-bold text-white font-retro-numbers"
        key={index}>
        {paddingNumber(value, 2)}
      </motion.span>
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-center w-full select-none font-retro-numbers">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-lg md:text-2xl text-center lg:text-4xl font-black uppercase  text-white">
            dias
          </h2>
          {renderDigits(timeRemaining.days, 1)}
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-lg md:text-2xl text-center lg:text-4xl font-black uppercase  text-white">
            horas
          </h2>
          {renderDigits(timeRemaining.hours, 2)}
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-lg md:text-2xl text-center lg:text-4xl font-black uppercase text-white">
            {width < 768 ? 'min' : 'minutos'}
          </h2>
          {renderDigits(timeRemaining.minutes, 3)}
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-lg md:text-2xl text-center lg:text-4xl font-black uppercase  text-white">
            {width < 768 ? 'seg' : 'segundos'}
          </h2>
          {renderDigits(timeRemaining.seconds, 4)}
        </div>
      </div>
    </div>
  );
};

export default Counter;
