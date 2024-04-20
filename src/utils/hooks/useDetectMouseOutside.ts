import { useEffect, useRef } from 'react';

export function useDetectOutside(
  handler: any,
  listenCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement | null>(null);
  console.log(typeof handler);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          if (typeof handler === 'function') return handler(false);
          handler.forEach((fn: any) => fn(false));
        }
      }

      document.addEventListener('click', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('click', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}