import { motion, useScroll, useTransform } from 'framer-motion';
import HeroParticles from './HeroParticles';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const input = [0, 0.4, 1];
  const opacityOutput = [1, 0, 0];

  const opacity = useTransform(scrollYProgress, input, opacityOutput);

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div
          className="w-full flex items-center justify-center h-full fixed select-none"
          style={{ opacity }}>
          <img className="aspect-[4/5] w-11/12 max-w-5xl" src="/logov1.png" alt="hero" />
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;
