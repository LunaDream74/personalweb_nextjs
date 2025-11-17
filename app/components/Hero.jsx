function Hero() {
  return (
    <section className="hero section" id="hero" aria-label="Introduction">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1 className="name">Anh Minh</h1>
          <p className="role">Title or something idk ¯\_(ツ)_/¯</p>
          <p className="tagline">I just do stuff and like AI.</p>

          <div className="hero-ctas">
            <a className="btn primary" href="#projects">View Projects</a>
            <a className="btn ghost" href="#contact">Get in touch</a>
          </div>
        </div>

        <aside className="hero-card" aria-hidden="true">
          <div className="portrait" aria-hidden="true"></div>
          <div className="stats">
            <div className="stat">
              <strong>Senior</strong>
              <span>Year</span>
            </div>
            <div className="stat">
              <strong>3+</strong>
              <span>Projects</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;