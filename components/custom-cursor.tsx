"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        setIsPointer(computedStyle.cursor === 'pointer');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', updateCursorType);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', updateCursorType);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position.x, position.y]);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none;
        }
      `}</style>
      {!isHidden && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary z-50 pointer-events-none"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: isClicking ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.5,
            }}
          />
          <motion.div
            className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-primary z-50 pointer-events-none ${
              isPointer ? "bg-accent" : "bg-primary"
            }`}
            animate={{
              x: position.x - 4,
              y: position.y - 4,
              scale: isPointer ? 2 : 1,
            }}
            transition={{
              type: "spring",
              damping: 40,
              stiffness: 400,
            }}
          />
        </>
      )}
    </>
  );
}