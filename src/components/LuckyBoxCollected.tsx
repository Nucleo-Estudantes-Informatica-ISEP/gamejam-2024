import { motion } from 'framer-motion';
import useIsMobile from '../hooks/useIsMobile';

const LuckyBox: React.FC = () => {
  const isMobile = useIsMobile();

  const coinJumpHeight = isMobile ? -160 : -360;

  const coinAnimation = {
    y: coinJumpHeight,
    opacity: [1, 1, 1, 1, 1, 1, 0],
    transition: { duration: 0.3, ease: 'linear' }
  };

  return (
    <div className="hidden absolute z-[60]" id="lucky-box-collected">
      <motion.img
        className="size-16 lg:size-24 brightness-90 cursor-pointer duration-100 aspect-square"
        src={'/collected-luckybox.png'}
        alt="Lucky Box"
      />
      <motion.img
        className="size-16 lg:size-24 brightness-90 cursor-pointer duration-100 absolute top-0 -z-10 aspect-square"
        src="/coin.gif"
        alt="Coin"
        animate={coinAnimation}
      />
    </div>
  );
};

export default LuckyBox;
