// import React, { useState } from 'react';
// import {
//   Container, Row, Col, Card, Button, Form,
//   Modal, Navbar, Nav, Badge, Dropdown,
//   FormControl, InputGroup, ListGroup
// } from 'react-bootstrap';
// import {
//   Dash, People, Search, Plus, Pencil, Trash,
//   Eye, EyeSlash, X, ChevronDown, Person
// } from 'react-bootstrap-icons';
// import { FaSearch, FaPlus } from "react-icons/fa";

// const StaffManagement = () => {


//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   // Open modal with staff details
//   const handleEditClick = (staff) => {
//     setSelectedStaff({ ...staff }); // create a copy to edit
//     setShowModal(true);
//   };

//   // Handle input changes in modal
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedStaff((prev) => ({ ...prev, [name]: value }));
//   };

//   // Save changes
//   const handleSave = () => {
//     handleUpdateStaff(selectedStaff); // update parent state or API
//     setShowModal(false);
//   };

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [staffMembers] = useState([
//     { id: 'sarah', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', role: 'Admin', color: 'primary' },
//     { id: 'michael', name: 'Michael Chen', phone: '+1 (555) 234-5678', role: 'Staff', color: 'success' },
//     { id: 'emily', name: 'Emily Rodriguez', phone: '+1 (555) 345-6789', role: 'Manager', color: 'info' },
//     { id: 'david', name: 'David Thompson', phone: '+1 (555) 456-7890', role: 'Staff', color: 'success' },
//     { id: 'jessica', name: 'Jessica Park', phone: '+1 (555) 567-8901', role: 'Staff', color: 'success' },
//     { id: 'robert', name: 'Robert Williams', phone: '+1 (555) 678-9012', role: 'Manager', color: 'info' }
//   ]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowModal(false);
//   };

//   const handleStaffSelect = (e) => {
//     setSelectedStaff(e.target.value);
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const getBadgeVariant = (role) => {
//     switch (role) {
//       case 'Admin': return 'primary';
//       case 'Manager': return 'info';
//       case 'Staff': return 'success';
//       default: return 'secondary';
//     }
//   };

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div className="p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h1 className="h4 fw-bold text-dark mb-0">Staff Management</h1>
//         </div>

//         <div className="d-flex align-items-center mt-3 mt-md-0">
//           <div className="input-group me-2">
//             <span className="input-group-text bg-white border-end-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Search staff..."
//               style={{ maxWidth: "220px" }}
//             />
//           </div>

//           <button
//             className="btn btn-warning d-flex align-items-center "
//             style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
//             onClick={handleShow}
//           >
//             <FaPlus />
//             Add New Staff
//           </button>

//           {/* Modal */}
//           <Modal show={show} onHide={handleClose} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Add New Staff</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form>
//                 <Form.Group className="mb-3" controlId="formUsername">
//                   <Form.Label>UserName</Form.Label>
//                   <Form.Control type="text" placeholder="Enter full name" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control type="email" placeholder="Enter Email" />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control type="password" placeholder="Enter Password" />
//                 </Form.Group>

//                 <div className="d-flex justify-content-between">
//                   <Button variant="warning" className="fw-semibold">
//                     Save Staff
//                   </Button>
//                   <Button variant="light" onClick={handleClose}>
//                     Cancel
//                   </Button>
//                 </div>
//               </Form>
//             </Modal.Body>
//           </Modal>

//         </div>
//       </div>

//       {/* Main Content */}
//       <div>
//         {/* Staff List */}
//         <div className="">
//           <Row className="g-4 mb-4">
//             {staffMembers.map((staff) => (
//               <Col key={staff.id} xs={12} md={6} lg={4}>
//                 <Card className="h-100 shadow-sm">
//                   <Card.Body>
//                     <div className="d-flex justify-content-between align-items-start mb-3">
//                       <div className="d-flex align-items-center">
//                         <div className={`bg-${staff.color}-subtle rounded-circle p-3 me-3`}>
//                           <Person className={`text-${staff.color}`} size={20} />
//                         </div>
//                         <div>
//                           <h6 className="mb-0">{staff.name}</h6>
//                           <small className="text-muted">{staff.phone}</small>
//                         </div>
//                       </div>
//                       <Badge bg={getBadgeVariant(staff.role)}>{staff.role}</Badge>
//                     </div>
//                     <div className="d-flex">
//                       <Button
//                         variant="light"
//                         className="me-2 flex-grow-1 text-dark"
//                         onClick={() => handleEditClick(staff)}
//                       >
//                         <Pencil className="me-1" />
//                         Edit
//                       </Button>
//                       <Button variant="outline-danger">
//                         <Trash />
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>

//           {/* Edit Modal */}
//           <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//             <Modal.Header closeButton>
//               <Modal.Title>Edit Staff Member</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {selectedStaff && (
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={selectedStaff.name || ""}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Phone</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="phone"
//                       value={selectedStaff.phone || ""}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Role</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="role"
//                       value={selectedStaff.role || ""}
//                       onChange={handleChange}
//                     />
//                   </Form.Group>
//                 </Form>
//               )}
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={() => setShowModal(false)}>
//                 Cancel
//               </Button>
//               <Button variant="primary" onClick={handleSave}>
//                 Save Changes
//               </Button>
//             </Modal.Footer>
//           </Modal>

//           {/* Access Management */}
//           <Card className="mb-4">
//             <Card.Body>
//               <h4 className="mb-4">Access Management</h4>

//               <Form.Group className="mb-4">
//                 <Form.Label>Select Staff Member</Form.Label>
//                 <Form.Select onChange={handleStaffSelect} value={selectedStaff}>
//                   <option value="">Choose a staff member...</option>
//                   {staffMembers.map(staff => (
//                     <option key={staff.id} value={staff.id}>
//                       {staff.name} ({staff.role})
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>

//               <Row className={`g-4 mb-4 ${!selectedStaff ? 'opacity-50' : ''}`}>
//                 {/* Tables Management */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">Tables Management</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="View Tables" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Manage Reservations" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Table Status" />
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 {/* Order Processing */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">Order Processing</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Create Orders" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Modify Orders" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Cancel Orders" />
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 {/* Billing Access */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">Billing Access</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Generate Bills" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Process Payments" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="View Reports" />
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 {/* KOT Management */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">KOT Management</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Print KOT" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Modify KOT" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Kitchen Status" />
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 {/* Special Permissions */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">Special Permissions</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Void Orders" />
//                           <div className="ms-4">
//                             <Form.Check type="checkbox" label="Void Items" className="text-muted small" />
//                             <Form.Check type="checkbox" label="Void Full Order" className="text-muted small" />
//                             <Form.Check type="checkbox" label="Void After Payment" className="text-muted small" />
//                           </div>
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Apply Discounts" />
//                           <div className="ms-4">
//                             <Form.Check type="checkbox" label="Item Discount" className="text-muted small" />
//                             <Form.Check type="checkbox" label="Bill Discount" className="text-muted small" />
//                             <Form.Check type="checkbox" label="Special Offers" className="text-muted small" />
//                             <div className="d-flex align-items-center small text-muted">
//                               <Form.Check type="checkbox" className="me-2" />
//                               <span>Max Discount: </span>
//                               <Form.Select size="sm" className="ms-2 w-auto">
//                                 <option>5%</option>
//                                 <option>10%</option>
//                                 <option>15%</option>
//                                 <option>20%</option>
//                                 <option>25%</option>
//                               </Form.Select>
//                             </div>
//                           </div>
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>

//                 {/* Report Access */}
//                 <Col xs={12} md={6} lg={3}>
//                   <Card className="bg-light">
//                     <Card.Body>
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h6 className="mb-0">Report Access</h6>
//                         <Form.Check type="switch" />
//                       </div>
//                       <ListGroup variant="flush">
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Full Daily Report" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Table Daily Report" />
//                         </ListGroup.Item>
//                         <ListGroup.Item className="bg-transparent">
//                           <Form.Check type="checkbox" label="Item/Table Report" />
//                         </ListGroup.Item>
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>

//               <div className="d-flex justify-content-between align-items-center">
//                 <Card className="bg-primary-subtle flex-grow-1 me-4">
//                   <Card.Body>
//                     <h6 className="mb-2">Current Access Summary</h6>
//                     <p className="mb-0 small text-muted">
//                       Select a staff member to view their current permissions and access rights.
//                     </p>
//                   </Card.Body>
//                 </Card>
//                 <Button variant="warning" className="text-dark">
//                   Save Changes
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       {/* Add Staff Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Staff</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control type="text" placeholder="Enter full name" required />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control type="text" placeholder="Enter username" required />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" placeholder="Enter email address" required />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type={passwordVisible ? "text" : "password"}
//                   placeholder="Enter password"
//                   required
//                 />
//                 <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
//                   {passwordVisible ? <EyeSlash /> : <Eye />}
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control type="tel" placeholder="+1 (555) 123-4567" required />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Role</Form.Label>
//               <Form.Select required>
//                 <option value="">Select a role...</option>
//                 {/* <option value="admin">Admin</option> */}
//                 <option value="manager">Manager</option>
//                 <option value="staff">Staff</option>
//               </Form.Select>
//             </Form.Group>

//             <div className="d-flex gap-3">
//               <Button variant="warning" type="submit" className="text-dark flex-grow-1">
//                 Save Staff
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 className="flex-grow-1"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default StaffManagement;








// import React, { useState, useEffect } from 'react';
// import {
//   Container, Row, Col, Card, Button, Form,
//   Modal, Navbar, Nav, Badge, Dropdown,
//   FormControl, InputGroup, ListGroup, Alert
// } from 'react-bootstrap';
// import {
//   Dash, People, Search, Plus, Pencil, Trash,
//   Eye, EyeSlash, X, ChevronDown, Person, Gear
// } from 'react-bootstrap-icons';
// import { FaSearch, FaPlus } from "react-icons/fa";

// // Default permissions for each role
// const ROLE_PERMISSIONS = {
//   Admin: {
//     tablesManagement: { view: true, manage: true, status: true },
//     orderProcessing: { create: true, modify: true, cancel: true },
//     billingAccess: { generate: true, payments: true, reports: true },
//     kotManagement: { print: true, modify: true, status: true },
//     specialPermissions: {
//       voidOrders: { items: true, fullOrder: true, afterPayment: true },
//       discounts: { item: true, bill: true, offers: true, maxDiscount: 25 }
//     },
//     reportAccess: { daily: true, table: true, item: true },
//     canAddItems: true,
//     canChangePrices: true,
//     canManageStaff: true
//   },
//   Manager: {
//     tablesManagement: { view: true, manage: true, status: true },
//     orderProcessing: { create: true, modify: true, cancel: true },
//     billingAccess: { generate: true, payments: true, reports: true },
//     kotManagement: { print: true, modify: true, status: true },
//     specialPermissions: {
//       voidOrders: { items: true, fullOrder: false, afterPayment: false },
//       discounts: { item: true, bill: true, offers: true, maxDiscount: 15 }
//     },
//     reportAccess: { daily: true, table: true, item: true },
//     canAddItems: true,
//     canChangePrices: true,
//     canManageStaff: false
//   },
//   Staff: {
//     tablesManagement: { view: true, manage: false, status: true },
//     orderProcessing: { create: true, modify: false, cancel: false },
//     billingAccess: { generate: false, payments: false, reports: false },
//     kotManagement: { print: true, modify: false, status: true },
//     specialPermissions: {
//       voidOrders: { items: false, fullOrder: false, afterPayment: false },
//       discounts: { item: false, bill: false, offers: false, maxDiscount: 0 }
//     },
//     reportAccess: { daily: false, table: false, item: false },
//     canAddItems: false,
//     canChangePrices: false,
//     canManageStaff: false
//   }
// };

// const StaffManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newStaff, setNewStaff] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//     phone: '',
//     role: 'Staff'
//   });
//   const [permissions, setPermissions] = useState({});
//   const [staffMembers, setStaffMembers] = useState([
//     { id: 'sarah', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', role: 'Admin', color: 'primary', ...ROLE_PERMISSIONS.Admin },
//     { id: 'michael', name: 'Michael Chen', phone: '+1 (555) 234-5678', role: 'Staff', color: 'success', ...ROLE_PERMISSIONS.Staff },
//     { id: 'emily', name: 'Emily Rodriguez', phone: '+1 (555) 345-6789', role: 'Manager', color: 'info', ...ROLE_PERMISSIONS.Manager }
//   ]);

//   // Load permissions when staff is selected
//   useEffect(() => {
//     if (selectedStaff) {
//       const staff = staffMembers.find(s => s.id === selectedStaff);
//       if (staff) {
//         setPermissions(ROLE_PERMISSIONS[staff.role]);
//       }
//     }
//   }, [selectedStaff, staffMembers]);

//   const handleEditClick = (staff) => {
//     setSelectedStaff(staff.id);
//     setShowModal(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePermissionChange = (section, field, value) => {
//     setPermissions(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleSave = () => {
//     // Update staff permissions
//     const updatedStaff = staffMembers.map(staff =>
//       staff.id === selectedStaff ? { ...staff, ...permissions } : staff
//     );
//     setStaffMembers(updatedStaff);
//     setShowModal(false);
//   };

//   const handleAddStaff = () => {
//     const newStaffMember = {
//       id: newStaff.username.toLowerCase(),
//       name: newStaff.name,
//       phone: newStaff.phone,
//       role: newStaff.role,
//       color: newStaff.role === 'Admin' ? 'primary' : newStaff.role === 'Manager' ? 'info' : 'success',
//       ...ROLE_PERMISSIONS[newStaff.role]
//     };
//     setStaffMembers([...staffMembers, newStaffMember]);
//     setShowAddModal(false);
//     setNewStaff({
//       name: '',
//       username: '',
//       email: '',
//       password: '',
//       phone: '',
//       role: 'Staff'
//     });
//   };

//   const handleDeleteStaff = (id) => {
//     setStaffMembers(staffMembers.filter(staff => staff.id !== id));
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const getBadgeVariant = (role) => {
//     switch (role) {
//       case 'Admin': return 'primary';
//       case 'Manager': return 'info';
//       case 'Staff': return 'success';
//       default: return 'secondary';
//     }
//   };

//   const renderPermissionControls = () => {
//     if (!selectedStaff) return (
//       <Alert variant="info" className="mt-3">
//         Please select a staff member to manage their permissions
//       </Alert>
//     );

//     const staff = staffMembers.find(s => s.id === selectedStaff);
//     const isAdmin = staff.role === 'Admin';
//     const isManager = staff.role === 'Manager';

//     return (
//       <Row className="g-4 mb-4">
//         {/* Tables Management */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Tables Management</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.tablesManagement?.view}
//                   onChange={(e) => handlePermissionChange('tablesManagement', 'view', e.target.checked)}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="View Tables"
//                     checked={permissions.tablesManagement?.view}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'view', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Manage Reservations"
//                     checked={permissions.tablesManagement?.manage}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'manage', e.target.checked)}
//                     disabled={isAdmin || !permissions.tablesManagement?.view}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Table Status"
//                     checked={permissions.tablesManagement?.status}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'status', e.target.checked)}
//                     disabled={isAdmin || !permissions.tablesManagement?.view}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Order Processing */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Order Processing</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.orderProcessing?.create}
//                   onChange={(e) => handlePermissionChange('orderProcessing', 'create', e.target.checked)}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Create Orders"
//                     checked={permissions.orderProcessing?.create}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'create', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Modify Orders"
//                     checked={permissions.orderProcessing?.modify}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'modify', e.target.checked)}
//                     disabled={isAdmin || !permissions.orderProcessing?.create}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Cancel Orders"
//                     checked={permissions.orderProcessing?.cancel}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'cancel', e.target.checked)}
//                     disabled={isAdmin || !permissions.orderProcessing?.create}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Special Permissions */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Special Permissions</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.specialPermissions?.voidOrders?.items || permissions.specialPermissions?.discounts?.item}
//                   onChange={(e) => {
//                     const val = e.target.checked;
//                     handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       voidOrders: {
//                         items: val,
//                         fullOrder: val && (isAdmin || isManager),
//                         afterPayment: val && isAdmin
//                       },
//                       discounts: {
//                         item: val,
//                         bill: val && (isAdmin || isManager),
//                         offers: val && (isAdmin || isManager),
//                         maxDiscount: val ? (isAdmin ? 25 : isManager ? 15 : 0) : 0
//                       }
//                     });
//                   }}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Void Items"
//                     checked={permissions.specialPermissions?.voidOrders?.items}
//                     onChange={(e) => handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       voidOrders: { ...permissions.specialPermissions.voidOrders, items: e.target.checked }
//                     })}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Apply Discounts"
//                     checked={permissions.specialPermissions?.discounts?.item}
//                     onChange={(e) => handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       discounts: { ...permissions.specialPermissions.discounts, item: e.target.checked }
//                     })}
//                     disabled={isAdmin}
//                   />
//                   {permissions.specialPermissions?.discounts?.item && (
//                     <div className="ms-4 mt-2">
//                       <Form.Check
//                         type="checkbox"
//                         label="Item Discount"
//                         checked={permissions.specialPermissions.discounts.item}
//                         disabled
//                       />
//                       <Form.Check
//                         type="checkbox"
//                         label="Bill Discount"
//                         checked={permissions.specialPermissions.discounts.bill}
//                         disabled={isAdmin}
//                       />
//                       <Form.Check
//                         type="checkbox"
//                         label="Special Offers"
//                         checked={permissions.specialPermissions.discounts.offers}
//                         disabled={isAdmin}
//                       />
//                       <div className="d-flex align-items-center small mt-2">
//                         <span className="me-2">Max Discount:</span>
//                         <Form.Select
//                           size="sm"
//                           value={permissions.specialPermissions.discounts.maxDiscount}
//                           onChange={(e) => handlePermissionChange('specialPermissions', {
//                             ...permissions.specialPermissions,
//                             discounts: { ...permissions.specialPermissions.discounts, maxDiscount: parseInt(e.target.value) }
//                           })}
//                           disabled={isAdmin || !permissions.specialPermissions.discounts.item}
//                         >
//                           {[5, 10, 15, 20, 25].map(val => (
//                             <option key={val} value={val}>{val}%</option>
//                           ))}
//                         </Form.Select>
//                       </div>
//                     </div>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Add Menu Items"
//                     checked={permissions.canAddItems}
//                     onChange={(e) => handlePermissionChange('canAddItems', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Change Prices"
//                     checked={permissions.canChangePrices}
//                     onChange={(e) => handlePermissionChange('canChangePrices', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Role-specific information */}
//         <Col xs={12}>
//           <Card className="bg-primary-subtle">
//             <Card.Body>
//               <h6 className="mb-2">Current Access Summary for {staff.name}</h6>
//               <p className="mb-0">
//                 <strong>Role:</strong> {staff.role} - {staff.role === 'Admin' ?
//                   'Full system access including staff management' :
//                   staff.role === 'Manager' ?
//                     'Can manage orders, tables, and apply discounts (up to 15%)' :
//                     'Basic staff access for order creation and table viewing'}
//               </p>
//               {staff.role === 'Manager' && (
//                 <p className="mb-0 mt-2">
//                   <strong>Manager Privileges:</strong> Can add menu items, change prices,
//                   and apply discounts (up to {permissions.specialPermissions?.discounts?.maxDiscount || 0}%)
//                 </p>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     );
//   };

//   return (
//     <div className="p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h1 className="fs-3 fw-bold text-dark">Staff Management</h1>
//           <p className="text-muted small mb-0">
//             Manage staff members and their access permissions
//           </p>
//         </div>

//         <div className="d-flex align-items-center mt-3 mt-md-0">
//           <div className="input-group me-2">
//             <span className="input-group-text bg-white border-end-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Search staff..."
//               style={{ maxWidth: "220px" }}
//             />
//           </div>

//           <Button
//             variant="warning"
//             className="d-flex align-items-center"
//             style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
//             onClick={() => setShowAddModal(true)}
//           >
//             <FaPlus />
//             Add New Staff
//           </Button>
//         </div>
//       </div>

//       {/* Staff List */}
//       <Row className="g-4 mb-4">
//         {staffMembers.map((staff) => (
//           <Col key={staff.id} xs={12} md={6} lg={4}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-start mb-3">
//                   <div className="d-flex align-items-center">
//                     <div className={`bg-${staff.color}-subtle rounded-circle p-3 me-3`}>
//                       <Person className={`text-${staff.color}`} size={20} />
//                     </div>
//                     <div>
//                       <h6 className="mb-0">{staff.name}</h6>
//                       <small className="text-muted">{staff.phone}</small>
//                     </div>
//                   </div>
//                   <Badge bg={getBadgeVariant(staff.role)}>{staff.role}</Badge>
//                 </div>
//                 <div className="d-flex">
//                   <Button
//                     variant="light"
//                     className="me-2 flex-grow-1 text-dark"
//                     onClick={() => handleEditClick(staff)}
//                   >
//                     <Gear className="me-1" />
//                     Manage Permissions
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     onClick={() => handleDeleteStaff(staff.id)}
//                     disabled={staff.role === 'Admin'}
//                   >
//                     <Trash />
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Access Management Section */}
//       <Card className="mb-4">
//         <Card.Body>
//           <h4 className="mb-4">Access Management</h4>

//           <Form.Group className="mb-4">
//             <Form.Label>Select Staff Member</Form.Label>
//             <Form.Select
//               onChange={(e) => setSelectedStaff(e.target.value)}
//               value={selectedStaff || ''}
//             >
//               <option value="">Choose a staff member...</option>
//               {staffMembers.map(staff => (
//                 <option key={staff.id} value={staff.id}>
//                   {staff.name} ({staff.role})
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {renderPermissionControls()}

//           <div className="d-flex justify-content-end">
//             <Button
//               variant="warning"
//               className="text-dark"
//               onClick={handleSave}
//               disabled={!selectedStaff}
//             >
//               Save Changes
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Add Staff Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Staff</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter full name"
//                 value={newStaff.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 placeholder="Enter username"
//                 value={newStaff.username}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={newStaff.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter password"
//                   value={newStaff.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
//                   {passwordVisible ? <EyeSlash /> : <Eye />}
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="tel"
//                 name="phone"
//                 placeholder="+1 (555) 123-4567"
//                 value={newStaff.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Role</Form.Label>
//               <Form.Select
//                 name="role"
//                 value={newStaff.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Staff">Staff</option>
//                 <option value="Manager">Manager</option>
//               </Form.Select>
//               <Form.Text className="text-muted">
//                 Note: Admin roles can only be created by existing admins
//               </Form.Text>
//             </Form.Group>

//             <div className="d-flex gap-3">
//               <Button
//                 variant="warning"
//                 className="text-dark flex-grow-1"
//                 onClick={handleAddStaff}
//               >
//                 Save Staff
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 className="flex-grow-1"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Permissions Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Manage Permissions</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStaff && renderPermissionControls()}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default StaffManagement;
// import React, { useState, useEffect } from 'react';
// import { toast } from "react-toastify"; // optional for alerts
// import axios from "axios";
// import {
//   Container, Row, Col, Card, Button, Form,
//   Modal, Navbar, Nav, Badge, Dropdown,
//   FormControl, InputGroup, ListGroup, Alert, Pagination
// } from 'react-bootstrap';
// import {
//   Dash, People, Search, Plus, Pencil, Trash,
//   Eye, EyeSlash, X, ChevronDown, Person, Gear
// } from 'react-bootstrap-icons';
// import { FaSearch, FaPlus } from "react-icons/fa";
// import axiosInstance from "../../../utils/axiosInstance";

// // Default permissions for each role
// const ROLE_PERMISSIONS = {
//   admin: {
//     tablesManagement: { view: true, manage: true, status: true },
//     orderProcessing: { create: true, modify: true, cancel: true },
//     billingAccess: { generate: true, payments: true, reports: true },
//     kotManagement: { print: true, modify: true, status: true },
//     specialPermissions: {
//       voidOrders: { items: true, fullOrder: true, afterPayment: true },
//       discounts: { item: true, bill: true, offers: true, maxDiscount: 25 }
//     },
//     reportAccess: { daily: true, table: true, item: true },
//     canAddItems: true,
//     canChangePrices: true,
//     canManageStaff: true
//   },
//   user: {
//     tablesManagement: { view: true, manage: true, status: true },
//     orderProcessing: { create: true, modify: true, cancel: true },
//     billingAccess: { generate: true, payments: true, reports: true },
//     kotManagement: { print: true, modify: true, status: true },
//     specialPermissions: {
//       voidOrders: { items: true, fullOrder: false, afterPayment: false },
//       discounts: { item: true, bill: true, offers: true, maxDiscount: 15 }
//     },
//     reportAccess: { daily: true, table: true, item: true },
//     canAddItems: true,
//     canChangePrices: true,
//     canManageStaff: false
//   },
//   staff: {
//     tablesManagement: { view: true, manage: false, status: true },
//     orderProcessing: { create: true, modify: false, cancel: false },
//     billingAccess: { generate: false, payments: false, reports: false },
//     kotManagement: { print: true, modify: false, status: true },
//     specialPermissions: {
//       voidOrders: { items: false, fullOrder: false, afterPayment: false },
//       discounts: { item: false, bill: false, offers: false, maxDiscount: 0 }
//     },
//     reportAccess: { daily: false, table: false, item: false },
//     canAddItems: false,
//     canChangePrices: false,
//     canManageStaff: false
//   }
// };

// const StaffManagement = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
//   const [resetPassword, setResetPassword] = useState({
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
//   const token = localStorage.getItem("token");
//   const [newStaff, setNewStaff] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "staff",
//   });
//   //const [passwordVisible, setPasswordVisible] = useState(false);
//   // const [showAddModal, setShowAddModal] = useState(false);

//   const [permissions, setPermissions] = useState({});
//   const [staffMembers, setStaffMembers] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(6); // show 6 per page
//   const [totalPages, setTotalPages] = useState(1);



//   // it fetches staff list
//   const fetchStaffList = async (pageNumber = 1) => {
//     try {
//       const res = await axiosInstance.get(
//         `/users?page=${pageNumber}&limit=${limit}&role=staff`
//       );

//       if (res.data.success) {
//         setStaffMembers(res.data.data.users);
//         setTotalPages(res.data.data.totalPages);
//         setPage(res.data.data.page);
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStaffList(page);
//   }, [page]);

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   // const [staffMembers, setStaffMembers] = useState([
//   //   { id: 'sarah', name: 'Sarah Johnson', phone: '+1 (555) 123-4567', role: 'Admin', color: 'primary', ...ROLE_PERMISSIONS.Admin },
//   //   { id: 'michael', name: 'Michael Chen', phone: '+1 (555) 234-5678', role: 'Staff', color: 'success', ...ROLE_PERMISSIONS.Staff },
//   //   { id: 'emily', name: 'Emily Rodriguez', phone: '+1 (555) 345-6789', role: 'Manager', color: 'info', ...ROLE_PERMISSIONS.Manager }
//   // ]);

//   // Load permissions when staff is selected
//   useEffect(() => {
//     if (selectedStaff) {
//       const staff = staffMembers.find(s => s.id === selectedStaff);
//       if (staff) {
//         setPermissions(ROLE_PERMISSIONS[staff.role]);
//       }
//     }
//   }, [selectedStaff, staffMembers]);

//   const handleEditClick = (staff) => {
//     setSelectedStaff(staff.id);
//     setShowModal(true);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleResetPasswordChange = (e) => {
//     const { name, value } = e.target;
//     setResetPassword(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePermissionChange = (section, field, value) => {
//     setPermissions(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const handleSave = () => {
//     // Update staff permissions
//     const updatedStaff = staffMembers.map(staff =>
//       staff.id === selectedStaff ? { ...staff, ...permissions } : staff
//     );
//     setStaffMembers(updatedStaff);
//     setShowModal(false);
//   };



//   const handleAddStaff = async () => {
//     try {

//       console.log("Token being sent:", token);

//       if (!token) {
//         toast.error("Unauthorized! Please login as admin.");
//         return;
//       }

//       const res = await axios.post(
//         "https://restaurant-backend-production-a63a.up.railway.app/api/users",
//         newStaff,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,  // adjust if backend doesn’t want Bearer
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message || "Staff added successfully!");
//         setShowAddModal(false);
//         setNewStaff({ name: "", username: "", email: "", password: "", phone: "", role: "Staff" });
//       } else {
//         toast.error(res.data.message || "Failed to add staff");
//       }
//     } catch (error) {
//       console.error("Error adding staff:", error);
//       toast.error(error.response?.data?.message || "Something went wrong!");
//     }
//   };


//   // ✅ Delete Staff Handler
//   const handleDeleteStaff = async (id) => {
//     try {
//       // Ask confirmation before delete
//       const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
//       if (!confirmDelete) return; // exit if user cancels

//       // API Call to delete staff
//       await axiosInstance.delete(`/users/${id}`);

//       // Update state after successful delete
//       setStaffMembers((prevStaff) => prevStaff.filter((staff) => staff.id !== id));

//       console.log(`Staff with id ${id} deleted successfully`);
//     } catch (error) {
//       console.error("Error deleting staff:", error);
//     }
//   };


//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };


//   const toggleResetPasswordVisibility = () => {
//     setResetPasswordVisible(!resetPasswordVisible);
//   };

//   const getBadgeVariant = (role) => {
//     switch (role) {
//       case 'Admin': return 'primary';
//       case 'Manager': return 'info';
//       case 'Staff': return 'success';
//       default: return 'secondary';
//     }
//   };

//   const handleResetPasswordClick = (staffId) => {
//     setSelectedStaff(staffId);
//     setShowResetPasswordModal(true);
//   };

//   const submitResetPassword = async () => {
//     if (!resetPassword.newPassword || !resetPassword.confirmPassword) {
//       alert("Please fill in both password fields!");
//       return;
//     }

//     if (resetPassword.newPassword !== resetPassword.confirmPassword) {
//       alert("Passwords don't match!");
//       return;
//     }

//     if (resetPassword.newPassword.length < 6) {
//       alert("Password should be at least 6 characters long!");
//       return;
//     }

//     try {
//       // ✅ include userId or email depending on your backend
//       await axiosInstance.put(`/auth/change-password`, {
//         userId: selectedStaff,
//         password: resetPassword.newPassword,
//       });

//       alert(`Password for ${selectedStaff} has been reset successfully!`);

//       setShowResetPasswordModal(false);
//       setResetPassword({
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       alert("Failed to reset password. Please try again.");
//     }
//   };

//   const renderPermissionControls = () => {
//     if (!selectedStaff) return (
//       <Alert variant="info" className="mt-3">
//         Please select a staff member to manage their permissions
//       </Alert>
//     );

//     const staff = staffMembers.find(s => s.id == selectedStaff);
//     const isAdmin = staff.role == 'admin';
//     const isManager = staff.role == 'Manager';

//     return (
//       <Row className="g-4 mb-4">
//         {/* Staff Info Card */}
//         <Card className="mb-4 shadow-sm">
//           <Card.Body>
//             <h6 className="mb-3">Staff Information</h6>
//             <Row>
//               <Col md={6}>
//                 <p><strong>Name:</strong> {staff.name}</p>
//                 <p><strong>Email:</strong> {staff.email}</p>
//                 <p><strong>Phone:</strong> {staff.phone}</p>
//               </Col>
//               <Col md={6}>
//                 <p><strong>Role:</strong> {staff.role}</p>
//                 <p><strong>Status:</strong> {staff.status}</p>
//                 <p>
//                   <strong>Discount:</strong> {staff.discount_percentage || "0"}%
//                 </p>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>

//         {/* Tables Management */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Tables Management</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.tablesManagement?.view}
//                   onChange={(e) => handlePermissionChange('tablesManagement', 'view', e.target.checked)}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="View Tables"
//                     checked={permissions.tablesManagement?.view}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'view', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Manage Reservations"
//                     checked={permissions.tablesManagement?.manage}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'manage', e.target.checked)}
//                     disabled={isAdmin || !permissions.tablesManagement?.view}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Table Status"
//                     checked={permissions.tablesManagement?.status}
//                     onChange={(e) => handlePermissionChange('tablesManagement', 'status', e.target.checked)}
//                     disabled={isAdmin || !permissions.tablesManagement?.view}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Order Processing */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Order Processing</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.orderProcessing?.create}
//                   onChange={(e) => handlePermissionChange('orderProcessing', 'create', e.target.checked)}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Create Orders"
//                     checked={permissions.orderProcessing?.create}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'create', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Modify Orders"
//                     checked={permissions.orderProcessing?.modify}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'modify', e.target.checked)}
//                     disabled={isAdmin || !permissions.orderProcessing?.create}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Cancel Orders"
//                     checked={permissions.orderProcessing?.cancel}
//                     onChange={(e) => handlePermissionChange('orderProcessing', 'cancel', e.target.checked)}
//                     disabled={isAdmin || !permissions.orderProcessing?.create}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Special Permissions */}
//         <Col xs={12} md={6} lg={4}>
//           <Card className="bg-light">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h6 className="mb-0">Special Permissions</h6>
//                 <Form.Check
//                   type="switch"
//                   checked={permissions.specialPermissions?.voidOrders?.items || permissions.specialPermissions?.discounts?.item}
//                   onChange={(e) => {
//                     const val = e.target.checked;
//                     handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       voidOrders: {
//                         items: val,
//                         fullOrder: val && (isAdmin || isManager),
//                         afterPayment: val && isAdmin
//                       },
//                       discounts: {
//                         item: val,
//                         bill: val && (isAdmin || isManager),
//                         offers: val && (isAdmin || isManager),
//                         maxDiscount: val ? (isAdmin ? 25 : 15) : 0
//                       }
//                     });
//                   }}
//                   disabled={isAdmin}
//                 />
//               </div>
//               <ListGroup variant="flush">
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Void Items"
//                     checked={permissions.specialPermissions?.voidOrders?.items}
//                     onChange={(e) => handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       voidOrders: { ...permissions.specialPermissions.voidOrders, items: e.target.checked }
//                     })}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Apply Discounts"
//                     checked={permissions.specialPermissions?.discounts?.item}
//                     onChange={(e) => handlePermissionChange('specialPermissions', {
//                       ...permissions.specialPermissions,
//                       discounts: { ...permissions.specialPermissions.discounts, item: e.target.checked }
//                     })}
//                     disabled={isAdmin}
//                   />
//                   {permissions.specialPermissions?.discounts?.item && (
//                     <div className="ms-4 mt-2">
//                       <Form.Check
//                         type="checkbox"
//                         label="Item Discount"
//                         checked={permissions.specialPermissions.discounts.item}
//                         disabled
//                       />
//                       <Form.Check
//                         type="checkbox"
//                         label="Bill Discount"
//                         checked={permissions.specialPermissions.discounts.bill}
//                         disabled={isAdmin}
//                       />
//                       <Form.Check
//                         type="checkbox"
//                         label="Special Offers"
//                         checked={permissions.specialPermissions.discounts.offers}
//                         disabled={isAdmin}
//                       />
//                       <div className="d-flex align-items-center small mt-2">
//                         <span className="me-2">Max Discount:</span>
//                         <Form.Select
//                           size="sm"
//                           value={permissions.specialPermissions.discounts.maxDiscount}
//                           onChange={(e) => handlePermissionChange('specialPermissions', {
//                             ...permissions.specialPermissions,
//                             discounts: { ...permissions.specialPermissions.discounts, maxDiscount: parseInt(e.target.value) }
//                           })}
//                           disabled={isAdmin || !permissions.specialPermissions.discounts.item}
//                         >
//                           {[5, 10, 15, 20, 25].map(val => (
//                             <option key={val} value={val}>{val}%</option>
//                           ))}
//                         </Form.Select>
//                       </div>
//                     </div>
//                   )}
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Add Menu Items"
//                     checked={permissions.canAddItems}
//                     onChange={(e) => handlePermissionChange('canAddItems', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//                 <ListGroup.Item className="bg-transparent">
//                   <Form.Check
//                     type="checkbox"
//                     label="Change Prices"
//                     checked={permissions.canChangePrices}
//                     onChange={(e) => handlePermissionChange('canChangePrices', e.target.checked)}
//                     disabled={isAdmin}
//                   />
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         </Col>

//         {/* Role-specific information */}
//         {/* Role-specific Summary */}
//         <Col xs={12}>
//           <Card className="bg-primary-subtle">
//             <Card.Body>
//               <h6 className="mb-2">Current Access Summary for {staff.name}</h6>
//               <p className="mb-0">
//                 <strong>Role:</strong> {staff.role} - {staff.role === 'Admin'
//                   ? 'Full system access including staff management'
//                   : staff.role === 'Manager'
//                     ? 'Can manage orders, tables, and apply discounts (up to 15%)'
//                     : 'Basic staff access for order creation and table viewing'}
//               </p>
//               {staff.role === 'Manager' && (
//                 <p className="mb-0 mt-2">
//                   <strong>Manager Privileges:</strong> Can add menu items, change prices,
//                   and apply discounts (up to {permissions.specialPermissions?.discounts?.maxDiscount || 0}%)
//                 </p>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     );
//   };

//   return (
//     <div className="p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
//         <div>
//           <h1 className="fs-3 fw-bold text-dark">Staff Management</h1>
//           <p className="text-muted small mb-0">
//             Manage staff members and their access permissions
//           </p>
//         </div>

//         <div className="d-flex align-items-center mt-3 mt-md-0">
//           <div className="input-group me-2">
//             <span className="input-group-text bg-white border-end-0">
//               <FaSearch className="text-muted" />
//             </span>
//             <input
//               type="text"
//               className="form-control border-start-0"
//               placeholder="Search staff..."
//               style={{ maxWidth: "220px" }}
//             />
//           </div>

//           <Button
//             variant="warning"
//             className="d-flex align-items-center"
//             style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
//             onClick={() => setShowAddModal(true)}
//           >
//             <FaPlus />
//             Add New Staff
//           </Button>
//         </div>
//       </div>

//       {/* Staff List */}
//       <Row className="g-4 mb-4">
//         {staffMembers.map((staff) => (
//           <Col key={staff.id} xs={12} md={6} lg={4}>
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-start mb-3">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-light rounded-circle p-3 me-3">
//                       <Person className="text-primary" size={20} />
//                     </div>
//                     <div>
//                       <h6 className="mb-0">{staff.name}</h6>
//                       <small className="text-muted">{staff.phone}</small>
//                     </div>
//                   </div>
//                   <Badge bg={getBadgeVariant(staff.role)}>{staff.role}</Badge>
//                 </div>
//                 <div className="d-flex">
//                   <Button
//                     variant="light"
//                     className="me-2 flex-grow-1 text-dark"
//                     onClick={() => handleEditClick(staff)} // pass whole staff
//                   >
//                     <Gear className="me-1" />
//                     Manage Permissions
//                   </Button>

//                   <Button
//                     variant="outline-danger"
//                     onClick={() => handleDeleteStaff(staff.id)}
//                     disabled={staff.role.toLowerCase() === "admin"}
//                   >
//                     <Trash />
//                   </Button>
//                 </div>
//                 <div className="mt-2">
//                   <Button
//                     variant="outline-info"
//                     onClick={() => handleResetPasswordClick(staff.id)}
//                     disabled={staff.role.toLowerCase() === "admin"}
//                     className="w-100"
//                   >
//                     Reset Password
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Pagination */}
//       <div className="d-flex justify-content-center">
//         <Pagination>
//           <Pagination.Prev
//             disabled={page === 1}
//             onClick={() => handlePageChange(page - 1)}
//           />
//           {[...Array(totalPages)].map((_, index) => (
//             <Pagination.Item
//               key={index + 1}
//               active={index + 1 === page}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </Pagination.Item>
//           ))}
//           <Pagination.Next
//             disabled={page === totalPages}
//             onClick={() => handlePageChange(page + 1)}
//           />
//         </Pagination>
//       </div>

//       {/* Access Management Section */}
//       <Card className="mb-4">
//         <Card.Body>
//           <h4 className="mb-4">Access Management</h4>

//           <Form.Group className="mb-4">
//             <Form.Label>Select Staff Member</Form.Label>
//             <Form.Select
//               onChange={(e) => setSelectedStaff(e.target.value)}
//               value={selectedStaff || ''}
//             >
//               <option value="">Choose a staff member...</option>
//               {staffMembers.map(staff => (
//                 <option key={staff.id} value={staff.id}>
//                   {staff.name} ({staff.role})
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {renderPermissionControls()}

//           <div className="d-flex justify-content-end">
//             <Button
//               variant="warning"
//               className="text-dark"
//               onClick={handleSave}
//               disabled={!selectedStaff}
//             >
//               Save Changes
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* Add Staff Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Staff</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 placeholder="Enter full name"
//                 value={newStaff.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 placeholder="Enter username"
//                 value={newStaff.username}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={newStaff.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <InputGroup>
//                 <Form.Control
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   placeholder="Enter password"
//                   value={newStaff.password}
//                   onChange={handleChange}
//                   required
//                 />
//                 <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
//                   {passwordVisible ? <EyeSlash /> : <Eye />}
//                 </InputGroup.Text>
//               </InputGroup>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="tel"
//                 name="phone"
//                 placeholder="+1 (555) 123-4567"
//                 value={newStaff.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-4">
//               <Form.Label>Role</Form.Label>
//               <Form.Select
//                 name="role"
//                 value={newStaff.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Staff">staff</option>
//                 <option value="Manager">user</option>
//               </Form.Select>
//               <Form.Text className="text-muted">
//                 Note: Admin roles can only be created by existing admins
//               </Form.Text>
//             </Form.Group>

//             <div className="d-flex gap-3">
//               <Button
//                 variant="warning"
//                 className="text-dark flex-grow-1"
//                 onClick={handleAddStaff}
//               >
//                 Save Staff
//               </Button>
//               <Button
//                 variant="outline-secondary"
//                 className="flex-grow-1"
//                 onClick={() => setShowAddModal(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Permissions Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             Manage Permissions – {selectedStaff?.name}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStaff && renderPermissionControls(selectedStaff)}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>


//       {/* Reset Password Modal */}
//       <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Reset Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStaff && (
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>New Password</Form.Label>
//                 <InputGroup>
//                   <Form.Control
//                     type={resetPasswordVisible ? "text" : "password"}
//                     name="newPassword"
//                     placeholder="Enter new password"
//                     value={resetPassword.newPassword}
//                     onChange={handleResetPasswordChange}
//                     required
//                   />
//                   <InputGroup.Text onClick={toggleResetPasswordVisibility} style={{ cursor: 'pointer' }}>
//                     {resetPasswordVisible ? <EyeSlash /> : <Eye />}
//                   </InputGroup.Text>
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type={resetPasswordVisible ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm new password"
//                   value={resetPassword.confirmPassword}
//                   onChange={handleResetPasswordChange}
//                   required
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={submitResetPassword}>
//             Reset Password
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default StaffManagement;


import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import {
  Container, Row, Col, Card, Button, Form,
  Modal, Badge, InputGroup, ListGroup, Alert, Pagination
} from 'react-bootstrap';
import {
  Eye, EyeSlash, Trash, Person, Gear
} from 'react-bootstrap-icons';
import { FaSearch, FaPlus } from "react-icons/fa";
import axiosInstance from "../../../utils/axiosInstance";

// Default permissions structure matching the API
const DEFAULT_PERMISSIONS = {
  tablesManagement: {
    enabled: false,
    viewTables: false,
    manageReservations: false,
    tableStatus: false
  },
  orderProcessing: {
    enabled: false,
    createOrders: false,
    modifyOrders: false,
    cancelOrders: false
  },
  specialPermissions: {
    enabled: false,
    voidItems: false,
    applyDiscounts: {
      itemDiscount: false,
      billDiscount: false,
      specialOffers: false,
      maxDiscount: 0
    },
    addMenuItems: false,
    changePrices: false
  }
};

const StaffManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const token = localStorage.getItem("token");
  const [newStaff, setNewStaff] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "staff",
    discount_percentage: 0,
    permissions: { ...DEFAULT_PERMISSIONS }
  });

  const [permissions, setPermissions] = useState({ ...DEFAULT_PERMISSIONS });
  const [staffMembers, setStaffMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch staff list
  const fetchStaffList = async (pageNumber = 1) => {
    try {
      const res = await axiosInstance.get(
        `/users?page=${pageNumber}&limit=${limit}&role=staff`
      );

      if (res.data.success) {
        setStaffMembers(res.data.data.users);
        setTotalPages(res.data.data.totalPages);
        setPage(res.data.data.page);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  useEffect(() => {
    fetchStaffList(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Load permissions when staff is selected
  useEffect(() => {
    if (selectedStaff) {
      const staff = staffMembers.find(s => s.id === selectedStaff);
      if (staff) {
        setPermissions(staff.permissions || { ...DEFAULT_PERMISSIONS });
      }
    }
  }, [selectedStaff, staffMembers]);

  const handleEditClick = (staff) => {
    setSelectedStaff(staff.id);
    setPermissions(staff.permissions || { ...DEFAULT_PERMISSIONS });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({ ...prev, [name]: value }));
  };

  // const handleDiscountChange = (e) => {
  //   const value = parseInt(e.target.value) || 0;
  //   setNewStaff((prev) => ({ ...prev, discount_percentage: value }));
  // };
  const handleDiscountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setNewStaff((prev) => ({ ...prev, discount_percentage: value }));
  };

  const handleResetPasswordChange = (e) => {
    const { name, value } = e.target;
    setResetPassword(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (section, field, value, subField = null) => {
    setPermissions(prev => {
      const newPermissions = { ...prev };

      if (subField) {
        newPermissions[section][field][subField] = value;
      } else {
        newPermissions[section][field] = value;
      }

      return newPermissions;
    });
  };

  // const handleSave = async () => {
  //   try {
  //     const staffData = {
  //       name: staffMembers.find(s => s.id === selectedStaff).name,
  //       email: staffMembers.find(s => s.id === selectedStaff).email,
  //       phone: staffMembers.find(s => s.id === selectedStaff).phone,
  //       role: "staff",
  //       discount_percentage: staffMembers.find(s => s.id === selectedStaff).discount_percentage || 0,
  //       permissions: permissions
  //     };

  //     const res = await axiosInstance.put(
  //       `/users/${selectedStaff}`,
  //       staffData
  //     );

  //     if (res.data.success) {
  //       toast.success("Permissions updated successfully!");
  //       setShowModal(false);
  //       fetchStaffList(page); // Refresh the list
  //     } else {
  //       toast.error(res.data.message || "Failed to update permissions");
  //     }
  //   } catch (error) {
  //     console.error("Error updating permissions:", error);
  //     toast.error(error.response?.data?.message || "Something went wrong!");
  //   }
  // };

  const handleSave = async () => {
    try {
      const staff = staffMembers.find(s => s.id === selectedStaff);
      if (!staff) {
        toast.error("Staff member not found");
        return;
      }

      // Convert discount_percentage to number
      const discountPercentage = parseFloat(staff.discount_percentage) || 0;

      const staffData = {
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        role: "staff",
        status: staff.status || "active", // Include status if required
        discount_percentage: discountPercentage, // Ensure it's a number
        permissions: permissions
      };

      // Log the data to check its structure
      console.log("Sending data:", staffData);

      const res = await axiosInstance.put(
        `/users/${selectedStaff}`,
        staffData
      );

      if (res.data.success) {
        toast.success("Permissions updated successfully!");
        setShowModal(false);
        fetchStaffList(page); // Refresh the list
      } else {
        toast.error(res.data.message || "Failed to update permissions");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleAddStaff = async () => {
    try {
      if (!token) {
        toast.error("Unauthorized! Please login as admin.");
        return;
      }

      const staffData = {
        name: newStaff.name,
        email: newStaff.email,
        password: newStaff.password,
        phone: newStaff.phone,
        role: "staff",
        discount_percentage: newStaff.discount_percentage,
        permissions: newStaff.permissions
      };

      const res = await axios.post(
        "https://restaurant-backend-production-a63a.up.railway.app/api/users",
        staffData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Staff added successfully!");
        setShowAddModal(false);
        setNewStaff({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "staff",
          discount_percentage: 0,
          permissions: { ...DEFAULT_PERMISSIONS }
        });
        fetchStaffList(page); // Refresh the list
      } else {
        toast.error(res.data.message || "Failed to add staff");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Delete Staff Handler
  const handleDeleteStaff = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
      if (!confirmDelete) return;

      await axiosInstance.delete(`/users/${id}`);
      setStaffMembers((prevStaff) => prevStaff.filter((staff) => staff.id !== id));
      toast.success("Staff member deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error(error.response?.data?.message || "Failed to delete staff");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleResetPasswordVisibility = () => {
    setResetPasswordVisible(!resetPasswordVisible);
  };

  const getBadgeVariant = (role) => {
    switch (role) {
      case 'admin': return 'primary';
      case 'user': return 'info';
      case 'staff': return 'success';
      default: return 'secondary';
    }
  };

  const handleResetPasswordClick = (staffId) => {
    setSelectedStaff(staffId);
    setShowResetPasswordModal(true);
  };

  const submitResetPassword = async () => {
    if (!resetPassword.newPassword || !resetPassword.confirmPassword) {
      alert("Please fill in both password fields!");
      return;
    }

    if (resetPassword.newPassword !== resetPassword.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (resetPassword.newPassword.length < 6) {
      alert("Password should be at least 6 characters long!");
      return;
    }

    try {
      await axiosInstance.put(`/auth/change-password`, {
        userId: selectedStaff,
        password: resetPassword.newPassword,
      });

      alert(`Password has been reset successfully!`);
      setShowResetPasswordModal(false);
      setResetPassword({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again.");
    }
  };

  const renderPermissionControls = () => {
    if (!selectedStaff) return (
      <Alert variant="info" className="mt-3">
        Please select a staff member to manage their permissions
      </Alert>
    );

    const staff = staffMembers.find(s => s.id === selectedStaff);
    if (!staff) return null;

    return (
      <Row className="g-4 mb-4">
        {/* Staff Info Card */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h6 className="mb-3">Staff Information</h6>
            <Row>
              <Col md={6}>
                <p><strong>Name:</strong> {staff.name}</p>
                <p><strong>Email:</strong> {staff.email}</p>
                <p><strong>Phone:</strong> {staff.phone}</p>
              </Col>
              <Col md={6}>
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>Status:</strong> {staff.status || 'active'}</p>
                <p>
                  <strong>Discount:</strong> {staff.discount_percentage || "0"}%
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tables Management */}
        <Col xs={12} md={6} lg={4}>
          <Card className="bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Tables Management</h6>
                <Form.Check
                  type="switch"
                  checked={permissions.tablesManagement?.enabled}
                  onChange={(e) => handlePermissionChange('tablesManagement', 'enabled', e.target.checked)}
                />
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="View Tables"
                    checked={permissions.tablesManagement?.viewTables}
                    onChange={(e) => handlePermissionChange('tablesManagement', 'viewTables', e.target.checked)}
                    disabled={!permissions.tablesManagement?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Manage Reservations"
                    checked={permissions.tablesManagement?.manageReservations}
                    onChange={(e) => handlePermissionChange('tablesManagement', 'manageReservations', e.target.checked)}
                    disabled={!permissions.tablesManagement?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Table Status"
                    checked={permissions.tablesManagement?.tableStatus}
                    onChange={(e) => handlePermissionChange('tablesManagement', 'tableStatus', e.target.checked)}
                    disabled={!permissions.tablesManagement?.enabled}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Order Processing */}
        <Col xs={12} md={6} lg={4}>
          <Card className="bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Order Processing</h6>
                <Form.Check
                  type="switch"
                  checked={permissions.orderProcessing?.enabled}
                  onChange={(e) => handlePermissionChange('orderProcessing', 'enabled', e.target.checked)}
                />
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Create Orders"
                    checked={permissions.orderProcessing?.createOrders}
                    onChange={(e) => handlePermissionChange('orderProcessing', 'createOrders', e.target.checked)}
                    disabled={!permissions.orderProcessing?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Modify Orders"
                    checked={permissions.orderProcessing?.modifyOrders}
                    onChange={(e) => handlePermissionChange('orderProcessing', 'modifyOrders', e.target.checked)}
                    disabled={!permissions.orderProcessing?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Cancel Orders"
                    checked={permissions.orderProcessing?.cancelOrders}
                    onChange={(e) => handlePermissionChange('orderProcessing', 'cancelOrders', e.target.checked)}
                    disabled={!permissions.orderProcessing?.enabled}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Special Permissions */}
        <Col xs={12} md={6} lg={4}>
          <Card className="bg-light">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Special Permissions</h6>
                <Form.Check
                  type="switch"
                  checked={permissions.specialPermissions?.enabled}
                  onChange={(e) => handlePermissionChange('specialPermissions', 'enabled', e.target.checked)}
                />
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Void Items"
                    checked={permissions.specialPermissions?.voidItems}
                    onChange={(e) => handlePermissionChange('specialPermissions', 'voidItems', e.target.checked)}
                    disabled={!permissions.specialPermissions?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Apply Discounts"
                    checked={permissions.specialPermissions?.applyDiscounts?.itemDiscount ||
                      permissions.specialPermissions?.applyDiscounts?.billDiscount ||
                      permissions.specialPermissions?.applyDiscounts?.specialOffers}
                    onChange={(e) => {
                      const val = e.target.checked;
                      handlePermissionChange('specialPermissions', 'applyDiscounts', {
                        ...permissions.specialPermissions.applyDiscounts,
                        itemDiscount: val,
                        billDiscount: val,
                        specialOffers: val
                      });
                    }}
                    disabled={!permissions.specialPermissions?.enabled}
                  />
                  {permissions.specialPermissions?.applyDiscounts && (
                    <div className="ms-4 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Item Discount"
                        checked={permissions.specialPermissions.applyDiscounts.itemDiscount}
                        onChange={(e) => handlePermissionChange('specialPermissions', 'applyDiscounts',
                          { ...permissions.specialPermissions.applyDiscounts, itemDiscount: e.target.checked }, 'itemDiscount')}
                        disabled={!permissions.specialPermissions?.enabled}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Bill Discount"
                        checked={permissions.specialPermissions.applyDiscounts.billDiscount}
                        onChange={(e) => handlePermissionChange('specialPermissions', 'applyDiscounts',
                          { ...permissions.specialPermissions.applyDiscounts, billDiscount: e.target.checked }, 'billDiscount')}
                        disabled={!permissions.specialPermissions?.enabled}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Special Offers"
                        checked={permissions.specialPermissions.applyDiscounts.specialOffers}
                        onChange={(e) => handlePermissionChange('specialPermissions', 'applyDiscounts',
                          { ...permissions.specialPermissions.applyDiscounts, specialOffers: e.target.checked }, 'specialOffers')}
                        disabled={!permissions.specialPermissions?.enabled}
                      />
                      <div className="d-flex align-items-center small mt-2">
                        <span className="me-2">Max Discount:</span>
                        <Form.Select
                          size="sm"
                          value={permissions.specialPermissions.applyDiscounts.maxDiscount}
                          onChange={(e) => handlePermissionChange('specialPermissions', 'applyDiscounts',
                            { ...permissions.specialPermissions.applyDiscounts, maxDiscount: parseInt(e.target.value) }, 'maxDiscount')}
                          disabled={!permissions.specialPermissions?.enabled}
                        >
                          {[0, 5, 10, 15, 20, 25].map(val => (
                            <option key={val} value={val}>{val}%</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Add Menu Items"
                    checked={permissions.specialPermissions?.addMenuItems}
                    onChange={(e) => handlePermissionChange('specialPermissions', 'addMenuItems', e.target.checked)}
                    disabled={!permissions.specialPermissions?.enabled}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent">
                  <Form.Check
                    type="checkbox"
                    label="Change Prices"
                    checked={permissions.specialPermissions?.changePrices}
                    onChange={(e) => handlePermissionChange('specialPermissions', 'changePrices', e.target.checked)}
                    disabled={!permissions.specialPermissions?.enabled}
                  />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <div>
          <h1 className="fs-3 fw-bold text-dark">Staff Management</h1>
          <p className="text-muted small mb-0">
            Manage staff members and their access permissions
          </p>
        </div>

        <div className="d-flex align-items-center mt-3 mt-md-0">
          <div className="input-group me-2">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search staff..."
              style={{ maxWidth: "220px" }}
            />
          </div>

          <Button
            variant="warning"
            className="d-flex align-items-center"
            style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Add New Staff
          </Button>
        </div>
      </div>

      {/* Staff List */}
      <Row className="g-4 mb-4">
        {staffMembers.map((staff) => (
          <Col key={staff.id} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-light rounded-circle p-3 me-3">
                      <Person className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="mb-0">{staff.name}</h6>
                      <small className="text-muted">{staff.phone}</small>
                    </div>
                  </div>
                  <Badge bg={getBadgeVariant(staff.role)}>{staff.role}</Badge>
                </div>
                <div className="d-flex">
                  <Button
                    variant="light"
                    className="me-2 flex-grow-1 text-dark"
                    onClick={() => handleEditClick(staff)}
                  >
                    <Gear className="me-1" />
                    Manage Permissions
                  </Button>

                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteStaff(staff.id)}
                    disabled={staff.role.toLowerCase() === "admin"}
                  >
                    <Trash />
                  </Button>
                </div>
                <div className="mt-2">
                  <Button
                    variant="outline-info"
                    onClick={() => handleResetPasswordClick(staff.id)}
                    disabled={staff.role.toLowerCase() === "admin"}
                    className="w-100"
                  >
                    Reset Password
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          />
        </Pagination>
      </div>

      {/* Access Management Section */}
      <Card className="mb-4">
        <Card.Body>
          <h4 className="mb-4">Access Management</h4>

          <Form.Group className="mb-4">
            <Form.Label>Select Staff Member</Form.Label>
            <Form.Select
              onChange={(e) => setSelectedStaff(e.target.value)}
              value={selectedStaff || ''}
            >
              <option value="">Choose a staff member...</option>
              {staffMembers.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} ({staff.role})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {renderPermissionControls()}

          <div className="d-flex justify-content-end">
            <Button
              variant="warning"
              className="text-dark"
              onClick={handleSave}
              disabled={!selectedStaff}
            >
              Save Changes
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Add Staff Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                value={newStaff.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email address"
                value={newStaff.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={newStaff.password}
                  onChange={handleChange}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={newStaff.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={newStaff.discount_percentage}
                onChange={handleDiscountChange}
              />
              <Form.Text className="text-muted">
                Maximum discount percentage this staff can apply (0-100%)
              </Form.Text>
            </Form.Group>

            <div className="d-flex gap-3">
              <Button
                variant="warning"
                className="text-dark flex-grow-1"
                onClick={handleAddStaff}
              >
                Save Staff
              </Button>
              <Button
                variant="outline-secondary"
                className="flex-grow-1"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Permissions Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Manage Permissions – {staffMembers.find(s => s.id === selectedStaff)?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStaff && renderPermissionControls()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Reset Password Modal */}
      <Modal show={showResetPasswordModal} onHide={() => setShowResetPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStaff && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={resetPasswordVisible ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter new password"
                    value={resetPassword.newPassword}
                    onChange={handleResetPasswordChange}
                    required
                  />
                  <InputGroup.Text onClick={toggleResetPasswordVisibility} style={{ cursor: 'pointer' }}>
                    {resetPasswordVisible ? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={resetPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={resetPassword.confirmPassword}
                  onChange={handleResetPasswordChange}
                  required
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResetPasswordModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitResetPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StaffManagement;