"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { cn } from '@/lib/utils';

// Gallery images data
const galleryImages = [
  {
    id: 1,
    title: "Aero GT - Front View",
    description: "Sleek aerodynamic design with active front splitter",
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1740&auto=format&fit=crop",
    color: "hsl(var(--chart-1))"
  },
  {
    id: 2,
    title: "Phantom X - Interior",
    description: "Luxurious cabin with premium materials and ambient lighting",
    src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1740&auto=format&fit=crop",
    color: "hsl(var(--chart-2))"
  },
  {
    id: 3,
    title: "Velocity S - Side Profile",
    description: "Dynamic stance with distinctive character lines",
    src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1650&auto=format&fit=crop",
    color: "hsl(var(--chart-3))"
  },
  {
    id: 4,
    title: "Horizon SUV - Off-road",
    description: "Conquering challenging terrain with advanced all-wheel drive",
    src: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1740&auto=format&fit=crop",
    color: "hsl(var(--chart-4))"
  },
  {
    id: 5,
    title: "Nebula - Night Drive",
    description: "Illuminating the road with adaptive LED matrix headlights",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1883&auto=format&fit=crop",
    color: "hsl(var(--chart-5))"
  }
];

export function GallerySection() {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const nextImage = () => {
    playClick();
    setActiveImage((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = () => {
    playClick();
    setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };
  
  const openLightbox = () => {
    playClick();
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    playClick();
    setLightboxOpen(false);
  };
  
  return (
    <section 
      id="gallery" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background/0 via-background/50 to-background"
        style={{ y }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our vehicles from every angle and discover the attention to detail
            that sets our designs apart.
          </p>
        </motion.div>
        
        <div className="relative">
          <motion.div
            key={galleryImages[activeImage].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/9] overflow-hidden rounded-xl mb-8"
          >
            <motion.img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {galleryImages[activeImage].title}
              </h3>
              <p className="text-white/80 max-w-lg">
                {galleryImages[activeImage].description}
              </p>
            </motion.div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={openLightbox}
              onMouseEnter={playHover}
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevImage}
              onMouseEnter={playHover}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex space-x-2">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  className="w-3 h-3 rounded-full cursor-pointer"
                  style={{ 
                    backgroundColor: index === activeImage 
                      ? galleryImages[activeImage].color 
                      : "hsl(var(--muted))" 
                  }}
                  animate={{ 
                    scale: activeImage === index ? 1.5 : 1,
                  }}
                  onClick={() => {
                    playClick();
                    setActiveImage(index);
                  }}
                  onMouseEnter={playHover}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextImage}
              onMouseEnter={playHover}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={cn(
                  "aspect-[4/3] rounded-lg overflow-hidden cursor-pointer",
                  activeImage === index && "ring-2 ring-offset-2"
                )}
                style={{ 
                  ringColor: activeImage === index ? galleryImages[activeImage].color : undefined 
                }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  playClick();
                  setActiveImage(index);
                }}
                onMouseEnter={playHover}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[activeImage].src} 
              alt={galleryImages[activeImage].title}
              className="w-full h-full object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">
                {galleryImages[activeImage].title}
              </h3>
              <p className="text-white/80">
                {galleryImages[activeImage].description}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={closeLightbox}
              onMouseEnter={playHover}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              onMouseEnter={playHover}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              onMouseEnter={playHover}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}