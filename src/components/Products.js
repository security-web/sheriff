import React, { useState } from 'react'
import '../styles/Products.css'

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sample products data with placeholder images
  const products = [
    {
      id: 1,
      name: 'IP ვიდეო კამერა 4MP',
      category: 'video',
      description: 'მაღალი რეზოლუციის IP კამერა ღამის ხედვის ფუნქციით და მოძრაობის დეტექტორით',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'ღამის სიგნალიზაციის სისტემა',
      category: 'alarm',
      description: 'უსადენო სიგნალიზაციის სისტემა მობილური აპლიკაციით მართვის შესაძლებლობით',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'სახანძრო სიგნალიზაცია',
      category: 'fire',
      description: 'თანამედროვე კვამლის და ცეცხლის დეტექტორები ავტომატური განგაშის სისტემით',
      image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'PTZ როტაციული კამერა',
      category: 'video',
      description: '360° პანორამული ხედვა, 20x ოპტიკური ზუმი და ავტომატური თვალთვალი',
      image: 'https://images.unsplash.com/photo-1567443024551-f3e3cc2be870?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'ეზოს დაცვის სისტემა',
      category: 'yard',
      description: 'პერიმეტრის დაცვის სენსორები და გარე მოძრაობის დეტექტორები',
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop'
    },
    {
      id: 6,
      name: 'პროფესიონალური რაციო',
      category: 'radio',
      description: 'გრძელი დისტანციის რაციო სისტემა მკაფიო ხმის ხარისხით',
      image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=600&h=400&fit=crop'
    },
    {
      id: 7,
      name: 'NVR ჩამწერი სისტემა',
      category: 'video',
      description: '16 არხიანი ქსელური ვიდეო ჩამწერი 8TB მეხსიერებით',
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop'
    },
    {
      id: 8,
      name: 'დატბორვის სიგნალიზაცია',
      category: 'flood',
      description: 'წყლის დონის სენსორები და ავტომატური განგაშის სისტემა',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop'
    },
    {
      id: 9,
      name: 'მობილური ჯიხური',
      category: 'turnstile',
      description: 'კომპაქტური სისტემა დასწრების აღრიცხვისა და წვდომის კონტროლისთვის',
      image: 'https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?w=600&h=400&fit=crop'
    },
    {
      id: 10,
      name: 'GPS თვალთვალის სისტემა',
      category: 'monitoring',
      description: 'თანამშრომელთა მდებარეობის რეალურ დროში თვალთვალის პლატფორმა',
      image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa8c?w=600&h=400&fit=crop'
    },
    {
      id: 11,
      name: 'ბიომეტრიული საკეტი',
      category: 'alarm',
      description: 'თითის ანაბეჭდით ან PIN კოდით გახსნის ფუნქცია',
      image: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=600&h=400&fit=crop'
    },
    {
      id: 12,
      name: 'HD ვიდეო ინტერკომი',
      category: 'video',
      description: 'ღია ვიდეო კომუნიკაცია ვიზიტორებთან სმარტფონის მეშვეობით',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop'
    }
  ];

  const categories = [
    { value: 'all', label: 'ყველა პროდუქტი' },
    { value: 'video', label: 'ვიდეო სისტემები' },
    { value: 'alarm', label: 'სიგნალიზაცია' },
    { value: 'fire', label: 'სახანძრო' },
    { value: 'yard', label: 'ეზოს დაცვა' },
    { value: 'radio', label: 'რაციები' },
    { value: 'turnstile', label: 'ჯიხურები' },
    { value: 'flood', label: 'დატბორვა' },
    { value: 'monitoring', label: 'მონიტორინგი' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Scroll to top of products section
  const scrollToTop = () => {
    const productsTitle = document.querySelector('.products-title');
    if (productsTitle) {
      productsTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset to page 1 when category changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    setTimeout(scrollToTop, 100);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTimeout(scrollToTop, 100);
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="products">
      <div className="products-container">
        {/* Header with Filter */}
        <div className="products-header">
          <h1 className="products-title">ჩვენი პროდუქცია</h1>
          <div className="filter-container">
            <span className="filter-label">კატეგორია:</span>
            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {currentProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                    />
                    <span className="product-category">
                      {getCategoryLabel(product.category)}
                    </span>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <button className="product-details-btn">
                      დეტალურად
                      <span className="product-details-arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn arrow" 
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ←
                </button>
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={`dots-${index}`} className="pagination-dots">...</span>
                  ) : (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  )
                ))}
                
                <button 
                  className="pagination-btn arrow"
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  →
                </button>

                <span className="pagination-info">
                  გვერდი {currentPage} / {totalPages}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="products-empty">
            <div className="products-empty-icon">📦</div>
            <p className="products-empty-text">პროდუქტი ვერ მოიძებნა</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;