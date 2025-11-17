import { useState, useEffect, useRef } from 'react';
import Skill from './Skill'; // Import the child component

function Skills() {
  const [isRevealed, setIsRevealed] = useState(false);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries; // Get the first entry
        if (entry.isIntersecting) {
          // If it's in view, update state and unobserve
          setIsRevealed(true);
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2 } // Same threshold as your script.js
    );

    // Start observing the <section> element
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup: unobserve when the component unmounts
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // Empty array [] means this runs only once on mount

  return (
    <section id="skills" className="section container" aria-labelledby="skills-title" ref={sectionRef}>
      <h2 id="skills-title" className="section-title">Skills</h2>

      <div className="skills-grid">
        <Skill label="JavaScript" level="25" isRevealed={isRevealed} />
        <Skill label="HTML & CSS" level="25" isRevealed={isRevealed} />
        <Skill label="C/C++" level="90" isRevealed={isRevealed} />
        <Skill label="Python" level="90" isRevealed={isRevealed} />
      </div>
    </section>
  );
}

export default Skills;