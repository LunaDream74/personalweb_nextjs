import ExchangeRateWidget from './ExchangeRateWidget'; // Import the widget

function Footer() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© <span id="year">{currentYear}</span> Anh Minh. Built with HTML - CSS - JS.</p>        
        <ExchangeRateWidget />
      </div>
    </footer>
  );
}

export default Footer;