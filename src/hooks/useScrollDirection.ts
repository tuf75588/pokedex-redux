import { DSAKeyPairKeyObjectOptions } from 'crypto';
import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';

type Directions = 'up' | 'down';

type Props = {
  initialDirection?: Directions;
  thresholdPixels?: number;
  off?: boolean;
};

function useScrollDirection({
  initialDirection,
  thresholdPixels,
  off,
}: Props = {}) {
  const [scrollDirection, setScrollDirection] = useState(initialDirection);
  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? SCROLL_DOWN : SCROLL_UP);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
      !off
        ? window.addEventListener('scroll', onScroll)
        : setScrollDirection(initialDirection);
    };
    return () => window.removeEventListener('scroll', onScroll);
  }, [initialDirection, thresholdPixels, off]);
  return scrollDirection;
}

export default useScrollDirection;
