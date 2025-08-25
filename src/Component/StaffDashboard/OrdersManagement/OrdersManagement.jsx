// import React, { useState, useEffect } from 'react';
// import './OrderManagement.css';
// import TableManagement from './TableManagement';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const OrdersManagement = () => {
//   // State management
//   const [activeTab, setActiveTab] = useState('register');
//   const [activeFloor, setActiveFloor] = useState('main');
//   const [selectedCategory, setSelectedCategory] = useState('food');
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [orderNote, setOrderNote] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [orderType, setOrderType] = useState('dineIn');
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
//   const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
//   const [allOrders, setAllOrders] = useState([]);

//   // Data
//   const categories = [
//     { id: 'food', name: 'Food', icon: 'fa fa-cutlery' },
//     { id: 'drinks', name: 'Drinks', icon: 'fa fa-coffee' },
//     { id: 'games', name: 'Games', icon: 'fa fa-gamepad' }
//   ];

//   const products = {
//     food: [
//       {
//         id: 1,
//         name: 'Classic Bacon Burger',
//         price: 12.99,
//         image: 'https://readdy.ai/api/search-image?query=delicious%20bacon%20cheeseburger%20with%20melted%20cheese%20crispy%20bacon%20lettuce%20tomato%20on%20artisanal%20bun%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=burger001&orientation=squarish',
//         sides: [
//           { id: 's1', name: 'Belgian Fresh Fries', price: 3.99 },
//           { id: 's2', name: 'Sweet Potato Fries', price: 4.99 },
//           { id: 's3', name: 'Grilled Vegetables', price: 4.99 },
//           { id: 's4', name: 'Onion Rings', price: 4.49 }
//         ]
//       },
//       {
//         id: 2,
//         name: 'Gourmet Pizza',
//         price: 15.99,
//         image: 'https://readdy.ai/api/search-image?query=artisanal%20pizza%20with%20fresh%20mozzarella%20basil%20cherry%20tomatoes%20and%20olive%20oil%20on%20wooden%20board%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=pizza001&orientation=squarish',
//         sides: [
//           { id: 's5', name: 'Garden Salad', price: 4.99 },
//           { id: 's6', name: 'Garlic Bread', price: 3.99 },
//           { id: 's7', name: 'Caesar Side Salad', price: 5.99 }
//         ]
//       },
//       {
//         id: 3,
//         name: 'Grilled Chicken',
//         price: 16.99,
//         image: 'https://readdy.ai/api/search-image?query=perfectly%20grilled%20chicken%20breast%20with%20herbs%20and%20spices%20on%20white%20plate%20garnished%20with%20fresh%20herbs%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=chicken001&orientation=squarish',
//         sides: [
//           { id: 's8', name: 'Mashed Potatoes', price: 4.99 },
//           { id: 's9', name: 'Steamed Broccoli', price: 3.99 },
//           { id: 's10', name: 'Rice Pilaf', price: 3.99 }
//         ]
//       },
//       {
//         id: 4,
//         name: 'Pasta Carbonara',
//         price: 14.99,
//         image: 'https://readdy.ai/api/search-image?query=creamy%20pasta%20carbonara%20with%20pancetta%20parmesan%20cheese%20and%20black%20pepper%20in%20elegant%20white%20bowl%20clean%20white%20background%20professional%20food%20photography%20high%20quality&width=200&height=200&seq=pasta001&orientation=squarish',
//         sides: [
//           { id: 's11', name: 'Garlic Bread', price: 3.99 },
//           { id: 's12', name: 'Side Salad', price: 4.99 },
//           { id: 's13', name: 'Soup of the Day', price: 4.99 }
//         ]
//       }
//     ],
//     drinks: [
//       { id: 7, name: 'Coca Cola', price: 2.99, image: 'https://readdy.ai/api/search-image?query=refreshing%20cola%20drink%20in%20tall%20glass%20with%20ice%20and%20straw%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality&width=200&height=200&seq=cola001&orientation=squarish' },
//       { id: 8, name: 'Fresh Orange Juice', price: 4.99, image: 'https://readdy.ai/api/search-image?query=fresh%20orange%20juice%20in%20clear%20glass%20with%20orange%20slices%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20natural%20drink&width=200&height=200&seq=orange001&orientation=squarish' },
//       { id: 9, name: 'Iced Coffee', price: 3.99, image: 'https://readdy.ai/api/search-image?query=iced%20coffee%20with%20cream%20in%20tall%20glass%20with%20ice%20cubes%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20cafe%20style&width=200&height=200&seq=coffee001&orientation=squarish' },
//       { id: 10, name: 'Lemonade', price: 3.49, image: 'https://readdy.ai/api/search-image?query=fresh%20lemonade%20with%20lemon%20slices%20and%20mint%20in%20glass%20pitcher%20clean%20white%20background%20professional%20beverage%20photography%20high%20quality%20summer%20drink&width=200&height=200&seq=lemon001&orientation=squarish' }
//     ],
//     games: [
//       { id: 11, name: 'Pool Table - 1 Hour', price: 25.99, image: 'https://readdy.ai/api/search-image?query=professional%20pool%20billiard%20table%20with%20green%20felt%20balls%20and%20cues%20in%20modern%20gaming%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=pool001&orientation=squarish' },
//       { id: 12, name: 'Ping Pong - 1 Hour', price: 15.99, image: 'https://readdy.ai/api/search-image?query=modern%20ping%20pong%20table%20with%20paddles%20and%20balls%20in%20gaming%20area%20with%20clean%20white%20background%20professional%20sports%20equipment%20photography%20high%20quality&width=200&height=200&seq=pingpong001&orientation=squarish' },
//       { id: 13, name: 'Foosball - 1 Hour', price: 12.99, image: 'https://readdy.ai/api/search-image?query=professional%20foosball%20table%20with%20players%20and%20balls%20in%20modern%20game%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=foosball001&orientation=squarish' },
//       { id: 14, name: 'Darts - 1 Hour', price: 8.99, image: 'https://readdy.ai/api/search-image?query=professional%20dartboard%20with%20darts%20mounted%20on%20wall%20in%20modern%20game%20room%20with%20clean%20white%20background%20high%20quality%20entertainment%20photography&width=200&height=200&seq=darts001&orientation=squarish' }
//     ]
//   };

//   const navigate = useNavigate();

//   // Helper functions
//   const calculateSubtotal = () => {
//     return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.08;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   const addToOrder = (product) => {
//     if (product.sides && product.sides.length > 0) {
//       setSelectedProduct(product);
//       setSelectedSides([]);
//       setIsSidesModalOpen(true);
//     } else {
//       const existingItem = orderItems.find(item => item.id === product.id);
//       if (existingItem) {
//         setOrderItems(orderItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       } else {
//         setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSideToggle = (side) => {
//     setSelectedSides(prevSides => {
//       const sideExists = prevSides.find(s => s.id === side.id);
//       if (sideExists) {
//         return prevSides.filter(s => s.id !== side.id);
//       } else {
//         return [...prevSides, side];
//       }
//     });
//   };

//   const handleAddWithSides = () => {
//     const existingItem = orderItems.find(item =>
//       item.id === selectedProduct.id &&
//       JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//     );
//     if (existingItem) {
//       setOrderItems(orderItems.map(item =>
//         item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setOrderItems([...orderItems, {
//         ...selectedProduct,
//         quantity: 1,
//         sides: selectedSides,
//         price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
//       }]);
//     }
//     setIsSidesModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedSides([]);
//   };

//   const handlePayment = () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }

//     const newOrder = {
//       id: Date.now(),
//       table: selectedTable || "N/A",
//       customer: customerInfo.name || "Walk-in Customer",
//       items: [...orderItems],
//       total: calculateTotal(),
//       timestamp: new Date().toISOString(),
//       status: "pending"
//     };

//     setAllOrders([...allOrders, newOrder]);
//     navigate("/staff/billingpayment");
//   };

//   const filteredProducts = products[selectedCategory].filter(product =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Add table highlight effect when component mounts
//   useEffect(() => {
//     const styles = document.createElement('style');
//     styles.innerHTML = `
//       .table-highlight {
//         outline: 3px solid #3B82F6 !important;
//         outline-offset: 4px;
//         transition: outline-color 0.3s ease;
//       }
//       @keyframes pulse {
//         0% { outline-color: #3B82F6; }
//         50% { outline-color: #60A5FA; }
//         100% { outline-color: #3B82F6; }
//       }
//       .animate-pulse {
//         animation: pulse 1s infinite;
//       }
//     `;
//     document.head.appendChild(styles);

//     // Add click outside listener for course dropdown
//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('courseDropdown');
//       const button = document.getElementById('courseButton');
//       if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.classList.add('d-none');
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="">
//         <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
//       </div>

//       {/* Top Navigation */}
//       <div className="mt-3 mb-3">
//         <div className="d-flex overflow-auto">
//           {['tables', 'register', 'orders'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         {/* Register Screen */}
//         {activeTab === 'register' && (
//           <div className="d-flex flex-column flex-lg-row h-100">
//             {/* Left Panel - Order Summary */}
//             <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
//               {/* Customer Section */}
//               <div className="p-2 border-bottom">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h3 className="h6 mb-0">Current Order</h3>
//                   <span className="text-muted small">Table 5</span>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => setIsCustomerModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-user me-2"></i>Customer
//                   </button>
//                   <button
//                     onClick={() => setIsNoteModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-sticky-note me-2"></i>Note
//                   </button>
//                 </div>
//               </div>

//               {/* Middle Section: Scrollable Order Items */}
//               <div className="flex-grow-1" style={{ minHeight: '180px', maxHeight: '180px', overflowY: 'auto', scrollbarWidth: "none" }}>
//                 <div className="p-2">
//                   {orderItems.map((item) => (
//                     <div key={item.id} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fw-semibold small">{item.name}</span>
//                           <div className="d-flex align-items-center gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOrderItems(orderItems.filter(orderItem => orderItem.id !== item.id));
//                               }}
//                               className="btn btn-link text-danger p-0"
//                             >
//                               <i className="fa fa-times small"></i>
//                             </button>
//                             <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <div className="d-flex align-items-center mt-1">
//                           <span className="text-muted small">Qty: {item.quantity}</span>
//                           <span className="text-muted small ms-2">${item.price.toFixed(2)} each</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="mt-1">
//                             {item.sides.map((side) => (
//                               <div key={side.id} className="d-flex justify-content-between small text-muted">
//                                 <span>+ {side.name}</span>
//                                 <span>${side.price.toFixed(2)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>


//               {/* Bottom Section: Calculator + Totals */}
//               <div className="p-2 border-top">
//                 {/* Calculator Display */}
//                 <div className="bg-light p-2 rounded mb-2">
//                   <div className="text-end fs-4 font-monospace mb-1">
//                     ${calculateTotal().toFixed(2)}
//                   </div>
//                   <div className="text-end small text-muted">
//                     Subtotal: ${calculateSubtotal().toFixed(2)} + Tax: ${calculateTax().toFixed(2)}
//                   </div>
//                 </div>

//                 {/* Calculator Keypad */}
//                 <div className="d-grid gap-1 mb-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
//                   {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', 'C', '0', '.', '+'].map((key) => (
//                     <button
//                       key={key}
//                       className={`btn btn-sm fw-bold p-1 ${key === 'C' ? 'btn-danger' : ['÷', '×', '-', '+'].includes(key) ? 'btn-info' : 'btn-light'}`}
//                       style={{ height: '30px', fontSize: '12px', lineHeight: '12px' }}
//                     >
//                       {key}
//                     </button>
//                   ))}
//                 </div>

//                 {/* Order Type & Course */}
//                 <div className="d-flex gap-2 mb-2">
//                   <button
//                     onClick={() => {
//                       const types = ['dineIn', 'takeOut', 'delivery'];
//                       const currentIndex = types.indexOf(orderType);
//                       const nextIndex = (currentIndex + 1) % types.length;
//                       setOrderType(types[nextIndex]);
//                     }}
//                     className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
//                       orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
//                       }`}
//                   >
//                     <i className={`fa ${orderType === 'dineIn' ? 'fa-cutlery' :
//                       orderType === 'takeOut' ? 'fa-shopping-bag' : 'fa-motorcycle'
//                       } me-2 small`}></i>
//                     {orderType === 'dineIn' ? 'Dine In' : orderType === 'takeOut' ? 'Take Out' : 'Delivery'}
//                   </button>

//                   <div className="dropdown">
//                     <button
//                       className="btn btn-light btn-sm w-100 d-flex align-items-center justify-content-center"
//                       type="button"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <span className="small">Course</span>
//                       <i className="fa fa-chevron-down ms-2 small"></i>
//                     </button>
//                     <ul className="dropdown-menu w-100 shadow border">
//                       {['Appetizer', 'Main Course', 'Dessert', 'All at Once'].map((course) => (
//                         <li key={course}>
//                           <button
//                             className="dropdown-item small text-muted"
//                             onClick={() => console.log(`Selected: ${course}`)}
//                           >
//                             {course}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <button
//                     onClick={() => setIsActionsModalOpen(true)}
//                     className="btn btn-light btn-sm"
//                   >
//                     <i className="fas fa-ellipsis-vertical small"></i>
//                   </button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => {
//                       setActiveTab('tables');
//                       setSelectedTable(null);
//                       setOrderItems([]);
//                     }}
//                     className="btn btn-dark btn-sm flex-grow-1"
//                   >
//                     New
//                   </button>
//                   <button
//                     onClick={() => setOrderItems([])}
//                     className="btn btn-danger btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-trash me-1 small"></i>Clear
//                   </button>
//                  <Link to="/staff/billingpayment">
//                   <button 
//                     className="btn btn-warning btn-sm flex-grow-1"
//                     onClick={handlePayment}
//                   >
//                     <i className="fa fa-credit-card me-1 small"></i>Pay
//                   </button>
//                  </Link>
//                 </div>
//               </div>
//             </div>

//             {/* Right Panel - Product Selection */}
//             <div className="flex-grow-1 d-flex flex-column">
//               {/* Search Bar */}
//               <div className="p-2">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               </div>

//               {/* Category Switcher */}
//               <div className="p-3">
//                 <div className="d-flex gap-2 overflow-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`btn ${selectedCategory === category.id ? 'btn-warning' : 'btn-light'} flex-shrink-0`}
//                     >
//                       <i className={`${category.icon} me-2`}></i>
//                       {category.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Product Grid */}
//               <div className="flex-grow-1 p-3 overflow-auto">
//                 <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//                   {filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => addToOrder(product)}
//                       className="col"
//                     >
//                       <div className="card h-100 cursor-pointer hover-shadow border-0">
//                         <div className="card-body text-center d-flex flex-column justify-content-center">
//                           <h5 className="card-title mb-1">{product.name}</h5>
//                           <p className="h5 text-warning mb-0">${product.price.toFixed(2)}</p>
//                           <p className="small text-muted mt-1">
//                             <i className="fa fa-plus-circle mr-1"></i>
//                             Select options
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tables Screen */}
//         {activeTab === 'tables' && (
//           <div className="h-100">
//             <TableManagement />
//           </div>
//         )}

//         {/* Orders Screen */}
//         {activeTab === 'orders' && (
//           <div className="h-100">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Table</th>
//                         <th>Customer</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {allOrders.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">
//                             <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
//                             <h2 className="h4 card-title mb-2">No Orders Yet</h2>
//                             <p className="card-text text-muted">Your orders will appear here once created.</p>
//                           </td>
//                         </tr>
//                       ) : (
//                         allOrders.map((order) => (
//                           <tr key={order.id}>
//                             <td>#{order.id.toString().slice(-6)}</td>
//                             <td>{order.table}</td>
//                             <td>{order.customer}</td>
//                             <td>
//                               <div className="d-flex flex-wrap gap-1">
//                                 {order.items.map((item, idx) => (
//                                   <span key={idx} className="badge bg-light text-dark">
//                                     {item.name} × {item.quantity}
//                                   </span>
//                                 ))}
//                               </div>
//                             </td>
//                             <td>${order.total.toFixed(2)}</td>
//                             <td>{new Date(order.timestamp).toLocaleTimeString()}</td>
//                             <td>
//                               <span className={`badge ${order.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td>
//                               <button 
//                                 className="btn btn-sm btn-outline-primary"
//                                 onClick={() => {
//                                   // You can implement view details functionality here
//                                 }}
//                               >
//                                 <i className="fa fa-eye"></i>
//                               </button>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {/* Customer Modal */}
//       {isCustomerModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Customer Information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={customerInfo.name}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                     placeholder="Enter customer name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={customerInfo.phone}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Special Requests</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={customerInfo.specialRequests}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
//                     placeholder="Enter any special requests"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Note Modal */}
//       {isNoteModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Notes</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea
//                     className="form-control"
//                     rows={6}
//                     value={orderNote}
//                     onChange={(e) => setOrderNote(e.target.value)}
//                     placeholder="Enter cooking preferences, allergies, or special requests..."
//                     maxLength={500}
//                   ></textarea>
//                   <div className="text-end small text-muted mt-1">
//                     {orderNote.length}/500 characters
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sides Selection Modal */}
//       {isSidesModalOpen && selectedProduct && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div>
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <div className="small text-muted">
//                     ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-3">Sides</h6>
//                 <div className="row row-cols-2 g-3">
//                   {selectedProduct?.sides?.map((side) => (
//                     <div key={side.id} className="col">
//                       <button
//                         type="button"
//                         onClick={() => handleSideToggle(side)}
//                         className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
//                           ? 'btn-outline-warning active'
//                           : 'btn-outline-secondary'
//                           }`}
//                       >
//                         <div className="d-flex flex-column align-items-center">
//                           <span className="fw-bold">{side.name}</span>
//                         </div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 >
//                   Discard
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleAddWithSides}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Actions Modal */}
//       {isActionsModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Actions</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsActionsModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row row-cols-3 g-3">
//                   {[
//                     { icon: 'fa-sticky-note', text: 'Customer Note', onClick: () => setIsNoteModalOpen(true) },
//                     { icon: 'fa-file-invoice', text: 'Bill', onClick: () => navigate("/staff/billingpayment") },
//                     { icon: 'fa-users', text: 'Guests', onClick: () => setIsCustomerModalOpen(true) },
//                     { icon: 'fa-percentage', text: 'Split', onClick: () => alert(`Split amount per person: $${(calculateTotal() / 2).toFixed(2)}`) },
//                     { icon: 'fa-exchange-alt', text: 'Transfer / Merge', onClick: () => { } },
//                     { icon: 'fa-sync', text: 'Transfer course', onClick: () => { } },
//                     { icon: 'fa-list', text: 'Pricelist', onClick: () => { setSelectedCategory('food'); setSearchTerm(''); } },
//                     { icon: 'fa-undo', text: 'Refund', onClick: () => window.confirm('Are you sure you want to refund this order?') && {} },
//                     { icon: 'fa-receipt', text: 'Tax', onClick: () => alert(`Tax Amount: $${calculateTax().toFixed(2)}`) },
//                   ].map((action, index) => (
//                     <div key={index} className="col">
//                       <button
//                         onClick={() => {
//                           action.onClick();
//                           setIsActionsModalOpen(false);
//                         }}
//                         className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                       >
//                         <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
//                         <span className="small">{action.text}</span>
//                       </button>
//                     </div>
//                   ))}
//                   <div className="col-6">
//                     <button
//                       onClick={() => setIsActionsModalOpen(false)}
//                       className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                     >
//                       <i className="fa fa-times-circle fs-4 mb-2"></i>
//                       <span className="small">Cancel Order</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;






