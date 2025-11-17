// app/page.jsx

"use client";

import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Pokedex from './components/Pokedex.jsx';
import Footer from './components/Footer.jsx';
import BackToTopButton from './components/BackToTopButton.jsx';

const THEME_KEY = 'site-theme';
function getPreferredTheme() {
  // This function will now only be called on the client
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
    ? 'light' 
    : 'dark';
}

export default function Home() {
  // 1. Initialize theme state to null
  const [theme, setTheme] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. NEW: Add a useEffect to set the initial theme only on the client
  useEffect(() => {
    // This runs once after the component mounts in the browser
    setTheme(getPreferredTheme());
  }, []); // The empty array [] ensures this runs only on mount

  // 3. UPDATE: Modify your existing useEffect to handle the 'null' state
  useEffect(() => {
    // Don't do anything until the theme has been set by the effect above
    if (theme === null) {
      return;
    }
    
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]); // This hook now runs when 'theme' changes (from null -> 'dark' or 'light')

  // Memoize the toggle function to safely use in the keydown listener
  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // Keyboard shortcut (Ctrl+T) for theme
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 't' || e.key === 'T') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleTheme();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  // Smooth scrolling for anchor links (this is fine)
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length === 1) return; // skip `#`
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  // Show a blank page or loading state until the theme is loaded
  // This prevents a "flash of unstyled content" or theme mismatch
  if (theme === null) {
    return null; // Or a <LoadingSpinner /> component
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