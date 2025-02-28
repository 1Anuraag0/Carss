"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/lib/utils';

// Car models data
const models = [
  {
    id: 1,
    name: "Aero GT",
    category: "Sports",
    price: "$120,000",
    color: "hsl(var(--chart-1))",
    modelPath: "/models/car1.glb",
    features: ["780 HP", "0-60 in 2.8s", "211 mph", "Electric: 320 miles"]
  },
  {
    id: 2,
    name: "Phantom X",
    category: "Luxury",
    price: "$95,000",
    color: "hsl(var(--chart-2))",
    modelPath: "/models/car2.glb",
    features: ["650 HP", "0-60 in 3.2s", "195 mph", "Hybrid: 580 miles"]
  },
  {
    id: 3,
    name: "Velocity S",
    category: "Compact",
    price: "$75,000",
    color: "hsl(var(--chart-3))",
    modelPath: "/models/car3.glb",
    features: ["510 HP", "0-60 in 3.9s", "178 mph", "Electric: 290 miles"]
  },
  {
    id: 4,
    name: "Horizon SUV",
    category: "SUV",
    price: "$85,000",
    color: "hsl(var(--chart-4))",
    modelPath: "/models/car4.glb",
    features: ["420 HP", "0-60 in 4.5s", "155 mph", "Electric: 350 miles"]
  },
  {
    id: 5,
    name: "Nebula",
    category: "Sedan",
    price: "$65,000",
    color: "hsl(var(--chart-5))",
    modelPath: "/models/car5.glb",
    features: ["380 HP", "0-60 in 4.8s", "165 mph", "Hybrid: 520 miles"]
  }
];

// Placeholder 3D Car component for models section
function ModelCar3D({ color, isActive }: { color: string; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh 
      ref={meshRef} 
      scale={isActive ? 0.8 : 0} 
      position={[0, -0.5, 0]}
      rotation={[0, Math.PI / 4, 0]}
    >
      <boxGeometry args={[3, 1, 6]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export function ModelsSection() {
  const [activeModel, setActiveModel] = useState(0);
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      id="models" 
      ref={sectionRef}
      className="py-24 relative min-h-screen flex items-center"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ opacity }}
        initial={{ backgroundColor: models[activeModel].color + "10" }}
        animate={{ backgroundColor: models[activeModel].color + "10" }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Models</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our lineup of cutting-edge vehicles designed for the future of transportation.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap gap-4 mb-8">
              {models.map((model, index) => (
                <motion.button
                  key={model.id}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeModel === index 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => {
                    playHover();
                    setHoveredModel(index);
                  }}
                  onMouseLeave={() => setHoveredModel(null)}
                  onClick={() => {
                    playClick();
                    setActiveModel(index);
                  }}
                  style={{
                    backgroundColor: activeModel === index ? model.color : undefined,
                    color: activeModel === index ? "#ffffff" : undefined
                  }}
                >
                  {model.name}
                </motion.button>
              ))}
            </div>
            
            <motion.div
              key={models[activeModel].id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-card/30 backdrop-blur-sm p-8 rounded-xl border border-border/50"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold" style={{ color: models[activeModel].color }}>
                    {models[activeModel].name}
                  </h3>
                  <p className="text-muted-foreground">{models[activeModel].category}</p>
                </div>
                <div className="text-2xl font-bold">{models[activeModel].price}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {models[activeModel].features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: models[activeModel].color }} />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  size="lg"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  style={{ 
                    backgroundColor: models[activeModel].color,
                    color: "#ffffff",
                    borderColor: "transparent"
                  }}
                >
                  Configure
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  Test Drive
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 h-[400px] md:h-[500px]">
            <Canvas>
              <PerspectiveCamera makeDefault position={[5, 2, 8]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
              
              {models.map((model, index) => (
                <ModelCar3D 
                  key={model.id} 
                  color={model.color} 
                  isActive={index === activeModel} 
                />
              ))}
              
              <Environment preset="city" />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={3}
              />
            </Canvas>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: models[activeModel].color,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.7, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    </section>
  );
}