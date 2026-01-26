---
layout: page
title: Contact
permalink: /contact/
---

# Get In Touch

I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hi, feel free to reach out.

## Contact Form

<div class="contact-form-wrapper">
  <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
    <div class="form-group">
      <label for="name">Name *</label>
      <input type="text" id="name" name="name" required placeholder="Your name">
    </div>
    
    <div class="form-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required placeholder="your.email@example.com">
    </div>
    
    <div class="form-group">
      <label for="subject">Subject *</label>
      <input type="text" id="subject" name="subject" required placeholder="What's this about?">
    </div>
    
    <div class="form-group">
      <label for="message">Message *</label>
      <textarea id="message" name="message" rows="6" required placeholder="Your message..."></textarea>
    </div>
    
    <button type="submit" class="submit-button">Send Message</button>
  </form>
</div>

<style>
.contact-form-wrapper {
  max-width: 600px;
  margin: 2rem auto;
}

.contact-form {
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: var(--spacing-sm);
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  font-family: var(--font-primary);
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--brand-color);
}

.submit-button {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, var(--brand-color), var(--accent-color));
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.submit-button:active {
  transform: translateY(0);
}
</style>

## Other Ways to Reach Me

<div class="contact-methods">
  <div class="contact-method">
    <h3>📧 Email</h3>
    <p><a href="mailto:hello@example.com">hello@example.com</a></p>
    <p class="contact-note">For general inquiries and collaborations</p>
  </div>
  
  <div class="contact-method">
    <h3>🐦 Twitter</h3>
    <p><a href="https://twitter.com/yourusername" target="_blank" rel="noopener">@yourusername</a></p>
    <p class="contact-note">DMs are open for quick questions</p>
  </div>
  
  <div class="contact-method">
    <h3>💼 LinkedIn</h3>
    <p><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener">linkedin.com/in/yourusername</a></p>
    <p class="contact-note">Professional networking and opportunities</p>
  </div>
  
  <div class="contact-method">
    <h3>💻 GitHub</h3>
    <p><a href="https://github.com/yourusername" target="_blank" rel="noopener">github.com/yourusername</a></p>
    <p class="contact-note">Check out my projects and contributions</p>
  </div>
</div>

<style>
.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.contact-method {
  background: var(--bg-secondary);
  padding: var(--spacing-md);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.contact-method:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.contact-method h3 {
  margin-top: 0;
  color: var(--brand-color);
}

.contact-method a {
  color: var(--brand-color);
  text-decoration: none;
  font-weight: 600;
}

.contact-method a:hover {
  text-decoration: underline;
}

.contact-note {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}
</style>

## Availability

I'm generally available for:

- 💼 **Freelance Projects** - Web development, consulting, and technical writing
- 🎤 **Speaking Engagements** - Conferences, meetups, and workshops
- 🤝 **Collaborations** - Open source projects and content creation
- 📝 **Technical Writing** - Guest posts and article contributions

**Response Time**: I typically respond within 24-48 hours on weekdays.

## Location & Time Zone

📍 **San Francisco, California**  
🕐 **Pacific Time (PT)** - UTC-8/UTC-7

---

Looking forward to hearing from you!
