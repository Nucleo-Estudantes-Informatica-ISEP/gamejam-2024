import React, { useState } from 'react';
import { LOCATION_NOT_DEFINED, schedule as SCHEDULE } from '../../data/schedule';

interface ScheduleContentProps {
  children?: React.ReactNode;
}

const ScheduleContent: React.FC<ScheduleContentProps> = () => {
  const DEFAULT_ID = SCHEDULE[0]?.id;

  const [activeDay, setActiveDay] = useState(DEFAULT_ID);

  const isActiveDay = (day: number) => day == activeDay;

  const activeDayButtonStyles = (id: number) =>
    ` ${isActiveDay(id) ? 'bg-yellow text-black' : 'bg-[#4f99c8]'}`;

  const getActiveDayEvents = () => {
    return SCHEDULE.filter((day) => day.id === activeDay)[0].events;
  };

  return (
    <>
      <div className="m-auto container flex w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col justify-center lg:flex-row">
          {SCHEDULE.map((day) => {
            const { id, date, name } = day;

            return (
              <button
                key={id}
                className={`
                    ${activeDayButtonStyles(id)}
                    w-full px-4 py-3 transition-all border-2 border-slate-400 text-md md:text-lg lg:text-xl duration-300 hover:brightness-75 font-misterPixel uppercase`}
                onClick={() => setActiveDay(id)}>
                {`${name} (${date})`}
              </button>
            );
          })}
        </div>
        <table className="text-md w-98 mt-6 w-full text-md md:text-xl table-auto border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-500">
              <th className="w-1/3 py-4 px-4 text-left">Hora</th>
              <th className="py-4 text-left">Atividade</th>
              <th className="w-1/4 py-4 text-left">Sala</th>
            </tr>
          </thead>
          <tbody>
            {getActiveDayEvents().map((event, index) => {
              const { startTime, description, location } = event;
              return (
                <tr className="border-b-2 border-gray-500 h-24" key={index}>
                  <td className="py-4 px-4 text-md md:text-2xl lg:text-3xl">{startTime}</td>
                  <td className="py-4 pr-4 text-md md:text-2xl">{description}</td>
                  <td className="py-4 text-md md:text-2xl">{location || LOCATION_NOT_DEFINED}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ScheduleContent;
