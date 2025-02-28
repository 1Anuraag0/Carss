"use client";

import { motion } from 'framer-motion';
import { Car } from 'lucide-react';
import { useSoundEffect } from '@/hooks/use-sound-effect';

export function Footer() {
  const playHover = useSoundEffect('/sounds/hover.mp3');
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News", href: "#" },
        { name: "Sustainability", href: "#" }
      ]
    },
    {
      title: "Vehicles",
      links: [
        { name: "Aero GT", href: "#" },
        { name: "Phantom X", href: "#" },
        { name: "Velocity S", href: "#" },
        { name: "All Models", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Test Drive", href: "#" },
        { name: "Financing", href: "#" },
        { name: "Trade-In", href: "#" },
        { name: "Support", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Accessibility", href: "#" }
      ]
    }
  ];
  
  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center mb-6"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={playHover}
            >
              <Car className="w-8 h-8 mr-2 text-primary" />
              <span className="text-xl font-bold">AUTOMOTIV</span>
            </motion.div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Pioneering the future of automotive technology with innovative designs,
              sustainable solutions, and unparalleled driving experiences.
            </p>
            
            <div className="flex items-center space-x-2">
              <motion.div 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                © {new Date().getFullYear()} Automotiv. All rights reserved.
              </motion.div>
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-bold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    onMouseEnter={playHover}
                  >
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            Designed with ♥ for the future of mobility
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
              onMouseEnter={playHover}
            >
              Dealerships
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
              onMouseEnter={playHover}
            >
              Investor Relations
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
              onMouseEnter={playHover}
            >
              Press
            </motion.a>
            <motion.a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
              onMouseEnter={playHover}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}