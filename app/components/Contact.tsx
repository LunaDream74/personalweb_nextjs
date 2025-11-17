// app/components/Contact.tsx

import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      alert('Please provide your email and a short message.');
      return;
    }

    const subject = encodeURIComponent('Portfolio contact from ' + email);
    const body = encodeURIComponent(message + '\n\n---\nContact: ' + email);
    const recipient = '22130103@student.hcmus.edu.vn';
    
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="section container" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">Contact</h2>

      <div className="contact-grid">
        <div className="contact-card">
          <p>If you'd like to collaborate, hire me, or just say hi — drop a message.</p>

          <form id="contactForm" className="contact-form" noValidate onSubmit={handleSubmit}>
            <label>
              <span className="label-text">Your email</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <span className="label-text">Message</span>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Hi — I'd like to talk about..."
                required
                value={message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
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