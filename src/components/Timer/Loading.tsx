import { useCallback, useEffect, useState } from 'react';

import { getTimeDifference } from '../../utils/time';

import CountdownTimer from './CountdownTimer';

interface LoadingParams {
  title: string;
  year: number;
  month: number;
  day: number;
}

interface CountDownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// chance of one of the timer cards trigger the animation (1/ANIMATION_ODD)
const ANIMATION_ODD = 50;

const Loading = ({ title, year, month, day }: LoadingParams) => {
  const [countDownTime, setCountDownTime] = useState<CountDownTime>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const startCountDown = useCallback(() => {
    const countDownDate = new Date(year, month - 1, day, 18, 0, 0);
    setInterval(() => {
      setCountDownTime(getTimeDifference(countDownDate.getTime()));
    }, 1000);
  }, []);

  useEffect(() => {
    startCountDown();
  }, [startCountDown]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 sm:gap-16">
      <span className="text-white px-2 text-center text-2xl font-extrabold leading-none tracking-widest sm:text-3xl">
        {title}
      </span>
      <div className="flex justify-center gap-3 sm:gap-8">
        <CountdownTimer
          time={+countDownTime.days}
          label={+countDownTime.days === 1 ? 'Dia' : 'Dias'}
          animated={Math.floor(Math.random() * ANIMATION_ODD) === 1}
        />
        <CountdownTimer
          time={+countDownTime.hours}
          label={+countDownTime.hours === 1 ? 'Hora' : 'Horas'}
          animated={Math.floor(Math.random() * ANIMATION_ODD) === 1}
        />
        <CountdownTimer
          time={+countDownTime.minutes}
          label={+countDownTime.minutes === 1 ? 'Minuto' : 'Minutos'}
          animated={Math.floor(Math.random() * ANIMATION_ODD) === 1}
        />
        <CountdownTimer
          time={+countDownTime.seconds}
          label={+countDownTime.seconds === 1 ? 'Segundo' : 'Segundos'}
          animated={Math.floor(Math.random() * ANIMATION_ODD) === 1}
        />
      </div>
    </div>
  );
};

export default Loading;
