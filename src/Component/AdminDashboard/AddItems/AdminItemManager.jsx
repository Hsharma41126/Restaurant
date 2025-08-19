// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Row, Col, Table, Modal, Spinner, Alert } from 'react-bootstrap';
// import { PlusCircle, Save, Pencil, Trash, Eye, Plus, ChevronDown, ChevronUp } from 'react-bootstrap-icons';
// import { apiUrl } from '../../../utils/config';
// import axiosInstance from '../../../utils/axiosInstance';

// const API_BASE_URL = 'https://restaurant-backend-production-a63a.up.railway.app/api';

// const AddItemPage = () => {
//   // Form states
//   const [category, setCategory] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [subcategory, setSubcategory] = useState('');
//   const [newSubcategory, setNewSubcategory] = useState('');
//   const [types, setTypes] = useState([]);
//   const [printer, setPrinter] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editingItemId, setEditingItemId] = useState(null);

//   // Modal states
//   const [showModal, setShowModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [viewItem, setViewItem] = useState(null);
//   const [expandedCategories, setExpandedCategories] = useState({});

//   // API states
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [printers, setPrinters] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch all categories on component mount
//   useEffect(() => {
//     fetchCategories();
//     fetchMenuItems();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await await fetch(`${apiUrl}/menu/categories`);
//       if (!response.ok) throw new Error('Failed to fetch categories');
//       const data = await response.json();
//       console.log("category", data)
//       setCategories(data.data.categories);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/menu/items?status=available`);

