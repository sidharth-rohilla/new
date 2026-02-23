import React, { useState } from "react";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Player Inquiry",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate API Call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "Player Inquiry", message: "" });
    }, 1500);
  };

  return (
    <section className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <span className="contact-badge">Contact Us</span>
        <h1>Get in <span className="blue-text">Touch</span></h1>
        <p>Have questions about scouting, analytics, or recruitment? Our team is here to help you reach the next level.</p>
      </div>

      <div className="contact-container">
        {/* Info Side */}
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <div>
              <h4>Location</h4>
              <p>123 Sports Avenue, Elite Complex, NY</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">✉️</div>
            <div>
              <h4>Email Us</h4>
              <p>support@sportstalent.ai</p>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <div>
              <h4>Call Support</h4>
              <p>+1 (555) 000-8888</p>
            </div>
          </div>

          <div className="social-stack">
            <h4>Follow Our Progress</h4>
            <div className="social-btns">
              <button className="social-btn">Tw</button>
              <button className="social-btn">In</button>
              <button className="social-btn">Fb</button>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="contact-form-wrapper">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              >
                <option>Player Inquiry</option>
                <option>Coach Partnership</option>
                <option>Technical Support</option>
                <option>Media/Press</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
                rows="5" 
                placeholder="How can we help you?" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="success-msg">✅ Message sent! We'll get back to you shortly.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;