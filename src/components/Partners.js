import React from 'react';
import '../styles/Partners.css';

const partner1 = process.env.PUBLIC_URL + '/partner1.jpeg';
const partner2 = process.env.PUBLIC_URL + '/partner2.png';
const partner3 = process.env.PUBLIC_URL + '/partner3.png';
const partner4 = process.env.PUBLIC_URL + '/partner4.svg';
const partner5 = process.env.PUBLIC_URL + '/partner5.png';
const partner6 = process.env.PUBLIC_URL + '/partner6.png';

function Partners() {
  const partners = [
    { id: 1, image: partner1, name: 'Partner 1' },
    { id: 2, image: partner2, name: 'Partner 2' },
    { id: 3, image: partner3, name: 'Partner 3' },
    { id: 4, image: partner4, name: 'Partner 4' },
    { id: 5, image: partner5, name: 'Partner 5' },
    { id: 6, image: partner6, name: 'Partner 6' }
  ];

  return (
    <section className="partners-section">
      <div className="partners-container">
        {/* Header Section */}
        <div className="partners-header">
          <h2 className="partners-title">ჩვენი პარტნიორები</h2>
          <div className="partners-divider"></div>
          <p className="partners-subtitle">
            ვთანამშრომლობთ წამყვან კომპანიებთან და ორგანიზაციებთან
          </p>
        </div>

        {/* Partners Grid */}
        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-card">
              <div className="partner-card-inner">
                <div className="partner-image-wrapper">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="partner-image"
                  />
                </div>
                <div className="partner-overlay"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="partners-footer">
          <p className="partners-footer-text">
            ვამაყობთ ჩვენი გრძელვადიანი და სანდო პარტნიორული ურთიერთობებით
          </p>
        </div>
      </div>
    </section>
  );
}

export default Partners;