//       if (!response.ok) throw new Error('Failed to fetch menu items');
//       const data = await response.json();
//       console.log("menu items", data)
//       setMenuItems(data.data.items);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const fetchItemsByCategory = async (categoryId) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/menu/categories/${categoryId}/items`);
//       if (!response.ok) throw new Error('Failed to fetch items by category');
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       setError(err.message);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createCategory = async (categoryData) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/menu/categories`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(categoryData),
//       });
//       if (!response.ok) throw new Error('Failed to create category');
//       const data = await response.json();
//       setCategories([...categories, data]);
//       return data.id; // Return the new category ID
//     } catch (err) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createMenuItem = async (menuItemData) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post(`${apiUrl}/menu/items`, JSON.stringify(menuItemData), {
//         headers: {
//           'Content-Type': 'application/json',
//         },

//       });
//       if (!response.ok) throw new Error('Failed to create menu item');
//       const data = await response;
//       setMenuItems([...menuItems, data]);
//       return data;
//     } catch (err) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateMenuItem = async (itemId, menuItemData) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.put(`${API_BASE_URL}/menu/items/${itemId}`, JSON.stringify(menuItemData), {

//         headers: {
//           'Content-Type': 'application/json',

//         },

//       });
//       if (!response.ok) throw new Error('Failed to update menu item');
//       const data = await response;
//       // Update the menu items list
//       setMenuItems(menuItems.map(item => item.id === itemId ? data : item));
//       return data;
//     } catch (err) {
//       setError(err.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteMenuItem = async (itemId) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/menu/items/${itemId}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error('Failed to delete menu item');
//       // Remove the item from the menu items list
//       setMenuItems(menuItems.filter(item => item.id !== itemId));
//       return true;
//     } catch (err) {
//       setError(err.message);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddType = () => {
//     setTypes([...types, { name: '', price: '' }]);
//   };

//   const handleRemoveType = (index) => {
//     const updatedTypes = [...types];
//     updatedTypes.splice(index, 1);
//     setTypes(updatedTypes);
//   };

//   const handleTypeChange = (index, field, value) => {
//     const updatedTypes = [...types];
//     updatedTypes[index][field] = value;
//     setTypes(updatedTypes);
//   };

//   const resetForm = () => {
//     setCategory('');
//     setNewCategory('');
//     setSubcategory('');
//     setNewSubcategory('');
//     setTypes([]);
//     setPrinter('');
//     setEditIndex(null);
//     setEditingItemId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let finalCategoryId = category;
//       if (category === 'new') {
//         const newCategoryData = {
//           name: newCategory,
//           description: `Category for ${newCategory}`
//         };
//         const createdCategory = await createCategory(newCategoryData);
//         if (!createdCategory) return;
//         finalCategoryId = createdCategory.id;
//       }

//       const menuItemData = {
//         name: types[0].name, // Using first type as the main name
//         description: types.map(t => t.name).join(', '),
//         category_id: finalCategoryId,
//         price: parseFloat(types[0].price),
//         cost_price: parseFloat(types[0].price) * 0.5, // Assuming 50% cost price
//         printer_id: printer,
//         status: 'available',
//         image_url: 'https://example.com/default-image.jpg'
//       };

//       if (editingItemId) {
//         // Update existing item
//         await updateMenuItem(editingItemId, menuItemData);
//       } else {
//         // Create new item
//         await createMenuItem(menuItemData);
//       }

//       resetForm();
//       setShowModal(false);
//     } catch (err) {
//       setError(err.message || 'Failed to save item');
//     }
//   };

//   const handleEdit = (item) => {
//     setCategory(item.category_id.toString());
//     setTypes([{ name: item.name, price: item.price.toString() }]);
//     setPrinter(item.printer_id);
//     setEditingItemId(item.id);
//     setShowModal(true);
//   };

//   const handleDelete = async (itemId) => {
//     if (window.confirm('Are you sure you want to delete this item?')) {
//       await deleteMenuItem(itemId);
//     }
//   };

//   const handleView = (item) => {
//     setViewItem(item);
//     setShowViewModal(true);
//   };

//   const toggleCategory = async (categoryId) => {
//     setExpandedCategories(prev => ({
//       ...prev,
//       [categoryId]: !prev[categoryId]
//     }));

//     // If expanding and items not loaded yet, fetch them
//     if (!expandedCategories[categoryId] && !menuItems.some(item => item.category_id === categoryId)) {
//       const items = await fetchItemsByCategory(categoryId);
//       setMenuItems([...menuItems, ...items]);
//     }
//   };

//   console.log("menuitems", menuItems);
//   // Group items by category
//   const groupedItems = menuItems.reduce((acc, item) => {

//     const category = categories.find(c => c.id === item.category_id);
//     const categoryName = category ? category.name : `Category ${item.category_id}`;
//     console.log(category)
//     if (!acc[categoryName]) {
//       acc[categoryName] = {
//         id: item.category_id,
//         items: []
//       };
//     }
//     acc[categoryName].items.push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5>Menu Items Management</h5>
//         <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>
//           <Plus size={14} className="me-1" /> Add New Item
//         </Button>
//       </div>

//       {error && (
//         <Alert variant="danger" onClose={() => setError(null)} dismissible>
//           {error}
//         </Alert>
//       )}

//       {/* Items Table */}
//       <Card className="shadow-sm">
//         <Card.Body className="p-0">
//           {loading && menuItems.length === 0 ? (
//             <div className="text-center py-4">
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </div>
//           ) : menuItems.length === 0 ? (
//             <div className="text-center py-4 text-muted">
//               No items added yet. Click "Add New Item" to get started.
//             </div>
//           ) : (
//             <Table striped bordered hover className="mb-0">
//               <thead>
//                 <tr>
//                   <th>Category</th>
//                   <th>Items Count</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(groupedItems).map(([categoryName, categoryData]) => (
//                   <React.Fragment>
//                     <tr>
//                       <td>
//                         <div className="d-flex align-items-center">
//                           <Button
//                             variant="link"
//                             size="sm"
//                             onClick={() => toggleCategory(categoryData.id)}
//                             className="p-0 me-2"
//                           >
//                             {expandedCategories[categoryData.id] ? <ChevronUp /> : <ChevronDown />}
//                           </Button>
//                           {categoryName}
//                         </div>
//                       </td>
//                       <td>
//                         {categoryData.items.length} items
//                       </td>
//                       <td>
//                         <Button
//                           variant="outline-info"
//                           size="sm"
//                           className="py-0"
//                           onClick={() => toggleCategory(categoryData.id)}
//                         >
//                           {expandedCategories[categoryData.id] ? 'Hide' : 'View'} Details
//                         </Button>
//                       </td>
//                     </tr>
//                     {expandedCategories[categoryData.id] && categoryData.items.map((item) => (
//                       <tr key={item.id} className="bg-light">
//                         <td></td>
//                         <td>{item.name} - ₹{item.price}</td>
//                         <td>
//                           <Button variant="outline-info" size="sm" className="me-1 py-0" onClick={() => handleView(item)}>
//                             <Eye size={14} />
//                           </Button>
//                           <Button variant="outline-primary" size="sm" className="me-1 py-0" onClick={() => handleEdit(item)}>
//                             <Pencil size={14} />
//                           </Button>
//                           <Button variant="outline-danger" size="sm" className="py-0" onClick={() => handleDelete(item.id)}>
//                             <Trash size={14} />
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>{editingItemId ? 'Edit Item' : 'Add New Item'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             {/* Category Section */}
//             <Card className="mb-3">
//               <Card.Header className="bg-light p-2">
//                 <h6 className="mb-0">Category Information</h6>
//               </Card.Header>
//               <Card.Body className="p-2">
//                 <Form.Group className="mb-2">
//                   <Form.Label className="small">Select Category</Form.Label>
//                   <Form.Select
//                     value={category}
//                     onChange={(e) => {
//                       setCategory(e.target.value);
//                       setSubcategory('');
//                     }}
//                     size="sm"
//                   >
//                     <option value="">-- Select Category --</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
//                     ))}
//                     <option value="new">+ Add New Category</option>
//                   </Form.Select>
//                 </Form.Group>

//                 {category === 'new' && (
//                   <Form.Group className="mb-2">
//                     <Form.Label className="small">New Category Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                       placeholder="Enter new category name"
//                       size="sm"
//                       required
//                     />
//                   </Form.Group>
//                 )}
//               </Card.Body>
//             </Card>


//             {/* Printer Selection Section */}
//             {category && (
//               <Card className="mb-3">
//                 <Card.Header className="bg-light p-2">
//                   <h6 className="mb-0">Printer Selection</h6>
//                 </Card.Header>
//                 <Card.Body className="p-2">
//                   <Form.Group className="mb-2">
//                     <Form.Label className="small">Select Printer</Form.Label>
//                     <Form.Control
//                       as="select"
//                       value={printer}
//                       onChange={(e) => setPrinter(e.target.value)}
//                       size="sm"
//                       required
//                     >
//                       <option value="">-- Select Printer --</option>
//                       <option value="KITCHEN_01">Kitchen Printer</option>
//                       <option value="BAR_01">Bar Printer</option>
//                       <option value="MAIN_01">Main Printer</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Types and Prices Section */}
//             {category && (
//               <Card className="mb-3">
//                 <Card.Header className="bg-light p-2">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <h6 className="mb-0">Item Details</h6>
//                     <Button
//                       variant="outline-warning"
//                       size="sm"
//                       onClick={handleAddType}
//                       className="py-0"
//                       disabled={types.length >= 1} // Limiting to 1 item per API structure
//                     >
//                       <PlusCircle size={14} className="me-1" /> Add
//                     </Button>
//                   </div>
//                 </Card.Header>
//                 <Card.Body className="p-2">
//                   {types.length === 0 ? (
//                     <div className="text-center py-2 text-muted small">
//                       No item details added yet. Click "Add" to get started.
//                     </div>
//                   ) : (
//                     types.map((type, index) => (
//                       <Row key={index} className="mb-2 g-2 align-items-center">
//                         <Col md={6}>
//                           <Form.Control
//                             type="text"
//                             value={type.name}
//                             placeholder="Item name"
//                             onChange={(e) => handleTypeChange(index, 'name', e.target.value)}
//                             size="sm"
//                             required
//                           />
//                         </Col>
//                         <Col md={4}>
//                           <Form.Control
//                             type="number"
//                             value={type.price}
//                             placeholder="Price (₹)"
//                             onChange={(e) => handleTypeChange(index, 'price', e.target.value)}
//                             size="sm"
//                             required
//                           />
//                         </Col>
//                         <Col md={2}>
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             onClick={() => handleRemoveType(index)}
//                             className="w-100 py-0"
//                             disabled={types.length <= 1} // Must have at least one item
//                           >
//                             Remove
//                           </Button>
//                         </Col>
//                       </Row>
//                     ))
//                   )}
//                 </Card.Body>
//               </Card>
//             )}

//             {/* Submit Button */}
//             <div className="text-center mt-3">
//               <Button
//                 variant="warning"
//                 type="submit"
//                 size="sm"
//                 disabled={!category || types.length === 0 || !printer || loading}
//                 className="px-4 me-2"
//               >
//                 {loading ? (
//                   <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                 ) : (
//                   <>
//                     <Save size={14} className="me-1" /> {editingItemId ? 'Update' : 'Save'}
//                   </>
//                 )}
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 size="sm"
//                 onClick={() => { setShowModal(false); resetForm(); }}
//                 className="px-4"
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* View Item Modal */}
//       <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Item Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {viewItem && (
//             <div>
//               <p><strong>Category:</strong> {categories.find(c => c.id === viewItem.category_id)?.name || 'Unknown'}</p>
//               <p><strong>Name:</strong> {viewItem.name}</p>
//               <p><strong>Description:</strong> {viewItem.description}</p>
//               <p><strong>Price:</strong> ₹{viewItem.price}</p>
//               <p><strong>Cost Price:</strong> ₹{viewItem.cost_price}</p>
//               <p><strong>Printer:</strong> {viewItem.printer_id}</p>
//               <p><strong>Status:</strong> {viewItem.status}</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AddItemPage;



















import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Table, Modal } from 'react-bootstrap';
import { PlusCircle, Save, Pencil, Trash, Eye, Plus, ChevronDown, ChevronUp } from 'react-bootstrap-icons';

const AddItemPage = () => {
  // Form states
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [types, setTypes] = useState([]);
  const [printer, setPrinter] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Items table state with dummy data
  const [items, setItems] = useState([
    {
      category: 'Food',
      subcategory: 'Pizza',
      types: [
        { name: 'Cheese Pizza', price: '250' },
        { name: 'Veg Pizza', price: '200' }
      ],
      printer: 'Kitchen Printer'
    },
    {
      category: 'Food',
      subcategory: 'Burger',
      types: [
        { name: 'Aloo Tikki', price: '80' },
        { name: 'Chicken Burger', price: '150' }
      ],
      printer: 'Kitchen Printer'
    },
    {
      category: 'Drink',
      subcategory: 'Cold Drink',
      types: [
        { name: 'Pepsi', price: '40' },
        { name: 'Coke', price: '40' }
      ],
      printer: 'Bar Printer'
    },
    {
      category: 'Games',
      subcategory: 'Pool',
      types: [
        { name: '8 Ball', price: '100' },
        { name: '9 Ball', price: '120' }
      ],
      printer: 'Game Zone Printer'
    }
  ]);

  const categories = ['Food', 'Drink', 'Games'];
  const subcategories = {
    Food: ['Pizza', 'Burger', 'Pasta', 'Sandwich'],
    Drink: ['Cold Drink', 'Juice', 'Coffee', 'Tea'],
    Games: ['Pool', 'Carrom', 'Chess', 'Cards']
  };

  const printers = ['Kitchen Printer', 'Bar Printer', 'Main Printer', 'Game Zone Printer'];

  const defaultTypes = {
    Pizza: [
      { name: 'Cheese Pizza', price: '250' },
      { name: 'Veg Pizza', price: '200' },
      { name: 'Paneer Pizza', price: '300' }
    ],
    Burger: [
      { name: 'Aloo Tikki', price: '80' },
      { name: 'Chicken Burger', price: '150' }
    ],
    'Cold Drink': [
      { name: 'Pepsi', price: '40' },
      { name: 'Coke', price: '40' }
    ],
    Pool: [
      { name: '8 Ball', price: '100' },
      { name: '9 Ball', price: '120' }
    ]
  };

  const handleAddType = () => {
    setTypes([...types, { name: '', price: '' }]);
  };

  const handleRemoveType = (index) => {
    const updatedTypes = [...types];
    updatedTypes.splice(index, 1);
    setTypes(updatedTypes);
  };

  const handleTypeChange = (index, field, value) => {
    const updatedTypes = [...types];
    updatedTypes[index][field] = value;
    setTypes(updatedTypes);
  };

  useEffect(() => {
    if (subcategory && subcategory !== 'new') {
      const existingTypes = defaultTypes[subcategory] || [{ name: '', price: '' }];
      setTypes(existingTypes);
      
      if (['Pizza', 'Burger', 'Pasta'].includes(subcategory)) {
        setPrinter('Kitchen Printer');
      } else if (['Cold Drink', 'Juice'].includes(subcategory)) {
        setPrinter('Bar Printer');
      } else if (['Pool', 'Carrom'].includes(subcategory)) {
        setPrinter('Game Zone Printer');
      } else {
        setPrinter('Main Printer');
      }
    }
    if (subcategory === 'new') {
      setTypes([{ name: '', price: '' }]);
      setPrinter('Main Printer');
    }
  }, [subcategory]);

  const resetForm = () => {
    setCategory('');
    setNewCategory('');
    setSubcategory('');
    setNewSubcategory('');
    setTypes([]);
    setPrinter('');
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === 'new' ? newCategory : category;
    const finalSubcategory = subcategory === 'new' ? newSubcategory : subcategory;
    
    const newItem = {
      category: finalCategory,
      subcategory: finalSubcategory,
      types: [...types],
      printer
    };

    if (editIndex !== null) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = newItem;
      setItems(updatedItems);
    } else {
      // Add new item
      setItems([...items, newItem]);
    }

    resetForm();
    setShowModal(false);
  };

  const handleEdit = (index) => {
    const item = items[index];
    setCategory(item.category);
    setSubcategory(item.subcategory);
    setTypes(item.types);
    setPrinter(item.printer);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleView = (index) => {
    setViewItem(items[index]);
    setShowViewModal(true);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Menu Items Management</h5>
        <Button variant="warning" size="sm" onClick={() => setShowModal(true)}>
          <Plus size={14} className="me-1" /> Add New Item
        </Button>
      </div>

      {/* Items Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {items.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No items added yet. Click "Add New Item" to get started.
            </div>
          ) : (
            <Table striped bordered hover className="mb-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Subcategories</th>
                  <th>Items Count</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedItems).map(([category, categoryItems], catIndex) => (
                  <React.Fragment key={category}>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <Button 
                            variant="link" 
                            size="sm" 
                            onClick={() => toggleCategory(category)}
                            className="p-0 me-2"
                          >
                            {expandedCategories[category] ? <ChevronUp /> : <ChevronDown />}
                          </Button>
                          {category}
                        </div>
                      </td>
                      <td>{categoryItems.length} subcategories</td>
                      <td>
                        {categoryItems.reduce((sum, item) => sum + item.types.length, 0)} items
                      </td>
                      <td>
                        <Button 
                          variant="outline-info" 
                          size="sm" 
                          className="py-0"
                          onClick={() => toggleCategory(category)}
                        >
                          {expandedCategories[category] ? 'Hide' : 'View'} Details
                        </Button>
                      </td>
                    </tr>
                    {expandedCategories[category] && categoryItems.map((item, index) => {
                      const globalIndex = items.findIndex(i => 
                        i.category === item.category && 
                        i.subcategory === item.subcategory
                      );
                      return (
                        <tr key={`${catIndex}-${index}`} className="bg-light">
                          <td></td>
                          <td>{item.subcategory}</td>
                          <td>{item.types.length} items</td>
                          <td>
                            <Button variant="outline-info" size="sm" className="me-1 py-0" onClick={() => handleView(globalIndex)}>
                              <Eye size={14} />
                            </Button>
                            <Button variant="outline-primary" size="sm" className="me-1 py-0" onClick={() => handleEdit(globalIndex)}>
                              <Pencil size={14} />
                            </Button>
                            <Button variant="outline-danger" size="sm" className="py-0" onClick={() => handleDelete(globalIndex)}>
                              <Trash size={14} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Category Section */}
            <Card className="mb-3">
              <Card.Header className="bg-light p-2">
                <h6 className="mb-0">Category Information</h6>
              </Card.Header>
              <Card.Body className="p-2">
                <Form.Group className="mb-2">
                  <Form.Label className="small">Select Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubcategory('');
                    }}
                    size="sm"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="new">+ Add New Category</option>
                  </Form.Select>
                </Form.Group>

                {category === 'new' && (
                  <Form.Group className="mb-2">
                    <Form.Label className="small">New Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category name"
                      size="sm"
                      required
                    />
                  </Form.Group>
                )}
              </Card.Body>
            </Card>

            {/* Subcategory Section */}
            {category && (
              <Card className="mb-3">
                <Card.Header className="bg-light p-2">
                  <h6 className="mb-0">Subcategory Information</h6>
                </Card.Header>
                <Card.Body className="p-2">
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Select Subcategory</Form.Label>
                    <Form.Select
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      size="sm"
                      disabled={!category}
                    >
                      <option value="">-- Select Subcategory --</option>
                      {(subcategories[category] || []).map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                      <option value="new">+ Add New Subcategory</option>
                    </Form.Select>
                  </Form.Group>

                  {subcategory === 'new' && (
                    <Form.Group className="mb-2">
                      <Form.Label className="small">New Subcategory Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        placeholder="Enter new subcategory name"
                        size="sm"
                        required
                      />
                    </Form.Group>
                  )}
                </Card.Body>
              </Card>
            )}

            {/* Printer Selection Section */}
            {subcategory && (
              <Card className="mb-3">
                <Card.Header className="bg-light p-2">
                  <h6 className="mb-0">Printer Selection</h6>
                </Card.Header>
                <Card.Body className="p-2">
                  <Form.Group className="mb-2">
                    <Form.Label className="small">Select Printer</Form.Label>
                    <Form.Select
                      value={printer}
                      onChange={(e) => setPrinter(e.target.value)}
                      size="sm"
                      required
                    >
                      <option value="">-- Select Printer --</option>
                      {printers.map((printerOption) => (
                        <option key={printerOption} value={printerOption}>
                          {printerOption}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            )}

            {/* Types and Prices Section */}
            {subcategory && (
              <Card className="mb-3">
                <Card.Header className="bg-light p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Item Types and Prices</h6>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={handleAddType}
                      className="py-0"
                    >
                      <PlusCircle size={14} className="me-1" /> Add
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body className="p-2">
                  {types.length === 0 ? (
                    <div className="text-center py-2 text-muted small">
                      No types added yet. Click "Add" to get started.
                    </div>
                  ) : (
                    types.map((type, index) => (
                      <Row key={index} className="mb-2 g-2 align-items-center">
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            value={type.name}
                            placeholder="Item name"
                            onChange={(e) => handleTypeChange(index, 'name', e.target.value)}
                            size="sm"
                            required
                          />
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="number"
                            value={type.price}
                            placeholder="Price (₹)"
                            onChange={(e) => handleTypeChange(index, 'price', e.target.value)}
                            size="sm"
                            required
                          />
                        </Col>
                        <Col md={2}>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveType(index)}
                            className="w-100 py-0"
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    ))
                  )}
                </Card.Body>
              </Card>
            )}

            {/* Submit Button */}
            <div className="text-center mt-3">
              <Button
                variant="warning"
                type="submit"
                size="sm"
                disabled={!category || !subcategory || types.length === 0 || !printer}
                className="px-4 me-2"
              >
                <Save size={14} className="me-1" /> {editIndex !== null ? 'Update' : 'Save'}
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => { setShowModal(false); resetForm(); }}
                className="px-4"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* View Item Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewItem && (
            <div>
              <p><strong>Category:</strong> {viewItem.category}</p>
              <p><strong>Subcategory:</strong> {viewItem.subcategory}</p>
              <p><strong>Printer:</strong> {viewItem.printer}</p>
              
              <h6 className="mt-3">Items:</h6>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {viewItem.types.map((type, index) => (
                    <tr key={index}>
                      <td>{type.name}</td>
                      <td>{type.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddItemPage;