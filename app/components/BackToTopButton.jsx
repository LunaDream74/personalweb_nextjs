import { useState, useEffect } from 'react';

function BackToTopButton() {
  // State to track if the button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Function to show/hide button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Set up the scroll event listener
  useEffect(() => {
    // Add listener when component mounts
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup: remove listener when component unmounts
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []); // Empty array ensures this runs only once

  return (
    <button
      id="backToTop"
      title="Go to top"
      // Use the 'show' class from your CSS, conditionally added
      className={isVisible ? 'show' : ''}
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-circle-fill"></i>
    </button>
  );
}

export default BackToTopButton;