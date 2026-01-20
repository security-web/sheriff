import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Admin.css";

function Admin() {
  // --- State Variables ---
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("video");
  
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [serverStatus, setServerStatus] = useState(null);
  
  // Edit mode state
  const [editingProductId, setEditingProductId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = "https://sheriff-back.onrender.com";

  // Categories
  const categories = [
    { value: 'video', label: 'ვიდეო სისტემები' },
    { value: 'alarm', label: 'სიგნალიზაცია' },
    { value: 'fire', label: 'სახანძრო' },
    { value: 'yard', label: 'ეზოს დაცვა' },
    { value: 'radio', label: 'რაციები' },
    { value: 'turnstile', label: 'ჯიხურები' },
    { value: 'flood', label: 'დატბორვა' },
    { value: 'monitoring', label: 'მონიტორინგი' }
  ];

  // --- Check Server Status ---
  const checkServerStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/`);
      const data = await res.json();
      setServerStatus(data);
      return data.database === 'connected';
    } catch (err) {
      console.error("Server status check failed:", err);
      setServerStatus({ database: 'error' });
      return false;
    }
  }, [API_BASE_URL]);

  // --- Logout Handler ---
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  // --- Handlers for Input Changes ---
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImageFile(file);
    setMessage(file ? `✅ მთავარი სურათი არჩეულია: ${file.name}` : "");
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
    setMessage(files.length > 0 ? `✅ არჩეულია ${files.length} გალერეის სურათი` : "");
  };

  // --- Clear Form Helper ---
  const clearForm = () => {
    setProductName("");
    setDescription("");
    setCategory("video");
    setMainImageFile(null);
    setGalleryFiles([]);
    setMessage("");
    
    // Clear file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  // --- Edit Mode Functions ---
  const startEdit = (product) => {
    setIsEditing(true);
    setEditingProductId(product._id);
    
    setProductName(product.name || "");
    setDescription(product.description || "");
    setCategory(product.category || "video");
    
    setMessage(`✏️ რედაქტირების რეჟიმი: "${product.name}"`);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingProductId(null);
    clearForm();
    setMessage("");
  };

  // --- Product Upload/Update Logic ---
  const handleUpload = async () => {
    // Validation
    if (!productName.trim()) {
      setMessage("❌ გთხოვთ შეიყვანოთ პროდუქტის სახელი");
      return;
    }
    if (!category.trim()) {
      setMessage("❌ გთხოვთ აირჩიოთ კატეგორია");
      return;
    }
    if (!isEditing && !mainImageFile) {
      setMessage("❌ გთხოვთ აირჩიოთ მთავარი სურათი");
      return;
    }

    // Check server status first
    const isConnected = await checkServerStatus();
    if (!isConnected) {
      setMessage("❌ ბაზასთან კავშირი არ არის. გთხოვთ სცადოთ რამდენიმე წამში...");
      return;
    }

    // Prepare Upload/Update
    setIsUploading(true);
    setMessage(isEditing ? "⏳ განახლება..." : "⏳ ატვირთვა...");
    
    try {
      const endpoint = isEditing 
        ? `${API_BASE_URL}/products/${editingProductId}`
        : `${API_BASE_URL}/products/upload`;
      
      console.log(`${isEditing ? 'UPDATE' : 'CREATE'} request to:`, endpoint);
      
      const formData = new FormData();
      formData.append("name", productName.trim());
      formData.append("description", description.trim());
      formData.append("category", category.trim());
      
      if (mainImageFile) {
        formData.append("mainImage", mainImageFile);
        console.log("Main image attached:", mainImageFile.name);
      }
      
      if (galleryFiles.length > 0) {
        galleryFiles.forEach(file => {
          formData.append("gallery", file);
        });
        console.log("Gallery images attached:", galleryFiles.length);
      }

      // Make API Call
      const res = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        body: formData,
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        if (isEditing) {
          setMessage(`✅ "${productName}" წარმატებით განახლდა!`);
          
          // Update product in list
          if (data.product) {
            setProducts(prevProducts =>
              prevProducts.map(product => 
                product._id === editingProductId ? data.product : product
              )
            );
          }
          
          // Clear edit mode
          setIsEditing(false);
          setEditingProductId(null);
        } else {
          setMessage(`✅ "${productName}" წარმატებით დაემატა!`);
          
          // Add new product to list
          if (data.product) {
            setProducts(prevProducts => [data.product, ...prevProducts]);
          }
        }

        // Clear form
        clearForm();

        // Refresh data
        await loadProducts();
        await loadStats();
        
        // Clear success message after 5 seconds
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage(`❌ ${isEditing ? 'განახლება' : 'ატვირთვა'} ვერ მოხერხდა: ${data.error || data.message || "უცნობი შეცდომა"}`);
      }
    } catch (err) {
      console.error(`${isEditing ? 'განახლება' : 'ატვირთვა'} შეცდომა:`, err);
      setMessage(`❌ ${isEditing ? 'განახლება' : 'ატვირთვა'} ვერ მოხერხდა: ${err.message || 'ქსელის შეცდომა'}`);
    } finally {
      setIsUploading(false);
    }
  };

  // --- Fetching Products with Retry Logic ---
  const loadProducts = useCallback(async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 3000;
    
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      
      if (!res.ok) {
        if (res.status === 404) {
          setProducts([]);
          return;
        }
        
        if (res.status === 503 && retryCount < maxRetries) {
          console.log(`Database disconnected, retrying in ${retryDelay/1000}s... (${retryCount + 1}/${maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return loadProducts(retryCount + 1);
        }
        
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error loading products:", err);
      
      if (retryCount < maxRetries) {
        console.log(`Network error, retrying in ${retryDelay/1000}s... (${retryCount + 1}/${maxRetries})`);
        
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadProducts(retryCount + 1);
      }
      
      setProducts([]);
    }
  }, [API_BASE_URL]);

  // --- Fetching Upload Statistics with Retry Logic ---
  const loadStats = useCallback(async (retryCount = 0) => {
    const maxRetries = 5;
    const retryDelay = 3000;
    
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      
      if (res.ok) {
        const data = await res.json();
        const productsArray = data.products || [];
        
        const categoryCounts = {};
        categories.forEach(cat => {
          categoryCounts[cat.value] = productsArray.filter(p => p.category === cat.value).length;
        });
        
        setStats({ 
          total: productsArray.length,
          ...categoryCounts
        });
      } else if (res.status === 503 && retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadStats(retryCount + 1);
      }
    } catch (err) {
      console.error("Error loading stats:", err);
      
      if (retryCount < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return loadStats(retryCount + 1);
      }
      
      setStats({});
    }
  }, [API_BASE_URL]);

  // --- Deleting a Product ---
  const deleteProduct = async (productId, productName) => {
    if (!window.confirm(`დარწმუნებული ხართ რომ გსურთ "${productName}"-ის წაშლა?`)) return;

    const isConnected = await checkServerStatus();
    if (!isConnected) {
      setMessage("❌ ბაზასთან კავშირი არ არის. გთხოვთ სცადოთ რამდენიმე წამში...");
      return;
    }

    try {
      setMessage("⏳ იშლება...");
      
      const res = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ "${productName}" წარმატებით წაიშალა!`);
        setProducts(prevProducts =>
          prevProducts.filter(product => product._id !== productId)
        );
        
        if (editingProductId === productId) {
          cancelEdit();
        }
        
        await loadStats();
        
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`❌ წაშლა ვერ მოხერხდა: ${data.error || data.message || "უცნობი შეცდომა"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("❌ წაშლა ვერ მოხერხდა: ქსელის შეცდომა");
    }
  };

  // Get category label
  const getCategoryLabel = (categoryValue) => {
    const cat = categories.find(c => c.value === categoryValue);
    return cat ? cat.label : categoryValue;
  };

  // --- Effect Hooks ---
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoadingInitial(true);
      await checkServerStatus();
      await loadProducts();
      await loadStats();
      setIsLoadingInitial(false);
    };
    
    loadInitialData();
  }, [loadProducts, loadStats, checkServerStatus]);

  // --- JSX Rendering ---
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">📦 GuardWeb - ადმინ პანელი</h2>
        <button onClick={handleLogout} className="logout-button">
          🚪 გასვლა
        </button>
      </div>

      {/* Server Status Warning */}
      {serverStatus && serverStatus.database !== 'connected' && (
        <div style={{ 
          padding: '15px', 
          textAlign: 'center', 
          background: '#f8d7da', 
          border: '1px solid #f5c6cb',
          borderRadius: '8px',
          margin: '20px 0',
          color: '#721c24'
        }}>
          <p><strong>⚠️ ბაზა არ არის მიერთებული!</strong></p>
          <p>სერვერი მუშაობს, მაგრამ MongoDB-სთან კავშირი არ არის. გთხოვთ შეამოწმოთ backend logs.</p>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoadingInitial && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          background: '#40403eff', 
          border: '1px solid #ffc107',
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <p>⏳ იტვირთება... გთხოვთ დაელოდოთ...</p>
        </div>
      )}
      
      {/* Compact Stats Display */}
      <div style={{ 
        background: '#676767ff', 
        padding: '10px 15px', 
        borderRadius: '6px', 
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '14px'
      }}>
        <span style={{ fontWeight: '600', color: '#c7c9caff' }}>
          📊 სულ პროდუქტი: <strong style={{ color: '#e7e7e7ff' }}>{stats.total || 0}</strong>
        </span>
        {Object.keys(stats).length > 1 && (
          <span style={{ color: '#b8b8b8ff', fontSize: '12px' }}>
            {categories.filter(cat => stats[cat.value] > 0).map(cat => 
              `${cat.label}: ${stats[cat.value]}`
            ).join(' • ')}
          </span>
        )}
      </div>

      {/* Upload Form */}
      <div className="upload-form">
        <h3 className="form-title">
          {isEditing ? '✏️ პროდუქტის რედაქტირება' : '📤 ახალი პროდუქტის დამატება'}
        </h3>
        
        {isEditing && (
          <div className="edit-mode-banner">
            <p>✏️ რედაქტირების რეჟიმი - შეცვალეთ და დააჭირეთ "განახლება"</p>
            <button onClick={cancelEdit} className="cancel-edit-button">
              ❌ გაუქმება
            </button>
          </div>
        )}
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">პროდუქტის სახელი *</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              disabled={isUploading}
              className="form-input2"
              placeholder="შეიყვანეთ პროდუქტის სახელი"
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label className="form-label">კატეგორია *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isUploading}
              className="form-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">აღწერა (არასავალდებულო)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUploading}
            className="form-textarea"
            placeholder="შეიყვანეთ პროდუქტის აღწერა"
            rows="4"
            maxLength={1000}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            მთავარი სურათი {isEditing ? '(არასავალდებულო - ახლის არჩევა არსებულის შესაცვლელად)' : '*'}
          </label>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              disabled={isUploading}
              className="form-file-input"
              id="mainImage"
            />
            <label htmlFor="mainImage" className="file-input-label">
              📷 აირჩიეთ მთავარი სურათი
            </label>
            {mainImageFile && <span className="file-name">{mainImageFile.name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">გალერეა (არასავალდებულო, მაქს. 10 სურათი)</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              disabled={isUploading}
              className="form-file-input"
              id="gallery"
            />
            <label htmlFor="gallery" className="file-input-label">
              🖼️ აირჩიეთ გალერეის სურათები
            </label>
            {galleryFiles.length > 0 && (
              <span className="file-name">{galleryFiles.length} სურათი არჩეულია</span>
            )}
          </div>
          <small className="form-hint">
            💡 აირჩიეთ რამდენიმე სურათი პროდუქტის გალერეისთვის
          </small>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={`upload-button ${isUploading ? 'disabled' : ''}`}
        >
          {isUploading ? '⏳ მუშავდება...' : isEditing ? '✅ განახლება' : '📤 დამატება'}
        </button>

        {message && (
          <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </div>

      {/* Products List Display */}
      <div className="items-section">
        <h3 className="items-title">
          📦 ყველა პროდუქტი ({products.length})
        </h3>
        
        {products.length > 0 ? (
          <div className="items-grid">
            {products.map((product) => {
              const isCurrentlyEditing = editingProductId === product._id;
              
              return (
                <div key={product._id} className={`item-card ${isCurrentlyEditing ? 'editing' : ''}`}>
                  {product.mainImage && (
                    <img
                      src={product.mainImage}
                      alt={product.name || 'Product'}
                      className="item-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  <div className="item-content">
                    <div className="product-header">
                      <h4 className="item-title">{product.name || 'უსახელო პროდუქტი'}</h4>
                      <span className="product-category-badge">
                        {getCategoryLabel(product.category)}
                      </span>
                    </div>
                    
                    {product.description && (
                      <p className="item-description">
                        {product.description.length > 120
                          ? `${product.description.substring(0, 120)}...`
                          : product.description
                        }
                      </p>
                    )}

                    <div className="item-details">
                      {product.gallery && product.gallery.length > 0 && (
                        <span className="detail-badge">
                          🖼️ {product.gallery.length} სურათი გალერეაში
                        </span>
                      )}
                    </div>

                    <div className="item-actions">
                      <button
                        onClick={() => startEdit(product)}
                        className="edit-button"
                        disabled={isEditing}
                      >
                        ✏️ რედაქტირება
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id, product.name || 'ეს პროდუქტი')}
                        className="delete-button"
                      >
                        🗑️ წაშლა
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-items">
            პროდუქტები ჯერ არ არის დამატებული. დაამატეთ თქვენი პირველი პროდუქტი!
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;