// enums/AnimationVariants.ts
export enum AnimationVariants {
    SlideIn = 'slideIn',
    FadeIn = 'fadeIn',
    ScaleIn = 'scaleIn',
}
  
  // variants/animationVariants.ts
import { Variants } from 'framer-motion';

export const animationVariants: Record<AnimationVariants, Variants> = {
  [AnimationVariants.SlideIn]: {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  },
  [AnimationVariants.FadeIn]: {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  },
  [AnimationVariants.ScaleIn]: {
    hidden: { opacity: 0, scale: 0.8 },
    enter: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};
