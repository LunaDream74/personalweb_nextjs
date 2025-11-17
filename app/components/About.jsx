function About() {
  return (
    <section id="about" className="section container about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">About</h2>
      <div className="about-grid">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <ul className="about-list">
          <li><strong>Specialties:</strong> English, Research and problably more idk</li>
          <li><strong>Tools:</strong> Vanilla JS, CSS, C/C++, Python</li>
          <li><strong>Approach:</strong> Component-first, performance-aware, test-minded</li>
        </ul>
      </div>
    </section>
  );
}

export default About;