// import React, { useState, useEffect } from 'react';
// import './OrderManagement.css';
// import TableManagement from './TableManagement';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";

// const OrdersManagement = () => {
//   // State management
//   const [activeTab, setActiveTab] = useState('register');
//   const [activeFloor, setActiveFloor] = useState('main');
//   //const [selectedCategory, setSelectedCategory] = useState('food');
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [showTableModal, setShowTableModal] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [orderNote, setOrderNote] = useState('');
//   //const [searchTerm, setSearchTerm] = useState('');
//   const [orderType, setOrderType] = useState('dineIn');
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
//   const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
//   // const [allOrders, setAllOrders] = useState([]);

//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]); // products later

//   // ✅ Modal State
//   const [showModal, setShowModal] = useState(false);
//   const [items, setItems] = useState([]); // items from API
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);


//   // ✅ Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         if (res.data.success) {
//           setCategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Fetch subcategories when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;

//     const fetchSubcategories = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/subcategories?category_id=${selectedCategory}`
//         );
//         if (res.data.success) {
//           setSubcategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };

//     fetchSubcategories();
//   }, [selectedCategory]);


//   // ✅ Fetch items when subcategory is clicked
//   const handleSubcategoryClick = async (sub) => {
//     try {
//       const res = await axiosInstance.get(`/items/${sub.id}`);
//       if (res.data.success) {
//         setItems(res.data.data);
//         setSelectedSubcategory(sub.subcategory_name);
//         setShowModal(true); // open modal
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };
//   // Data
//   // const categories = [
//   //   { id: 'food', name: 'Food', icon: 'fa fa-cutlery' },
//   //   { id: 'drinks', name: 'Drinks', icon: 'fa fa-coffee' },
//   //   { id: 'games', name: 'Games', icon: 'fa fa-gamepad' }
//   // ];

//   // const products = {
//   //   food: [
//   //     {
//   //       id: 1,
//   //       name: 'Classic Bacon Burger',
//   //       price: 12.99,
//   //       sides: [
//   //         { id: 's1', name: 'Belgian Fresh Fries', price: 3.99 },
//   //         { id: 's2', name: 'Sweet Potato Fries', price: 4.99 },
//   //         { id: 's3', name: 'Grilled Vegetables', price: 4.99 },
//   //         { id: 's4', name: 'Onion Rings', price: 4.49 }
//   //       ]
//   //     },
//   //     {
//   //       id: 2,
//   //       name: 'Gourmet Pizza',
//   //       price: 15.99,
//   //       sides: [
//   //         { id: 's5', name: 'Garden Salad', price: 4.99 },
//   //         { id: 's6', name: 'Garlic Bread', price: 3.99 },
//   //         { id: 's7', name: 'Caesar Side Salad', price: 5.99 }
//   //       ]
//   //     },
//   //     {
//   //       id: 3,
//   //       name: 'Grilled Chicken',
//   //       price: 16.99,
//   //       sides: [
//   //         { id: 's8', name: 'Mashed Potatoes', price: 4.99 },
//   //         { id: 's9', name: 'Steamed Broccoli', price: 3.99 },
//   //         { id: 's10', name: 'Rice Pilaf', price: 3.99 }
//   //       ]
//   //     },
//   //     {
//   //       id: 4,
//   //       name: 'Pasta Carbonara',
//   //       price: 14.99,
//   //       sides: [
//   //         { id: 's11', name: 'Garlic Bread', price: 3.99 },
//   //         { id: 's12', name: 'Side Salad', price: 4.99 },
//   //         { id: 's13', name: 'Soup of the Day', price: 4.99 }
//   //       ]
//   //     }
//   //   ],
//   //   drinks: [
//   //     { id: 7, name: 'Coca Cola', price: 2.99 },
//   //     { id: 8, name: 'Fresh Orange Juice', price: 4.99 },
//   //     { id: 9, name: 'Iced Coffee', price: 3.99 },
//   //     { id: 10, name: 'Lemonade', price: 3.49 }
//   //   ],
//   //   games: [
//   //     { id: 11, name: 'Pool Table - 1 Hour', price: 25.99 },
//   //     { id: 12, name: 'Ping Pong - 1 Hour', price: 15.99 },
//   //     { id: 13, name: 'Foosball - 1 Hour', price: 12.99 },
//   //     { id: 14, name: 'Darts - 1 Hour', price: 8.99 }
//   //   ]
//   // };

//   // api to fetch orders 
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);

//       console.log("API Response:", res.data); // Debugging

//       if (res.data.success) {
//         setOrders(res.data.data.orders || []);
//         setTotalPages(res.data.data.totalPages || 1);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered");
//     fetchOrders();
//   }, [page, limit]);

//   const [customers, setCustomers] = useState([]);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoadingCustomers(true);
//       try {
//         // Replace with your actual API endpoint
//         const res = await axiosInstance.get('/users?page=1&limit=10&role=user');
//         if (res.data.data.users) {
//           setCustomers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const navigate = useNavigate();

//   // Helper functions
//   const calculateSubtotal = () => {
//     return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.08;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   const addToOrder = (product) => {
//     if (product.sides && product.sides.length > 0) {
//       setSelectedProduct(product);
//       setSelectedSides([]);
//       setIsSidesModalOpen(true);
//     } else {
//       const existingItem = orderItems.find(item => item.id === product.id);
//       if (existingItem) {
//         setOrderItems(orderItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       } else {
//         setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSideToggle = (side) => {
//     setSelectedSides(prevSides => {
//       const sideExists = prevSides.find(s => s.id === side.id);
//       if (sideExists) {
//         return prevSides.filter(s => s.id !== side.id);
//       } else {
//         return [...prevSides, side];
//       }
//     });
//   };

//   const handleAddWithSides = () => {
//     const existingItem = orderItems.find(item =>
//       item.id === selectedProduct.id &&
//       JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//     );
//     if (existingItem) {
//       setOrderItems(orderItems.map(item =>
//         item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setOrderItems([...orderItems, {
//         ...selectedProduct,
//         quantity: 1,
//         sides: selectedSides,
//         price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
//       }]);
//     }
//     setIsSidesModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedSides([]);
//   };

//   // Function to handle table selection from TableManagement
//   const handleTableSelect = (tableNumber) => {
//     setSelectedTable(tableNumber);
//     setActiveTab('register');
//     setShowTableModal(false); // Close the table selection modal
//   };

//   // Function to handle order selection
//   const handleOrderSelect = (order) => {
//     setSelectedOrder(order);
//     setOrderItems(order.items);
//     setSelectedTable(order.table);
//     setCustomerInfo({
//       name: order.customer || '',
//       phone: '',
//       specialRequests: ''
//     });
//     setActiveTab('register'); // Switch to register tab after selecting order
//   };

//   const handlePayment = () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }

//     const newOrder = {
//       id: Date.now(),
//       table: selectedTable || "N/A",
//       customer: customerInfo.name || "Walk-in Customer",
//       items: [...orderItems],
//       total: calculateTotal(),
//       timestamp: new Date().toISOString(),
//       status: "pending"
//     };

//     navigate("/staff/billingpayment");
//   };

//   // //onst filteredProducts = products[selectedCategory].filter(product =>
//   //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   // Add table highlight effect when component mounts
//   useEffect(() => {
//     const styles = document.createElement('style');
//     styles.innerHTML = `
//       .table-highlight {
//         outline: 3px solid #3B82F6 !important;
//         outline-offset: 4px;
//         transition: outline-color 0.3s ease;
//       }
//       @keyframes pulse {
//         0% { outline-color: #3B82F6; }
//         50% { outline-color: #60A5FA; }
//         100% { outline-color: #3B82F6; }
//       }
//       .animate-pulse {
//         animation: pulse 1s infinite;
//       }
//       .selected-row {
//         background-color: #fff3cd !important;
//         border-left: 4px solid #ffc107;
//       }
//     `;
//     document.head.appendChild(styles);

//     // Add click outside listener for course dropdown
//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('courseDropdown');
//       const button = document.getElementById('courseButton');
//       if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.classList.add('d-none');
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const allOrders = [
//     {
//       id: 100001,
//       table: 'Table 1',
//       customer: 'John Doe',
//       items: [
//         { name: 'Burger', quantity: 2 },
//         { name: 'Fries', quantity: 1 }
//       ],
//       total: 15.75,
//       timestamp: new Date(),
//       status: 'completed'
//     },
//     {
//       id: 100002,
//       table: 'Table 2',
//       customer: 'Jane Smith',
//       items: [
//         { name: 'Pizza', quantity: 1 },
//         { name: 'Coke', quantity: 2 }
//       ],
//       total: 20.00,
//       timestamp: new Date(),
//       status: 'pending'
//     },
//     {
//       id: 100003,
//       table: 'Table 3',
//       customer: 'Michael Scott',
//       items: [
//         { name: 'Pasta', quantity: 1 },
//         { name: 'Wine', quantity: 1 }
//       ],
//       total: 35.40,
//       timestamp: new Date(),
//       status: 'completed'
//     }
//   ];

//   const onJumpToOrders = () => {
//     setActiveTab("register");
//   };

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="">
//         <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
//       </div>

//       {/* Top Navigation */}
//       <div className="mt-3 mb-3">
//         <div className="d-flex overflow-auto">
//           {['tables', 'register', 'orders'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         {/* Register Screen */}
//         {activeTab === 'register' && (
//           <div className="d-flex flex-column flex-lg-row h-100">
//             {/* Left Panel - Order Summary */}
//             <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
//               {/* Customer Section */}
//               <div className="p-2 border-bottom">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h3 className="h6 mb-0">Current Order</h3>
//                   <span className="text-muted small">
//                     {selectedTable ? `Table ${selectedTable}` : 'No Table Selected'}
//                   </span>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => setIsCustomerModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-user-plus me-2"></i>Add Customer
//                   </button>
//                   <button
//                     onClick={() => setIsNoteModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-sticky-note me-2"></i>Note
//                   </button>
//                 </div>
//               </div>

//               {/* Middle Section: Scrollable Order Items */}
//               <div className="flex-grow-1" style={{ minHeight: '310px', overflowY: 'auto', scrollbarWidth: "none" }}>
//                 <div className="p-2">
//                   {orderItems.map((item, index) => (
//                     <div key={`${item.id}-${index}`} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fw-semibold small">{item.name}</span>
//                           <div className="d-flex align-items-center gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOrderItems(orderItems.filter((orderItem, idx) => idx !== index));
//                               }}
//                               className="btn btn-link text-danger p-0"
//                             >
//                               <i className="fa fa-times small"></i>
//                             </button>
//                             <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <div className="d-flex align-items-center mt-1">
//                           <span className="text-muted small">Qty: {item.quantity}</span>
//                           <span className="text-muted small ms-2"> ₹{parseFloat(item.price || 0).toFixed(2)} each</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="mt-1">
//                             {item.sides.map((side) => (
//                               <div key={side.id} className="d-flex justify-content-between small text-muted">
//                                 <span>+ {side.name}</span>
//                                 <span>${side.price.toFixed(2)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Bottom Section: Calculator + Totals */}
//               <div className="p-2 border-top">
//                 {/* Calculator Display */}
//                 <div className="bg-light p-2 rounded mb-2">
//                   <div className="text-end fs-4 font-monospace mb-1">
//                     ${calculateTotal().toFixed(2)}
//                   </div>
//                   <div className="text-end small text-muted">
//                     Subtotal: ${calculateSubtotal().toFixed(2)} + Tax: ${calculateTax().toFixed(2)}
//                   </div>
//                 </div>

//                 {/* Order Type & Course */}
//                 <div className="d-flex gap-2 mb-2">
//                   <button
//                     onClick={() => {
//                       const types = ['dineIn', 'takeOut', 'delivery'];
//                       const currentIndex = types.indexOf(orderType);
//                       const nextIndex = (currentIndex + 1) % types.length;
//                       setOrderType(types[nextIndex]);
//                     }}
//                     className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
//                       orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
//                       }`}
//                   >
//                     <span
//                       onClick={() => {
//                         if (orderType === "dineIn" && orderItems.length > 0 && !selectedTable) {
//                           setShowTableModal(true);
//                         }
//                       }}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <i
//                         className={`fa ${orderType === "dineIn"
//                           ? "fa-cutlery"
//                           : orderType === "takeOut"
//                             ? "fa-shopping-bag"
//                             : "fa-motorcycle"
//                           } me-2 small`}
//                       ></i>

//                       {orderType === "dineIn"
//                         ? "Dine In"
//                         : orderType === "takeOut"
//                           ? "Take Out"
//                           : "Delivery"}
//                     </span>
//                   </button>

//                  <button class="btn btn-success btn-sm flex-grow-1"><i class="fa fa-credit-card me-1 small"></i>Pay</button>

//                   <button
//                     onClick={() => setIsActionsModalOpen(true)}
//                     className="btn btn-light btn-sm"
//                   >
//                     <i className="fas fa-ellipsis-vertical small"></i>
//                   </button>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2">
//                   {orderType === 'dineIn' &&
//                     <button
//                       onClick={() => {
//                         setActiveTab('tables');
//                         setSelectedTable(null);
//                         setOrderItems([]);
//                         setSelectedOrder(null);
//                       }}
//                       className="btn btn-dark btn-sm flex-grow-1"
//                     >
//                       New
//                     </button>
//                   }
//                   <button
//                     onClick={() => setOrderItems([])}
//                     className="btn btn-danger btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-trash me-1 small"></i>Clear
//                   </button>

//                   <Link to='/staff/kotqueue' className='text-decoration-none'>
//                     <button
//                       className="btn btn-warning btn-sm flex-grow-1"
//                     >
//                       Send
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="flex-grow-1 d-flex flex-column">
//               {/* 🔍 Search Bar */}
//               <div className="p-2">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               </div>

//               {/* 📂 Category Switcher */}
//               <div className="p-3">
//                 <div className="d-flex gap-2 overflow-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`btn ${selectedCategory === category.id ? "btn-warning" : "btn-light"
//                         } flex-shrink-0`}
//                     >
//                       {category.category_name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* 📂 Subcategory Switcher */}
//               {subcategories.length > 0 && (
//                 <div className="px-3 pb-3">
//                   <div className="d-flex gap-2 overflow-auto">
//                     {subcategories.map((sub) => (
//                       <button
//                         key={sub.id}
//                         onClick={() => handleSubcategoryClick(sub)}
//                         className="btn btn-outline-secondary flex-shrink-0"
//                       >
//                         {sub.subcategory_name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* 🛒 Product Grid */}
//               <div className="flex-grow-1 p-3 overflow-auto">
//                 <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//                   {filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => addToOrder(product)}
//                       className="col"
//                     >
//                       <div className="card h-100 cursor-pointer hover-shadow border-0">
//                         <div className="card-body text-center d-flex flex-column justify-content-center">
//                           <h5 className="card-title mb-1">{product.name}</h5>
//                           <p className="h5 text-warning mb-0">
//                             ${product.price.toFixed(2)}
//                           </p>
//                           <p className="small text-muted mt-1">
//                             <i className="fa fa-plus-circle mr-1"></i>
//                             Select options
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* 🔔 Modal for Items */}
//               <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                   <Modal.Title>{selectedSubcategory} Items</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {items.length > 0 ? (
//                     <div className="list-group">
//                       {items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                         >
//                           <div>
//                             <h6 className="mb-1">{item.item_name}</h6>
//                             <small className="text-muted">
//                               Printer: {item.printer_name}
//                             </small>
//                           </div>
//                           <div>
//                             <span className="fw-bold text-warning me-3">
//                               ₹{parseFloat(item.price || 0).toFixed(2)}
//                             </span>

//                             <Button
//                               variant="success"
//                               size="sm"
//                               onClick={() => {
//                                 addToOrder(item);
//                                 setShowModal(false);
//                               }}
//                             >
//                               Select
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No items available.</p>
//                   )}
//                 </Modal.Body>
//               </Modal>
//             </div>

//           </div>
//         )}



//  <Modal show={showTableModal} onHide={() => setShowTableModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Select a Table</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex flex-wrap gap-2">
//             {["T1", "T2", "T3", "T4", "T5"].map((table) => (
//               <Button
//                 key={table}
//                 variant="outline-dark"
//                 className="flex-grow-1"
//                 onClick={() => handleTableSelect(table)}
//               >
//                 {table}
//               </Button>
//             ))}
//           </div>
//         </Modal.Body>
//       </Modal>

//         {/* Tables Screen */}
//         {activeTab === 'tables' && (
//           <div className="h-100">
//             <TableManagement
//               onTableSelect={handleTableSelect}
//               onJumpToOrders={onJumpToOrders}
//               onSelectTable={setSelectedTable}
//             />
//           </div>
//         )}

//         {/* Orders Screen */}
//         {activeTab === 'orders' && (
//           <div className="h-100">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Table</th>
//                         <th>Customer</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">Loading...</td>
//                         </tr>
//                       ) : orders.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">
//                             <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
//                             <h2 className="h4 card-title mb-2">No Orders Yet</h2>
//                             <p className="card-text text-muted">Your orders will appear here once created.</p>
//                           </td>
//                         </tr>
//                       ) : (
//                         orders.map((order) => (
//                           <tr key={order.id}>
//                             <td>#{order.order_number}</td>
//                             <td>{order.table_name} ({order.table_number})</td>
//                             <td>{order.customer_name}</td>
//                             <td>—</td>
//                             <td>${parseFloat(order.total_amount).toFixed(2)}</td>
//                             <td>{new Date(order.created_at).toLocaleTimeString()}</td>
//                             <td>
//                               <span className={`badge ${order.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td>
//                               {/* Fixed: Use order.id instead of order_number from useParams */}
//                               <Link to={`/staff/billingpayment/${order.id}`}>
//                                 <button className="btn btn-success btn-sm flex-grow-1">
//                                   <i className="fa fa-credit-card me-1 small"></i>Pay
//                                 </button>
//                               </Link>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modals */}
//       {/* Customer Modal */}
//       {isCustomerModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Customer Information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 {/* Customer Dropdown */}
//                 <div className="mb-3">
//                   <label className="form-label">Select Customer</label>
//                   <select
//                     className="form-select"
//                     value={selectedCustomer ? selectedCustomer.id : ""}
//                     onChange={(e) => {
//                       const customerId = e.target.value;
//                       if (customerId) {
//                         const customer = customers.find(c => c.id === parseInt(customerId));
//                         setSelectedCustomer(customer);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: customer.name,
//                           phone: customer.phone
//                         });
//                       } else {
//                         setSelectedCustomer(null);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: '',
//                           phone: ''
//                         });
//                       }
//                     }}
//                   >
//                     <option value="">Select Customer</option>
//                     {loadingCustomers ? (
//                       <option disabled>Loading customers...</option>
//                     ) : (
//                       customers.map((customer) => (
//                         <option key={customer.id} value={customer.id}>
//                           {customer.name} ({customer.phone})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={customerInfo.name}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                     placeholder="Enter customer name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={customerInfo.phone}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Special Requests</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={customerInfo.specialRequests}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
//                     placeholder="Enter any special requests"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Note Modal */}
//       {isNoteModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Notes</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea
//                     className="form-control"
//                     rows={6}
//                     value={orderNote}
//                     onChange={(e) => setOrderNote(e.target.value)}
//                     placeholder="Enter cooking preferences, allergies, or special requests..."
//                     maxLength={500}
//                   ></textarea>
//                   <div className="text-end small text-muted mt-1">
//                     {orderNote.length}/500 characters
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Sides Selection Modal */}
//       {isSidesModalOpen && selectedProduct && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div>
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <div className="small text-muted">
//                     ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-3">Sides</h6>
//                 <div className="row row-cols-2 g-3">
//                   {selectedProduct?.sides?.map((side) => (
//                     <div key={side.id} className="col">
//                       <button
//                         type="button"
//                         onClick={() => handleSideToggle(side)}
//                         className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
//                           ? 'btn-outline-warning active'
//                           : 'btn-outline-secondary'
//                           }`}
//                       >
//                         <div className="d-flex flex-column align-items-center">
//                           <span className="fw-bold">{side.name}</span>
//                         </div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 >
//                   Discard
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleAddWithSides}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Actions Modal */}
//       {isActionsModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Actions</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsActionsModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row row-cols-3 g-3">
//                   {[
//                     { icon: 'fa-sticky-note', text: 'Customer Note', onClick: () => setIsNoteModalOpen(true) },
//                     { icon: 'fa-file-invoice', text: 'Bill', onClick: () => navigate("/staff/billingpayment") },
//                     { icon: 'fa-users', text: 'Guests', onClick: () => setIsCustomerModalOpen(true) },
//                     { icon: 'fa-percentage', text: 'Split', onClick: () => alert(`Split amount per person: ${(calculateTotal() / 2).toFixed(2)}`) },
//                     { icon: 'fa-exchange-alt', text: 'Transfer / Merge', onClick: () => { } },
//                     { icon: 'fa-sync', text: 'Transfer course', onClick: () => { } },
//                     { icon: 'fa-list', text: 'Pricelist', onClick: () => { setSelectedCategory('food'); setSearchTerm(''); } },
//                     { icon: 'fa-undo', text: 'Refund', onClick: () => window.confirm('Are you sure you want to refund this order?') && {} },
//                     { icon: 'fa-receipt', text: 'Tax', onClick: () => alert(`Tax Amount: ${calculateTax().toFixed(2)}`) },
//                   ].map((action, index) => (
//                     <div key={index} className="col">
//                       <button
//                         onClick={() => {
//                           action.onClick();
//                           setIsActionsModalOpen(false);
//                         }}
//                         className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                       >
//                         <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
//                         <span className="small">{action.text}</span>
//                       </button>
//                     </div>
//                   ))}
//                   <div className="col-6">
//                     <button
//                       onClick={() => setIsActionsModalOpen(false)}
//                       className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                     >
//                       <i className="fa fa-times-circle fs-4 mb-2"></i>
//                       <span className="small">Cancel Order</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;

