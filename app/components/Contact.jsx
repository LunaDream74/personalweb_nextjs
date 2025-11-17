import { useState } from 'react';

function Contact() {
  // 1. Set up state to "control" the form inputs
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 2. Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the form from reloading the page

    // Basic validation (same as your script.js)
    if (!email.trim() || !message.trim()) {
      alert('Please provide your email and a short message.');
      return;
    }

    // Compose mailto (same as your script.js)
    const subject = encodeURIComponent('Portfolio contact from ' + email);
    const body = encodeURIComponent(message + '\n\n---\nContact: ' + email);
    const recipient = '22130103@student.hcmus.edu.vn';
    
    // Trigger the user's default mail client
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    // Optional: Clear the form after sending
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="section container" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">Contact</h2>

      <div className="contact-grid">
        <div className="contact-card">
          <p>If you'd like to collaborate, hire me, or just say hi — drop a message.</p>

          {/* 3. Connect the form and inputs to React state */}
          <form id="contactForm" className="contact-form" noValidate onSubmit={handleSubmit}>
            <label>
              <span className="label-text">Your email</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
              />
            </label>

            <label>
              <span className="label-text">Message</span>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Hi — I'd like to talk about..."
                required
                value={message} // Bind value to state
                onChange={(e) => setMessage(e.target.value)} // Update state on change
              ></textarea>
            </label>

            <div className="form-actions">
              <button type="submit" className="btn primary">Send message</button>
              <a className="btn ghost" href="mailto: 22130103@student.hcmus.edu.vn">Email me</a>
            </div>
          </form>

          <div className="socials" aria-hidden="true">
            <a className="social" href="https://github.com/LunaDream74" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
              <i className="bi bi-github"></i>
            </a>
            <a className="social" href="https://www.linkedin.com/in/tnaminh" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
            <a className="social" href="https://www.facebook.com/nguyenanhminh.tran.9" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>

        <aside className="contact-info" aria-hidden="true">
          <div className="info-row" id="Email">
            <strong>Email: </strong>
            <a href="mailto:22130103@student.hcmus.edu.vn">22130103@student.hcmus.edu.vn</a>
          </div>
          <div className="info-row" id="Location">
            <strong>Location </strong>
            <span>Ho Chi Minh City, Vietnam</span>
          </div>
          <div className="info-row" id="Availability">
            <strong>Availability </strong>
            <span>Open to new opportunities</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Contact;
