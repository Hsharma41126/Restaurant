import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaTable, FaTh, FaEye, FaArrowLeft, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SAddCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", sellerId: 101, image: [], parentId: null },
    { id: 2, name: "Fashion", sellerId: 102, image: [], parentId: null },
    { id: 3, name: "Mobiles", sellerId: 101, image: [], parentId: 1 },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 14", sku: "IP14", price: 80000, stockQuantity: 5, categoryId: 3, image: [] },
    { id: 2, name: "T-Shirt", sku: "TS101", price: 500, stockQuantity: 20, categoryId: 2, image: [] },
  ]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryStack, setCategoryStack] = useState([]);
  const [addingFromWithin, setAddingFromWithin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('table');

  const pageSize = 5;

  // Get current parent category from stack
  const currentParent = categoryStack.length > 0 ? categoryStack[categoryStack.length - 1] : null;

  useEffect(() => {
    let filtered = [];
    if (currentParent) {
      filtered = categories.filter(
        cat =>
          String(cat.parentId) === String(currentParent.id) &&
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      filtered = categories.filter(
        cat =>
          !cat.parentId &&
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchTerm, categories, currentParent]);

  const resetForm = () => {
    setCategoryName('');
    setCategoryImage(null);
    setEditingCategory(null);
    setAddingFromWithin(false);
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!categoryName) {
      toast.error("Please enter category name");
      return;
    }

    if (editingCategory) {
      setCategories(prev =>
        prev.map(c =>
          c.id === editingCategory.id ? { ...c, name: categoryName } : c
        )
      );
      toast.success("Category updated successfully!");
    } else {
      const newCategory = {
        id: Date.now(),
        name: categoryName,
        image: categoryImage ? [URL.createObjectURL(categoryImage)] : [],
        sellerId: 999,
        parentId: currentParent ? currentParent.id : null
      };
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category added successfully!");
    }
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Category deleted successfully!");
  };

  const handleViewSubcategories = (category) => {
    setCategoryStack([...categoryStack, category]);
  };

  const handleGoBack = () => {
    if (categoryStack.length > 0) {
      const newStack = [...categoryStack];
      newStack.pop();
      setCategoryStack(newStack);
    }
  };

  const getBreadcrumbPath = () => {
    if (categoryStack.length === 0) return "Categories";
    return ["Categories", ...categoryStack.map(cat => cat.name)].join(" > ");
  };

  const getImageUrl = (images) => {
    return images && images.length > 0 ? images[0] : "";
  };

  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddClick = (fromWithin = false) => {
    setAddingFromWithin(fromWithin);
    setShowModal(true);
    resetForm();
  };

  const handleSeePriceList = (category) => {
    const filteredProducts = products.filter(
      p => String(p.categoryId) === String(category.id)
    );
    setProducts(filteredProducts);
    setSelectedCategory(category);
    setShowProductModal(true);
  };

  return (
    <div className="container py-4">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold">{getBreadcrumbPath()}</h3>
        <div className="d-flex">
          {categoryStack.length > 0 && (
            <button className="btn btn-secondary me-2 d-flex" onClick={handleGoBack}>
              <FaArrowLeft className="me-1" />
              <span>Back</span>
            </button>
          )}
          <button
            className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline-primary"} me-2`}
            onClick={() => setViewMode("table")}
          >
            <FaTable />
          </button>
          <button
            className={`btn ${viewMode === "kanban" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("kanban")}
          >
            <FaTh />
          </button>
          <button className="btn btn-primary ms-3 d-flex" onClick={() => handleAddClick(false)}>
            <FaPlus className="me-1" />
            <span>{currentParent ? "Add Subcategory" : "Add Category"}</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Search ${currentParent ? "subcategories" : "categories"}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {viewMode === "table" ? (
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Seller</th>
                    <th>Image</th>
                    <th>Price List</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-4">
                        {currentParent ? "No Subcategories Found" : "No Categories Found"}
                      </td>
                    </tr>
                  ) : (
                    paginatedCategories.map((cat, index) => (
                      <tr
                        key={cat.id}
                        onClick={(e) => {
                          if (!e.target.closest("button, .no-row-click")) {
                            handleViewSubcategories(cat);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{(currentPage - 1) * pageSize + index + 1}</td>
                        <td>{cat.name}</td>
                        <td>{cat.sellerId ? `Seller ${cat.sellerId}` : "System"}</td>
                        <td>
                          {getImageUrl(cat.image) ? (
                            <img src={getImageUrl(cat.image)} style={{ width: "60px", height: "60px" }} />
                          ) : (
                            <img src="/src/assets/Category_Default_Image.jpeg" style={{ width: "60px", height: "60px" }} />
                          )}
                        </td>
                        <td>
                          <button
                            className="no-row-click"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSeePriceList(cat);
                            }}
                          >
                            See Price List
                          </button>
                        </td>
                        <td className="no-row-click">
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={(e) => { e.stopPropagation(); handleEdit(cat); }}>
                              <FaEdit size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); handleDelete(cat.id); }}>
                              <FaTrash size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-success" onClick={(e) => { e.stopPropagation(); setCategoryStack([...categoryStack, cat]); handleAddClick(true); }}>
                              <FaPlus size={14} />
                            </button>
                            <button className="btn btn-sm btn-outline-info" onClick={(e) => { e.stopPropagation(); handleViewSubcategories(cat); }}>
                              <FaEye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>
                Showing {filteredCategories.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, filteredCategories.length)} of {filteredCategories.length} results
              </div>
              <div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="row">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="col-md-3 mb-3">
              <div className="card h-100">
                <div className="card-header">
                  <h6 className="mb-0">{cat.name}</h6>
                </div>
                <div className="card-body text-center">
                  {getImageUrl(cat.image) ? (
                    <img src={getImageUrl(cat.image)} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  ) : (
                    <div className="bg-light rounded mb-2" style={{ width: '100%', height: '120px' }}>
                      <img src='/src/assets/Category_Default_Image.jpeg' style={{ width: '60px', height: '60px' }} />
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-2">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(cat)}><FaEdit size={14} /></button>
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={() => handleDelete(cat.id)}><FaTrash size={14} /></button>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => { setCategoryStack([...categoryStack, cat]); handleAddClick(true); }}><FaPlus size={14} /></button>
                    <button className="btn btn-sm btn-outline-info" onClick={() => handleViewSubcategories(cat)}><FaEye size={14} /></button>
                  </div>
                </div>
                <div className="card-footer small text-muted">
                  {cat.sellerId ? `Seller: ${cat.sellerId}` : 'System Category'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {showModal && (
        <>
          <div className="modal show fade d-block">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <form onSubmit={handleAddOrUpdate}>
                  <div className="modal-header">
                    <h5 className="modal-title">{editingCategory ? "Edit Category" : addingFromWithin ? "Add Subcategory" : "Add Category"}</h5>
                    <button type="button" className="btn-close" onClick={() => { setShowModal(false); resetForm(); }}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Category Name*</label>
                      <input type="text" className="form-control" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    {addingFromWithin && currentParent && (
                      <div className="alert alert-info">This will be a subcategory of <strong>{currentParent.name}</strong></div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Category Image</label>
                      <input type="file" className="form-control" onChange={(e) => setCategoryImage(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{editingCategory ? "Update" : "Add"} {addingFromWithin ? "Subcategory" : "Category"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Products Modal */}
      {showProductModal && (
        <>
          <div className="modal show fade d-block">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Products under {selectedCategory?.name}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowProductModal(false)}></button>
                </div>
                <div className="modal-body">
                  {products.length === 0 ? (
                    <p className="text-muted">No products found for this category.</p>
                  ) : (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>SKU</th>
                          <th>Price</th>
                          <th>Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p, i) => (
                          <tr key={p.id}>
                            <td>{i + 1}</td>
                            <td>{p.name}</td>
                            <td>{p.sku}</td>
                            <td>{p.price}</td>
                            <td>{p.stockQuantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default SAddCategories;