// import React, { useState, useEffect } from 'react';
// import './OrderManagement.css';
// import TableManagement from './TableManagement';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";

// const OrdersManagement = () => {
//   // State management
//   const [activeTab, setActiveTab] = useState('register');
//   const [activeFloor, setActiveFloor] = useState('main');
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [orderNote, setOrderNote] = useState('');
//   const [orderType, setOrderType] = useState('dineIn');
//   const [selectedTable, setSelectedTable] = useState(null); // Now stores the table object
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
//   const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [items, setItems] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [splitCount, setSplitCount] = useState(2);
//   const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
//   const navigate = useNavigate();

//   // Helper function to check if table selection is required
//   const requireTableForDineIn = (action = "proceed") => {
//     if (orderType === 'dineIn' && !selectedTable) {
//       alert(`Please select a table for Dine In order to ${action}`);
//       setActiveTab('tables');
//       return true; // Indicates table selection is required
//     }
//     return false; // Table selection not required
//   };

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         if (res.data.success) {
//           setCategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchSubcategories = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/subcategories?category_id=${selectedCategory}`
//         );
//         if (res.data.success) {
//           setSubcategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };
//     fetchSubcategories();
//   }, [selectedCategory]);

//   // Fetch items when subcategory is clicked
//   const handleSubcategoryClick = async (sub) => {
//     try {
//       const res = await axiosInstance.get(`/items/${sub.id}`);
//       if (res.data.success) {
//         setItems(res.data.data);
//         setSelectedSubcategory(sub.subcategory_name);
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
//       if (res.data.success) {
//         setOrders(res.data.data.orders || []);
//         setTotalPages(res.data.data.totalPages || 1);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [page, limit]);

//   // Fetch customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoadingCustomers(true);
//       try {
//         const res = await axiosInstance.get('/users?page=1&limit=10&role=user');
//         if (res.data.data.users) {
//           setCustomers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // Helper functions
//   const calculateSubtotal = () => {
//     return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.08;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   const addToOrder = (product) => {
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("add items")) {
//       return; // Don't add item if table selection is required
//     }
//     if (product.sides && product.sides.length > 0) {
//       setSelectedProduct(product);
//       setSelectedSides([]);
//       setIsSidesModalOpen(true);
//     } else {
//       const existingItem = orderItems.find(item => item.id === product.id);
//       if (existingItem) {
//         setOrderItems(orderItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       } else {
//         setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSideToggle = (side) => {
//     setSelectedSides(prevSides => {
//       const sideExists = prevSides.find(s => s.id === side.id);
//       if (sideExists) {
//         return prevSides.filter(s => s.id !== side.id);
//       } else {
//         return [...prevSides, side];
//       }
//     });
//   };

//   const handleAddWithSides = () => {
//     const existingItem = orderItems.find(item =>
//       item.id === selectedProduct.id &&
//       JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//     );
//     if (existingItem) {
//       setOrderItems(orderItems.map(item =>
//         item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setOrderItems([...orderItems, {
//         ...selectedProduct,
//         quantity: 1,
//         sides: selectedSides,
//         price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
//       }]);
//     }
//     setIsSidesModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedSides([]);
//   };

//   const handleTableSelect = (table) => {
//     setSelectedTable(table); // Now stores the entire table object
//     setActiveTab('register');
//   };

//   const handleOrderSelect = (order) => {
//     setSelectedOrder(order);
//     setOrderItems(order.items);
//     // Create a table object from order data
//     setSelectedTable({
//       table_number: order.table_number,
//       table_name: order.table_name,
//       table_type: order.table_type || 'dining',
//       capacity: order.capacity || 4,
//       status: order.status || 'available'
//     });
//     setCustomerInfo({
//       name: order.customer || '',
//       phone: '',
//       specialRequests: ''
//     });
//     setActiveTab('register');
//   };

//   const handlePayment = () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("process payment")) {
//       return;
//     }
//     const newOrder = {
//       id: Date.now(),
//       table: selectedTable ? selectedTable.table_number : "N/A",
//       customer: customerInfo.name || "Walk-in Customer",
//       items: [...orderItems],
//       total: calculateTotal(),
//       timestamp: new Date().toISOString(),
//       status: "pending"
//     };
//     navigate("/staff/billingpayment");
//   };

//   const handleSendOrder = () => {
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("send the order")) {
//       return;
//     }
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }
//     navigate('/staff/kotqueue');
//   };

//   // Handle actions from the three dots menu
//   const handleAction = (actionType) => {
//     setIsActionsModalOpen(false);
//     switch (actionType) {
//       case 'customerNote':
//         setIsNoteModalOpen(true);
//         break;
//       case 'bill':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("generate bill")) {
//           return;
//         }
//         navigate("/staff/billingpayment");
//         break;
//       case 'guests':
//         setIsCustomerModalOpen(true);
//         break;
//       case 'split':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         setIsSplitModalOpen(true);
//         break;
//       case 'transferMerge':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("transfer/merge order")) {
//           return;
//         }
//         alert("Transfer/Merge functionality would be implemented here");
//         break;
//       case 'transferCourse':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         alert("Transfer course functionality would be implemented here");
//         break;
//       case 'pricelist':
//         setActiveTab('register');
//         setSelectedCategory(null);
//         setSearchTerm('');
//         break;
//       case 'refund':
//         if (orderItems.length === 0) {
//           alert("No items to refund");
//           return;
//         }
//         if (window.confirm("Are you sure you want to refund this order?")) {
//           // Here you would implement the actual refund logic
//           alert("Refund processed successfully");
//           setOrderItems([]);
//         }
//         break;
//       case 'tax':
//         alert(`Tax Amount: $${calculateTax().toFixed(2)}`);
//         break;
//       case 'cancelOrder':
//         if (orderItems.length === 0) {
//           alert("No active order to cancel");
//           return;
//         }
//         if (window.confirm("Are you sure you want to cancel this order?")) {
//           setOrderItems([]);
//           setSelectedTable(null);
//           setCustomerInfo({ name: '', phone: '', specialRequests: '' });
//           setOrderNote('');
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle split order
//   const handleSplitOrder = () => {
//     if (splitCount <= 0) {
//       alert("Please enter a valid number of splits");
//       return;
//     }
//     const amountPerPerson = calculateTotal() / splitCount;
//     alert(`Split amount per person: $${amountPerPerson.toFixed(2)}`);
//     setIsSplitModalOpen(false);
//   };

//   // Add table highlight effect when component mounts
//   useEffect(() => {
//     const styles = document.createElement('style');
//     styles.innerHTML = `
//       .table-highlight {
//         outline: 3px solid #3B82F6 !important;
//         outline-offset: 4px;
//         transition: outline-color 0.3s ease;
//       }
//       @keyframes pulse {
//         0% { outline-color: #3B82F6; }
//         50% { outline-color: #60A5FA; }
//         100% { outline-color: #3B82F6; }
//       }
//       .animate-pulse {
//         animation: pulse 1s infinite;
//       }
//       .selected-row {
//         background-color: #fff3cd !important;
//         border-left: 4px solid #ffc107;
//       }
//       .table-selectable {
//         position: relative;
//         transition: transform 0.2s, box-shadow 0.2s;
//       }
//       .table-selectable:hover {
//         transform: scale(1.05);
//         box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//       }
//       .table-selectable.selected {
//         box-shadow: 0 0 0 3px #3B82F6;
//       }
//     `;
//     document.head.appendChild(styles);
//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('courseDropdown');
//       const button = document.getElementById('courseButton');
//       if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.classList.add('d-none');
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const onJumpToOrders = () => {
//     setActiveTab("register");
//   };

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="">
//         <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
//       </div>
//       {/* Top Navigation */}
//       <div className="mt-3 mb-3">
//         <div className="d-flex overflow-auto">
//           {['tables', 'register', 'orders'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         {/* Register Screen */}
//         {activeTab === 'register' && (
//           <div className="d-flex flex-column flex-lg-row h-100">
//             {/* Left Panel - Order Summary */}
//             <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
//               {/* Customer Section */}
//               <div className="p-2 border-bottom">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h3 className="h6 mb-0">Current Order</h3>
//                   <span className="text-muted small">
//                     {selectedTable ? `Table ${selectedTable.table_number}` : 'No Table Selected'}
//                   </span>
//                 </div>

//                 {/* Table Details Section */}
//                 {selectedTable && (
//                   <div className="table-details mb-3 p-2 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                       <span className="fw-bold small">Table Details</span>
//                       <span className={`badge ${selectedTable.status === 'available' ? 'bg-success' : selectedTable.status === 'occupied' ? 'bg-danger' : 'bg-warning'}`}>
//                         {selectedTable.status}
//                       </span>
//                     </div>
//                     <div className="small">
//                       <div className="mb-1"><strong>Name:</strong> {selectedTable.table_name}</div>
//                       <div className="mb-1"><strong>Type:</strong> {selectedTable.table_type}</div>
//                       <div><strong>Capacity:</strong> {selectedTable.capacity} people</div>
//                       {selectedTable.hourly_rate && (
//                         <div className="mt-1"><strong>Rate:</strong> ${selectedTable.hourly_rate}/hr</div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => setIsCustomerModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-user-plus me-2"></i>Add Customer
//                   </button>
//                   <button
//                     onClick={() => setIsNoteModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-sticky-note me-2"></i>Note
//                   </button>
//                 </div>
//               </div>
//               {/* Middle Section: Scrollable Order Items */}
//               <div className="flex-grow-1" style={{ minHeight: '310px', overflowY: 'auto', scrollbarWidth: "none" }}>
//                 <div className="p-2">
//                   {orderItems.map((item, index) => (
//                     <div key={`${item.id}-${index}`} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fw-semibold small">{item.name}</span>
//                           <div className="d-flex align-items-center gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOrderItems(orderItems.filter((orderItem, idx) => idx !== index));
//                               }}
//                               className="btn btn-link text-danger p-0"
//                             >
//                               <i className="fa fa-times small"></i>
//                             </button>
//                             <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <div className="d-flex align-items-center mt-1">
//                           <span className="text-muted small">Qty: {item.quantity}</span>
//                           <span className="text-muted small ms-2"> ₹{parseFloat(item.price || 0).toFixed(2)} each</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="mt-1">
//                             {item.sides.map((side) => (
//                               <div key={side.id} className="d-flex justify-content-between small text-muted">
//                                 <span>+ {side.name}</span>
//                                 <span>${side.price.toFixed(2)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Bottom Section: Calculator + Totals */}
//               <div className="p-2 border-top">
//                 {/* Calculator Display */}
//                 <div className="bg-light p-2 rounded mb-2">
//                   <div className="text-end fs-4 font-monospace mb-1">
//                     ${calculateTotal().toFixed(2)}
//                   </div>
//                   <div className="text-end small text-muted">
//                     Subtotal: ${calculateSubtotal().toFixed(2)} + Tax: ${calculateTax().toFixed(2)}
//                   </div>
//                 </div>
//                 {/* Order Type & Course */}
//                 <div className="d-flex gap-2 mb-2">
//                   <button
//                     onClick={() => {
//                       const types = ['dineIn', 'takeOut', 'delivery'];
//                       const currentIndex = types.indexOf(orderType);
//                       const nextIndex = (currentIndex + 1) % types.length;
//                       setOrderType(types[nextIndex]);
//                       // Clear table selection when switching away from dine-in
//                       if (orderType === 'dineIn' && types[nextIndex] !== 'dineIn') {
//                         setSelectedTable(null);
//                       }
//                     }}
//                     className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
//                       orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
//                       }`}
//                   >
//                     <span>
//                       <i
//                         className={`fa ${orderType === "dineIn"
//                           ? "fa-cutlery"
//                           : orderType === "takeOut"
//                             ? "fa-shopping-bag"
//                             : "fa-motorcycle"
//                           } me-2 small`}
//                       ></i>
//                       {orderType === "dineIn"
//                         ? "Dine In"
//                         : orderType === "takeOut"
//                           ? "Take Out"
//                           : "Delivery"}
//                     </span>
//                   </button>
//                   <button onClick={handlePayment} className="btn btn-success btn-sm flex-grow-1">
//                     <i className="fa fa-credit-card me-1 small"></i>Pay
//                   </button>
//                   <button
//                     onClick={() => setIsActionsModalOpen(true)}
//                     className="btn btn-light btn-sm"
//                   >
//                     <i className="fas fa-ellipsis-vertical small"></i>
//                   </button>
//                 </div>
//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2">
//                   {orderType === 'dineIn' &&
//                     <button
//                       onClick={() => {
//                         setActiveTab('tables');
//                         setSelectedTable(null);
//                         setOrderItems([]);
//                         setSelectedOrder(null);
//                       }}
//                       className="btn btn-dark btn-sm flex-grow-1"
//                     >
//                       New
//                     </button>
//                   }
//                   <button
//                     onClick={() => setOrderItems([])}
//                     className="btn btn-danger btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-trash me-1 small"></i>Clear
//                   </button>
//                   <button
//                     onClick={handleSendOrder}
//                     className="btn btn-warning btn-sm flex-grow-1"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-grow-1 d-flex flex-column">
//               {/* Search Bar */}
//               <div className="p-2">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               {/* Category Switcher */}
//               <div className="p-3">
//                 <div className="d-flex gap-2 overflow-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`btn ${selectedCategory === category.id ? "btn-warning" : "btn-light"
//                         } flex-shrink-0`}
//                     >
//                       {category.category_name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {/* Subcategory Switcher */}
//               {subcategories.length > 0 && (
//                 <div className="px-3 pb-3">
//                   <div className="d-flex gap-2 overflow-auto">
//                     {subcategories.map((sub) => (
//                       <button
//                         key={sub.id}
//                         onClick={() => handleSubcategoryClick(sub)}
//                         className="btn btn-outline-secondary flex-shrink-0"
//                       >
//                         {sub.subcategory_name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {/* Product Grid */}
//               <div className="flex-grow-1 p-3 overflow-auto">
//                 <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//                   {filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => addToOrder(product)}
//                       className="col"
//                     >
//                       <div className="card h-100 cursor-pointer hover-shadow border-0">
//                         <div className="card-body text-center d-flex flex-column justify-content-center">
//                           <h5 className="card-title mb-1">{product.name}</h5>
//                           <p className="h5 text-warning mb-0">
//                             ${product.price.toFixed(2)}
//                           </p>
//                           <p className="small text-muted mt-1">
//                             <i className="fa fa-plus-circle mr-1"></i>
//                             Select options
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Modal for Items */}
//               <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                   <Modal.Title>{selectedSubcategory} Items</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {items.length > 0 ? (
//                     <div className="list-group">
//                       {items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                         >
//                           <div>
//                             <h6 className="mb-1">{item.item_name}</h6>
//                             <small className="text-muted">
//                               Printer: {item.printer_name}
//                             </small>
//                           </div>
//                           <div>
//                             <span className="fw-bold text-warning me-3">
//                               ₹{parseFloat(item.price || 0).toFixed(2)}
//                             </span>
//                             <Button
//                               variant="success"
//                               size="sm"
//                               onClick={() => {
//                                 addToOrder(item);
//                                 setShowModal(false);
//                               }}
//                             >
//                               Select
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No items available.</p>
//                   )}
//                 </Modal.Body>
//               </Modal>
//             </div>
//           </div>
//         )}
//         {/* Tables Screen */}
//         {activeTab === 'tables' && (
//           <div className="h-100">
//             <TableManagement
//               onTableSelect={handleTableSelect}
//               onJumpToOrders={onJumpToOrders}
//               onSelectTable={setSelectedTable}
//             />
//           </div>
//         )}
//         {/* Orders Screen */}
//         {activeTab === 'orders' && (
//           <div className="h-100">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Table</th>
//                         <th>Customer</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">Loading...</td>
//                         </tr>
//                       ) : orders.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">
//                             <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
//                             <h2 className="h4 card-title mb-2">No Orders Yet</h2>
//                             <p className="card-text text-muted">Your orders will appear here once created.</p>
//                           </td>
//                         </tr>
//                       ) : (
//                         orders.map((order) => (
//                           <tr key={order.id}>
//                             <td>#{order.order_number}</td>
//                             <td>{order.table_name} ({order.table_number})</td>
//                             <td>{order.customer_name}</td>
//                             <td>—</td>
//                             <td>${parseFloat(order.total_amount).toFixed(2)}</td>
//                             <td>{new Date(order.created_at).toLocaleTimeString()}</td>
//                             <td>
//                               <span className={`badge ${order.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td>
//                               <Link to={`/staff/billingpayment/${order.id}`}>
//                                 <button className="btn btn-success btn-sm flex-grow-1">
//                                   <i className="fa fa-credit-card me-1 small"></i>Pay
//                                 </button>
//                               </Link>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Customer Modal */}
//       {isCustomerModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Customer Information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Select Customer</label>
//                   <select
//                     className="form-select"
//                     value={selectedCustomer ? selectedCustomer.id : ""}
//                     onChange={(e) => {
//                       const customerId = e.target.value;
//                       if (customerId) {
//                         const customer = customers.find(c => c.id === parseInt(customerId));
//                         setSelectedCustomer(customer);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: customer.name,
//                           phone: customer.phone
//                         });
//                       } else {
//                         setSelectedCustomer(null);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: '',
//                           phone: ''
//                         });
//                       }
//                     }}
//                   >
//                     <option value="">Select Customer</option>
//                     {loadingCustomers ? (
//                       <option disabled>Loading customers...</option>
//                     ) : (
//                       customers.map((customer) => (
//                         <option key={customer.id} value={customer.id}>
//                           {customer.name} ({customer.phone})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={customerInfo.name}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                     placeholder="Enter customer name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={customerInfo.phone}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Special Requests</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={customerInfo.specialRequests}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
//                     placeholder="Enter any special requests"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Note Modal */}
//       {isNoteModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Notes</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea
//                     className="form-control"
//                     rows={6}
//                     value={orderNote}
//                     onChange={(e) => setOrderNote(e.target.value)}
//                     placeholder="Enter cooking preferences, allergies, or special requests..."
//                     maxLength={500}
//                   ></textarea>
//                   <div className="text-end small text-muted mt-1">
//                     {orderNote.length}/500 characters
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Sides Selection Modal */}
//       {isSidesModalOpen && selectedProduct && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div>
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <div className="small text-muted">
//                     ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-3">Sides</h6>
//                 <div className="row row-cols-2 g-3">
//                   {selectedProduct?.sides?.map((side) => (
//                     <div key={side.id} className="col">
//                       <button
//                         type="button"
//                         onClick={() => handleSideToggle(side)}
//                         className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
//                           ? 'btn-outline-warning active'
//                           : 'btn-outline-secondary'
//                           }`}
//                       >
//                         <div className="d-flex flex-column align-items-center">
//                           <span className="fw-bold">{side.name}</span>
//                         </div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 >
//                   Discard
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleAddWithSides}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Split Modal */}
//       {isSplitModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Split Order</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Number of Splits</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={splitCount}
//                     onChange={(e) => setSplitCount(parseInt(e.target.value) || 1)}
//                     min="1"
//                   />
//                 </div>
//                 <div className="alert alert-info">
//                   Total Amount: ${calculateTotal().toFixed(2)}<br />
//                   Amount per person: ${(calculateTotal() / splitCount).toFixed(2)}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleSplitOrder}
//                 >
//                   Split Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Actions Modal */}
//       {isActionsModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Actions</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsActionsModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row row-cols-3 g-3">
//                   {[
//                     { icon: 'fa-sticky-note', text: 'Customer Note', action: 'customerNote' },
//                     { icon: 'fa-file-invoice', text: 'Bill', action: 'bill' },
//                     { icon: 'fa-users', text: 'Guests', action: 'guests' },
//                     { icon: 'fa-percentage', text: 'Split', action: 'split' },
//                     { icon: 'fa-exchange-alt', text: 'Transfer / Merge', action: 'transferMerge' },
//                     { icon: 'fa-sync', text: 'Transfer course', action: 'transferCourse' },
//                     { icon: 'fa-list', text: 'Pricelist', action: 'pricelist' },
//                     { icon: 'fa-undo', text: 'Refund', action: 'refund' },
//                     { icon: 'fa-receipt', text: 'Tax', action: 'tax' },
//                   ].map((action, index) => (
//                     <div key={index} className="col">
//                       <button
//                         onClick={() => handleAction(action.action)}
//                         className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                       >
//                         <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
//                         <span className="small">{action.text}</span>
//                       </button>
//                     </div>
//                   ))}
//                   <div className="col-6">
//                     <button
//                       onClick={() => handleAction('cancelOrder')}
//                       className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                     >
//                       <i className="fa fa-times-circle fs-4 mb-2"></i>
//                       <span className="small">Cancel Order</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;

