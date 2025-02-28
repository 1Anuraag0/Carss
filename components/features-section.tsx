"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, Shield, Gauge, Wifi, Battery, Cpu, 
  Smartphone, Map, Headphones, Eye
} from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';

const features = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Electric Performance",
    description: "Zero emissions with instant torque for unparalleled acceleration and response."
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Advanced Safety",
    description: "360° protection with predictive collision avoidance and emergency response."
  },
  {
    icon: <Gauge className="w-10 h-10" />,
    title: "Extended Range",
    description: "Up to 400 miles on a single charge with rapid recharging capabilities."
  },
  {
    icon: <Wifi className="w-10 h-10" />,
    title: "Connected Ecosystem",
    description: "Seamless integration with your digital life and smart home devices."
  },
  {
    icon: <Battery className="w-10 h-10" />,
    title: "Battery Technology",
    description: "Next-generation cells with enhanced density and thermal management."
  },
  {
    icon: <Cpu className="w-10 h-10" />,
    title: "Autonomous Driving",
    description: "Level 3 autonomy with continuous improvements via over-the-air updates."
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Mobile Control",
    description: "Full vehicle control and monitoring from your smartphone anywhere."
  },
  {
    icon: <Map className="w-10 h-10" />,
    title: "Intelligent Navigation",
    description: "AI-powered route planning optimized for charging and traffic conditions."
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "Premium Audio",
    description: "Studio-quality sound system with spatial audio and personalized acoustics."
  },
  {
    icon: <Eye className="w-10 h-10" />,
    title: "Augmented Reality",
    description: "Heads-up display with AR navigation and hazard detection."
  }
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const playHover = useSoundEffect('/sounds/hover.mp3');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Revolutionary Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of automotive technology with our cutting-edge innovations
            designed to transform your driving experience.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              onMouseEnter={playHover}
              className="bg-card/30 backdrop-blur-sm p-6 rounded-xl border border-border/50 flex flex-col items-center text-center"
            >
              <motion.div 
                className="text-primary mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/50 to-background"
        style={{ y }}
      />
    </section>
  );
}