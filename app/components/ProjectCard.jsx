import { useState, useEffect, useRef } from 'react';

function ProjectCard({ title, description, tags, imageId }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef(null); // Ref to the <article> element

  // Intersection Observer for the "reveal" animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only care about the first entry
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true); // Set state to trigger the CSS class
          observer.unobserve(cardRef.current); // Stop
        }
      },
      { threshold: 0.12 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Cleanup function to unobserve when component unmounts
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []); // Empty array means this runs only on mount

  // Tilt effect logic
  const handleMouseMove = (ev) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const rx = (y - rect.height / 2) / rect.height * 6;
    const ry = (x - rect.width / 2) / rect.width * -6;
    // Apply the transform directly
    cardRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      // Reset transform
      cardRef.current.style.transform = '';
    }
  };

  return (
    <article
      ref={cardRef}
      // Add 'revealed' class based on state
      className={`project-card ${isRevealed ? 'revealed' : ''}`}
      tabIndex="0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="card-media" 
        id={imageId || ''} 
        aria-hidden="true"
      ></div>
      
      <div className="card-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <div className="card-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;