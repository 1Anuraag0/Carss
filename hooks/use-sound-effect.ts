"use client";

import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';

export function useSoundEffect(src: string) {
  const [sound, setSound] = useState<Howl | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const newSound = new Howl({
        src: [src],
        volume: 0.2,
        preload: true,
      });
      setSound(newSound);
      initialized.current = true;
    }

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [src]);

  const play = () => {
    if (sound) {
      sound.play();
    }
  };

  return play;
}