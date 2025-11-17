// app/components/ProjectCard.tsx

import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageId: string | null;
}

function ProjectCard({ title, description, tags, imageId }: ProjectCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleMouseMove = (ev: MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const rx = (y - rect.height / 2) / rect.height * 6;
    const ry = (x - rect.width / 2) / rect.width * -6;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  return (
    <article
      ref={cardRef}
      className={`project-card ${isRevealed ? 'revealed' : ''}`}
      tabIndex={0}
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