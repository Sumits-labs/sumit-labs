import { useCallback, useRef } from 'react';

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  };

  const beep = useCallback((freq = 440, duration = 0.08, volume = 0.03) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.value = volume;
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.stop(ctx.currentTime + duration);
    } catch {
      /* audio unavailable */
    }
  }, []);

  const bootSound = useCallback(() => {
    [200, 300, 400, 600, 800].forEach((f, i) => {
      setTimeout(() => beep(f, 0.06, 0.02), i * 80);
    });
  }, [beep]);

  const unlockSound = useCallback(() => {
    [150, 200, 350, 500].forEach((f, i) => {
      setTimeout(() => beep(f, 0.12, 0.04), i * 120);
    });
  }, [beep]);

  const transmissionSound = useCallback(() => {
    [600, 800, 1000, 1200].forEach((f, i) => {
      setTimeout(() => beep(f, 0.1, 0.03), i * 100);
    });
  }, [beep]);

  return { beep, bootSound, unlockSound, transmissionSound };
}
