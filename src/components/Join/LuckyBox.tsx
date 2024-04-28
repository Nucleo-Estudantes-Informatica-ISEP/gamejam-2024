import { AnimationDefinition, motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';

const LuckyBox: React.FC = () => {
  const [isInAnimation, setIsInAnimation] = useState<boolean>(false);
  const [isCollected, setIsCollected] = useState<boolean>(false);

  const boxControls = useAnimationControls();
  const coinControls = useAnimationControls();

  const boxAnimation: { [key: string]: AnimationDefinition } = {
    up: { y: -30, transition: { duration: 0.08 } },
    down: { y: 0, transition: { duration: 0.08 } }
  };

  const coinAnimation: { [key: string]: AnimationDefinition } = {
    up: { y: -300, transition: { duration: 0.4, ease: 'linear' } },
    down: { y: 0, transition: { duration: 0.4, ease: 'linear' } }
  };

  const handleClick = async () => {
    if (isCollected || isInAnimation) return;
    setIsCollected(true);
    boxControls.start(boxAnimation.up).then(() => boxControls.start(boxAnimation.down));
    coinControls.start(coinAnimation.up).then(() => coinControls.start(coinAnimation.down));
  };

  return (
    <div className="relative">
      <motion.img
        className="h-8 w-8 md:h-16 md:w-16 lg:h-24 lg:w-24 brightness-90 cursor-pointer duration-100 ease-in-out"
        src={isCollected ? '/collected-luckybox.png' : '/luckybox.gif'}
        alt="Lucky Box"
        onClick={handleClick}
        animate={boxControls}
      />
      <motion.img
        className="h-8 w-8 md:h-16 md:w-16 lg:h-24 lg:w-24 brightness-90 cursor-pointer duration-100 ease-in-out absolute top-0 -z-10"
        src="/coin.gif"
        alt="Coin"
        animate={coinControls}
      />
    </div>
  );
};

export default LuckyBox;