// import React, { useState, useEffect } from 'react';
// import './OrderManagement.css';
// import TableManagement from './TableManagement';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";

// const OrdersManagement = () => {
//   // State management
//   const [activeTab, setActiveTab] = useState('register');
//   const [activeFloor, setActiveFloor] = useState('main');
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [orderNote, setOrderNote] = useState('');
//   const [orderType, setOrderType] = useState('dineIn');
//   const [selectedTable, setSelectedTable] = useState(null); // Now stores the table object
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
//   const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [items, setItems] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [splitCount, setSplitCount] = useState(2);
//   const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
//   const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false); // New state for receipt modal
//   const navigate = useNavigate();

//   // Helper function to check if table selection is required
//   const requireTableForDineIn = (action = "proceed") => {
//     if (orderType === 'dineIn' && !selectedTable) {
//       alert(`Please select a table for Dine In order to ${action}`);
//       setActiveTab('tables');
//       return true; // Indicates table selection is required
//     }
//     return false; // Table selection not required
//   };

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         if (res.data.success) {
//           setCategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchSubcategories = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/subcategories?category_id=${selectedCategory}`
//         );
//         if (res.data.success) {
//           setSubcategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };
//     fetchSubcategories();
//   }, [selectedCategory]);

//   // Fetch items when subcategory is clicked
//   const handleSubcategoryClick = async (sub) => {
//     try {
//       const res = await axiosInstance.get(`/items/${sub.id}`);
//       if (res.data.success) {
//         setItems(res.data.data);
//         setSelectedSubcategory(sub.subcategory_name);
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
//       if (res.data.success) {
//         setOrders(res.data.data.orders || []);
//         setTotalPages(res.data.data.totalPages || 1);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [page, limit]);

//   // Fetch customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoadingCustomers(true);
//       try {
//         const res = await axiosInstance.get('/users?page=1&limit=10&role=user');
//         if (res.data.data.users) {
//           setCustomers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // Helper functions
//   const calculateSubtotal = () => {
//     return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     return calculateSubtotal() * 0.08;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   const addToOrder = (product) => {
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("add items")) {
//       return; // Don't add item if table selection is required
//     }
//     if (product.sides && product.sides.length > 0) {
//       setSelectedProduct(product);
//       setSelectedSides([]);
//       setIsSidesModalOpen(true);
//     } else {
//       const existingItem = orderItems.find(item => item.id === product.id);
//       if (existingItem) {
//         setOrderItems(orderItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       } else {
//         setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSideToggle = (side) => {
//     setSelectedSides(prevSides => {
//       const sideExists = prevSides.find(s => s.id === side.id);
//       if (sideExists) {
//         return prevSides.filter(s => s.id !== side.id);
//       } else {
//         return [...prevSides, side];
//       }
//     });
//   };

//   const handleAddWithSides = () => {
//     const existingItem = orderItems.find(item =>
//       item.id === selectedProduct.id &&
//       JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//     );
//     if (existingItem) {
//       setOrderItems(orderItems.map(item =>
//         item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setOrderItems([...orderItems, {
//         ...selectedProduct,
//         quantity: 1,
//         sides: selectedSides,
//         price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
//       }]);
//     }
//     setIsSidesModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedSides([]);
//   };

//   const handleTableSelect = (table) => {
//     setSelectedTable(table); // Now stores the entire table object
//     setActiveTab('register');
//   };

//   const handleOrderSelect = (order) => {
//     setSelectedOrder(order);
//     setOrderItems(order.items);
//     // Create a table object from order data
//     setSelectedTable({
//       table_number: order.table_number,
//       table_name: order.table_name,
//       table_type: order.table_type || 'dining',
//       capacity: order.capacity || 4,
//       status: order.status || 'available'
//     });
//     setCustomerInfo({
//       name: order.customer || '',
//       phone: '',
//       specialRequests: ''
//     });
//     setActiveTab('register');
//   };

//   const handlePayment = () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("process payment")) {
//       return;
//     }
//     const newOrder = {
//       id: Date.now(),
//       table: selectedTable ? selectedTable.table_number : "N/A",
//       customer: customerInfo.name || "Walk-in Customer",
//       items: [...orderItems],
//       total: calculateTotal(),
//       timestamp: new Date().toISOString(),
//       status: "pending"
//     };
//     navigate("/staff/billingpayment");
//   };

//   const handleSendOrder = () => {
//     // Check if table selection is required for dine-in
//     if (requireTableForDineIn("send the order")) {
//       return;
//     }
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }
//     navigate('/staff/kotqueue');
//   };

//   // Handle actions from the three dots menu
//   const handleAction = (actionType) => {
//     setIsActionsModalOpen(false);
//     switch (actionType) {
//       case 'customerNote':
//         setIsNoteModalOpen(true);
//         break;
//       case 'bill':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("generate bill")) {
//           return;
//         }
//         navigate("/staff/billingpayment");
//         break;
//       case 'guests':
//         setIsCustomerModalOpen(true);
//         break;
//       case 'split':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         setIsSplitModalOpen(true);
//         break;
//       case 'transferMerge':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("transfer/merge order")) {
//           return;
//         }
//         alert("Transfer/Merge functionality would be implemented here");
//         break;
//       case 'transferCourse':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         alert("Transfer course functionality would be implemented here");
//         break;
//       case 'pricelist':
//         setActiveTab('register');
//         setSelectedCategory(null);
//         setSearchTerm('');
//         break;
//       case 'refund':
//         if (orderItems.length === 0) {
//           alert("No items to refund");
//           return;
//         }
//         if (window.confirm("Are you sure you want to refund this order?")) {
//           // Here you would implement the actual refund logic
//           alert("Refund processed successfully");
//           setOrderItems([]);
//         }
//         break;
//       case 'tax':
//         alert(`Tax Amount: $${calculateTax().toFixed(2)}`);
//         break;
//       case 'cancelOrder':
//         if (orderItems.length === 0) {
//           alert("No active order to cancel");
//           return;
//         }
//         if (window.confirm("Are you sure you want to cancel this order?")) {
//           setOrderItems([]);
//           setSelectedTable(null);
//           setCustomerInfo({ name: '', phone: '', specialRequests: '' });
//           setOrderNote('');
//         }
//         break;
//       case 'printReceipt': // New action for printing receipt
//         if (orderItems.length === 0) {
//           alert("No items to print receipt for");
//           return;
//         }
//         setIsReceiptModalOpen(true);
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle split order
//   const handleSplitOrder = () => {
//     if (splitCount <= 0) {
//       alert("Please enter a valid number of splits");
//       return;
//     }
//     const amountPerPerson = calculateTotal() / splitCount;
//     alert(`Split amount per person: $${amountPerPerson.toFixed(2)}`);
//     setIsSplitModalOpen(false);
//   };

//   // Handle clear order - reset everything
//   const handleClearOrder = () => {
//     if (window.confirm("Are you sure you want to clear everything? This will reset customer details, items, table selection, and notes.")) {
//       setOrderItems([]);
//       setSelectedTable(null);
//       setCustomerInfo({
//         name: '',
//         phone: '',
//         specialRequests: ''
//       });
//       setOrderNote('');
//       setSelectedCustomer(null);
//       setSelectedOrder(null);
//     }
//   };

//   // Add table highlight effect when component mounts
//   useEffect(() => {
//     const styles = document.createElement('style');
//     styles.innerHTML = `
//       .table-highlight {
//         outline: 3px solid #3B82F6 !important;
//         outline-offset: 4px;
//         transition: outline-color 0.3s ease;
//       }
//       @keyframes pulse {
//         0% { outline-color: #3B82F6; }
//         50% { outline-color: #60A5FA; }
//         100% { outline-color: #3B82F6; }
//       }
//       .animate-pulse {
//         animation: pulse 1s infinite;
//       }
//       .selected-row {
//         background-color: #fff3cd !important;
//         border-left: 4px solid #ffc107;
//       }
//       .table-selectable {
//         position: relative;
//         transition: transform 0.2s, box-shadow 0.2s;
//       }
//       .table-selectable:hover {
//         transform: scale(1.05);
//         box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//       }
//       .table-selectable.selected {
//         box-shadow: 0 0 0 3px #3B82F6;
//       }
//       .receipt-container {
//         font-family: 'Courier New', monospace;
//         padding: 20px;
//         max-width: 300px;
//         margin: 0 auto;
//         background-color: white;
//       }
//       .receipt-header {
//         text-align: center;
//         margin-bottom: 20px;
//         border-bottom: 1px dashed #ccc;
//         padding-bottom: 10px;
//       }
//       .receipt-title {
//         font-size: 18px;
//         font-weight: bold;
//         margin-bottom: 5px;
//       }
//       .receipt-subtitle {
//         font-size: 12px;
//         margin-bottom: 5px;
//       }
//       .receipt-section {
//         margin-bottom: 15px;
//       }
//       .receipt-section-title {
//         font-weight: bold;
//         margin-bottom: 5px;
//         font-size: 14px;
//       }
//       .receipt-item {
//         display: flex;
//         justify-content: space-between;
//         margin-bottom: 5px;
//         font-size: 12px;
//       }
//       .receipt-total {
//         display: flex;
//         justify-content: space-between;
//         font-weight: bold;
//         margin-top: 10px;
//         padding-top: 10px;
//         border-top: 1px dashed #ccc;
//       }
//       @media print {
//         body * {
//           visibility: hidden;
//         }
//         .receipt-container, .receipt-container * {
//           visibility: visible;
//         }
//         .receipt-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//         }
//       }
//     `;
//     document.head.appendChild(styles);

