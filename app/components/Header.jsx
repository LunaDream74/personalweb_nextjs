function Header({ theme, onToggleTheme, isMenuOpen, onToggleMenu }) {
  const themeIconClass = theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill';

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a className="brand" href="#top">Anh Minh</a>
        <nav className="nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <a href="#pokedex">Pokedex</a>
        </nav>

        <div className="controls">
          <button
            id="themeToggle"
            className="icon-btn"
            aria-pressed={theme === 'light'}
            title="Toggle dark/light"
            onClick={onToggleTheme}
          >
            <i id="themeIcon" className={`bi ${themeIconClass}`}></i>
          </button>

          <button
            id="menuToggle"
            className="menu-btn"
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
            title="Open menu"
            onClick={onToggleMenu}
          >
            <span className="menu-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <div 
        id="mobileMenu" 
        className="mobile-menu" 
        aria-hidden={!isMenuOpen}
        style={{ display: isMenuOpen ? 'flex' : 'none' }} // Simple inline style toggle
      >
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <a href="#pokedex">Pokedex</a>
      </div>
    </header>
  );
}

export default Header;