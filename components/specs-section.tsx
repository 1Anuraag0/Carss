"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Battery, Zap, Gauge, Clock, Weight, Ruler, 
  Thermometer, Shield, Wind, Droplet 
} from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/lib/utils';

// Car specs data
const carSpecs = {
  "aero-gt": {
    name: "Aero GT",
    color: "hsl(var(--chart-1))",
    categories: {
      performance: [
        { icon: <Zap />, name: "Power", value: "780 HP" },
        { icon: <Clock />, name: "0-60 mph", value: "2.8 seconds" },
        { icon: <Gauge />, name: "Top Speed", value: "211 mph" },
        { icon: <Battery />, name: "Range", value: "320 miles" }
      ],
      dimensions: [
        { icon: <Ruler />, name: "Length", value: "4,750 mm" },
        { icon: <Ruler />, name: "Width", value: "2,050 mm" },
        { icon: <Ruler />, name: "Height", value: "1,150 mm" },
        { icon: <Weight />, name: "Weight", value: "1,950 kg" }
      ],
      battery: [
        { icon: <Battery />, name: "Capacity", value: "120 kWh" },
        { icon: <Zap />, name: "Fast Charging", value: "10-80% in 20 min" },
        { icon: <Thermometer />, name: "Thermal Management", value: "Advanced Liquid Cooling" },
        { icon: <Clock />, name: "Lifespan", value: "500,000+ miles" }
      ],
      safety: [
        { icon: <Shield />, name: "Crash Rating", value: "5-Star" },
        { icon: <Shield />, name: "Airbags", value: "8 Total" },
        { icon: <Shield />, name: "Driver Assistance", value: "Level 3 Autonomy" },
        { icon: <Shield />, name: "Structure", value: "Carbon Fiber Reinforced" }
      ]
    }
  },
  "phantom-x": {
    name: "Phantom X",
    color: "hsl(var(--chart-2))",
    categories: {
      performance: [
        { icon: <Zap />, name: "Power", value: "650 HP" },
        { icon: <Clock />, name: "0-60 mph", value: "3.2 seconds" },
        { icon: <Gauge />, name: "Top Speed", value: "195 mph" },
        { icon: <Battery />, name: "Range", value: "580 miles (Hybrid)" }
      ],
      dimensions: [
        { icon: <Ruler />, name: "Length", value: "5,200 mm" },
        { icon: <Ruler />, name: "Width", value: "2,100 mm" },
        { icon: <Ruler />, name: "Height", value: "1,450 mm" },
        { icon: <Weight />, name: "Weight", value: "2,250 kg" }
      ],
      battery: [
        { icon: <Battery />, name: "Capacity", value: "85 kWh" },
        { icon: <Zap />, name: "Fast Charging", value: "10-80% in 25 min" },
        { icon: <Droplet />, name: "Fuel Tank", value: "60 liters" },
        { icon: <Gauge />, name: "Fuel Economy", value: "45 mpg combined" }
      ],
      safety: [
        { icon: <Shield />, name: "Crash Rating", value: "5-Star" },
        { icon: <Shield />, name: "Airbags", value: "10 Total" },
        { icon: <Shield />, name: "Driver Assistance", value: "Level 2+ Autonomy" },
        { icon: <Shield />, name: "Structure", value: "Aluminum Space Frame" }
      ]
    }
  },
  "velocity-s": {
    name: "Velocity S",
    color: "hsl(var(--chart-3))",
    categories: {
      performance: [
        { icon: <Zap />, name: "Power", value: "510 HP" },
        { icon: <Clock />, name: "0-60 mph", value: "3.9 seconds" },
        { icon: <Gauge />, name: "Top Speed", value: "178 mph" },
        { icon: <Battery />, name: "Range", value: "290 miles" }
      ],
      dimensions: [
        { icon: <Ruler />, name: "Length", value: "4,400 mm" },
        { icon: <Ruler />, name: "Width", value: "1,850 mm" },
        { icon: <Ruler />, name: "Height", value: "1,350 mm" },
        { icon: <Weight />, name: "Weight", value: "1,750 kg" }
      ],
      battery: [
        { icon: <Battery />, name: "Capacity", value: "95 kWh" },
        { icon: <Zap />, name: "Fast Charging", value: "10-80% in 22 min" },
        { icon: <Thermometer />, name: "Thermal Management", value: "Liquid Cooling" },
        { icon: <Clock />, name: "Lifespan", value: "400,000+ miles" }
      ],
      safety: [
        { icon: <Shield />, name: "Crash Rating", value: "5-Star" },
        { icon: <Shield />, name: "Airbags", value: "6 Total" },
        { icon: <Shield />, name: "Driver Assistance", value: "Level 2 Autonomy" },
        { icon: <Shield />, name: "Structure", value: "High-Strength Steel" }
      ]
    }
  }
};

export function SpecsSection() {
  const [activeModel, setActiveModel] = useState("aero-gt");
  const [activeCategory, setActiveCategory] = useState("performance");
  const sectionRef = useRef<HTMLElement>(null);
  
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  
  return (
    <section 
      id="specs" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y }}
        initial={{ backgroundColor: carSpecs[activeModel as keyof typeof carSpecs].color + "05" }}
        animate={{ backgroundColor: carSpecs[activeModel as keyof typeof carSpecs].color + "05" }}
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Specifications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into the engineering details that make our vehicles exceptional.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(carSpecs).map((model) => (
            <motion.button
              key={model}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all",
                activeModel === model 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveModel(model);
              }}
              style={{
                backgroundColor: activeModel === model 
                  ? carSpecs[model as keyof typeof carSpecs].color 
                  : undefined,
                color: activeModel === model ? "#ffffff" : undefined
              }}
            >
              {carSpecs[model as keyof typeof carSpecs].name}
            </motion.button>
          ))}
        </div>
        
        <motion.div
          key={activeModel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-card/30 backdrop-blur-sm p-8 rounded-xl border border-border/50"
        >
          <Tabs 
            defaultValue="performance" 
            value={activeCategory}
            onValueChange={(value) => {
              playClick();
              setActiveCategory(value);
            }}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {Object.keys(carSpecs[activeModel as keyof typeof carSpecs].categories).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onMouseEnter={playHover}
                  className="data-[state=active]:text-white"
                  style={{
                    backgroundColor: activeCategory === category 
                      ? carSpecs[activeModel as keyof typeof carSpecs].color 
                      : undefined,
                  }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(carSpecs[activeModel as keyof typeof carSpecs].categories).map(([category, specs]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {specs.map((spec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-background/50 p-6 rounded-lg border border-border/50 flex flex-col items-center text-center"
                      onMouseEnter={playHover}
                    >
                      <motion.div 
                        className="text-2xl mb-4"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        style={{ color: carSpecs[activeModel as keyof typeof carSpecs].color }}
                      >
                        {spec.icon}
                      </motion.div>
                      <div className="text-sm text-muted-foreground mb-1">{spec.name}</div>
                      <div className="text-xl font-bold">{spec.value}</div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: carSpecs[activeModel as keyof typeof carSpecs].color,
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