//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('courseDropdown');
//       const button = document.getElementById('courseButton');
//       if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.classList.add('d-none');
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const onJumpToOrders = () => {
//     setActiveTab("register");
//   };

//   const handlePrintReceipt = () => {
//     window.print();
//   };

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="">
//         <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
//       </div>
//       {/* Top Navigation */}
//       <div className="mt-3 mb-3">
//         <div className="d-flex overflow-auto">
//           {['tables', 'register', 'orders'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         {/* Register Screen */}
//         {activeTab === 'register' && (
//           <div className="d-flex flex-column flex-lg-row h-100">
//             {/* Left Panel - Order Summary */}
//             <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
//               {/* Customer Section */}
//               <div className="p-2 border-bottom">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h3 className="h6 mb-0">Current Order</h3>
//                   <span className="text-muted small">
//                     {selectedTable ? `Table ${selectedTable.table_number}` : 'No Table Selected'}
//                   </span>
//                 </div>

//                 {/* Table Details Section */}
//                 {selectedTable && (
//                   <div className="table-details mb-3 p-2 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                       <span className="fw-bold small">Table Details</span>
//                       <span className={`badge ${selectedTable.status === 'available' ? 'bg-success' : selectedTable.status === 'occupied' ? 'bg-danger' : 'bg-warning'}`}>
//                         {selectedTable.status}
//                       </span>
//                     </div>
//                     <div className="small">
//                       <div className="mb-1"><strong>Name:</strong> {selectedTable.table_name}</div>
//                       <div className="mb-1"><strong>Type:</strong> {selectedTable.table_type}</div>
//                       <div><strong>Capacity:</strong> {selectedTable.capacity} people</div>
//                       {selectedTable.hourly_rate && (
//                         <div className="mt-1"><strong>Rate:</strong> ${selectedTable.hourly_rate}/hr</div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Customer Details Section */}
//                 {customerInfo.name && (
//                   <div className="customer-details mb-3 p-2 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                       <span className="fw-bold small">Customer Details</span>
//                       <span className="badge bg-info">
//                         {selectedCustomer ? 'Registered' : 'Walk-in'}
//                       </span>
//                     </div>
//                     <div className="small">
//                       <div className="mb-1"><strong>Name:</strong> {customerInfo.name}</div>
//                       {customerInfo.phone && <div className="mb-1"><strong>Phone:</strong> {customerInfo.phone}</div>}
//                       {customerInfo.specialRequests && (
//                         <div><strong>Special Requests:</strong> {customerInfo.specialRequests}</div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => setIsCustomerModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-user-plus me-2"></i>Add Customer
//                   </button>
//                   <button
//                     onClick={() => setIsNoteModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-sticky-note me-2"></i>Note
//                   </button>
//                 </div>
//               </div>
//               {/* Middle Section: Scrollable Order Items */}
//               <div className="flex-grow-1" style={{ minHeight: '310px', overflowY: 'auto', scrollbarWidth: "none" }}>
//                 <div className="p-2">
//                   {orderItems.map((item, index) => (
//                     <div key={`${item.id}-${index}`} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fw-semibold small">{item.name}</span>
//                           <div className="d-flex align-items-center gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOrderItems(orderItems.filter((orderItem, idx) => idx !== index));
//                               }}
//                               className="btn btn-link text-danger p-0"
//                             >
//                               <i className="fa fa-times small"></i>
//                             </button>
//                             <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <div className="d-flex align-items-center mt-1">
//                           <span className="text-muted small">Qty: {item.quantity}</span>
//                           <span className="text-muted small ms-2"> ₹{parseFloat(item.price || 0).toFixed(2)} each</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="mt-1">
//                             {item.sides.map((side) => (
//                               <div key={side.id} className="d-flex justify-content-between small text-muted">
//                                 <span>+ {side.name}</span>
//                                 <span>${side.price.toFixed(2)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Bottom Section: Calculator + Totals */}
//               <div className="p-2 border-top">
//                 {/* Calculator Display */}
//                 <div className="bg-light p-2 rounded mb-2">
//                   <div className="text-end fs-4 font-monospace mb-1">
//                     ${calculateTotal().toFixed(2)}
//                   </div>
//                   <div className="text-end small text-muted">
//                     Subtotal: ${calculateSubtotal().toFixed(2)} + Tax: ${calculateTax().toFixed(2)}
//                   </div>
//                 </div>
//                 {/* Order Type & Course */}
//                 <div className="d-flex gap-2 mb-2">
//                   <button
//                     onClick={() => {
//                       const types = ['dineIn', 'takeOut', 'delivery'];
//                       const currentIndex = types.indexOf(orderType);
//                       const nextIndex = (currentIndex + 1) % types.length;
//                       setOrderType(types[nextIndex]);
//                       // Clear table selection when switching away from dine-in
//                       if (orderType === 'dineIn' && types[nextIndex] !== 'dineIn') {
//                         setSelectedTable(null);
//                       }
//                     }}
//                     className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
//                       orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
//                       }`}
//                   >
//                     <span>
//                       <i
//                         className={`fa ${orderType === "dineIn"
//                           ? "fa-cutlery"
//                           : orderType === "takeOut"
//                             ? "fa-shopping-bag"
//                             : "fa-motorcycle"
//                           } me-2 small`}
//                       ></i>
//                       {orderType === "dineIn"
//                         ? "Dine In"
//                         : orderType === "takeOut"
//                           ? "Take Out"
//                           : "Delivery"}
//                     </span>
//                   </button>
//                   <button
//                     onClick={handlePayment}
//                     className="btn btn-success btn-sm flex-grow-1"
//                     disabled={orderType === 'dineIn'} // Disable Pay button for dine-in orders
//                   >
//                     <i className="fa fa-credit-card me-1 small"></i>Pay
//                   </button>
//                   <button
//                     onClick={() => setIsActionsModalOpen(true)}
//                     className="btn btn-light btn-sm"
//                   >
//                     <i className="fas fa-ellipsis-vertical small"></i>
//                   </button>
//                 </div>
//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2">
//                   {orderType === 'dineIn' &&
//                     <button
//                       onClick={() => {
//                         setActiveTab('tables');
//                         setSelectedTable(null);
//                         setOrderItems([]);
//                         setSelectedOrder(null);
//                       }}
//                       className="btn btn-dark btn-sm flex-grow-1"
//                     >
//                       New
//                     </button>
//                   }
//                   <button
//                     onClick={handleClearOrder} // Updated to use handleClearOrder function
//                     className="btn btn-danger btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-trash me-1 small"></i>Clear
//                   </button>
//                   <button
//                     onClick={handleSendOrder}
//                     className="btn btn-warning btn-sm flex-grow-1"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-grow-1 d-flex flex-column">
//               {/* Search Bar */}
//               <div className="p-2">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               {/* Category Switcher */}
//               <div className="p-3">
//                 <div className="d-flex gap-2 overflow-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`btn ${selectedCategory === category.id ? "btn-warning" : "btn-light"
//                         } flex-shrink-0`}
//                     >
//                       {category.category_name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {/* Subcategory Switcher */}
//               {subcategories.length > 0 && (
//                 <div className="px-3 pb-3">
//                   <div className="d-flex gap-2 overflow-auto">
//                     {subcategories.map((sub) => (
//                       <button
//                         key={sub.id}
//                         onClick={() => handleSubcategoryClick(sub)}
//                         className="btn btn-outline-secondary flex-shrink-0"
//                       >
//                         {sub.subcategory_name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {/* Product Grid */}
//               <div className="flex-grow-1 p-3 overflow-auto">
//                 <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//                   {filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => addToOrder(product)}
//                       className="col"
//                     >
//                       <div className="card h-100 cursor-pointer hover-shadow border-0">
//                         <div className="card-body text-center d-flex flex-column justify-content-center">
//                           <h5 className="card-title mb-1">{product.name}</h5>
//                           <p className="h5 text-warning mb-0">
//                             ${product.price.toFixed(2)}
//                           </p>
//                           <p className="small text-muted mt-1">
//                             <i className="fa fa-plus-circle mr-1"></i>
//                             Select options
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Modal for Items */}
//               <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                   <Modal.Title>{selectedSubcategory} Items</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {items.length > 0 ? (
//                     <div className="list-group">
//                       {items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                         >
//                           <div>
//                             <h6 className="mb-1">{item.item_name}</h6>
//                             <small className="text-muted">
//                               Printer: {item.printer_name}
//                             </small>
//                           </div>
//                           <div>
//                             <span className="fw-bold text-warning me-3">
//                               ₹{parseFloat(item.price || 0).toFixed(2)}
//                             </span>
//                             <Button
//                               variant="success"
//                               size="sm"
//                               onClick={() => {
//                                 addToOrder(item);
//                                 setShowModal(false);
//                               }}
//                             >
//                               Select
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No items available.</p>
//                   )}
//                 </Modal.Body>
//               </Modal>
//             </div>
//           </div>
//         )}
//         {/* Tables Screen */}
//         {activeTab === 'tables' && (
//           <div className="h-100">
//             <TableManagement
//               onTableSelect={handleTableSelect}
//               onJumpToOrders={onJumpToOrders}
//               onSelectTable={setSelectedTable}
//             />
//           </div>
//         )}
//         {/* Orders Screen */}
//         {activeTab === 'orders' && (
//           <div className="h-100">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Table</th>
//                         <th>Customer</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">Loading...</td>
//                         </tr>
//                       ) : orders.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">
//                             <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
//                             <h2 className="h4 card-title mb-2">No Orders Yet</h2>
//                             <p className="card-text text-muted">Your orders will appear here once created.</p>
//                           </td>
//                         </tr>
//                       ) : (
//                         orders.map((order) => (
//                           <tr key={order.id}>
//                             <td>#{order.order_number}</td>
//                             <td>{order.table_name} ({order.table_number})</td>
//                             <td>{order.customer_name}</td>
//                             <td>—</td>
//                             <td>${parseFloat(order.total_amount).toFixed(2)}</td>
//                             <td>{new Date(order.created_at).toLocaleTimeString()}</td>
//                             <td>
//                               <span className={`badge ${order.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td>
//                               <Link to={`/staff/billingpayment/${order.id}`}>
//                                 <button className="btn btn-success btn-sm flex-grow-1">
//                                   <i className="fa fa-credit-card me-1 small"></i>Pay
//                                 </button>
//                               </Link>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Customer Modal */}
//       {isCustomerModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Customer Information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Select Customer</label>
//                   <select
//                     className="form-select"
//                     value={selectedCustomer ? selectedCustomer.id : ""}
//                     onChange={(e) => {
//                       const customerId = e.target.value;
//                       if (customerId) {
//                         const customer = customers.find(c => c.id === parseInt(customerId));
//                         setSelectedCustomer(customer);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: customer.name,
//                           phone: customer.phone
//                         });
//                       } else {
//                         setSelectedCustomer(null);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: '',
//                           phone: ''
//                         });
//                       }
//                     }}
//                   >
//                     <option value="">Select Customer</option>
//                     {loadingCustomers ? (
//                       <option disabled>Loading customers...</option>
//                     ) : (
//                       customers.map((customer) => (
//                         <option key={customer.id} value={customer.id}>
//                           {customer.name} ({customer.phone})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={customerInfo.name}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                     placeholder="Enter customer name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={customerInfo.phone}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Special Requests</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={customerInfo.specialRequests}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
//                     placeholder="Enter any special requests"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Note Modal */}
//       {isNoteModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Notes</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea
//                     className="form-control"
//                     rows={6}
//                     value={orderNote}
//                     onChange={(e) => setOrderNote(e.target.value)}
//                     placeholder="Enter cooking preferences, allergies, or special requests..."
//                     maxLength={500}
//                   ></textarea>
//                   <div className="text-end small text-muted mt-1">
//                     {orderNote.length}/500 characters
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Sides Selection Modal */}
//       {isSidesModalOpen && selectedProduct && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div>
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <div className="small text-muted">
//                     ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-3">Sides</h6>
//                 <div className="row row-cols-2 g-3">
//                   {selectedProduct?.sides?.map((side) => (
//                     <div key={side.id} className="col">
//                       <button
//                         type="button"
//                         onClick={() => handleSideToggle(side)}
//                         className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
//                           ? 'btn-outline-warning active'
//                           : 'btn-outline-secondary'
//                           }`}
//                       >
//                         <div className="d-flex flex-column align-items-center">
//                           <span className="fw-bold">{side.name}</span>
//                         </div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 >
//                   Discard
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleAddWithSides}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Split Modal */}
//       {isSplitModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Split Order</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Number of Splits</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={splitCount}
//                     onChange={(e) => setSplitCount(parseInt(e.target.value) || 1)}
//                     min="1"
//                   />
//                 </div>
//                 <div className="alert alert-info">
//                   Total Amount: ${calculateTotal().toFixed(2)}<br />
//                   Amount per person: ${(calculateTotal() / splitCount).toFixed(2)}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleSplitOrder}
//                 >
//                   Split Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Actions Modal */}
//       {isActionsModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Actions</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsActionsModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row row-cols-3 g-3">
//                   {[
//                     { icon: 'fa-sticky-note', text: 'Customer Note', action: 'customerNote' },
//                     { icon: 'fa-file-invoice', text: 'Bill', action: 'bill' },
//                     { icon: 'fa-users', text: 'Guests', action: 'guests' },
//                     { icon: 'fa-percentage', text: 'Split', action: 'split' },
//                     { icon: 'fa-exchange-alt', text: 'Transfer / Merge', action: 'transferMerge' },
//                     { icon: 'fa-sync', text: 'Transfer course', action: 'transferCourse' },
//                     { icon: 'fa-list', text: 'Pricelist', action: 'pricelist' },
//                     { icon: 'fa-undo', text: 'Refund', action: 'refund' },
//                     { icon: 'fa-receipt', text: 'Tax', action: 'tax' },
//                     { icon: 'fa-print', text: 'Print Receipt', action: 'printReceipt' }, // Added print receipt action
//                   ].map((action, index) => (
//                     <div key={index} className="col">
//                       <button
//                         onClick={() => handleAction(action.action)}
//                         className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                       >
//                         <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
//                         <span className="small">{action.text}</span>
//                       </button>
//                     </div>
//                   ))}
//                   <div className="col-6">
//                     <button
//                       onClick={() => handleAction('cancelOrder')}
//                       className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                     >
//                       <i className="fa fa-times-circle fs-4 mb-2"></i>
//                       <span className="small">Cancel Order</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Receipt Modal */}
//       {isReceiptModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Receipt</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsReceiptModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="receipt-container">
//                   {/* Receipt Header */}
//                   <div className="receipt-header">
//                     <div className="receipt-title">RESTAURANT NAME</div>
//                     <div className="receipt-subtitle">123 Main Street, City</div>
//                     <div className="receipt-subtitle">Phone: (123) 456-7890</div>
//                     <div className="receipt-subtitle">--------------------------------</div>
//                   </div>

//                   {/* Order Information */}
//                   <div className="receipt-section">
//                     <div className="receipt-section-title">ORDER INFORMATION</div>
//                     <div className="receipt-item">
//                       <span>Receipt #:</span>
//                       <span>{selectedOrder ? selectedOrder.order_number : `TEMP-${Date.now()}`}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Date:</span>
//                       <span>{new Date().toLocaleDateString()}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Time:</span>
//                       <span>{new Date().toLocaleTimeString()}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Order Type:</span>
//                       <span>{orderType === 'dineIn' ? 'Dine In' : orderType === 'takeOut' ? 'Take Out' : 'Delivery'}</span>
//                     </div>
//                   </div>

//                   {/* Table Details */}
//                   {selectedTable && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">TABLE DETAILS</div>
//                       <div className="receipt-item">
//                         <span>Table:</span>
//                         <span>{selectedTable.table_name} ({selectedTable.table_number})</span>
//                       </div>
//                       <div className="receipt-item">
//                         <span>Type:</span>
//                         <span>{selectedTable.table_type}</span>
//                       </div>
//                       <div className="receipt-item">
//                         <span>Capacity:</span>
//                         <span>{selectedTable.capacity} people</span>
//                       </div>
//                     </div>
//                   )}

//                   {/* Customer Details */}
//                   {customerInfo.name && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">CUSTOMER DETAILS</div>
//                       <div className="receipt-item">
//                         <span>Name:</span>
//                         <span>{customerInfo.name}</span>
//                       </div>
//                       {customerInfo.phone && (
//                         <div className="receipt-item">
//                           <span>Phone:</span>
//                           <span>{customerInfo.phone}</span>
//                         </div>
//                       )}
//                       {selectedCustomer && (
//                         <div className="receipt-item">
//                           <span>Type:</span>
//                           <span>Registered Customer</span>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* Order Items */}
//                   <div className="receipt-section">
//                     <div className="receipt-section-title">ORDER ITEMS</div>
//                     {orderItems.map((item, index) => (
//                       <div key={index}>
//                         <div className="receipt-item">
//                           <span>{item.name} x {item.quantity}</span>
//                           <span>${(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="receipt-item" style={{ paddingLeft: '10px', fontSize: '10px' }}>
//                             <span>+ {item.sides.map(s => s.name).join(', ')}</span>
//                             <span>${item.sides.reduce((sum, side) => sum + side.price, 0).toFixed(2)}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Totals */}
//                   <div className="receipt-section">
//                     <div className="receipt-item">
//                       <span>Subtotal:</span>
//                       <span>${calculateSubtotal().toFixed(2)}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Tax (8%):</span>
//                       <span>${calculateTax().toFixed(2)}</span>
//                     </div>
//                     <div className="receipt-total">
//                       <span>TOTAL:</span>
//                       <span>${calculateTotal().toFixed(2)}</span>
//                     </div>
//                   </div>

//                   {/* Order Note */}
//                   {orderNote && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">NOTE</div>
//                       <div>{orderNote}</div>
//                     </div>
//                   )}

//                   {/* Receipt Footer */}
//                   <div className="receipt-header" style={{ marginTop: '20px' }}>
//                     <div className="receipt-subtitle">--------------------------------</div>
//                     <div className="receipt-subtitle">Thank you for your visit!</div>
//                     <div className="receipt-subtitle">Please come again</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <Button variant="secondary" onClick={() => setIsReceiptModalOpen(false)}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={handlePrintReceipt}>
//                   Print Receipt
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;
// import React, { useState, useEffect } from 'react';
// import './OrderManagement.css';
// import TableManagement from './TableManagement';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";

// const OrdersManagement = () => {
//   // State management
//   const [activeTab, setActiveTab] = useState('register');
//   const [activeFloor, setActiveFloor] = useState('main');
//   const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
//   const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [orderNote, setOrderNote] = useState('');
//   const [orderType, setOrderType] = useState('dineIn');
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orderItems, setOrderItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedSides, setSelectedSides] = useState([]);
//   const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
//   const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [items, setItems] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [splitCount, setSplitCount] = useState(2);
//   const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
//   const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
//   const [businessSettings, setBusinessSettings] = useState(null);
//   const [loadingSettings, setLoadingSettings] = useState(true);
//   const navigate = useNavigate();

//   // Fetch business settings to get tax information
//   useEffect(() => {
//     const fetchBusinessSettings = async () => {
//       try {
//         const response = await axiosInstance.get('/business_settings');
//         const data = response.data.data; // Access the data property from response
//         setBusinessSettings(data);
//       } catch (error) {
//         console.error('Error fetching business settings:', error);
//         // Set default tax rate if API fails
//         setBusinessSettings({
//           tax: "5", // Default tax percentage as string
//           receipt_footer: "Thank you for your visit!",
//           system_mode: "online"
//         });
//       } finally {
//         setLoadingSettings(false);
//       }
//     };
//     fetchBusinessSettings();
//   }, []);

//   // Helper function to check if table selection is required
//   const requireTableForDineIn = (action = "proceed") => {
//     if (orderType === 'dineIn' && !selectedTable) {
//       alert(`Please select a table for Dine In order to ${action}`);
//       setActiveTab('tables');
//       return true;
//     }
//     return false;
//   };

//   // Fetch all categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         if (res.data.success) {
//           setCategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;
//     const fetchSubcategories = async () => {
//       try {
//         const res = await axiosInstance.get(
//           `/subcategories?category_id=${selectedCategory}`
//         );
//         if (res.data.success) {
//           setSubcategories(res.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     };
//     fetchSubcategories();
//   }, [selectedCategory]);

//   // Fetch items when subcategory is clicked
//   const handleSubcategoryClick = async (sub) => {
//     try {
//       const res = await axiosInstance.get(`/items/${sub.id}`);
//       if (res.data.success) {
//         setItems(res.data.data);
//         setSelectedSubcategory(sub.subcategory_name);
//         setShowModal(true);
//       }
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
//       if (res.data.success) {
//         setOrders(res.data.data.orders || []);
//         setTotalPages(res.data.data.totalPages || 1);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [page, limit]);

//   // Fetch customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       setLoadingCustomers(true);
//       try {
//         const res = await axiosInstance.get('/users?page=1&limit=10&role=user');
//         if (res.data.data.users) {
//           setCustomers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       } finally {
//         setLoadingCustomers(false);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   // Helper functions
//   const calculateSubtotal = () => {
//     return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   };

//   const calculateTax = () => {
//     if (!businessSettings || !businessSettings.tax) return 0;
//     const taxRate = parseFloat(businessSettings.tax); // Convert string to number
//     return (calculateSubtotal() * taxRate) / 100;
//   };

//   const calculateTotal = () => {
//     return calculateSubtotal() + calculateTax();
//   };

//   const addToOrder = (product) => {
//     if (requireTableForDineIn("add items")) {
//       return;
//     }
//     if (product.sides && product.sides.length > 0) {
//       setSelectedProduct(product);
//       setSelectedSides([]);
//       setIsSidesModalOpen(true);
//     } else {
//       const existingItem = orderItems.find(item => item.id === product.id);
//       if (existingItem) {
//         setOrderItems(orderItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ));
//       } else {
//         setOrderItems([...orderItems, { ...product, quantity: 1 }]);
//       }
//     }
//   };

//   const handleSideToggle = (side) => {
//     setSelectedSides(prevSides => {
//       const sideExists = prevSides.find(s => s.id === side.id);
//       if (sideExists) {
//         return prevSides.filter(s => s.id !== side.id);
//       } else {
//         return [...prevSides, side];
//       }
//     });
//   };

//   const handleAddWithSides = () => {
//     const existingItem = orderItems.find(item =>
//       item.id === selectedProduct.id &&
//       JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//     );
//     if (existingItem) {
//       setOrderItems(orderItems.map(item =>
//         item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       ));
//     } else {
//       setOrderItems([...orderItems, {
//         ...selectedProduct,
//         quantity: 1,
//         sides: selectedSides,
//         price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
//       }]);
//     }
//     setIsSidesModalOpen(false);
//     setSelectedProduct(null);
//     setSelectedSides([]);
//   };

//   const handleTableSelect = (table) => {
//     setSelectedTable(table);
//     setActiveTab('register');
//   };

//   const handleOrderSelect = (order) => {
//     setSelectedOrder(order);
//     setOrderItems(order.items);
//     setSelectedTable({
//       table_number: order.table_number,
//       table_name: order.table_name,
//       table_type: order.table_type || 'dining',
//       capacity: order.capacity || 4,
//       status: order.status || 'available'
//     });
//     setCustomerInfo({
//       name: order.customer || '',
//       phone: '',
//       specialRequests: ''
//     });
//     setActiveTab('register');
//   };

//   // Updated handlePayment function
//   const handlePayment = () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }
//     if (requireTableForDineIn("process payment")) {
//       return;
//     }

//     // Get tax percentage from business settings
//     const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;

//     // Prepare order data to pass to billing page
//     const orderData = {
//       id: `temp-${Date.now()}`, // Temporary ID
//       order_number: `TEMP-${Date.now()}`,
//       table_number: selectedTable ? selectedTable.table_number : null,
//       table_name: selectedTable ? selectedTable.table_name : null,
//       customer_name: customerInfo.name || "Walk-in Customer",
//       order_type: orderType === 'dineIn' ? 'dine_in' : orderType === 'takeOut' ? 'take_out' : 'delivery',
//       special_instructions: orderNote,
//       items: orderItems.map(item => ({
//         id: item.id,
//         item_name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         total_price: (item.price * item.quantity).toFixed(2),
//         special_instructions: item.sides && item.sides.length > 0
//           ? `Sides: ${item.sides.map(side => side.name).join(', ')}`
//           : ''
//       })),
//       subtotal: calculateSubtotal().toFixed(2),
//       tax_amount: calculateTax().toFixed(2),
//       total_amount: calculateTotal().toFixed(2),
//       created_at: new Date().toISOString(),
//       status: 'pending',
//       tax_percentage: taxPercentage // Include tax percentage for billing page
//     };

//     // Navigate to billing page with order data as state
//     navigate('/staff/billingpayment', { state: { orderData } });
//   };

//   // Updated handleSendOrder function
//   const handleSendOrder = async () => {
//     if (requireTableForDineIn("send the order")) {
//       return;
//     }
//     if (orderItems.length === 0) {
//       alert("Please add items to the order first");
//       return;
//     }

//     try {
//       // Prepare order data
//       const orderData = {
//         session_id: 1, // Adjust based on your session management
//         table_id: selectedTable ? selectedTable.id : null,
//         customer_name: customerInfo.name || "Walk-in Customer",
//         order_type: orderType === 'dineIn' ? 'dine_in' : orderType === 'takeOut' ? 'take_out' : 'delivery',
//         special_instructions: orderNote,
//         items: orderItems.map(item => ({
//           menu_item_id: item.id,
//           quantity: item.quantity,
//           special_instructions: item.sides && item.sides.length > 0
//             ? `Sides: ${item.sides.map(side => side.name).join(', ')}`
//             : ''
//         }))
//       };

