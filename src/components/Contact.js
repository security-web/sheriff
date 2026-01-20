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
                  <a href="tel:+995555123456" className="contact-page-link">+995 555 12 34 56</a>
                  <a href="tel:+995555654321" className="contact-page-link">+995 555 65 43 21</a>
                </div>
              </div>

              <div className="contact-page-info-item">
                <div className="contact-page-icon">✉️</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">ელ-ფოსტა</h3>
                  <a href="mailto:info@sheriff.ge" className="contact-page-link">info@sheriff.ge</a>
                  <a href="mailto:support@sheriff.ge" className="contact-page-link">support@sheriff.ge</a>
                </div>
              </div>

              <div className="contact-page-info-item">
                <div className="contact-page-icon">📍</div>
                <div className="contact-page-details">
                  <h3 className="contact-page-label">მისამართი</h3>
                  <p className="contact-page-text">თბილისი, საქართველო</p>
                  <p className="contact-page-text">ვაჟა-ფშაველას გამზირი 45</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.2263489934855!2d44.78446831541947!3d41.72447837923401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61342ecb8e2f8b6f!2sVazha-Pshavela%20Ave%2C%20Tbilisi%2C%20Georgia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
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