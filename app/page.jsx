// app/page.jsx

// 1. Add this at the VERY top
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

// Remove the import for App.css, as we are not using it
// import './App.css' 

const THEME_KEY = 'site-theme';
function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches 
    ? 'light' 
    : 'dark';
}

function App() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Apply theme to body and save to localStorage
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

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

  // Smooth scrolling for anchor links
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

export default App;