//       // Create order
//       const response = await axiosInstance.post('/orders', orderData);

//       if (response.data.success) {
//         alert('Order sent successfully!');
//         // Reset order state
//         setOrderItems([]);
//         setSelectedTable(null);
//         setCustomerInfo({ name: '', phone: '', specialRequests: '' });
//         setOrderNote('');
//         // Navigate to KOT queue
//         navigate('/staff/kotqueue');
//       } else {
//         alert('Failed to send order: ' + (response.data.message || 'Unknown error'));
//       }
//     } catch (error) {
//       console.error('Error sending order:', error);
//       alert('Error sending order: ' + (error.response?.data?.message || error.message));
//     }
//   };

//   // Handle actions from the three dots menu
//   const handleAction = (actionType) => {
//     setIsActionsModalOpen(false);
//     switch (actionType) {
//       case 'customerNote':
//         setIsNoteModalOpen(true);
//         break;
//       case 'bill':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("generate bill")) {
//           return;
//         }
//         handlePayment(); // Use the updated handlePayment function
//         break;
//       case 'guests':
//         setIsCustomerModalOpen(true);
//         break;
//       case 'split':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         setIsSplitModalOpen(true);
//         break;
//       case 'transferMerge':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         if (requireTableForDineIn("transfer/merge order")) {
//           return;
//         }
//         alert("Transfer/Merge functionality would be implemented here");
//         break;
//       case 'transferCourse':
//         if (orderItems.length === 0) {
//           alert("Please add items to the order first");
//           return;
//         }
//         alert("Transfer course functionality would be implemented here");
//         break;
//       case 'pricelist':
//         setActiveTab('register');
//         setSelectedCategory(null);
//         setSearchTerm('');
//         break;
//       case 'refund':
//         if (orderItems.length === 0) {
//           alert("No items to refund");
//           return;
//         }
//         if (window.confirm("Are you sure you want to refund this order?")) {
//           alert("Refund processed successfully");
//           setOrderItems([]);
//         }
//         break;
//       case 'tax':
//         const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;
//         alert(`Tax Amount: $${calculateTax().toFixed(2)} (${taxPercentage}%)`);
//         break;
//       case 'cancelOrder':
//         if (orderItems.length === 0) {
//           alert("No active order to cancel");
//           return;
//         }
//         if (window.confirm("Are you sure you want to cancel this order?")) {
//           setOrderItems([]);
//           setSelectedTable(null);
//           setCustomerInfo({ name: '', phone: '', specialRequests: '' });
//           setOrderNote('');
//         }
//         break;
//       case 'printReceipt':
//         if (orderItems.length === 0) {
//           alert("No items to print receipt for");
//           return;
//         }
//         setIsReceiptModalOpen(true);
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle split order
//   const handleSplitOrder = () => {
//     if (splitCount <= 0) {
//       alert("Please enter a valid number of splits");
//       return;
//     }
//     const amountPerPerson = calculateTotal() / splitCount;
//     alert(`Split amount per person: $${amountPerPerson.toFixed(2)}`);
//     setIsSplitModalOpen(false);
//   };

//   // Handle clear order
//   const handleClearOrder = () => {
//     if (window.confirm("Are you sure you want to clear everything? This will reset customer details, items, table selection, and notes.")) {
//       setOrderItems([]);
//       setSelectedTable(null);
//       setCustomerInfo({
//         name: '',
//         phone: '',
//         specialRequests: ''
//       });
//       setOrderNote('');
//       setSelectedCustomer(null);
//       setSelectedOrder(null);
//     }
//   };

//   // Add table highlight effect when component mounts
//   useEffect(() => {
//     const styles = document.createElement('style');
//     styles.innerHTML = `
//       .table-highlight {
//         outline: 3px solid #3B82F6 !important;
//         outline-offset: 4px;
//         transition: outline-color 0.3s ease;
//       }
//       @keyframes pulse {
//         0% { outline-color: #3B82F6; }
//         50% { outline-color: #60A5FA; }
//         100% { outline-color: #3B82F6; }
//       }
//       .animate-pulse {
//         animation: pulse 1s infinite;
//       }
//       .selected-row {
//         background-color: #fff3cd !important;
//         border-left: 4px solid #ffc107;
//       }
//       .table-selectable {
//         position: relative;
//         transition: transform 0.2s, box-shadow 0.2s;
//       }
//       .table-selectable:hover {
//         transform: scale(1.05);
//         box-shadow: 0 4px 8px rgba(0,0,0,0.2);
//       }
//       .table-selectable.selected {
//         box-shadow: 0 0 0 3px #3B82F6;
//       }
//       .receipt-container {
//         font-family: 'Courier New', monospace;
//         padding: 20px;
//         max-width: 300px;
//         margin: 0 auto;
//         background-color: white;
//       }
//       .receipt-header {
//         text-align: center;
//         margin-bottom: 20px;
//         border-bottom: 1px dashed #ccc;
//         padding-bottom: 10px;
//       }
//       .receipt-title {
//         font-size: 18px;
//         font-weight: bold;
//         margin-bottom: 5px;
//       }
//       .receipt-subtitle {
//         font-size: 12px;
//         margin-bottom: 5px;
//       }
//       .receipt-section {
//         margin-bottom: 15px;
//       }
//       .receipt-section-title {
//         font-weight: bold;
//         margin-bottom: 5px;
//         font-size: 14px;
//       }
//       .receipt-item {
//         display: flex;
//         justify-content: space-between;
//         margin-bottom: 5px;
//         font-size: 12px;
//       }
//       .receipt-total {
//         display: flex;
//         justify-content: space-between;
//         font-weight: bold;
//         margin-top: 10px;
//         padding-top: 10px;
//         border-top: 1px dashed #ccc;
//       }
//       @media print {
//         body * {
//           visibility: hidden;
//         }
//         .receipt-container, .receipt-container * {
//           visibility: visible;
//         }
//         .receipt-container {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//         }
//       }
//     `;
//     document.head.appendChild(styles);
//     const handleClickOutside = (event) => {
//       const dropdown = document.getElementById('courseDropdown');
//       const button = document.getElementById('courseButton');
//       if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
//         dropdown.classList.add('d-none');
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, []);

//   const onJumpToOrders = () => {
//     setActiveTab("register");
//   };

//   const handlePrintReceipt = () => {
//     window.print();
//   };

//   // Get tax percentage for display
//   const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <div className="">
//         <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
//       </div>
//       {/* Top Navigation */}
//       <div className="mt-3 mb-3">
//         <div className="d-flex overflow-auto">
//           {['tables', 'register', 'orders'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>
//       {/* Main Content */}
//       <div className="flex-grow-1 overflow-hidden">
//         {/* Register Screen */}
//         {activeTab === 'register' && (
//           <div className="d-flex flex-column flex-lg-row h-100">
//             {/* Left Panel - Order Summary */}
//             <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
//               {/* Customer Section */}
//               <div className="p-2 border-bottom">
//                 <div className="d-flex justify-content-between align-items-center mb-2">
//                   <h3 className="h6 mb-0">Current Order</h3>
//                   <span className="text-muted small">
//                     {selectedTable ? `Table ${selectedTable.table_number}` : 'No Table Selected'}
//                   </span>
//                 </div>
//                 {/* Table Details Section */}
//                 {selectedTable && (
//                   <div className="table-details mb-3 p-2 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                       <span className="fw-bold small">Table Details</span>
//                       <span className={`badge ${selectedTable.status === 'available' ? 'bg-success' : selectedTable.status === 'occupied' ? 'bg-danger' : 'bg-warning'}`}>
//                         {selectedTable.status}
//                       </span>
//                     </div>
//                     <div className="small">
//                       <div className="mb-1"><strong>Name:</strong> {selectedTable.table_name}</div>
//                       <div className="mb-1"><strong>Type:</strong> {selectedTable.table_type}</div>
//                       <div><strong>Capacity:</strong> {selectedTable.capacity} people</div>
//                       {selectedTable.hourly_rate && (
//                         <div className="mt-1"><strong>Rate:</strong> ${selectedTable.hourly_rate}/hr</div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 {/* Customer Details Section */}
//                 {customerInfo.name && (
//                   <div className="customer-details mb-3 p-2 bg-light rounded">
//                     <div className="d-flex justify-content-between align-items-center mb-1">
//                       <span className="fw-bold small">Customer Details</span>
//                       <span className="badge bg-info">
//                         {selectedCustomer ? 'Registered' : 'Walk-in'}
//                       </span>
//                     </div>
//                     <div className="small">
//                       <div className="mb-1"><strong>Name:</strong> {customerInfo.name}</div>
//                       {customerInfo.phone && <div className="mb-1"><strong>Phone:</strong> {customerInfo.phone}</div>}
//                       {customerInfo.specialRequests && (
//                         <div><strong>Special Requests:</strong> {customerInfo.specialRequests}</div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 <div className="d-flex gap-2">
//                   <button
//                     onClick={() => setIsCustomerModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-user-plus me-2"></i>Add Customer
//                   </button>
//                   <button
//                     onClick={() => setIsNoteModalOpen(true)}
//                     className="btn btn-light flex-grow-1 text-start btn-sm"
//                   >
//                     <i className="fa fa-sticky-note me-2"></i>Note
//                   </button>
//                 </div>
//               </div>
//               {/* Middle Section: Scrollable Order Items */}
//               <div className="flex-grow-1" style={{ minHeight: '310px', overflowY: 'auto', scrollbarWidth: "none" }}>
//                 <div className="p-2">
//                   {orderItems.map((item, index) => (
//                     <div key={`${item.id}-${index}`} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
//                       <div className="flex-grow-1">
//                         <div className="d-flex justify-content-between align-items-center">
//                           <span className="fw-semibold small">{item.name}</span>
//                           <div className="d-flex align-items-center gap-2">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setOrderItems(orderItems.filter((orderItem, idx) => idx !== index));
//                               }}
//                               className="btn btn-link text-danger p-0"
//                             >
//                               <i className="fa fa-times small"></i>
//                             </button>
//                             <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
//                           </div>
//                         </div>
//                         <div className="d-flex align-items-center mt-1">
//                           <span className="text-muted small">Qty: {item.quantity}</span>
//                           <span className="text-muted small ms-2"> ₹{parseFloat(item.price || 0).toFixed(2)} each</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="mt-1">
//                             {item.sides.map((side) => (
//                               <div key={side.id} className="d-flex justify-content-between small text-muted">
//                                 <span>+ {side.name}</span>
//                                 <span>${side.price.toFixed(2)}</span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Bottom Section: Calculator + Totals */}
//               <div className="p-2 border-top">
//                 {/* Calculator Display */}
//                 <div className="bg-light p-2 rounded mb-2">
//                   <div className="text-end fs-4 font-monospace mb-1">
//                     ${calculateTotal().toFixed(2)}
//                   </div>
//                   <div className="text-end small text-muted">
//                     Subtotal: ${calculateSubtotal().toFixed(2)} + Tax ({taxPercentage}%): ${calculateTax().toFixed(2)}
//                   </div>
//                 </div>
//                 {/* Order Type & Course */}
//                 <div className="d-flex gap-2 mb-2">
//                   <button
//                     onClick={() => {
//                       const types = ['dineIn', 'takeOut', 'delivery'];
//                       const currentIndex = types.indexOf(orderType);
//                       const nextIndex = (currentIndex + 1) % types.length;
//                       setOrderType(types[nextIndex]);
//                       if (orderType === 'dineIn' && types[nextIndex] !== 'dineIn') {
//                         setSelectedTable(null);
//                       }
//                     }}
//                     className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
//                       orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
//                       }`}
//                   >
//                     <span>
//                       <i
//                         className={`fa ${orderType === "dineIn"
//                           ? "fa-cutlery"
//                           : orderType === "takeOut"
//                             ? "fa-shopping-bag"
//                             : "fa-motorcycle"
//                           } me-2 small`}
//                       ></i>
//                       {orderType === "dineIn"
//                         ? "Dine In"
//                         : orderType === "takeOut"
//                           ? "Take Out"
//                           : "Delivery"}
//                     </span>
//                   </button>
//                   <button
//                     onClick={handlePayment}
//                     className="btn btn-success btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-credit-card me-1 small"></i>Pay
//                   </button>
//                   <button
//                     onClick={() => setIsActionsModalOpen(true)}
//                     className="btn btn-light btn-sm"
//                   >
//                     <i className="fas fa-ellipsis-vertical small"></i>
//                   </button>
//                 </div>
//                 {/* Action Buttons */}
//                 <div className="d-flex gap-2">
//                   {orderType === 'dineIn' &&
//                     <button
//                       onClick={() => {
//                         setActiveTab('tables');
//                         setSelectedTable(null);
//                         setOrderItems([]);
//                         setSelectedOrder(null);
//                       }}
//                       className="btn btn-dark btn-sm flex-grow-1"
//                     >
//                       New
//                     </button>
//                   }
//                   <button
//                     onClick={handleClearOrder}
//                     className="btn btn-danger btn-sm flex-grow-1"
//                   >
//                     <i className="fa fa-trash me-1 small"></i>Clear
//                   </button>
//                   <button
//                     onClick={handleSendOrder}
//                     className="btn btn-warning btn-sm flex-grow-1"
//                   >
//                     Send
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-grow-1 d-flex flex-column">
//               {/* Search Bar */}
//               <div className="p-2">
//                 <div className="position-relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               {/* Category Switcher */}
//               <div className="p-3">
//                 <div className="d-flex gap-2 overflow-auto">
//                   {categories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => setSelectedCategory(category.id)}
//                       className={`btn ${selectedCategory === category.id ? "btn-warning" : "btn-light"
//                         } flex-shrink-0`}
//                     >
//                       {category.category_name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               {/* Subcategory Switcher */}
//               {subcategories.length > 0 && (
//                 <div className="px-3 pb-3">
//                   <div className="d-flex gap-2 overflow-auto">
//                     {subcategories.map((sub) => (
//                       <button
//                         key={sub.id}
//                         onClick={() => handleSubcategoryClick(sub)}
//                         className="btn btn-outline-secondary flex-shrink-0"
//                       >
//                         {sub.subcategory_name}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {/* Product Grid */}
//               <div className="flex-grow-1 p-3 overflow-auto">
//                 <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
//                   {filteredProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       onClick={() => addToOrder(product)}
//                       className="col"
//                     >
//                       <div className="card h-100 cursor-pointer hover-shadow border-0">
//                         <div className="card-body text-center d-flex flex-column justify-content-center">
//                           <h5 className="card-title mb-1">{product.name}</h5>
//                           <p className="h5 text-warning mb-0">
//                             ${product.price.toFixed(2)}
//                           </p>
//                           <p className="small text-muted mt-1">
//                             <i className="fa fa-plus-circle mr-1"></i>
//                             Select options
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Modal for Items */}
//               <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                 <Modal.Header closeButton>
//                   <Modal.Title>{selectedSubcategory} Items</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                   {items.length > 0 ? (
//                     <div className="list-group">
//                       {items.map((item) => (
//                         <div
//                           key={item.id}
//                           className="list-group-item d-flex justify-content-between align-items-center"
//                         >
//                           <div>
//                             <h6 className="mb-1">{item.item_name}</h6>
//                             <small className="text-muted">
//                               Printer: {item.printer_name}
//                             </small>
//                           </div>
//                           <div>
//                             <span className="fw-bold text-warning me-3">
//                               ₹{parseFloat(item.price || 0).toFixed(2)}
//                             </span>
//                             <Button
//                               variant="success"
//                               size="sm"
//                               onClick={() => {
//                                 addToOrder(item);
//                                 setShowModal(false);
//                               }}
//                             >
//                               Select
//                             </Button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p>No items available.</p>
//                   )}
//                 </Modal.Body>
//               </Modal>
//             </div>
//           </div>
//         )}
//         {/* Tables Screen */}
//         {activeTab === 'tables' && (
//           <div className="h-100">
//             <TableManagement
//               onTableSelect={handleTableSelect}
//               onJumpToOrders={onJumpToOrders}
//               onSelectTable={setSelectedTable}
//             />
//           </div>
//         )}
//         {/* Orders Screen */}
//         {activeTab === 'orders' && (
//           <div className="h-100">
//             <div className="card border-0 shadow-sm h-100">
//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover mb-0">
//                     <thead className="bg-light">
//                       <tr>
//                         <th>Order ID</th>
//                         <th>Table</th>
//                         <th>Customer</th>
//                         <th>Items</th>
//                         <th>Total</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">Loading...</td>
//                         </tr>
//                       ) : orders.length === 0 ? (
//                         <tr>
//                           <td colSpan="8" className="text-center py-5">
//                             <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
//                             <h2 className="h4 card-title mb-2">No Orders Yet</h2>
//                             <p className="card-text text-muted">Your orders will appear here once created.</p>
//                           </td>
//                         </tr>
//                       ) : (
//                         orders.map((order) => (
//                           <tr key={order.id}>
//                             <td>#{order.order_number}</td>
//                             <td>{order.table_name} ({order.table_number})</td>
//                             <td>{order.customer_name}</td>
//                             <td>—</td>
//                             <td>${parseFloat(order.total_amount).toFixed(2)}</td>
//                             <td>{new Date(order.created_at).toLocaleTimeString()}</td>
//                             <td>
//                               <span className={`badge ${order.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
//                                 {order.status}
//                               </span>
//                             </td>
//                             <td>
//                               <Link to={`/staff/billingpayment/${order.id}`}>
//                                 <button className="btn btn-success btn-sm flex-grow-1">
//                                   <i className="fa fa-credit-card me-1 small"></i>Pay
//                                 </button>
//                               </Link>
//                             </td>
//                           </tr>
//                         ))
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Customer Modal */}
//       {isCustomerModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Customer Information</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Select Customer</label>
//                   <select
//                     className="form-select"
//                     value={selectedCustomer ? selectedCustomer.id : ""}
//                     onChange={(e) => {
//                       const customerId = e.target.value;
//                       if (customerId) {
//                         const customer = customers.find(c => c.id === parseInt(customerId));
//                         setSelectedCustomer(customer);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: customer.name,
//                           phone: customer.phone
//                         });
//                       } else {
//                         setSelectedCustomer(null);
//                         setCustomerInfo({
//                           ...customerInfo,
//                           name: '',
//                           phone: ''
//                         });
//                       }
//                     }}
//                   >
//                     <option value="">Select Customer</option>
//                     {loadingCustomers ? (
//                       <option disabled>Loading customers...</option>
//                     ) : (
//                       customers.map((customer) => (
//                         <option key={customer.id} value={customer.id}>
//                           {customer.name} ({customer.phone})
//                         </option>
//                       ))
//                     )}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={customerInfo.name}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
//                     placeholder="Enter customer name"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={customerInfo.phone}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
//                     placeholder="Enter phone number"
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Special Requests</label>
//                   <textarea
//                     className="form-control"
//                     rows={3}
//                     value={customerInfo.specialRequests}
//                     onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
//                     placeholder="Enter any special requests"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsCustomerModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Note Modal */}
//       {isNoteModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Order Notes</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Special Instructions</label>
//                   <textarea
//                     className="form-control"
//                     rows={6}
//                     value={orderNote}
//                     onChange={(e) => setOrderNote(e.target.value)}
//                     placeholder="Enter cooking preferences, allergies, or special requests..."
//                     maxLength={500}
//                   ></textarea>
//                   <div className="text-end small text-muted mt-1">
//                     {orderNote.length}/500 characters
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={() => setIsNoteModalOpen(false)}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Sides Selection Modal */}
//       {isSidesModalOpen && selectedProduct && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <div>
//                   <h5 className="modal-title">{selectedProduct.name}</h5>
//                   <div className="small text-muted">
//                     ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <h6 className="mb-3">Sides</h6>
//                 <div className="row row-cols-2 g-3">
//                   {selectedProduct?.sides?.map((side) => (
//                     <div key={side.id} className="col">
//                       <button
//                         type="button"
//                         onClick={() => handleSideToggle(side)}
//                         className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
//                           ? 'btn-outline-warning active'
//                           : 'btn-outline-secondary'
//                           }`}
//                       >
//                         <div className="d-flex flex-column align-items-center">
//                           <span className="fw-bold">{side.name}</span>
//                         </div>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => {
//                     setIsSidesModalOpen(false);
//                     setSelectedProduct(null);
//                     setSelectedSides([]);
//                   }}
//                 >
//                   Discard
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleAddWithSides}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Split Modal */}
//       {isSplitModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Split Order</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">Number of Splits</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={splitCount}
//                     onChange={(e) => setSplitCount(parseInt(e.target.value) || 1)}
//                     min="1"
//                   />
//                 </div>
//                 <div className="alert alert-info">
//                   Total Amount: ${calculateTotal().toFixed(2)}<br />
//                   Amount per person: ${(calculateTotal() / splitCount).toFixed(2)}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setIsSplitModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-warning"
//                   onClick={handleSplitOrder}
//                 >
//                   Split Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Actions Modal */}
//       {isActionsModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Actions</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsActionsModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row row-cols-3 g-3">
//                   {[
//                     { icon: 'fa-sticky-note', text: 'Customer Note', action: 'customerNote' },
//                     { icon: 'fa-file-invoice', text: 'Bill', action: 'bill' },
//                     { icon: 'fa-users', text: 'Guests', action: 'guests' },
//                     { icon: 'fa-percentage', text: 'Split', action: 'split' },
//                     { icon: 'fa-exchange-alt', text: 'Transfer / Merge', action: 'transferMerge' },
//                     { icon: 'fa-sync', text: 'Transfer course', action: 'transferCourse' },
//                     { icon: 'fa-list', text: 'Pricelist', action: 'pricelist' },
//                     { icon: 'fa-undo', text: 'Refund', action: 'refund' },
//                     { icon: 'fa-receipt', text: 'Tax', action: 'tax' },
//                     { icon: 'fa-print', text: 'Print Receipt', action: 'printReceipt' },
//                   ].map((action, index) => (
//                     <div key={index} className="col">
//                       <button
//                         onClick={() => handleAction(action.action)}
//                         className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                       >
//                         <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
//                         <span className="small">{action.text}</span>
//                       </button>
//                     </div>
//                   ))}
//                   <div className="col-6">
//                     <button
//                       onClick={() => handleAction('cancelOrder')}
//                       className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
//                     >
//                       <i className="fa fa-times-circle fs-4 mb-2"></i>
//                       <span className="small">Cancel Order</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Receipt Modal */}
//       {isReceiptModalOpen && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Receipt</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   aria-label="Close"
//                   onClick={() => setIsReceiptModalOpen(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="receipt-container">
//                   {/* Receipt Header */}
//                   <div className="receipt-header">
//                     <div className="receipt-title">RESTAURANT NAME</div>
//                     <div className="receipt-subtitle">123 Main Street, City</div>
//                     <div className="receipt-subtitle">Phone: (123) 456-7890</div>
//                     <div className="receipt-subtitle">--------------------------------</div>
//                   </div>
//                   {/* Order Information */}
//                   <div className="receipt-section">
//                     <div className="receipt-section-title">ORDER INFORMATION</div>
//                     <div className="receipt-item">
//                       <span>Receipt #:</span>
//                       <span>{selectedOrder ? selectedOrder.order_number : `TEMP-${Date.now()}`}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Date:</span>
//                       <span>{new Date().toLocaleDateString()}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Time:</span>
//                       <span>{new Date().toLocaleTimeString()}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Order Type:</span>
//                       <span>{orderType === 'dineIn' ? 'Dine In' : orderType === 'takeOut' ? 'Take Out' : 'Delivery'}</span>
//                     </div>
//                   </div>
//                   {/* Table Details */}
//                   {selectedTable && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">TABLE DETAILS</div>
//                       <div className="receipt-item">
//                         <span>Table:</span>
//                         <span>{selectedTable.table_name} ({selectedTable.table_number})</span>
//                       </div>
//                       <div className="receipt-item">
//                         <span>Type:</span>
//                         <span>{selectedTable.table_type}</span>
//                       </div>
//                       <div className="receipt-item">
//                         <span>Capacity:</span>
//                         <span>{selectedTable.capacity} people</span>
//                       </div>
//                     </div>
//                   )}
//                   {/* Customer Details */}
//                   {customerInfo.name && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">CUSTOMER DETAILS</div>
//                       <div className="receipt-item">
//                         <span>Name:</span>
//                         <span>{customerInfo.name}</span>
//                       </div>
//                       {customerInfo.phone && (
//                         <div className="receipt-item">
//                           <span>Phone:</span>
//                           <span>{customerInfo.phone}</span>
//                         </div>
//                       )}
//                       {selectedCustomer && (
//                         <div className="receipt-item">
//                           <span>Type:</span>
//                           <span>Registered Customer</span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                   {/* Order Items */}
//                   <div className="receipt-section">
//                     <div className="receipt-section-title">ORDER ITEMS</div>
//                     {orderItems.map((item, index) => (
//                       <div key={index}>
//                         <div className="receipt-item">
//                           <span>{item.name} x {item.quantity}</span>
//                           <span>${(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                         {item.sides && item.sides.length > 0 && (
//                           <div className="receipt-item" style={{ paddingLeft: '10px', fontSize: '10px' }}>
//                             <span>+ {item.sides.map(s => s.name).join(', ')}</span>
//                             <span>${item.sides.reduce((sum, side) => sum + side.price, 0).toFixed(2)}</span>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {/* Order Totals */}
//                   <div className="receipt-section">
//                     <div className="receipt-item">
//                       <span>Subtotal:</span>
//                       <span>${calculateSubtotal().toFixed(2)}</span>
//                     </div>
//                     <div className="receipt-item">
//                       <span>Tax ({taxPercentage}%):</span>
//                       <span>${calculateTax().toFixed(2)}</span>
//                     </div>
//                     <div className="receipt-total">
//                       <span>TOTAL:</span>
//                       <span>${calculateTotal().toFixed(2)}</span>
//                     </div>
//                   </div>
//                   {/* Order Note */}
//                   {orderNote && (
//                     <div className="receipt-section">
//                       <div className="receipt-section-title">NOTE</div>
//                       <div>{orderNote}</div>
//                     </div>
//                   )}
//                   {/* Receipt Footer */}
//                   <div className="receipt-header" style={{ marginTop: '20px' }}>
//                     <div className="receipt-subtitle">--------------------------------</div>
//                     <div className="receipt-subtitle">Thank you for your visit!</div>
//                     <div className="receipt-subtitle">Please come again</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <Button variant="secondary" onClick={() => setIsReceiptModalOpen(false)}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={handlePrintReceipt}>
//                   Print Receipt
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersManagement;

