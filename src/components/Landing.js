import React from 'react'
import '../styles/Landing.css'

const background = process.env.PUBLIC_URL + '/background3.png'

function Landing() {
  const services = [
    'ვიდეო სამეთვალყურეო სისტემა',
    'ღამის სიგნალიზაცია',
    'სახანძრო სიგნალიზაცია',
    'ეზოს სიგნალიზაცია',
    'დატბორვის და ცეოს ამომცნობი სიგნალიზაცია',
    'რაციები',
    'ჯიხურები',
    'თანამშრომელთა მონიტორინგი'
  ];

  return (
    <div className="landing">
      {/* Left Side - Categories */}
      <div className="landing-left">
        <div className="services-container">
          <h2 className="category-header">კატეგორია</h2>
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <span className="service-arrow">›</span>
                <span className="service-text">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="landing-right">
        <div className="image-overlay"></div>
        <img 
          src={background} 
          alt="Security Systems" 
          className="background-image"
        />
        <div className="content-overlay">
          <h1 className="landing-title">თქვენი უსაფრთხოების პარტნიორი</h1>
          <p className="landing-subtitle">
            თანამედროვე უსაფრთხოების სისტემები თქვენი ბიზნესისა და სახლის დასაცავად
          </p>
          <div className="landing-buttons">
            <a href="#contact" className="landing-btn-primary">დაგვიკავშირდით</a>
            <a href="#services" className="landing-btn-secondary">მომსახურებები</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;