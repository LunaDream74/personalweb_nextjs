// app/components/Skill.tsx

interface SkillProps {
  label: string;
  level: string;
  isRevealed: boolean;
}

function Skill({ label, level, isRevealed }: SkillProps) {
  
  const barStyle = {
    width: isRevealed ? `${level}%` : '0%',
  };

  return (
    <div className="skill" data-level={level} tabIndex={0}>
      <div className="skill-head">
        <span>{label}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="progress" aria-hidden="true">
        <div className="progress-bar" style={barStyle}></div>
      </div>
    </div>
  );
}

export default Skill;