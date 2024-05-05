import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const input = [0, 0.2, 1];
  const opacityOutput = [1, 0, 0];

  const opacity = useTransform(scrollYProgress, input, opacityOutput);

  return (
    <main className="min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.img
          style={{ opacity }}
          className="aspect-square w-[30%]"
          src="/logo.webp"
          alt="GameJam 2024 Logo"
        />
      </div>
    </main>
  );
};

export default Hero;
