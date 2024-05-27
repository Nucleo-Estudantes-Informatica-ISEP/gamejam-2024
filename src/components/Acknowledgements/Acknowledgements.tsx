import type { Sponsor } from '../../types/Sponsor';

interface AcknowledgmentsProps {
  sponsors: Sponsor[];
}

const Acknowledgements: React.FC<AcknowledgmentsProps> = ({ sponsors }) => {
  return (
    <div
      id="container"
      className="flex flex-col md:flex-row flex-wrap gap-x-24 w-full gap-y-0 md:gap-y-32 justify-center items-center">
      {sponsors.map((s) => (
        <div className="w-full h-auto aspect-square max-w-xs max-h-xs rounded-lg flex items-center justify-center">
          <a href={s.link} target="_blank">
            <img
              src={s.image}
              alt={s.name}
              className="w-60 h-60 object-contain hover:scale-105 transition-all duration-200 ease-in-out hover:drop-shadow-whiteShadow"
            />
          </a>
        </div>
      ))}
    </div>
  );
};
export default Acknowledgements;