import React, { useState, useEffect } from 'react';
import './OrderManagement.css';
import TableManagement from './TableManagement';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axiosInstance from "../../../utils/axiosInstance";

const OrdersManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('register');
  const [activeFloor, setActiveFloor] = useState('main');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    specialRequests: ''
  });
  const [orderNote, setOrderNote] = useState('');
  const [orderType, setOrderType] = useState('dineIn');
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [isSidesModalOpen, setIsSidesModalOpen] = useState(false);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [splitCount, setSplitCount] = useState(2);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [businessSettings, setBusinessSettings] = useState(null);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [sessionData, setSessionData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle session data from navigation state
  useEffect(() => {
    if (location.state?.session && location.state?.fromSession) {
      const session = location.state.session;
      setSessionData(session);

      // Set table information
      setSelectedTable({
        id: session.table_id,
        table_number: session.table_number,
        table_name: session.table_name,
        table_type: session.table_type,
        status: session.status,
        hourly_rate: parseFloat(session.hourly_rate)
      });

      // Set customer information
      setCustomerInfo({
        name: session.customer_name || '',
        phone: session.customer_phone || '',
        specialRequests: ''
      });

      // Set order type to dine-in
      setOrderType('dineIn');

      // Switch to register tab
      setActiveTab('register');
    }
  }, [location.state]);

  // Fetch business settings to get tax information
  useEffect(() => {
    const fetchBusinessSettings = async () => {
      try {
        const response = await axiosInstance.get('/business_settings');
        const data = response.data.data;
        setBusinessSettings(data);
      } catch (error) {
        console.error('Error fetching business settings:', error);
        setBusinessSettings({
          tax: "5",
          receipt_footer: "Thank you for your visit!",
          system_mode: "online"
        });
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchBusinessSettings();
  }, []);

  // Helper function to check if table selection is required
  const requireTableForDineIn = (action = "proceed") => {
    if (orderType === 'dineIn' && !selectedTable) {
      alert(`Please select a table for Dine In order to ${action}`);
      setActiveTab('tables');
      return true;
    }
    return false;
  };

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        if (res.data.success) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchSubcategories = async () => {
      try {
        const res = await axiosInstance.get(
          `/subcategories?category_id=${selectedCategory}`
        );
        if (res.data.success) {
          setSubcategories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  // Fetch items when subcategory is clicked
  const handleSubcategoryClick = async (sub) => {
    try {
      const res = await axiosInstance.get(`/items/${sub.id}`);
      if (res.data.success) {
        setItems(res.data.data);
        setSelectedSubcategory(sub.subcategory_name);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Fetch orders

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/orders?page=${page}&limit=${limit}`);
      console.log("Orders API Response:", res.data); // Add this log for debugging

      if (res.data.success) {
        // The orders are directly in res.data.data, not res.data.data.orders
        setOrders(res.data.data || []);
        setTotalPages(res.data.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoadingCustomers(true);
      try {
        const res = await axiosInstance.get('/users?page=1&limit=10&role=user');
        if (res.data.data.users) {
          setCustomers(res.data.data.users);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  // Helper functions
  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    if (!businessSettings || !businessSettings.tax) return 0;
    const taxRate = parseFloat(businessSettings.tax);
    return (calculateSubtotal() * taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const addToOrder = (product) => {
    if (requireTableForDineIn("add items")) {
      return;
    }
    if (product.sides && product.sides.length > 0) {
      setSelectedProduct(product);
      setSelectedSides([]);
      setIsSidesModalOpen(true);
    } else {
      const existingItem = orderItems.find(item => item.id === product.id);
      if (existingItem) {
        setOrderItems(orderItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setOrderItems([...orderItems, { ...product, quantity: 1 }]);
      }
    }
  };

  const handleSideToggle = (side) => {
    setSelectedSides(prevSides => {
      const sideExists = prevSides.find(s => s.id === side.id);
      if (sideExists) {
        return prevSides.filter(s => s.id !== side.id);
      } else {
        return [...prevSides, side];
      }
    });
  };

  const handleAddWithSides = () => {
    const existingItem = orderItems.find(item =>
      item.id === selectedProduct.id &&
      JSON.stringify(item.sides) === JSON.stringify(selectedSides)
    );
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === selectedProduct.id && JSON.stringify(item.sides) === JSON.stringify(selectedSides)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        ...selectedProduct,
        quantity: 1,
        sides: selectedSides,
        price: selectedProduct.price + selectedSides.reduce((sum, side) => sum + side.price, 0)
      }]);
    }
    setIsSidesModalOpen(false);
    setSelectedProduct(null);
    setSelectedSides([]);
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setActiveTab('register');
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setOrderItems(order.items);
    setSelectedTable({
      table_number: order.table_number,
      table_name: order.table_name,
      table_type: order.table_type || 'dining',
      capacity: order.capacity || 4,
      status: order.status || 'available'
    });
    setCustomerInfo({
      name: order.customer || '',
      phone: '',
      specialRequests: ''
    });
    setActiveTab('register');
  };

  const handlePayment = () => {
    if (orderItems.length === 0) {
      alert("Please add items to the order first");
      return;
    }
    if (requireTableForDineIn("process payment")) {
      return;
    }
    const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;
    const orderData = {
      id: `temp-${Date.now()}`,
      order_number: `TEMP-${Date.now()}`,
      table_number: selectedTable ? selectedTable.table_number : null,
      table_name: selectedTable ? selectedTable.table_name : null,
      customer_name: customerInfo.name || "Walk-in Customer",
      order_type: orderType === 'dineIn' ? 'dine_in' : orderType === 'takeOut' ? 'take_out' : 'delivery',
      special_instructions: orderNote,
      items: orderItems.map(item => ({
        id: item.id,
        item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        total_price: (item.price * item.quantity).toFixed(2),
        special_instructions: item.sides && item.sides.length > 0
          ? `Sides: ${item.sides.map(side => side.name).join(', ')}`
          : ''
      })),
      subtotal: calculateSubtotal().toFixed(2),
      tax_amount: calculateTax().toFixed(2),
      total_amount: calculateTotal().toFixed(2),
      created_at: new Date().toISOString(),
      status: 'pending',
      tax_percentage: taxPercentage
    };
    navigate('/staff/billingguestpayment', { state: { orderData } });
  };


  const handleSendOrder = async () => {
    if (requireTableForDineIn("send the order")) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Please add items to the order first");
      return;
    }
    try {
      // Calculate order totals
      const subtotal = calculateSubtotal();
      const taxAmount = calculateTax();
      const totalAmount = calculateTotal();
      const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;

      // Prepare order items with complete details
      const preparedOrderItems = orderItems.map(item => {
        // Calculate item total including sides
        const sidesTotal = item.sides ? item.sides.reduce((sum, side) => sum + side.price, 0) : 0;
        const itemTotalBeforeTax = (item.price + sidesTotal) * item.quantity;
        const itemTax = (itemTotalBeforeTax * taxPercentage) / 100;
        const itemTotalWithTax = itemTotalBeforeTax + itemTax;

        return {
          item_details: {
            ...item, // Include all item properties
            sides: item.sides || [] // Ensure sides is included
          },
          quantity: item.quantity,
          special_instructions: item.sides && item.sides.length > 0
            ? `Sides: ${item.sides.map(side => side.name).join(', ')}`
            : '',
          // Item pricing details
          base_price: item.price,
          sides_total: sidesTotal,
          item_total_before_tax: itemTotalBeforeTax,
          item_tax: itemTax,
          item_total_with_tax: itemTotalWithTax
        };
      });

      // Determine order type
      let orderTypeValue;
      if (orderType === 'dineIn') {
        orderTypeValue = 'dine_in';
      } else if (orderType === 'takeOut') {
        orderTypeValue = 'take_out';
      } else {
        orderTypeValue = 'delivery';
      }

      const orderData = {
        session_id: sessionData?.id || null,
        table_id: selectedTable ? selectedTable.id : null,
        customer_name: customerInfo.name || "Walk-in Customer",
        order_type: orderTypeValue,
        special_instructions: orderNote,
        items: preparedOrderItems, // Send complete item details
        // Order totals
        subtotal: subtotal.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        tax_percentage: taxPercentage
      };

      console.log("Prepared Order Data:", orderData);


      const response = await axiosInstance.post('/orders', orderData);
      if (response.data.success) {
        alert('Order sent successfully!');
        setOrderItems([]);
        setSelectedTable(null);
        setCustomerInfo({ name: '', phone: '', specialRequests: '' });
        setOrderNote('');
        setSessionData(null);
        navigate('/staff/kotqueue');
      } else {
        alert('Failed to send order: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sending order:', error);
      alert('Error sending order: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleAction = (actionType) => {
    setIsActionsModalOpen(false);
    switch (actionType) {
      case 'customerNote':
        setIsNoteModalOpen(true);
        break;
      case 'bill':
        if (orderItems.length === 0) {
          alert("Please add items to the order first");
          return;
        }
        if (requireTableForDineIn("generate bill")) {
          return;
        }
        handlePayment();
        break;
      case 'guests':
        setIsCustomerModalOpen(true);
        break;
      case 'split':
        if (orderItems.length === 0) {
          alert("Please add items to the order first");
          return;
        }
        setIsSplitModalOpen(true);
        break;
      case 'transferMerge':
        if (orderItems.length === 0) {
          alert("Please add items to the order first");
          return;
        }
        if (requireTableForDineIn("transfer/merge order")) {
          return;
        }
        alert("Transfer/Merge functionality would be implemented here");
        break;
      case 'transferCourse':
        if (orderItems.length === 0) {
          alert("Please add items to the order first");
          return;
        }
        alert("Transfer course functionality would be implemented here");
        break;
      case 'pricelist':
        setActiveTab('register');
        setSelectedCategory(null);
        setSearchTerm('');
        break;
      case 'refund':
        if (orderItems.length === 0) {
          alert("No items to refund");
          return;
        }
        if (window.confirm("Are you sure you want to refund this order?")) {
          alert("Refund processed successfully");
          setOrderItems([]);
        }
        break;
      case 'tax':
        const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;
        alert(`Tax Amount: $${calculateTax().toFixed(2)} (${taxPercentage}%)`);
        break;
      case 'cancelOrder':
        if (orderItems.length === 0) {
          alert("No active order to cancel");
          return;
        }
        if (window.confirm("Are you sure you want to cancel this order?")) {
          setOrderItems([]);
          setSelectedTable(null);
          setCustomerInfo({ name: '', phone: '', specialRequests: '' });
          setOrderNote('');
        }
        break;
      case 'printReceipt':
        if (orderItems.length === 0) {
          alert("No items to print receipt for");
          return;
        }
        setIsReceiptModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleSplitOrder = () => {
    if (splitCount <= 0) {
      alert("Please enter a valid number of splits");
      return;
    }
    const amountPerPerson = calculateTotal() / splitCount;
    alert(`Split amount per person: $${amountPerPerson.toFixed(2)}`);
    setIsSplitModalOpen(false);
  };

  const handleClearOrder = () => {
    if (window.confirm("Are you sure you want to clear everything? This will reset customer details, items, table selection, and notes.")) {
      setOrderItems([]);
      setSelectedTable(null);
      setCustomerInfo({
        name: '',
        phone: '',
        specialRequests: ''
      });
      setOrderNote('');
      setSelectedCustomer(null);
      setSelectedOrder(null);
      setSessionData(null);
    }
  };

  useEffect(() => {
    const styles = document.createElement('style');
    styles.innerHTML = `
      .table-highlight {
        outline: 3px solid #3B82F6 !important;
        outline-offset: 4px;
        transition: outline-color 0.3s ease;
      }
      @keyframes pulse {
        0% { outline-color: #3B82F6; }
        50% { outline-color: #60A5FA; }
        100% { outline-color: #3B82F6; }
      }
      .animate-pulse {
        animation: pulse 1s infinite;
      }
      .selected-row {
        background-color: #fff3cd !important;
        border-left: 4px solid #ffc107;
      }
      .table-selectable {
        position: relative;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .table-selectable:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }
      .table-selectable.selected {
        box-shadow: 0 0 0 3px #3B82F6;
      }
      .receipt-container {
        font-family: 'Courier New', monospace;
        padding: 20px;
        max-width: 300px;
        margin: 0 auto;
        background-color: white;
      }
      .receipt-header {
        text-align: center;
        margin-bottom: 20px;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 10px;
      }
      .receipt-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .receipt-subtitle {
        font-size: 12px;
        margin-bottom: 5px;
      }
      .receipt-section {
        margin-bottom: 15px;
      }
      .receipt-section-title {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 14px;
      }
      .receipt-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 12px;
      }
      .receipt-total {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px dashed #ccc;
      }
      .session-indicator {
        border-left: 4px solid #0dcaf0;
      }
      @media print {
        body * {
          visibility: hidden;
        }
        .receipt-container, .receipt-container * {
          visibility: visible;
        }
        .receipt-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(styles);
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('courseDropdown');
      const button = document.getElementById('courseButton');
      if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.add('d-none');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onJumpToOrders = () => {
    setActiveTab("register");
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const taxPercentage = businessSettings ? parseFloat(businessSettings.tax) : 5;

  return (
    <div className="p-3">
      {/* Header */}
      <div className="">
        <h1 className="fs-3 fw-bold text-dark mb-0">Order Management</h1>
      </div>

      {/* Top Navigation */}
      <div className="mt-3 mb-3">
        <div className="d-flex overflow-auto">
          {['tables', 'register', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`btn ${activeTab === tab ? 'btn-warning' : 'btn-light'} rounded-pill mx-1 flex-shrink-0`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 overflow-hidden">
        {/* Register Screen */}
        {activeTab === 'register' && (
          <div className="d-flex flex-column flex-lg-row h-100">
            {/* Left Panel - Order Summary */}
            <div className="bg-white border-end d-flex flex-column" style={{ width: '100%', maxWidth: '350px' }}>
              {/* Customer Section */}
              <div className="p-2 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h3 className="h6 mb-0">Current Order</h3>
                  <span className="text-muted small">
                    {selectedTable ? `Table ${selectedTable.table_number}` : 'No Table Selected'}
                  </span>
                </div>

                {/* Session Information */}
                {sessionData && (
                  <div className="session-indicator mb-3 p-2 bg-info bg-opacity-10 rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold small">Session Information</span>
                      <span className="badge bg-info">Active Session</span>
                    </div>
                    <div className="small">
                      <div className="mb-1"><strong>Session ID:</strong> {sessionData.session_id}</div>
                      <div className="mb-1"><strong>Started:</strong> {new Date(sessionData.created_at).toLocaleString()}</div>
                      <div><strong>Current Cost:</strong> ${sessionData.session_cost}</div>
                    </div>
                  </div>
                )}

                {/* Table Details Section */}
                {selectedTable && (
                  <div className="table-details mb-3 p-2 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold small">Table Details</span>
                      <span className={`badge ${selectedTable.status === 'available' ? 'bg-success' : selectedTable.status === 'occupied' ? 'bg-danger' : 'bg-warning'}`}>
                        {selectedTable.status}
                      </span>
                    </div>
                    <div className="small">
                      <div className="mb-1"><strong>Name:</strong> {selectedTable.table_name}</div>
                      <div className="mb-1"><strong>Type:</strong> {selectedTable.table_type}</div>
                      <div><strong>Capacity:</strong> {selectedTable.capacity} people</div>
                      {selectedTable.hourly_rate && (
                        <div className="mt-1"><strong>Rate:</strong> ${selectedTable.hourly_rate}/hr</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Customer Details Section */}
                {customerInfo.name && (
                  <div className="customer-details mb-3 p-2 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold small">Customer Details</span>
                      <span className="badge bg-info">
                        {selectedCustomer ? 'Registered' : 'Walk-in'}
                      </span>
                    </div>
                    <div className="small">
                      <div className="mb-1"><strong>Name:</strong> {customerInfo.name}</div>
                      {customerInfo.phone && <div className="mb-1"><strong>Phone:</strong> {customerInfo.phone}</div>}
                      {customerInfo.specialRequests && (
                        <div><strong>Special Requests:</strong> {customerInfo.specialRequests}</div>
                      )}
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    onClick={() => setIsCustomerModalOpen(true)}
                    className="btn btn-light flex-grow-1 text-start btn-sm"
                  >
                    <i className="fa fa-user-plus me-2"></i>Add Customer
                  </button>
                  <button
                    onClick={() => setIsNoteModalOpen(true)}
                    className="btn btn-light flex-grow-1 text-start btn-sm"
                  >
                    <i className="fa fa-sticky-note me-2"></i>Note
                  </button>
                </div>
              </div>

              {/* Middle Section: Scrollable Order Items */}
              <div className="flex-grow-1" style={{ minHeight: '310px', overflowY: 'auto', scrollbarWidth: "none" }}>
                <div className="p-2">
                  {orderItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2">
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-semibold small">{item.name}</span>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOrderItems(orderItems.filter((orderItem, idx) => idx !== index));
                              }}
                              className="btn btn-link text-danger p-0"
                            >
                              <i className="fa fa-times small"></i>
                            </button>
                            <span className="text-muted small">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          <span className="text-muted small">Qty: {item.quantity}</span>
                          <span className="text-muted small ms-2"> ₹{parseFloat(item.price || 0).toFixed(2)} each</span>
                        </div>
                        {item.sides && item.sides.length > 0 && (
                          <div className="mt-1">
                            {item.sides.map((side) => (
                              <div key={side.id} className="d-flex justify-content-between small text-muted">
                                <span>+ {side.name}</span>
                                <span>${side.price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Section: Calculator + Totals */}
              <div className="p-2 border-top">
                {/* Calculator Display */}
                <div className="bg-light p-2 rounded mb-2">
                  <div className="text-end fs-4 font-monospace mb-1">
                    ${calculateTotal().toFixed(2)}
                  </div>
                  <div className="text-end small text-muted">
                    Subtotal: ${calculateSubtotal().toFixed(2)} + Tax ({taxPercentage}%): ${calculateTax().toFixed(2)}
                  </div>
                </div>

                {/* Order Type & Course */}
                <div className="d-flex gap-2 mb-2">
                  <button
                    onClick={() => {
                      const types = ['dineIn', 'takeOut', 'delivery'];
                      const currentIndex = types.indexOf(orderType);
                      const nextIndex = (currentIndex + 1) % types.length;
                      setOrderType(types[nextIndex]);
                      if (orderType === 'dineIn' && types[nextIndex] !== 'dineIn') {
                        setSelectedTable(null);
                      }
                    }}
                    className={`btn btn-sm flex-grow-1 ${orderType === 'dineIn' ? 'btn-warning' :
                      orderType === 'takeOut' ? 'btn-success' : 'btn-purple'
                      }`}
                  >
                    <span>
                      <i
                        className={`fa ${orderType === "dineIn"
                          ? "fa-cutlery"
                          : orderType === "takeOut"
                            ? "fa-shopping-bag"
                            : "fa-motorcycle"
                          } me-2 small`}
                      ></i>
                      {orderType === "dineIn"
                        ? "Dine In"
                        : orderType === "takeOut"
                          ? "Take Out"
                          : "Delivery"}
                    </span>
                  </button>
                  <button
                    onClick={handlePayment}
                    className="btn btn-success btn-sm flex-grow-1"
                  >
                    <i className="fa fa-credit-card me-1 small"></i>Pay
                  </button>
                  <button
                    onClick={() => setIsActionsModalOpen(true)}
                    className="btn btn-light btn-sm"
                  >
                    <i className="fas fa-ellipsis-vertical small"></i>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  {orderType === 'dineIn' &&
                    <button
                      onClick={() => {
                        setActiveTab('tables');
                        setSelectedTable(null);
                        setOrderItems([]);
                        setSelectedOrder(null);
                      }}
                      className="btn btn-dark btn-sm flex-grow-1"
                    >
                      New
                    </button>
                  }
                  <button
                    onClick={handleClearOrder}
                    className="btn btn-danger btn-sm flex-grow-1"
                  >
                    <i className="fa fa-trash me-1 small"></i>Clear
                  </button>
                  <button
                    onClick={handleSendOrder}
                    className="btn btn-warning btn-sm flex-grow-1"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column">
              {/* Search Bar */}
              <div className="p-2">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Category Switcher */}
              <div className="p-3">
                <div className="d-flex gap-2 overflow-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`btn ${selectedCategory === category.id ? "btn-warning" : "btn-light"
                        } flex-shrink-0`}
                    >
                      {category.category_name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Switcher */}
              {subcategories.length > 0 && (
                <div className="px-3 pb-3">
                  <div className="d-flex gap-2 overflow-auto">
                    {subcategories.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubcategoryClick(sub)}
                        className="btn btn-outline-secondary flex-shrink-0"
                      >
                        {sub.subcategory_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <div className="flex-grow-1 p-3 overflow-auto">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addToOrder(product)}
                      className="col"
                    >
                      <div className="card h-100 cursor-pointer hover-shadow border-0">
                        <div className="card-body text-center d-flex flex-column justify-content-center">
                          <h5 className="card-title mb-1">{product.name}</h5>
                          <p className="h5 text-warning mb-0">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="small text-muted mt-1">
                            <i className="fa fa-plus-circle mr-1"></i>
                            Select options
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal for Items */}
              <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedSubcategory} Items</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {items.length > 0 ? (
                    <div className="list-group">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <h6 className="mb-1">{item.item_name}</h6>
                            <small className="text-muted">
                              Printer: {item.printer_name}
                            </small>
                          </div>
                          <div>
                            <span className="fw-bold text-warning me-3">
                              ₹{parseFloat(item.price || 0).toFixed(2)}
                            </span>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => {
                                addToOrder(item);
                                setShowModal(false);
                              }}
                            >
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No items available.</p>
                  )}
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )}

        {/* Tables Screen */}
        {activeTab === 'tables' && (
          <div className="h-100">
            <TableManagement
              onTableSelect={handleTableSelect}
              onJumpToOrders={onJumpToOrders}
              onSelectTable={setSelectedTable}
            />
          </div>
        )}

        {/* Orders Screen */}
        {activeTab === 'orders' && (
          <div className="h-100">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Table</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Subtotal</th>
                        <th>Tax</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="12" className="text-center py-5">Loading...</td>
                        </tr>
                      ) : orders.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="text-center py-5">
                            <i className="fa fa-receipt text-muted fs-1 mb-3"></i>
                            <h2 className="h4 card-title mb-2">No Orders Yet</h2>
                            <p className="card-text text-muted">Your orders will appear here once created.</p>
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.order_number}</td>
                            <td>
                              {order.table_name && order.table_number
                                ? `${order.table_name} (${order.table_number})`
                                : 'N/A'}
                            </td>
                            <td>{order.customer_name || 'N/A'}</td>
                            <td>
                              {order.items && order.items.length > 0 ? (
                                <div>
                                  <div className="fw-semibold">{order.items.length} items</div>
                                  <div className="small text-muted">
                                    {order.items.slice(0, 2).map((item, idx) => (
                                      <div key={idx}>
                                        Item #{item.item_details.id} × {item.quantity}
                                      </div>
                                    ))}
                                    {order.items.length > 2 && (
                                      <div>+{order.items.length - 2} more</div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-muted">No items</span>
                              )}
                            </td>
                            <td>${parseFloat(order.subtotal || 0).toFixed(2)}</td>
                            <td>${parseFloat(order.tax_amount || 0).toFixed(2)}</td>
                            <td>${parseFloat(order.discount_amount || 0).toFixed(2)}</td>
                            <td>${parseFloat(order.total_amount || 0).toFixed(2)}</td>
                            <td>{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td>
                              <span className={`badge ${order.status === "completed" ? "bg-success" :
                                order.status === "pending" ? "bg-warning text-dark" :
                                  order.status === "cancelled" ? "bg-danger" : "bg-info"}`}>
                                {order.status}
                              </span>
                            </td>
                            <td>
                              <Link to={`/staff/billingpayment/${order.id}`}>
                                <button className="btn btn-success btn-sm flex-grow-1">
                                  <i className="fa fa-credit-card me-1 small"></i>Pay
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsCustomerModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Customer</label>
                  <select
                    className="form-select"
                    value={selectedCustomer ? selectedCustomer.id : ""}
                    onChange={(e) => {
                      const customerId = e.target.value;
                      if (customerId) {
                        const customer = customers.find(c => c.id === parseInt(customerId));
                        setSelectedCustomer(customer);
                        setCustomerInfo({
                          ...customerInfo,
                          name: customer.name,
                          phone: customer.phone
                        });
                      } else {
                        setSelectedCustomer(null);
                        setCustomerInfo({
                          ...customerInfo,
                          name: '',
                          phone: ''
                        });
                      }
                    }}
                  >
                    <option value="">Select Customer</option>
                    {loadingCustomers ? (
                      <option disabled>Loading customers...</option>
                    ) : (
                      customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} ({customer.phone})
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Special Requests</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={customerInfo.specialRequests}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, specialRequests: e.target.value })}
                    placeholder="Enter any special requests"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsCustomerModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setIsCustomerModalOpen(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {isNoteModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Notes</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsNoteModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Special Instructions</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Enter cooking preferences, allergies, or special requests..."
                    maxLength={500}
                  ></textarea>
                  <div className="text-end small text-muted mt-1">
                    {orderNote.length}/500 characters
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsNoteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setIsNoteModalOpen(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sides Selection Modal */}
      {isSidesModalOpen && selectedProduct && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title">{selectedProduct.name}</h5>
                  <div className="small text-muted">
                    ${selectedProduct.price.toFixed(2)} (+ VAT: 5% DU)
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setIsSidesModalOpen(false);
                    setSelectedProduct(null);
                    setSelectedSides([]);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <h6 className="mb-3">Sides</h6>
                <div className="row row-cols-2 g-3">
                  {selectedProduct?.sides?.map((side) => (
                    <div key={side.id} className="col">
                      <button
                        type="button"
                        onClick={() => handleSideToggle(side)}
                        className={`btn w-100 p-3 ${selectedSides.find((s) => s.id === side.id)
                          ? 'btn-outline-warning active'
                          : 'btn-outline-secondary'
                          }`}
                      >
                        <div className="d-flex flex-column align-items-center">
                          <span className="fw-bold">{side.name}</span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsSidesModalOpen(false);
                    setSelectedProduct(null);
                    setSelectedSides([]);
                  }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleAddWithSides}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Split Modal */}
      {isSplitModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Split Order</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsSplitModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Number of Splits</label>
                  <input
                    type="number"
                    className="form-control"
                    value={splitCount}
                    onChange={(e) => setSplitCount(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                </div>
                <div className="alert alert-info">
                  Total Amount: ${calculateTotal().toFixed(2)}<br />
                  Amount per person: ${(calculateTotal() / splitCount).toFixed(2)}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsSplitModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleSplitOrder}
                >
                  Split Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions Modal */}
      {isActionsModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actions</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsActionsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row row-cols-3 g-3">
                  {[
                    { icon: 'fa-sticky-note', text: 'Customer Note', action: 'customerNote' },
                    { icon: 'fa-file-invoice', text: 'Bill', action: 'bill' },
                    { icon: 'fa-users', text: 'Guests', action: 'guests' },
                    { icon: 'fa-percentage', text: 'Split', action: 'split' },
                    { icon: 'fa-exchange-alt', text: 'Transfer / Merge', action: 'transferMerge' },
                    { icon: 'fa-sync', text: 'Transfer course', action: 'transferCourse' },
                    { icon: 'fa-list', text: 'Pricelist', action: 'pricelist' },
                    { icon: 'fa-undo', text: 'Refund', action: 'refund' },
                    { icon: 'fa-receipt', text: 'Tax', action: 'tax' },
                    { icon: 'fa-print', text: 'Print Receipt', action: 'printReceipt' },
                  ].map((action, index) => (
                    <div key={index} className="col">
                      <button
                        onClick={() => handleAction(action.action)}
                        className="btn btn-light w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                      >
                        <i className={`fa ${action.icon} fs-4 mb-2 text-muted`}></i>
                        <span className="small">{action.text}</span>
                      </button>
                    </div>
                  ))}
                  <div className="col-6">
                    <button
                      onClick={() => handleAction('cancelOrder')}
                      className="btn btn-outline-danger w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                    >
                      <i className="fa fa-times-circle fs-4 mb-2"></i>
                      <span className="small">Cancel Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {isReceiptModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Receipt</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setIsReceiptModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="receipt-container">
                  {/* Receipt Header */}
                  <div className="receipt-header">
                    <div className="receipt-title">RESTAURANT NAME</div>
                    <div className="receipt-subtitle">123 Main Street, City</div>
                    <div className="receipt-subtitle">Phone: (123) 456-7890</div>
                    <div className="receipt-subtitle">--------------------------------</div>
                  </div>

                  {/* Order Information */}
                  <div className="receipt-section">
                    <div className="receipt-section-title">ORDER INFORMATION</div>
                    <div className="receipt-item">
                      <span>Receipt #:</span>
                      <span>{selectedOrder ? selectedOrder.order_number : `TEMP-${Date.now()}`}</span>
                    </div>
                    <div className="receipt-item">
                      <span>Date:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="receipt-item">
                      <span>Time:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                    <div className="receipt-item">
                      <span>Order Type:</span>
                      <span>{orderType === 'dineIn' ? 'Dine In' : orderType === 'takeOut' ? 'Take Out' : 'Delivery'}</span>
                    </div>
                  </div>

                  {/* Table Details */}
                  {selectedTable && (
                    <div className="receipt-section">
                      <div className="receipt-section-title">TABLE DETAILS</div>
                      <div className="receipt-item">
                        <span>Table:</span>
                        <span>{selectedTable.table_name} ({selectedTable.table_number})</span>
                      </div>
                      <div className="receipt-item">
                        <span>Type:</span>
                        <span>{selectedTable.table_type}</span>
                      </div>
                      <div className="receipt-item">
                        <span>Capacity:</span>
                        <span>{selectedTable.capacity} people</span>
                      </div>
                    </div>
                  )}

                  {/* Customer Details */}
                  {customerInfo.name && (
                    <div className="receipt-section">
                      <div className="receipt-section-title">CUSTOMER DETAILS</div>
                      <div className="receipt-item">
                        <span>Name:</span>
                        <span>{customerInfo.name}</span>
                      </div>
                      {customerInfo.phone && (
                        <div className="receipt-item">
                          <span>Phone:</span>
                          <span>{customerInfo.phone}</span>
                        </div>
                      )}
                      {selectedCustomer && (
                        <div className="receipt-item">
                          <span>Type:</span>
                          <span>Registered Customer</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="receipt-section">
                    <div className="receipt-section-title">ORDER ITEMS</div>
                    {orderItems.map((item, index) => (
                      <div key={index}>
                        <div className="receipt-item">
                          <span>{item.name} x {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        {item.sides && item.sides.length > 0 && (
                          <div className="receipt-item" style={{ paddingLeft: '10px', fontSize: '10px' }}>
                            <span>+ {item.sides.map(s => s.name).join(', ')}</span>
                            <span>${item.sides.reduce((sum, side) => sum + side.price, 0).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="receipt-section">
                    <div className="receipt-item">
                      <span>Subtotal:</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="receipt-item">
                      <span>Tax ({taxPercentage}%):</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="receipt-total">
                      <span>TOTAL:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order Note */}
                  {orderNote && (
                    <div className="receipt-section">
                      <div className="receipt-section-title">NOTE</div>
                      <div>{orderNote}</div>
                    </div>
                  )}

                  {/* Receipt Footer */}
                  <div className="receipt-header" style={{ marginTop: '20px' }}>
                    <div className="receipt-subtitle">--------------------------------</div>
                    <div className="receipt-subtitle">Thank you for your visit!</div>
                    <div className="receipt-subtitle">Please come again</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button variant="secondary" onClick={() => setIsReceiptModalOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlePrintReceipt}>
                  Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;