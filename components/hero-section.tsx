"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';

// Car data
const cars = [
  {
    id: 1,
    name: "Aero GT",
    description: "The pinnacle of aerodynamic design and performance engineering.",
    specs: {
      power: "780 HP",
      acceleration: "0-60 in 2.8s",
      topSpeed: "211 mph",
      range: "Electric: 320 miles"
    },
    color: "hsl(var(--chart-1))",
    modelPath: "/models/car1.glb" // These would be actual 3D model paths
  },
  {
    id: 2,
    name: "Phantom X",
    description: "Luxury redefined with cutting-edge technology and supreme comfort.",
    specs: {
      power: "650 HP",
      acceleration: "0-60 in 3.2s",
      topSpeed: "195 mph",
      range: "Hybrid: 580 miles"
    },
    color: "hsl(var(--chart-2))",
    modelPath: "/models/car2.glb"
  },
  {
    id: 3,
    name: "Velocity S",
    description: "Compact, agile, and incredibly responsive for the urban explorer.",
    specs: {
      power: "510 HP",
      acceleration: "0-60 in 3.9s",
      topSpeed: "178 mph",
      range: "Electric: 290 miles"
    },
    color: "hsl(var(--chart-3))",
    modelPath: "/models/car3.glb"
  }
];

// Placeholder 3D Car component
function Car3D({ modelPath, color, isActive }: { modelPath: string; color: string; isActive: boolean }) {
  // In a real implementation, we would load the actual model
  // const { scene } = useGLTF(modelPath);
  
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current && isActive) {
      gsap.to(meshRef.current.rotation, {
        y: meshRef.current.rotation.y + Math.PI * 2,
        duration: 20,
        ease: "none",
        repeat: -1
      });
    }
  }, [isActive]);
  
  return (
    <mesh ref={meshRef} scale={isActive ? 1 : 0} position={[0, 0, 0]}>
      <boxGeometry args={[3, 1, 6]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export function HeroSection() {
  const [currentCar, setCurrentCar] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');
  const playTransition = useSoundEffect('/sounds/transition.mp3');
  
  const nextCar = () => {
    if (soundEnabled) playTransition();
    setCurrentCar((prev) => (prev + 1) % cars.length);
  };
  
  const prevCar = () => {
    if (soundEnabled) playTransition();
    setCurrentCar((prev) => (prev - 1 + cars.length) % cars.length);
  };
  
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        nextCar();
      }, 4000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, currentCar]);
  
  const toggleSound = () => {
    playClick();
    setSoundEnabled(!soundEnabled);
  };
  
  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 z-10"
        style={{ y, opacity }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full pt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4"
                animate={{ color: cars[currentCar].color }}
                transition={{ duration: 0.5 }}
              >
                {cars[currentCar].name}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-md text-muted-foreground"
                key={cars[currentCar].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {cars[currentCar].description}
              </motion.p>
              
              <div className="flex space-x-4 mb-12">
                <Button 
                  size="lg"
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    // Action for explore button
                  }}
                >
                  Explore Now
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    // Action for test drive button
                  }}
                >
                  Book Test Drive
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(cars[currentCar].specs).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    className="bg-card/30 backdrop-blur-sm p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-lg font-bold">{value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <div className="relative h-full flex items-center justify-center">
              {/* This div will contain the 3D car model */}
              <div className="w-full h-[400px] md:h-[600px]">
                <Canvas>
                  <PerspectiveCamera makeDefault position={[5, 2, 8]} />
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
                  
                  {cars.map((car, index) => (
                    <Car3D 
                      key={car.id} 
                      modelPath={car.modelPath} 
                      color={car.color} 
                      isActive={index === currentCar} 
                    />
                  ))}
                  
                  <Environment preset="city" />
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate={false}
                  />
                </Canvas>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Car navigation controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevCar}
          onMouseEnter={playHover}
          className="rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex space-x-2">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              className="w-3 h-3 rounded-full cursor-pointer"
              style={{ backgroundColor: car.color }}
              animate={{ 
                scale: currentCar === index ? 1.5 : 1,
                opacity: currentCar === index ? 1 : 0.5
              }}
              onClick={() => {
                if (soundEnabled) playTransition();
                setCurrentCar(index);
              }}
              onMouseEnter={playHover}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={nextCar}
          onMouseEnter={playHover}
          className="rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Sound toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute top-24 right-4 z-20"
        onClick={toggleSound}
        onMouseEnter={playHover}
      >
        {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
      
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-0"
        animate={{ 
          background: `linear-gradient(to bottom, hsl(var(--background)), ${cars[currentCar].color}10)` 
        }}
        transition={{ duration: 1 }}
      />
    </section>
  );
}