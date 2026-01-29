import React, { useEffect } from 'react';
import '../styles/Contact.css';

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <div className="contact-page-container">
        {/* Header */}
        <div className="contact-page-header">
          <h1 className="contact-page-title">დაგვიკავშირდით</h1>
          <p className="contact-page-subtitle">ჩვენ ყოველთვის მზად ვართ დაგეხმაროთ</p>
        </div>

        {/* Content - Two Boxes */}
        <div className="contact-page-content">
          {/* Left Box - Contact Info */}
          <div className="contact-page-left">
            <div className="contact-page-info-list">
              <div className="contact-page-info-item">
                <div className="contact-page-icon">📞</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">ტელეფონი</h3>
                  <a href="tel:+995597996633" className="contact-page-link">+995 597 99 66 33</a>
                </div>
              </div>

              <div className="contact-page-info-item">
                <div className="contact-page-icon">✉️</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">ელ-ფოსტა</h3>
                  <a href="mailto:www.sheriff.georgia@gmail.com" className="contact-page-link">www.sheriff.georgia@gmail.com</a>
                </div>
              </div>

              <div className="contact-page-info-item">
                <div className="contact-page-icon">📍</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">მისამართი</h3>
                  <p className="contact-page-text">თბილისი, საქართველო</p>
                  <p className="contact-page-text">დავით სარაჯიშვილის 1</p>
                </div>
              </div>

              <div className="contact-page-info-item">
                <div className="contact-page-icon">🕒</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">სამუშაო საათები</h3>
                  <p className="contact-page-text">ორშაბათი - პარასკევი: 09:00 - 18:00</p>
                  <p className="contact-page-text">შაბათი: 10:00 - 15:00</p>
                  <p className="contact-page-text">კვირა: დახურულია</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Box - Map */}
          <div className="contact-page-right">
            <div className="contact-page-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.0943796516373!2d44.7938677!3d41.7150756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cdd15f8c5c7%3A0x7f8b8e3e6f8a0d5d!2sDavit%20Sarajishvili%20St%201%2C%20Tbilisi%2C%20Georgia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sheriff Georgia Location"
              ></iframe>
            </div>
            <div className="contact-page-map-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;