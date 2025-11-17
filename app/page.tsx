// app/page.tsx

"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Pokedex from './components/Pokedex';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

const THEME_KEY = 'site-theme';
function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
    ? 'light' 
    : 'dark';
}

export default function Home() {
  const [theme, setTheme] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setTheme(getPreferredTheme());
  }, []); 

  useEffect(() => {
    if (theme === null) {
      return;
    }
    
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 't' || e.key === 'T') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

useEffect(() => {
    // We need to tell TypeScript what 'anchor' is
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
      
      // Use an arrow function here
      anchor.addEventListener('click', (e) => {
        
        // Use 'anchor' instead of 'this'
        const href = anchor.getAttribute('href');
        
        if (!href || href.length === 1) return; // skip `#`
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  if (theme === null) {
    return null; // Or some loading component
  }

  return (
    <div className="page" id="page">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Pokedex />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}