// app/components/Skills.tsx

import { useState, useEffect, useRef } from 'react';
import Skill from './Skill'; // Import the child component

function Skills() {
  const [isRevealed, setIsRevealed] = useState(false);
  
  // 1. Explicitly type the ref to be an <HTMLElement> or null
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 2. Store the current ref value in a variable
    //    This helps ensure the correct value is used in the cleanup function
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          
          // 3. THE FIX: Check if currentSection exists before unobserving
          if (currentSection) {
            observer.unobserve(currentSection);
          }
        }
      },
      { threshold: 0.2 }
    );

    // 4. Make sure to check here as well before observing
    if (currentSection) {
      observer.observe(currentSection);
    }

    // Cleanup: unobserve when the component unmounts
    return () => {
      // 5. The same check is needed in the cleanup function
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []); // Empty array [] means this runs only once on mount

  return (
    // 6. Make sure the ref is attached to the section element
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