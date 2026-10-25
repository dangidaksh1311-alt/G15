import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";


function Products() {
  const demoProducts = [
    { id: 1, name: "MacBook Pro 14", category: "Electronics", price: 1899, stock: 42, status: "In Stock", addedBy: "Demo data" },
    { id: 2, name: "iPhone 16 Pro", category: "Smartphones", price: 1099, stock: 28, status: "In Stock", addedBy: "Demo data" },
    { id: 3, name: "Sony WH-1000XM5", category: "Accessories", price: 399, stock: 8, status: "Low Stock", addedBy: "Demo data" },
    { id: 4, name: "Dell XPS 15", category: "Laptops", price: 1499, stock: 0, status: "Out of Stock", addedBy: "Demo data" },
    { id: 5, name: "iPad Pro", category: "Tablets", price: 999, stock: 34, status: "In Stock", addedBy: "Demo data" },
  ];

  const [products, setProducts] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("adminProProducts"));
      return Array.isArray(saved) ? saved : demoProducts;
    } catch {
      return demoProducts;
    }
  });

  const currentUser = useAppStore((state) => state.user);
  useEffect(() => {
    localStorage.setItem("adminProProducts", JSON.stringify(products));
  }, [products]);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [sortBy, setSortBy] = useState("updated");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Electronics",
    price: "",
    stock: "",
  });

  const getStatus = (stock) => {
    const quantity = Number(stock);
    if (quantity === 0) return "Out of Stock";
    if (quantity <= 10) return "Low Stock";
    return "In Stock";
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setForm({ name: "", category: "Electronics", price: "", stock: "" });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter product name.");
      return;
    }
    if (form.price === "" || Number(form.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }
    if (form.stock === "" || Number(form.stock) < 0) {
      alert("Please enter a valid stock quantity.");
      return;
    }

    const productData = {
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      status: getStatus(form.stock),
      addedBy:
        editingProduct?.addedBy ||
        `${currentUser?.name || "Unknown user"} (${currentUser?.role || "User"})`,
      updatedBy: `${currentUser?.name || "Unknown user"} (${currentUser?.role || "User"})`,
      updatedAt: new Date().toISOString(),
    };

    if (editingProduct) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      setProducts((previous) => [
        { id: Date.now(), ...productData },
        ...previous,
      ]);
    }

    setShowModal(false);
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setProducts((previous) => previous.filter((product) => product.id !== id));
    }
  };

  const totalProducts = products.length;
  const inStock = products.filter((product) => getStatus(product.stock) === "In Stock").length;
  const lowStock = products.filter((product) => getStatus(product.stock) === "Low Stock").length;
  const outOfStock = products.filter((product) => getStatus(product.stock) === "Out of Stock").length;
  const recentlyAdded = products.filter((product) => {
    const dateValue = product.updatedAt || product.createdAt;
    if (!dateValue) return false;
    const date = new Date(dateValue);
    return !Number.isNaN(date.getTime()) && Date.now() - date.getTime() <= 7 * 24 * 60 * 60 * 1000;
  }).length;

  const filteredProducts = products
    .filter((product) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        String(product.id).includes(searchText);

      const status = getStatus(product.stock);
      const matchesFilter =
        activeFilter === "All Products" ||
        (activeFilter === "In Stock" && status === "In Stock") ||
        (activeFilter === "Low Stock" && status === "Low Stock") ||
        (activeFilter === "Out of Stock" && status === "Out of Stock");

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return Number(b.price) - Number(a.price);
      if (sortBy === "stock") return Number(a.stock) - Number(b.stock);
      return 0;
    });

  const stockPercentage = (product) => {
    const maxStock = Math.max(50, Number(product.stock) || 0);
    return Math.min(100, (Number(product.stock) / maxStock) * 100);
  };

  return (
    <div className="products-page inventory-page">
      <div className="inventory-page-header">
        <div>
          <span className="inventory-eyebrow">INVENTORY MANAGEMENT</span>
          <h1>Inventory Overview</h1>
          <p>Monitor your product catalog and stock levels in one place.</p>
        </div>
        <button className="inventory-add-button" onClick={openAddModal}>
          <span aria-hidden="true">＋</span> Add Item
        </button>
      </div>

      <div className="inventory-summary-grid">
        <article className="inventory-summary-card">
          <div className="inventory-summary-icon teal" aria-hidden="true">▣</div>
          <div className="inventory-summary-content">
            <span>Total Inventory</span>
            <strong>{totalProducts.toLocaleString()}</strong>
            <small>Products in your catalog</small>
          </div>
          <span className="inventory-summary-tag teal-tag">Catalog</span>
        </article>

        <article className="inventory-summary-card">
          <div className="inventory-summary-icon coral" aria-hidden="true">!</div>
          <div className="inventory-summary-content">
            <span>Low Stock Items</span>
            <strong>{lowStock + outOfStock}</strong>
            <small>Items that need attention</small>
          </div>
          <span className={`inventory-summary-tag ${lowStock + outOfStock ? "coral-tag" : "teal-tag"}`}>
            {lowStock + outOfStock ? "Review" : "Healthy"}
          </span>
        </article>

        <article className="inventory-summary-card">
          <div className="inventory-summary-icon slate" aria-hidden="true">✦</div>
          <div className="inventory-summary-content">
            <span>Recently Added</span>
            <strong>{recentlyAdded}</strong>
            <small>Updated in the last 7 days</small>
          </div>
          <span className="inventory-summary-tag blue-tag">Last 7 Days</span>
        </article>
      </div>

      <section className="inventory-table-card">
        <div className="inventory-table-toolbar">
          <div className="inventory-tabs" role="tablist" aria-label="Filter products">
            {["All Products", "In Stock", "Low Stock", "Out of Stock"].map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={`inventory-tab ${activeFilter === filter ? "selected" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="inventory-sort">
            <span>Sort by</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="updated">Default order</option>
              <option value="name">Product name</option>
              <option value="price">Highest price</option>
              <option value="stock">Lowest stock</option>
            </select>
          </label>
        </div>

        <div className="inventory-search-row">
          <label className="inventory-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search inventory, products, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <span className="inventory-results-count">{filteredProducts.length} products</span>
        </div>

        <div className="inventory-table-wrap">
          <table className="inventory-products-table">
            <thead>
              <tr>
                <th>Product details</th>
                <th>Status</th>
                <th>Stock level</th>
                <th>Category</th>
                <th>Price</th>
                <th>Added by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const status = getStatus(product.stock);
                const statusClass =
                  status === "In Stock" ? "in-stock" :
                  status === "Low Stock" ? "low-stock" : "out-stock";

                return (
                  <tr key={product.id}>
                    <td>
                      <div className="inventory-product-details">
                        <div className="inventory-product-thumb" aria-hidden="true">
                          {product.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{product.name}</strong>
                          <span>SKU: {String(product.id).slice(-8).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={`inventory-status-badge ${statusClass}`}>{status}</span></td>
                    <td>
                      <div className="inventory-stock-cell">
                        <div className="inventory-stock-numbers">
                          <strong>{Number(product.stock).toLocaleString()}</strong>
                          <span>units</span>
                        </div>
                        <div className="inventory-stock-track">
                          <span className={statusClass} style={{ width: `${stockPercentage(product)}%` }} />
                        </div>
                      </div>
                    </td>
                    <td><span className="inventory-muted">{product.category}</span></td>
                    <td><strong className="inventory-price">${Number(product.price).toLocaleString()}</strong></td>
                    <td><span className="inventory-muted inventory-added-by">{product.addedBy || "Demo data"}</span></td>
                    <td>
                      <div className="inventory-actions">
                        <button type="button" className="inventory-action-button" title="Edit product" aria-label={`Edit ${product.name}`} onClick={() => openEditModal(product)}>✎</button>
                        <button type="button" className="inventory-action-button delete" title="Delete product" aria-label={`Delete ${product.name}`} onClick={() => deleteProduct(product.id)}>×</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="inventory-empty-state">
              <div aria-hidden="true">▣</div>
              <h3>No products found</h3>
              <p>Try another search or change the selected inventory filter.</p>
              <button type="button" onClick={() => { setSearch(""); setActiveFilter("All Products"); }}>Clear filters</button>
            </div>
          )}
        </div>

        <div className="inventory-table-footer">
          <span>Showing {filteredProducts.length} of {totalProducts} products</span>
          <button type="button" onClick={openAddModal}>＋ Add another item</button>
        </div>
      </section>

      <div className="inventory-bottom-grid">
        <section className="inventory-tip-card">
          <div className="inventory-tip-icon" aria-hidden="true">✦</div>
          <div>
            <span className="inventory-tip-kicker">INVENTORY INSIGHT</span>
            <h2>{lowStock + outOfStock > 0 ? "Keep your inventory healthy" : "Your stock is looking good"}</h2>
            <p>
              {lowStock + outOfStock > 0
                ? `${lowStock + outOfStock} item${lowStock + outOfStock === 1 ? "" : "s"} ${lowStock + outOfStock === 1 ? "needs" : "need"} attention. Review low and out-of-stock products to keep your catalog up to date.`
                : "No low or out-of-stock products detected in the current catalog."}
            </p>
          </div>
        </section>

        <section className="inventory-help-card">
          <div className="inventory-help-icon" aria-hidden="true">?</div>
          <div>
            <h2>Need help?</h2>
            <p>Manage products, update stock quantities, and keep your inventory organized.</p>
            <button type="button" onClick={openAddModal}>＋ Add a new product</button>
          </div>
        </section>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-icon">▣</div>
                <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
                <p>{editingProduct ? "Update product information." : "Add a new product to your inventory."}</p>
                {!editingProduct && (
                  <p className="product-created-by">
                    Added by {currentUser?.name || "current user"} · {currentUser?.role || "User"}
                  </p>
                )}
              </div>
              <button type="button" className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="product-name">Product Name</label>
                <input id="product-name" type="text" name="name" placeholder="e.g. MacBook Air" value={form.name} onChange={handleInputChange} />
              </div>

              <div className="form-group">
                <label htmlFor="product-category">Category</label>
                <select id="product-category" name="category" value={form.category} onChange={handleInputChange}>
                  <option>Electronics</option>
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Accessories</option>
                  <option>Tablets</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="product-price">Price ($)</label>
                  <input id="product-price" type="number" name="price" placeholder="0" min="0" step="0.01" value={form.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="product-stock">Stock Quantity</label>
                  <input id="product-stock" type="number" name="stock" placeholder="0" min="0" step="1" value={form.stock} onChange={handleInputChange} />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">{editingProduct ? "Save Changes" : "Add Product"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
