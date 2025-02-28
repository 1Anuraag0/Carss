"use client";

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  Facebook, Twitter, Instagram, Linkedin, Youtube 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    loading: false
  });
  
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  const playHover = useSoundEffect('/sounds/hover.mp3');
  const playClick = useSoundEffect('/sounds/click.mp3');
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    
    setFormState(prev => ({ ...prev, loading: true }));
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
        loading: false
      });
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: "info@automotiv.com",
      link: "mailto:info@automotiv.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Address",
      details: "123 Innovation Drive, Tech City, CA 94103",
      link: "https://maps.google.com"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Hours",
      details: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      link: "#"
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", href: "#" },
    { icon: <Twitter className="w-5 h-5" />, name: "Twitter", href: "#" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", href: "#" },
    { icon: <Linkedin className="w-5 h-5" />, name: "LinkedIn", href: "#" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", href: "#" }
  ];
  
  return (
    <section 
      id="contact" 
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
          whileInView={{ opacity: 1, y <boltArtifact id="complete-car-showcase" title="Complete 3D Car Showcase Website">
          }
          }
  )
}