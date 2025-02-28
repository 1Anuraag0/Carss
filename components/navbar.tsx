"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Car, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { useSoundEffect } from '@/hooks/use-sound-effect';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Models', href: '#models' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Specs', href: '#specs' },
    { name: 'Contact', href: '#contact' },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleNavItemClick = (href: string) => {
    playClick();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    playClick();
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={playHover}
          >
            <Car className="w-8 h-8 mr-2 text-primary" />
            <span className="text-xl font-bold">AUTOMOTIV</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavItemClick(item.href);
                }}
                onMouseEnter={playHover}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              onMouseEnter={playHover}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              onMouseEnter={playHover}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatedMobileMenu isOpen={isOpen} navItems={navItems} onItemClick={handleNavItemClick} onHover={playHover} />
    </>
  );
}

function AnimatedMobileMenu({ 
  isOpen, 
  navItems, 
  onItemClick, 
  onHover 
}: { 
  isOpen: boolean; 
  navItems: { name: string; href: string }[];
  onItemClick: (href: string) => void;
  onHover: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-30 md:hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : -20,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {navItems.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.href}
            className="text-2xl font-bold py-4 hover:text-primary transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ 
              duration: 0.3, 
              delay: isOpen ? index * 0.1 : 0 
            }}
            onClick={(e) => {
              e.preventDefault();
              onItemClick(item.href);
            }}
            onMouseEnter={onHover}
          >
            {item.name}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}