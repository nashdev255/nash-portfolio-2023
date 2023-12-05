// refer from catnose
import  { useEffect, useState, useCallback } from 'react';
import { useThrottle } from 'react-use';

const useOffsetTop = (ref?: React.RefObject<HTMLElement>) => {
  const [viewportTop, setViewportTop] = useState<number | undefined>(undefined);
  const [pageOffsetTop, setPageOffsetTop] = useState<number | undefined>(undefined);

  const handler = useThrottle(() => {
    if (!ref?.current) return;

    const clientRect = ref.current.getBoundingClientRect();
    setViewportTop(clientRect.top);
    const newPageOffsetTop = clientRect.top + window.pageYOffset;
    setPageOffsetTop(newPageOffsetTop);
  }, 100);

  useEffect(() => {
    if (!ref?.current) return;

    handler();
    window.addEventListener("scroll", handler);

    return () => window.removeEventListener("scroll", handler);
  }, [handler]);

  return { viewportTop, pageOffsetTop };
}

export default useOffsetTop;
