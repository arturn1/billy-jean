// components/PageTransition.tsx
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { animationVariants, AnimationVariants } from '@/enums/AnimationVariants';

interface PageTransitionProps {
  children: ReactNode;
  variant: AnimationVariants;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, variant }) => {
  const selectedVariant: Variants = animationVariants[variant];

  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={selectedVariant}
      transition={{ type: 'linear' }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
