"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Car className="w-16 h-16 mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-8">AUTOMOTIV</h1>
            
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="mt-4 text-muted-foreground">
              Loading 3D assets... {progress}%
            </div>
          </motion.div>
          
          <div className="absolute bottom-8 flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full bg-primary",
                  i === 0 ? "opacity-100" : "opacity-40"
                )}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}