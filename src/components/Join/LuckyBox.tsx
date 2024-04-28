import { AnimationDefinition, motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

const LuckyBox: React.FC = () => {
  const [isCollected, setIsCollected] = useState<boolean>(false);

  const isMobile = useIsMobile();

  const boxControls = useAnimationControls();
  const coinControls = useAnimationControls();

  const coinJumpHeight = isMobile ? -160 : -360;

  const boxAnimation: { [key: string]: AnimationDefinition } = {
    up: { y: -30, transition: { duration: 0.08 } },
    down: { y: 0, transition: { duration: 0.08 } }
  };

  const coinAnimation: { [key: string]: AnimationDefinition } = {
    up: { y: coinJumpHeight, transition: { duration: 0.3, ease: 'linear' } },
    down: { y: 0, transition: { duration: 0.3, ease: 'linear' } }
  };

  const handleClick = async () => {
    if (isCollected) return;
    setIsCollected(true);
    boxControls.start(boxAnimation.up).then(() => boxControls.start(boxAnimation.down));

    await coinControls.start(coinAnimation.up);
    await coinControls.start(coinAnimation.down);

    setTimeout(() => setIsCollected(false), 3000);
  };

  return (
    <div className="relative">
      <motion.img
        className="h-16 w-16 lg:h-24 lg:w-24 brightness-90 cursor-pointer duration-100"
        src={isCollected ? '/collected-luckybox.png' : '/luckybox.gif'}
        alt="Lucky Box"
        onClick={handleClick}
        animate={boxControls}
      />
      <motion.img
        className="h-16 w-16 lg:h-24 lg:w-24 brightness-90 cursor-pointer duration-100 absolute top-0 -z-10"
        src="/coin.gif"
        alt="Coin"
        animate={coinControls}
      />
    </div>
  );
};

export default LuckyBox;
