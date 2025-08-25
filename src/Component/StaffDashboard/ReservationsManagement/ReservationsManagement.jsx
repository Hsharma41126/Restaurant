// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";
// import {
//   Calendar,
//   Person,
//   Telephone,
//   Table as TableIcon,
//   Clock,
//   Plus
// } from 'react-bootstrap-icons';

// const ReservationsManagement = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     tableId: null,
//     tableName: "",
//     customerName: "",
//     customerEmail: "",
//     phoneNumber: "",
//     email: "",
//     date: "",
//     time: "",
//     durationHours: 1,
//     partySize: 1,
//     specialRequests: "",
//   });

//   const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
//   const [tables, setTables] = useState([]);
//   const [reservations, setReservations] = useState([]); // ✅ define state
//   const [users, setUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5); // Show 5 reservations per page



//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const res = await axiosInstance.get("/users?page=1&limit=10&role=user");
//         if (res.data?.data?.users) {
//           setUsers(res.data.data.users); // adjust if response structure is different
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const [activeFilter, setActiveFilter] = useState("all");
//   const [totalCount, setTotalCount] = useState(0);

//   // Get today's date in YYYY-MM-DD format
//   const today = new Date().toISOString().split("T")[0];
//   const todayFormatted = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Fetch available tables on mount
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axiosInstance.get("/tables?status=available");
//         setTables(response.data.data.tables || []);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };
//     fetchTables();
//   }, []);


//   const handleTableSelect = (table) => {
//     setFormData({
//       ...formData,
//       tableId: table.id,
//       tableName: `${table.table_name} (${table.table_number})`,
//     });
//     setShowTableTypeDropdown(false);
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic required validations
//     if (!formData.tableId) return alert("Please select a table.");
//     if (!formData.customerName.trim()) return alert("Please enter customer name.");
//     if (!formData.phoneNumber.trim()) return alert("Please enter phone number.");
//     if (!formData.date) return alert("Please select a reservation date.");
//     if (!formData.time) return alert("Please select a reservation time.");

//     // Additional validations
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.phoneNumber.trim())) {
//       return alert("Please enter a valid 10-digit phone number.");
//     }

//     if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
//       return alert("Please enter a valid email address.");
//     }

//     const payload = {
//       table_id: formData.tableId,
//       customer_name: formData.customerName.trim(),
//       customer_phone: formData.phoneNumber.trim(),
//       customer_email: formData.customerEmail.trim() || null,
//       reservation_date: formData.date,
//       reservation_time: formData.time,
//       duration_hours: Number(formData.durationHours) || 1,
//       party_size: Number(formData.partySize) || 1,
//       special_requests: formData.specialRequests.trim(),
//     };

//     try {
//       // Disable button while submitting
//       //setIsSubmitting(true);

//       await axiosInstance.post("/reservations", payload);

//       alert("✅ Reservation created successfully!");

//       // Reset form
//       setFormData({
//         tableId: null,
//         tableName: "",
//         customerName: "",
//         customerEmail: "",
//         phoneNumber: "",
//         email: "",
//         date: "",
//         time: "",
//         durationHours: 1,
//         partySize: 1,
//         specialRequests: "",
//       });

//       // Refresh reservations list
//       fetchReservations();

//     } catch (err) {
//       console.error("Error creating reservation:", err);
//       alert(err?.response?.data?.message || "❌ Failed to create reservation.");
//     }
//   };


//   // Handle status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });

//       if (response.data.success) {
//         const updatedStatus = response.data.data.status;
//         const updatedId = response.data.data.reservationId;

//         // Update the local state with API response
//         setReservations((prev) =>
//           prev.map((res) =>
//             String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update reservation status.");
//     }
//   };

//   // ✅ Reservation ko filter karo based on date + status
//   const filteredReservations = reservations?.filter((res) => {
//     // const resDate = res.reservation_date.split("T")[0];

//     const statusMatch =
//       activeFilter === "all" ? true : res.status === activeFilter;

//     // return resDate === today && statusMatch;
//     return statusMatch;
//   }) || [];



//   // Calculate total pages
//   const totalPages = Math.ceil(filteredReservations.length / limit);

//   // ✅ Fetch reservations dynamically
//   const fetchReservations = async () => {
//     try {
//       let url = `/reservations?page=${page}&limit=${limit}`;

//       // Add status filter if not "all"
//       if (activeFilter !== "all") {
//         url += `&status=${activeFilter}`;
//       }

//       const res = await axiosInstance.get(url); // 👈 ab yeh dynamic url use karo

//       if (res.data?.success) {
//         setReservations(res.data.data || []);
//         setTotalCount(res.data.count || 0);
//         setTotalPages(Math.ceil(res.data.count / limit) || 1);
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };




//   useEffect(() => {
//     fetchReservations();
//   }, [page, activeFilter]);

//   // Filter for today's reservations based on created_at




//   // Slice data for current page
//   const indexOfLast = page * limit;
//   const indexOfFirst = indexOfLast - limit;
//   const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);


//   // Stats for today's summary
//   const todayStats = {
//     total: filteredReservations.length,
//     confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
//     arrived: filteredReservations.filter(r => r.status === 'arrived').length,
//     cancelled: filteredReservations.filter(r => r.status === 'cancelled').length
//   };

//   return (
//     <div className="p-3">
//       <div className="flex-grow-1">
//         <div className="mb-4">
//           <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
//           <p className="text-muted">Manage customer reservations and bookings</p>
//         </div>

//         <Row className="g-4">
//           <Col lg={8}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-4">
//                   <span className="me-3 text-warning"><Plus size={20} /></span>
//                   <h2 className="h5 mb-0">Add New Reservation</h2>
//                 </div>

//                 <Form onSubmit={handleSubmit}>
//                   <Row className="g-3">
//                     {/* Customer Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Customer</Form.Label>
//                         <Form.Select
//                           value={formData.customerId || ""}
//                           onChange={(e) => {
//                             const selectedUser = users.find(
//                               (u) => String(u.id) === e.target.value
//                             );
//                             if (selectedUser) {
//                               setFormData({
//                                 ...formData,
//                                 customerId: selectedUser.id,
//                                 customerName: selectedUser.name,
//                                 phoneNumber: selectedUser.phone,
//                                 customerEmail: selectedUser.email,
//                               });
//                             }
//                           }}
//                           required
//                         >
//                           <option value="">Select Customer</option>
//                           {loadingUsers ? (
//                             <option disabled>Loading...</option>
//                           ) : (
//                             users.map((user) => (
//                               <option key={user.id} value={user.id}>
//                                 {user.name} ({user.phone})
//                               </option>
//                             ))
//                           )}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>

//                     {/* Phone Number */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Phone Number</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Telephone />
//                           </span>
//                           <Form.Control
//                             type="tel"
//                             name="phoneNumber"
//                             value={formData.phoneNumber || ""}
//                             placeholder="Enter phone number"
//                             required
//                             readOnly // auto-filled from customer
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Email */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Email</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">@</span>
//                           <Form.Control
//                             type="email"
//                             name="customerEmail"
//                             value={formData.customerEmail || ""}
//                             placeholder="Enter email"
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Table Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Table</Form.Label>
//                         <Dropdown
//                           show={showTableTypeDropdown}
//                           onToggle={(isOpen) => setShowTableTypeDropdown(isOpen)}
//                         >
//                           <Dropdown.Toggle
//                             className="w-100 text-dark text-start d-flex justify-content-between align-items-center"
//                             style={{
//                               fontSize: "1rem",
//                               height: "38px",
//                               borderRadius: "6px",
//                               border: "1px solid #dee2e6",
//                               backgroundColor: "white",
//                             }}
//                           >
//                             {formData.tableName || "Select table"}
//                           </Dropdown.Toggle>

//                           <Dropdown.Menu
//                             className="w-100 custom-dropdown-menu"
//                             style={{
//                               maxHeight: "200px", // limit height
//                               overflowY: "auto",  // add vertical scrollbar
//                               overflowX: "hidden" // hide horizontal scrollbar
//                             }}
//                           >
//                             {tables.length > 0 ? (
//                               tables.map((table) => (
//                                 <Dropdown.Item
//                                   key={table.id}
//                                   onClick={() => handleTableSelect(table)}
//                                   className="text-dark"
//                                 >
//                                   {table.table_name} ({table.table_number})
//                                 </Dropdown.Item>
//                               ))
//                             ) : (
//                               <Dropdown.Item disabled>No tables available</Dropdown.Item>
//                             )}
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </Form.Group>
//                     </Col>

//                     {/* Date */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Date</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Calendar />
//                           </span>
//                           <Form.Control
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Time */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Time</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Clock />
//                           </span>
//                           <Form.Control
//                             type="time"
//                             name="time"
//                             value={formData.time}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Duration Hours */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Duration (hours)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="durationHours"
//                           min="1"
//                           value={formData.durationHours}
//                           onChange={handleInputChange}
//                           placeholder="Enter duration"
//                         />
//                       </Form.Group>
//                     </Col>

//                     {/* Party Size */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Party Size</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="partySize"
//                           min="1"
//                           value={formData.partySize}
//                           onChange={handleInputChange}
//                           placeholder="Number of people"
//                         />
//                       </Form.Group>
//                     </Col>

//                     {/* Special Requests */}
//                     <Col md={12}>
//                       <Form.Group>
//                         <Form.Label>Special Requests</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           name="specialRequests"
//                           value={formData.specialRequests}
//                           onChange={handleInputChange}
//                           placeholder="Any special requests (optional)"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>

//                   <Button
//                     type="submit"
//                     variant="warning"
//                     className="w-100 mt-4 text-white"
//                   >
//                     Add Reservation
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Right Side Summary */}
//           <Col lg={4}>
//             <Card className="mb-4"></Card>
//             <Card>
//               <Card.Body>
//                 <h3 className="h5 mb-3">Today's Summary</h3>
//                 <div className="d-flex flex-column gap-2">
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Total Reservations</span>
//                     <span className="fw-bold">{todayStats.total}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Confirmed</span>
//                     <span className="fw-bold text-primary">{todayStats.confirmed}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Arrived</span>
//                     <span className="fw-bold text-success">{todayStats.arrived}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Cancelled</span>
//                     <span className="fw-bold text-danger">{todayStats.cancelled}</span>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         <Card className="mt-4">
//           <Card.Body>
//             {/* Header */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
//               <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
//               <div className="text-muted small">{todayFormatted}</div>
//             </div>

//             {/* Filter buttons */}
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {["all", "confirmed", "arrived", "cancelled"].map((status) => (
//                 <Button
//                   key={status}
//                   variant={activeFilter === status ? "warning" : "outline-secondary"}
//                   size="sm"
//                   className="text-dark"
//                   onClick={() => {
//                     setPage(1);
//                     setActiveFilter(status);
//                   }}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </Button>
//               ))}
//             </div>

//             {/* Reservations table */}
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Table</th>
//                     <th>Type</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Guests</th>
//                     <th>Requests</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentReservations.length > 0 ? (
//                     currentReservations.map((reservation) => (
//                       <tr key={reservation.id}>
//                         <td className="fw-bold">{reservation.customer_name}</td>
//                         <td>{reservation.customer_phone}</td>
//                         <td>{reservation.customer_email || "N/A"}</td>
//                         <td>{reservation.table_name}</td>
//                         <td>{reservation.table_type}</td>
//                         <td>
//                           {new Date(reservation.reservation_date).toLocaleDateString()}
//                         </td>
//                         <td>{reservation.reservation_time}</td>
//                         <td>{reservation.party_size}</td>
//                         <td>{reservation.special_requests || "None"}</td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <Badge bg="primary">Confirmed</Badge>
//                           )}
//                           {reservation.status === "arrived" && (
//                             <Badge bg="success">Arrived</Badge>
//                           )}
//                           {reservation.status === "cancelled" && (
//                             <Badge bg="danger">Cancelled</Badge>
//                           )}
//                         </td>
//                         <td>
//                           {reservation.status === "confirmed" ? (
//                             <>
//                               <Button
//                                 variant="success"
//                                 size="sm"
//                                 className="me-2 mb-2"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "arrived")
//                                 }
//                               >
//                                 Mark Arrived
//                               </Button>
//                               <Button
//                                 variant="danger"
//                                 size="sm"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "cancelled")
//                                 }
//                               >
//                                 Cancel
//                               </Button>
//                             </>
//                           ) : (
//                             <span className="text-muted small">
//                               {reservation.status === "arrived"
//                                 ? "No actions available"
//                                 : "Cancelled"}
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="11" className="text-center">
//                         No reservations found for today
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === 1}
//                 onClick={() => setPage((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               <span className="small">
//                 Page {page} of {totalPages}
//               </span>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === totalPages}
//                 onClick={() => setPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ReservationsManagement;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";
// import {
//   Calendar,
//   Person,
//   Telephone,
//   Table as TableIcon,
//   Clock,
//   Plus,
//   Pause,
//   Play,
//   StopCircle
// } from 'react-bootstrap-icons';

// const ReservationsManagement = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     tableId: null,
//     tableName: "",
//     customerName: "",
//     customerEmail: "",
//     phoneNumber: "",
//     email: "",
//     date: "",
//     time: "",
//     durationHours: 1,
//     partySize: 1,
//     specialRequests: "",
//   });
//   const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
//   const [tables, setTables] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [totalCount, setTotalCount] = useState(0);
//   const [sessions, setSessions] = useState({}); // Track sessions by reservation ID

//   // Get today's date
//   const today = new Date().toISOString().split("T")[0];
//   const todayFormatted = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const res = await axiosInstance.get("/users?page=1&limit=10&role=user");
//         if (res.data?.data?.users) {
//           setUsers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch tables
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axiosInstance.get("/tables?status=available");
//         setTables(response.data.data.tables || []);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };
//     fetchTables();
//   }, []);

//   // Fetch reservations
//   const fetchReservations = async () => {
//     try {
//       let url = `/reservations?page=${page}&limit=${limit}`;
//       if (activeFilter !== "all") {
//         url += `&status=${activeFilter}`;
//       }
//       const res = await axiosInstance.get(url);
//       if (res.data?.success) {
//         setReservations(res.data.data || []);
//         setTotalCount(res.data.count || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [page, activeFilter]);

//   // Handle table selection
//   const handleTableSelect = (table) => {
//     setFormData({
//       ...formData,
//       tableId: table.id,
//       tableName: `${table.table_name} (${table.table_number})`,
//     });
//     setShowTableTypeDropdown(false);
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validations
//     if (!formData.tableId) return alert("Please select a table.");
//     if (!formData.customerName.trim()) return alert("Please enter customer name.");
//     if (!formData.phoneNumber.trim()) return alert("Please enter phone number.");
//     if (!formData.date) return alert("Please select a reservation date.");
//     if (!formData.time) return alert("Please select a reservation time.");

//     // Additional validations
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.phoneNumber.trim())) {
//       return alert("Please enter a valid 10-digit phone number.");
//     }
//     if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
//       return alert("Please enter a valid email address.");
//     }

//     const payload = {
//       table_id: formData.tableId,
//       customer_name: formData.customerName.trim(),
//       customer_phone: formData.phoneNumber.trim(),
//       customer_email: formData.customerEmail.trim() || null,
//       reservation_date: formData.date,
//       reservation_time: formData.time,
//       duration_hours: Number(formData.durationHours) || 1,
//       party_size: Number(formData.partySize) || 1,
//       special_requests: formData.specialRequests.trim(),
//     };

//     try {
//       await axiosInstance.post("/reservations", payload);
//       alert("✅ Reservation created successfully!");
//       setFormData({
//         tableId: null,
//         tableName: "",
//         customerName: "",
//         customerEmail: "",
//         phoneNumber: "",
//         email: "",
//         date: "",
//         time: "",
//         durationHours: 1,
//         partySize: 1,
//         specialRequests: "",
//       });
//       fetchReservations();
//     } catch (err) {
//       console.error("Error creating reservation:", err);
//       alert(err?.response?.data?.message || "❌ Failed to create reservation.");
//     }
//   };

//   const fetchTableById = async (tableId) => {
//     try {
//       const response = await axiosInstance.get(`/tables/${tableId}`);
//       if (response.data?.success) {
//         return response.data.data.table;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching table:", error);
//       return null;
//     }
//   };

//   // Start a new session
//   const startSession = async (reservation) => {
//     try {
//       // Get current user ID (assuming it's stored in localStorage)
//       const userId = localStorage.getItem('userId');

//       // Fetch table details to get hourly rate
//       const table = await fetchTableById(reservation.table_id);
//       if (!table) {
//         throw new Error('Table details not found');
//       }

//       // Calculate amount based on hourly rate and duration
//       const hourlyRate = parseFloat(table.hourly_rate) || 0;
//       const duration = parseFloat(reservation.duration_hours) || 1;
//       const amount = hourlyRate * duration;

//       const payload = {
//         table_id: reservation.table_id,
//         customer_name: reservation.customer_name,
//         customer_phone: reservation.customer_phone,
//         user_id: reservation.user_id,
//         amount: amount, // Calculated amount
//         time_limit: "30" // Default 30 minutes
//       };

//       const response = await axiosInstance.post('/sessions/start', payload);
//       if (response.data.success) {
//         const session = response.data.data.session;
//         // Update sessions state
//         setSessions(prev => ({
//           ...prev,
//           [reservation.id]: {
//             id: session.id,
//             status: session.status
//           }
//         }));
//         alert(`Session started successfully! Amount: $${amount.toFixed(2)}`);
//       } else {
//         throw new Error(response.data.message || 'Failed to start session');
//       }
//     } catch (err) {
//       console.error('Error starting session:', err);
//       alert(`Error starting session: ${err.message}`);
//     }
//   };

//   // Pause session
//   const pauseSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/pause`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'paused'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to pause session');
//       }
//     } catch (err) {
//       console.error('Error pausing session:', err);
//       alert(`Error pausing session: ${err.message}`);
//     }
//   };

//   // Resume session
//   const resumeSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/resume`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'active'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to resume session');
//       }
//     } catch (err) {
//       console.error('Error resuming session:', err);
//       alert(`Error resuming session: ${err.message}`);
//     }
//   };

//   // Stop session
//   const stopSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/stop`);
//       if (response.data.success) {
//         // Remove session from state
//         setSessions(prev => {
//           const newSessions = { ...prev };
//           delete newSessions[reservationId];
//           return newSessions;
//         });
//         alert('Session stopped successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to stop session');
//       }
//     } catch (err) {
//       console.error('Error stopping session:', err);
//       alert(`Error stopping session: ${err.message}`);
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
//       if (response.data.success) {
//         const updatedStatus = response.data.data.status;
//         const updatedId = response.data.data.reservationId;

//         // Update the local state
//         setReservations((prev) =>
//           prev.map((res) =>
//             String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//           )
//         );

//         // If status changed to "arrived", start a session
//         if (newStatus === 'arrived') {
//           const reservation = reservations.find(r => r.id === id);
//           if (reservation) {
//             await startSession(reservation);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update reservation status.");
//     }
//   };

//   // Filter reservations
//   const filteredReservations = reservations?.filter((res) => {
//     const statusMatch =
//       activeFilter === "all" ? true : res.status === activeFilter;
//     return statusMatch;
//   }) || [];

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredReservations.length / limit);
//   const indexOfLast = page * limit;
//   const indexOfFirst = indexOfLast - limit;
//   const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);

//   // Stats for today's summary
//   const todayStats = {
//     total: filteredReservations.length,
//     confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
//     arrived: filteredReservations.filter(r => r.status === 'arrived').length,
//     cancelled: filteredReservations.filter(r => r.status === 'cancelled').length
//   };

//   return (
//     <div className="p-3">
//       <div className="flex-grow-1">
//         <div className="mb-4">
//           <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
//           <p className="text-muted">Manage customer reservations and bookings</p>
//         </div>

//         <Row className="g-4">
//           {/* Left Column - Add New Reservation Form */}
//           <Col lg={8}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-4">
//                   <span className="me-3 text-warning"><Plus size={20} /></span>
//                   <h2 className="h5 mb-0">Add New Reservation</h2>
//                 </div>
//                 <Form onSubmit={handleSubmit}>
//                   <Row className="g-3">
//                     {/* Customer Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Customer</Form.Label>
//                         <Form.Select
//                           value={formData.customerId || ""}
//                           onChange={(e) => {
//                             const selectedUser = users.find(
//                               (u) => String(u.id) === e.target.value
//                             );
//                             if (selectedUser) {
//                               setFormData({
//                                 ...formData,
//                                 customerId: selectedUser.id,
//                                 customerName: selectedUser.name,
//                                 phoneNumber: selectedUser.phone,
//                                 customerEmail: selectedUser.email,
//                               });
//                             }
//                           }}
//                           required
//                         >
//                           <option value="">Select Customer</option>
//                           {loadingUsers ? (
//                             <option disabled>Loading...</option>
//                           ) : (
//                             users.map((user) => (
//                               <option key={user.id} value={user.id}>
//                                 {user.name} ({user.phone})
//                               </option>
//                             ))
//                           )}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>

//                     {/* Phone Number */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Phone Number</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Telephone />
//                           </span>
//                           <Form.Control
//                             type="tel"
//                             name="phoneNumber"
//                             value={formData.phoneNumber || ""}
//                             placeholder="Enter phone number"
//                             required
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Email */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Email</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">@</span>
//                           <Form.Control
//                             type="email"
//                             name="customerEmail"
//                             value={formData.customerEmail || ""}
//                             placeholder="Enter email"
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Table Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Table</Form.Label>
//                         <Dropdown
//                           show={showTableTypeDropdown}
//                           onToggle={(isOpen) => setShowTableTypeDropdown(isOpen)}
//                         >
//                           <Dropdown.Toggle
//                             className="w-100 text-dark text-start d-flex justify-content-between align-items-center"
//                             style={{
//                               fontSize: "1rem",
//                               height: "38px",
//                               borderRadius: "6px",
//                               border: "1px solid #dee2e6",
//                               backgroundColor: "white",
//                             }}
//                           >
//                             {formData.tableName || "Select table"}
//                           </Dropdown.Toggle>
//                           <Dropdown.Menu
//                             className="w-100 custom-dropdown-menu"
//                             style={{
//                               maxHeight: "200px",
//                               overflowY: "auto",
//                               overflowX: "hidden"
//                             }}
//                           >
//                             {tables.length > 0 ? (
//                               tables.map((table) => (
//                                 <Dropdown.Item
//                                   key={table.id}
//                                   onClick={() => handleTableSelect(table)}
//                                   className="text-dark"
//                                 >
//                                   {table.table_name} ({table.table_number})
//                                 </Dropdown.Item>
//                               ))
//                             ) : (
//                               <Dropdown.Item disabled>No tables available</Dropdown.Item>
//                             )}
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </Form.Group>
//                     </Col>

//                     {/* Date */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Date</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Calendar />
//                           </span>
//                           <Form.Control
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             min={today}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Time */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Time</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Clock />
//                           </span>
//                           <Form.Control
//                             type="time"
//                             name="time"
//                             value={formData.time}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>

//                     {/* Duration Hours */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Duration (hours)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="durationHours"
//                           min="1"
//                           value={formData.durationHours}
//                           onChange={handleInputChange}
//                           placeholder="Enter duration"
//                         />
//                       </Form.Group>
//                     </Col>

//                     {/* Party Size */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Party Size</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="partySize"
//                           min="1"
//                           value={formData.partySize}
//                           onChange={handleInputChange}
//                           placeholder="Number of people"
//                         />
//                       </Form.Group>
//                     </Col>

//                     {/* Special Requests */}
//                     <Col md={12}>
//                       <Form.Group>
//                         <Form.Label>Special Requests</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           name="specialRequests"
//                           value={formData.specialRequests}
//                           onChange={handleInputChange}
//                           placeholder="Any special requests (optional)"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Button
//                     type="submit"
//                     variant="warning"
//                     className="w-100 mt-4 text-white"
//                   >
//                     Add Reservation
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Right Column - Today's Summary */}
//           <Col lg={4}>
//             <Card className="mb-4"></Card>
//             <Card>
//               <Card.Body>
//                 <h3 className="h5 mb-3">Today's Summary</h3>
//                 <div className="d-flex flex-column gap-2">
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Total Reservations</span>
//                     <span className="fw-bold">{todayStats.total}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Confirmed</span>
//                     <span className="fw-bold text-primary">{todayStats.confirmed}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Arrived</span>
//                     <span className="fw-bold text-success">{todayStats.arrived}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Cancelled</span>
//                     <span className="fw-bold text-danger">{todayStats.cancelled}</span>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Reservations Table */}
//         <Card className="mt-4">
//           <Card.Body>
//             {/* Header */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
//               <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
//               <div className="text-muted small">{todayFormatted}</div>
//             </div>

//             {/* Filter buttons */}
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {["all", "confirmed", "arrived", "cancelled"].map((status) => (
//                 <Button
//                   key={status}
//                   variant={activeFilter === status ? "warning" : "outline-secondary"}
//                   size="sm"
//                   className="text-dark"
//                   onClick={() => {
//                     setPage(1);
//                     setActiveFilter(status);
//                   }}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </Button>
//               ))}
//             </div>

//             {/* Reservations table */}
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Table</th>
//                     <th>Type</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Guests</th>
//                     <th>Requests</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentReservations.length > 0 ? (
//                     currentReservations.map((reservation) => (
//                       <tr key={reservation.id}>
//                         <td className="fw-bold">{reservation.customer_name}</td>
//                         <td>{reservation.customer_phone}</td>
//                         <td>{reservation.customer_email || "N/A"}</td>
//                         <td>{reservation.table_name}</td>
//                         <td>{reservation.table_type}</td>
//                         <td>
//                           {new Date(reservation.reservation_date).toLocaleDateString()}
//                         </td>
//                         <td>{reservation.reservation_time}</td>
//                         <td>{reservation.party_size}</td>
//                         <td>{reservation.special_requests || "None"}</td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <Badge bg="primary">Confirmed</Badge>
//                           )}
//                           {reservation.status === "arrived" && (
//                             <Badge bg="success">Arrived</Badge>
//                           )}
//                           {reservation.status === "cancelled" && (
//                             <Badge bg="danger">Cancelled</Badge>
//                           )}
//                         </td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <>
//                               <Button
//                                 variant="success"
//                                 size="sm"
//                                 className="me-2 mb-2"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "arrived")
//                                 }
//                               >
//                                 Mark Arrived
//                               </Button>
//                               <Button
//                                 variant="danger"
//                                 size="sm"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "cancelled")
//                                 }
//                               >
//                                 Cancel
//                               </Button>
//                             </>
//                           )}

//                           {/* Session controls for arrived reservations */}
//                           {reservation.status === "arrived" && sessions[reservation.id] && (
//                             <div className="d-flex flex-wrap gap-1">
//                               {sessions[reservation.id].status === 'active' && (
//                                 <>
//                                   <Button
//                                     variant="warning"
//                                     size="sm"
//                                     title="Pause Session"
//                                     onClick={() => pauseSession(reservation.id)}
//                                   >
//                                     <Pause size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                               {sessions[reservation.id].status === 'paused' && (
//                                 <>
//                                   <Button
//                                     variant="success"
//                                     size="sm"
//                                     title="Resume Session"
//                                     onClick={() => resumeSession(reservation.id)}
//                                   >
//                                     <Play size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                             </div>
//                           )}

//                           {reservation.status === "arrived" && !sessions[reservation.id] && (
//                             <span className="text-muted small">Session not started</span>
//                           )}

//                           {reservation.status === "cancelled" && (
//                             <span className="text-muted small">Cancelled</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="11" className="text-center">
//                         No reservations found for today
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>

//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === 1}
//                 onClick={() => setPage((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               <span className="small">
//                 Page {page} of {totalPages}
//               </span>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === totalPages}
//                 onClick={() => setPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ReservationsManagement;

// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";
// import {
//   Calendar,
//   Person,
//   Telephone,
//   Table as TableIcon,
//   Clock,
//   Plus,
//   Pause,
//   Play,
//   StopCircle
// } from 'react-bootstrap-icons';

// const ReservationsManagement = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     tableId: null,
//     tableName: "",
//     customerName: "",
//     customerEmail: "",
//     phoneNumber: "",
//     email: "",
//     date: "",
//     time: "",
//     durationHours: 1,
//     partySize: 1,
//     specialRequests: "",
//   });
//   const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
//   const [tables, setTables] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(5);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [totalCount, setTotalCount] = useState(0);
//   const [sessions, setSessions] = useState({}); // Track sessions by reservation ID

//   // Get today's date
//   const today = new Date().toISOString().split("T")[0];
//   const todayFormatted = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const res = await axiosInstance.get("/users?page=1&limit=10&role=user");
//         if (res.data?.data?.users) {
//           setUsers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch tables
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axiosInstance.get("/tables?status=available");
//         setTables(response.data.data.tables || []);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };
//     fetchTables();
//   }, []);

//   // Fetch reservations
//   const fetchReservations = async () => {
//     try {
//       let url = `/reservations?page=${page}&limit=${limit}`;
//       if (activeFilter !== "all") {
//         url += `&status=${activeFilter}`;
//       }
//       const res = await axiosInstance.get(url);
//       if (res.data?.success) {
//         setReservations(res.data.data || []);
//         setTotalCount(res.data.count || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [page, activeFilter]);

//   // Handle table selection
//   const handleTableSelect = (table) => {
//     setFormData({
//       ...formData,
//       tableId: table.id,
//       tableName: `${table.table_name} (${table.table_number})`,
//     });
//     setShowTableTypeDropdown(false);
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validations
//     if (!formData.tableId) return alert("Please select a table.");
//     if (!formData.customerName.trim()) return alert("Please enter customer name.");
//     if (!formData.phoneNumber.trim()) return alert("Please enter phone number.");
//     if (!formData.date) return alert("Please select a reservation date.");
//     if (!formData.time) return alert("Please select a reservation time.");

//     // Additional validations
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.phoneNumber.trim())) {
//       return alert("Please enter a valid 10-digit phone number.");
//     }
//     if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
//       return alert("Please enter a valid email address.");
//     }

//     const payload = {
//       table_id: formData.tableId,
//       customer_name: formData.customerName.trim(),
//       customer_phone: formData.phoneNumber.trim(),
//       customer_email: formData.customerEmail.trim() || null,
//       reservation_date: formData.date,
//       reservation_time: formData.time,
//       duration_hours: Number(formData.durationHours) || 1,
//       party_size: Number(formData.partySize) || 1,
//       special_requests: formData.specialRequests.trim(),
//     };

//     try {
//       await axiosInstance.post("/reservations", payload);
//       alert("✅ Reservation created successfully!");
//       setFormData({
//         tableId: null,
//         tableName: "",
//         customerName: "",
//         customerEmail: "",
//         phoneNumber: "",
//         email: "",
//         date: "",
//         time: "",
//         durationHours: 1,
//         partySize: 1,
//         specialRequests: "",
//       });
//       fetchReservations();
//     } catch (err) {
//       console.error("Error creating reservation:", err);
//       alert(err?.response?.data?.message || "❌ Failed to create reservation.");
//     }
//   };

//   const fetchTableById = async (tableId) => {
//     try {
//       const response = await axiosInstance.get(`/tables/${tableId}`);
//       if (response.data?.success) {
//         return response.data.data.table;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching table:", error);
//       return null;
//     }
//   };

//   // Start a new session
//   const startSession = async (reservation) => {
//     try {
//       // Get current user ID (assuming it's stored in localStorage)
//       const userId = localStorage.getItem('userId');
//       // Fetch table details to get hourly rate
//       const table = await fetchTableById(reservation.table_id);
//       if (!table) {
//         throw new Error('Table details not found');
//       }
//       // Calculate amount based on hourly rate and duration
//       const hourlyRate = parseFloat(table.hourly_rate) || 0;
//       const duration = parseFloat(reservation.duration_hours) || 1;
//       const amount = hourlyRate * duration;
//       const payload = {
//         table_id: reservation.table_id,
//         customer_name: reservation.customer_name,
//         customer_phone: reservation.customer_phone,
//         user_id: reservation.user_id,
//         amount: amount, // Calculated amount
//         time_limit: "30" // Default 30 minutes
//       };
//       const response = await axiosInstance.post('/sessions/start', payload);
//       if (response.data.success) {
//         const session = response.data.data.session;
//         // Update sessions state
//         setSessions(prev => ({
//           ...prev,
//           [reservation.id]: {
//             id: session.id,
//             status: session.status
//           }
//         }));
//         return session; // Return session data
//       } else {
//         throw new Error(response.data.message || 'Failed to start session');
//       }
//     } catch (err) {
//       console.error('Error starting session:', err);
//       throw err; // Re-throw error to be caught by caller
//     }
//   };

//   // Pause session
//   const pauseSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;
//       const response = await axiosInstance.patch(`/sessions/${sessionId}/pause`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'paused'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to pause session');
//       }
//     } catch (err) {
//       console.error('Error pausing session:', err);
//       alert(`Error pausing session: ${err.message}`);
//     }
//   };

//   // Resume session
//   const resumeSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;
//       const response = await axiosInstance.patch(`/sessions/${sessionId}/resume`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'active'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to resume session');
//       }
//     } catch (err) {
//       console.error('Error resuming session:', err);
//       alert(`Error resuming session: ${err.message}`);
//     }
//   };

//   // Stop session
//   const stopSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;
//       const response = await axiosInstance.patch(`/sessions/${sessionId}/stop`);
//       if (response.data.success) {
//         // Remove session from state
//         setSessions(prev => {
//           const newSessions = { ...prev };
//           delete newSessions[reservationId];
//           return newSessions;
//         });
//         alert('Session stopped successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to stop session');
//       }
//     } catch (err) {
//       console.error('Error stopping session:', err);
//       alert(`Error stopping session: ${err.message}`);
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       // If status is being changed to "arrived", start session first
//       if (newStatus === 'arrived') {
//         const reservation = reservations.find(r => r.id === id);
//         if (reservation) {
//           // Start session first
//           await startSession(reservation);

//           // Only update status after session is successfully started
//           const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
//           if (response.data.success) {
//             const updatedStatus = response.data.data.status;
//             const updatedId = response.data.data.reservationId;
//             // Update the local state
//             setReservations((prev) =>
//               prev.map((res) =>
//                 String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//               )
//             );
//             alert("✅ Session started and reservation marked as arrived!");
//           } else {
//             throw new Error(response.data.message || 'Failed to update status');
//           }
//         }
//       } else {
//         // For other status changes, proceed normally
//         const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
//         if (response.data.success) {
//           const updatedStatus = response.data.data.status;
//           const updatedId = response.data.data.reservationId;
//           // Update the local state
//           setReservations((prev) =>
//             prev.map((res) =>
//               String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//             )
//           );
//         } else {
//           throw new Error(response.data.message || 'Failed to update status');
//         }
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("❌ Failed to update reservation status: " + error.message);
//     }
//   };

//   // Filter reservations
//   const filteredReservations = reservations?.filter((res) => {
//     const statusMatch =
//       activeFilter === "all" ? true : res.status === activeFilter;
//     return statusMatch;
//   }) || [];

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredReservations.length / limit);
//   const indexOfLast = page * limit;
//   const indexOfFirst = indexOfLast - limit;
//   const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);

//   // Stats for today's summary
//   const todayStats = {
//     total: filteredReservations.length,
//     confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
//     arrived: filteredReservations.filter(r => r.status === 'arrived').length,
//     cancelled: filteredReservations.filter(r => r.status === 'cancelled').length
//   };

//   return (
//     <div className="p-3">
//       <div className="flex-grow-1">
//         <div className="mb-4">
//           <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
//           <p className="text-muted">Manage customer reservations and bookings</p>
//         </div>
//         <Row className="g-4">
//           {/* Left Column - Add New Reservation Form */}
//           <Col lg={8}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-4">
//                   <span className="me-3 text-warning"><Plus size={20} /></span>
//                   <h2 className="h5 mb-0">Add New Reservation</h2>
//                 </div>
//                 <Form onSubmit={handleSubmit}>
//                   <Row className="g-3">
//                     {/* Customer Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Customer</Form.Label>
//                         <Form.Select
//                           value={formData.customerId || ""}
//                           onChange={(e) => {
//                             const selectedUser = users.find(
//                               (u) => String(u.id) === e.target.value
//                             );
//                             if (selectedUser) {
//                               setFormData({
//                                 ...formData,
//                                 customerId: selectedUser.id,
//                                 customerName: selectedUser.name,
//                                 phoneNumber: selectedUser.phone,
//                                 customerEmail: selectedUser.email,
//                               });
//                             }
//                           }}
//                           required
//                         >
//                           <option value="">Select Customer</option>
//                           {loadingUsers ? (
//                             <option disabled>Loading...</option>
//                           ) : (
//                             users.map((user) => (
//                               <option key={user.id} value={user.id}>
//                                 {user.name} ({user.phone})
//                               </option>
//                             ))
//                           )}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     {/* Phone Number */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Phone Number</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Telephone />
//                           </span>
//                           <Form.Control
//                             type="tel"
//                             name="phoneNumber"
//                             value={formData.phoneNumber || ""}
//                             placeholder="Enter phone number"
//                             required
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Email */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Email</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">@</span>
//                           <Form.Control
//                             type="email"
//                             name="customerEmail"
//                             value={formData.customerEmail || ""}
//                             placeholder="Enter email"
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Table Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Table</Form.Label>
//                         <Dropdown
//                           show={showTableTypeDropdown}
//                           onToggle={(isOpen) => setShowTableTypeDropdown(isOpen)}
//                         >
//                           <Dropdown.Toggle
//                             className="w-100 text-dark text-start d-flex justify-content-between align-items-center"
//                             style={{
//                               fontSize: "1rem",
//                               height: "38px",
//                               borderRadius: "6px",
//                               border: "1px solid #dee2e6",
//                               backgroundColor: "white",
//                             }}
//                           >
//                             {formData.tableName || "Select table"}
//                           </Dropdown.Toggle>
//                           <Dropdown.Menu
//                             className="w-100 custom-dropdown-menu"
//                             style={{
//                               maxHeight: "200px",
//                               overflowY: "auto",
//                               overflowX: "hidden"
//                             }}
//                           >
//                             {tables.length > 0 ? (
//                               tables.map((table) => (
//                                 <Dropdown.Item
//                                   key={table.id}
//                                   onClick={() => handleTableSelect(table)}
//                                   className="text-dark"
//                                 >
//                                   {table.table_name} ({table.table_number})
//                                 </Dropdown.Item>
//                               ))
//                             ) : (
//                               <Dropdown.Item disabled>No tables available</Dropdown.Item>
//                             )}
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </Form.Group>
//                     </Col>
//                     {/* Date */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Date</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Calendar />
//                           </span>
//                           <Form.Control
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             min={today}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Time */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Time</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Clock />
//                           </span>
//                           <Form.Control
//                             type="time"
//                             name="time"
//                             value={formData.time}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Duration Hours */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Duration (hours)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="durationHours"
//                           min="1"
//                           value={formData.durationHours}
//                           onChange={handleInputChange}
//                           placeholder="Enter duration"
//                         />
//                       </Form.Group>
//                     </Col>
//                     {/* Party Size */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Party Size</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="partySize"
//                           min="1"
//                           value={formData.partySize}
//                           onChange={handleInputChange}
//                           placeholder="Number of people"
//                         />
//                       </Form.Group>
//                     </Col>
//                     {/* Special Requests */}
//                     <Col md={12}>
//                       <Form.Group>
//                         <Form.Label>Special Requests</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           name="specialRequests"
//                           value={formData.specialRequests}
//                           onChange={handleInputChange}
//                           placeholder="Any special requests (optional)"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Button
//                     type="submit"
//                     variant="warning"
//                     className="w-100 mt-4 text-white"
//                   >
//                     Add Reservation
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//           {/* Right Column - Today's Summary */}
//           <Col lg={4}>
//             <Card className="mb-4"></Card>
//             <Card>
//               <Card.Body>
//                 <h3 className="h5 mb-3">Today's Summary</h3>
//                 <div className="d-flex flex-column gap-2">
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Total Reservations</span>
//                     <span className="fw-bold">{todayStats.total}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Confirmed</span>
//                     <span className="fw-bold text-primary">{todayStats.confirmed}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Arrived</span>
//                     <span className="fw-bold text-success">{todayStats.arrived}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Cancelled</span>
//                     <span className="fw-bold text-danger">{todayStats.cancelled}</span>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//         {/* Reservations Table */}
//         <Card className="mt-4">
//           <Card.Body>
//             {/* Header */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
//               <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
//               <div className="text-muted small">{todayFormatted}</div>
//             </div>
//             {/* Filter buttons */}
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {["all", "confirmed", "arrived", "cancelled"].map((status) => (
//                 <Button
//                   key={status}
//                   variant={activeFilter === status ? "warning" : "outline-secondary"}
//                   size="sm"
//                   className="text-dark"
//                   onClick={() => {
//                     setPage(1);
//                     setActiveFilter(status);
//                   }}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </Button>
//               ))}
//             </div>
//             {/* Reservations table */}
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Table</th>
//                     <th>Type</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Guests</th>
//                     <th>Requests</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentReservations.length > 0 ? (
//                     currentReservations.map((reservation) => (
//                       <tr key={reservation.id}>
//                         <td className="fw-bold">{reservation.customer_name}</td>
//                         <td>{reservation.customer_phone}</td>
//                         <td>{reservation.customer_email || "N/A"}</td>
//                         <td>{reservation.table_name}</td>
//                         <td>{reservation.table_type}</td>
//                         <td>
//                           {new Date(reservation.reservation_date).toLocaleDateString()}
//                         </td>
//                         <td>{reservation.reservation_time}</td>
//                         <td>{reservation.party_size}</td>
//                         <td>{reservation.special_requests || "None"}</td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <Badge bg="primary">Confirmed</Badge>
//                           )}
//                           {reservation.status === "arrived" && (
//                             <Badge bg="success">Arrived</Badge>
//                           )}
//                           {reservation.status === "cancelled" && (
//                             <Badge bg="danger">Cancelled</Badge>
//                           )}
//                         </td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <>
//                               <Button
//                                 variant="success"
//                                 size="sm"
//                                 className="me-2 mb-2"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "arrived")
//                                 }
//                               >
//                                 Mark Arrived
//                               </Button>
//                               <Button
//                                 variant="danger"
//                                 size="sm"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "cancelled")
//                                 }
//                               >
//                                 Cancel
//                               </Button>
//                             </>
//                           )}
//                           {/* Session controls for arrived reservations */}
//                           {reservation.status === "arrived" && sessions[reservation.id] && (
//                             <div className="d-flex flex-wrap gap-1">
//                               {sessions[reservation.id].status === 'active' && (
//                                 <>
//                                   <Button
//                                     variant="warning"
//                                     size="sm"
//                                     title="Pause Session"
//                                     onClick={() => pauseSession(reservation.id)}
//                                   >
//                                     <Pause size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                               {sessions[reservation.id].status === 'paused' && (
//                                 <>
//                                   <Button
//                                     variant="success"
//                                     size="sm"
//                                     title="Resume Session"
//                                     onClick={() => resumeSession(reservation.id)}
//                                   >
//                                     <Play size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                             </div>
//                           )}
//                           {reservation.status === "arrived" && !sessions[reservation.id] && (
//                             <span className="text-muted small">Session not started</span>
//                           )}
//                           {reservation.status === "cancelled" && (
//                             <span className="text-muted small">Cancelled</span>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="11" className="text-center">
//                         No reservations found for today
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//             {/* Pagination */}
//             <div className="d-flex justify-content-between align-items-center mt-3">
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === 1}
//                 onClick={() => setPage((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               <span className="small">
//                 Page {page} of {totalPages}
//               </span>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 disabled={page === totalPages}
//                 onClick={() => setPage((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ReservationsManagement;
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
// import axiosInstance from "../../../utils/axiosInstance";
// import {
//   Calendar,
//   Person,
//   Telephone,
//   Table as TableIcon,
//   Clock,
//   Plus,
//   Pause,
//   Play,
//   StopCircle,
//   Trash
// } from 'react-bootstrap-icons';

// const ReservationsManagement = () => {
//   // State for form inputs
//   const [formData, setFormData] = useState({
//     tableId: null,
//     tableName: "",
//     customerName: "",
//     customerEmail: "",
//     phoneNumber: "",
//     email: "",
//     date: "",
//     time: "",
//     durationHours: 1,
//     partySize: 1,
//     specialRequests: "",
//   });
//   const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
//   const [tables, setTables] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [sessions, setSessions] = useState({}); // Track sessions by reservation ID

//   // Get today's date
//   const today = new Date().toISOString().split("T")[0];
//   const todayFormatted = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   // Fetch users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const res = await axiosInstance.get("/users?page=1&limit=10&role=user");
//         if (res.data?.data?.users) {
//           setUsers(res.data.data.users);
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Fetch tables
//   useEffect(() => {
//     const fetchTables = async () => {
//       try {
//         const response = await axiosInstance.get("/tables?status=available");
//         setTables(response.data.data.tables || []);
//       } catch (error) {
//         console.error("Error fetching tables:", error);
//       }
//     };
//     fetchTables();
//   }, []);

//   // Fetch reservations - removed pagination
//   const fetchReservations = async () => {
//     try {
//       let url = `/reservations`;
//       if (activeFilter !== "all") {
//         url += `?status=${activeFilter}`;
//       }
//       const res = await axiosInstance.get(url);
//       if (res.data?.success) {
//         setReservations(res.data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReservations();
//   }, [activeFilter]);

//   // Handle table selection
//   const handleTableSelect = (table) => {
//     setFormData({
//       ...formData,
//       tableId: table.id,
//       tableName: `${table.table_name} (${table.table_number})`,
//     });
//     setShowTableTypeDropdown(false);
//   };

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validations
//     if (!formData.tableId) return alert("Please select a table.");
//     if (!formData.customerName.trim()) return alert("Please enter customer name.");
//     if (!formData.phoneNumber.trim()) return alert("Please enter phone number.");
//     if (!formData.date) return alert("Please select a reservation date.");
//     if (!formData.time) return alert("Please select a reservation time.");

//     // Additional validations
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(formData.phoneNumber.trim())) {
//       return alert("Please enter a valid 10-digit phone number.");
//     }
//     if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
//       return alert("Please enter a valid email address.");
//     }

//     const payload = {
//       table_id: formData.tableId,
//       customer_name: formData.customerName.trim(),
//       customer_phone: formData.phoneNumber.trim(),
//       customer_email: formData.customerEmail.trim() || null,
//       reservation_date: formData.date,
//       reservation_time: formData.time,
//       duration_hours: Number(formData.durationHours) || 1,
//       party_size: Number(formData.partySize) || 1,
//       special_requests: formData.specialRequests.trim(),
//     };

//     try {
//       await axiosInstance.post("/reservations", payload);
//       alert("✅ Reservation created successfully!");
//       setFormData({
//         tableId: null,
//         tableName: "",
//         customerName: "",
//         customerEmail: "",
//         phoneNumber: "",
//         email: "",
//         date: "",
//         time: "",
//         durationHours: 1,
//         partySize: 1,
//         specialRequests: "",
//       });
//       fetchReservations();
//     } catch (err) {
//       console.error("Error creating reservation:", err);
//       alert(err?.response?.data?.message || "❌ Failed to create reservation.");
//     }
//   };

//   const fetchTableById = async (tableId) => {
//     try {
//       const response = await axiosInstance.get(`/tables/${tableId}`);
//       if (response.data?.success) {
//         return response.data.data.table;
//       }
//       return null;
//     } catch (error) {
//       console.error("Error fetching table:", error);
//       return null;
//     }
//   };

//   // Start a new session
//   const startSession = async (reservation) => {
//     try {
//       // Get current user ID (assuming it's stored in localStorage)
//       const userId = localStorage.getItem('userId');

//       // Fetch table details to get hourly rate
//       const table = await fetchTableById(reservation.table_id);
//       if (!table) {
//         throw new Error('Table details not found');
//       }

//       // Calculate amount based on hourly rate and duration
//       const hourlyRate = parseFloat(table.hourly_rate) || 0;
//       const duration = parseFloat(reservation.duration_hours) || 1;
//       const amount = hourlyRate * duration;

//       const payload = {
//         table_id: reservation.table_id,
//         customer_name: reservation.customer_name,
//         customer_phone: reservation.customer_phone,
//         user_id: reservation.user_id,
//         amount: amount, // Calculated amount
//         time_limit: "30" // Default 30 minutes
//       };

//       const response = await axiosInstance.post('/sessions/start', payload);
//       if (response.data.success) {
//         const session = response.data.data.session;
//         // Update sessions state
//         setSessions(prev => ({
//           ...prev,
//           [reservation.id]: {
//             id: session.id,
//             status: session.status
//           }
//         }));
//         return session; // Return session data
//       } else {
//         throw new Error(response.data.message || 'Failed to start session');
//       }
//     } catch (err) {
//       console.error('Error starting session:', err);
//       throw err; // Re-throw error to be caught by caller
//     }
//   };

//   // Pause session
//   const pauseSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/pause`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'paused'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to pause session');
//       }
//     } catch (err) {
//       console.error('Error pausing session:', err);
//       alert(`Error pausing session: ${err.message}`);
//     }
//   };

//   // Resume session
//   const resumeSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/resume`);
//       if (response.data.success) {
//         // Update session status
//         setSessions(prev => ({
//           ...prev,
//           [reservationId]: {
//             ...prev[reservationId],
//             status: 'active'
//           }
//         }));
//       } else {
//         throw new Error(response.data.message || 'Failed to resume session');
//       }
//     } catch (err) {
//       console.error('Error resuming session:', err);
//       alert(`Error resuming session: ${err.message}`);
//     }
//   };

//   // Stop session
//   const stopSession = async (reservationId) => {
//     try {
//       const sessionId = sessions[reservationId]?.id;
//       if (!sessionId) return;

//       const response = await axiosInstance.patch(`/sessions/${sessionId}/end`);
//       if (response.data.success) {
//         // Remove session from state
//         setSessions(prev => {
//           const newSessions = { ...prev };
//           delete newSessions[reservationId];
//           return newSessions;
//         });
//         alert('Session stopped successfully!');
//       } else {
//         throw new Error(response.data.message || 'Failed to stop session');
//       }
//     } catch (err) {
//       console.error('Error stopping session:', err);
//       alert(`Error stopping session: ${err.message}`);
//     }
//   };

//   // Delete reservation
//   const deleteReservation = async (id) => {
//     if (window.confirm("Are you sure you want to delete this reservation?")) {
//       try {
//         const response = await axiosInstance.delete(`/reservations/${id}`);
//         if (response.data.success) {
//           alert("✅ Reservation deleted successfully!");
//           fetchReservations(); // Refresh the reservations list
//         } else {
//           throw new Error(response.data.message || 'Failed to delete reservation');
//         }
//       } catch (error) {
//         console.error("Error deleting reservation:", error);
//         alert("❌ Failed to delete reservation: " + error.message);
//       }
//     }
//   };

//   // Handle status change
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       // If status is being changed to "arrived", start session first
//       if (newStatus === 'arrived') {
//         const reservation = reservations.find(r => r.id === id);
//         if (reservation) {
//           // Start session first
//           await startSession(reservation);
//           // Only update status after session is successfully started
//           const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
//           if (response.data.success) {
//             const updatedStatus = response.data.data.status;
//             const updatedId = response.data.data.reservationId;
//             // Update the local state
//             setReservations((prev) =>
//               prev.map((res) =>
//                 String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//               )
//             );
//             alert("✅ Session started and reservation marked as arrived!");
//           } else {
//             throw new Error(response.data.message || 'Failed to update status');
//           }
//         }
//       } else {
//         // For other status changes, proceed normally
//         const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
//         if (response.data.success) {
//           const updatedStatus = response.data.data.status;
//           const updatedId = response.data.data.reservationId;
//           // Update the local state
//           setReservations((prev) =>
//             prev.map((res) =>
//               String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
//             )
//           );
//         } else {
//           throw new Error(response.data.message || 'Failed to update status');
//         }
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("❌ Failed to update reservation status: " + error.message);
//     }
//   };

//   // Filter reservations
//   const filteredReservations = reservations?.filter((res) => {
//     const statusMatch =
//       activeFilter === "all" ? true : res.status === activeFilter;
//     return statusMatch;
//   }) || [];

//   // Stats for today's summary
//   const todayStats = {
//     total: filteredReservations.length,
//     confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
//     arrived: filteredReservations.filter(r => r.status === 'arrived').length,
//     cancelled: filteredReservations.filter(r => r.status === 'cancelled').length
//   };

//   return (
//     <div className="p-3">
//       <div className="flex-grow-1">
//         <div className="mb-4">
//           <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
//           <p className="text-muted">Manage customer reservations and bookings</p>
//         </div>
//         <Row className="g-4">
//           {/* Left Column - Add New Reservation Form */}
//           <Col lg={8}>
//             <Card className="mb-4">
//               <Card.Body>
//                 <div className="d-flex align-items-center mb-4">
//                   <span className="me-3 text-warning"><Plus size={20} /></span>
//                   <h2 className="h5 mb-0">Add New Reservation</h2>
//                 </div>
//                 <Form onSubmit={handleSubmit}>
//                   <Row className="g-3">
//                     {/* Customer Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Customer</Form.Label>
//                         <Form.Select
//                           value={formData.customerId || ""}
//                           onChange={(e) => {
//                             const selectedUser = users.find(
//                               (u) => String(u.id) === e.target.value
//                             );
//                             if (selectedUser) {
//                               setFormData({
//                                 ...formData,
//                                 customerId: selectedUser.id,
//                                 customerName: selectedUser.name,
//                                 phoneNumber: selectedUser.phone,
//                                 customerEmail: selectedUser.email,
//                               });
//                             }
//                           }}
//                           required
//                         >
//                           <option value="">Select Customer</option>
//                           {loadingUsers ? (
//                             <option disabled>Loading...</option>
//                           ) : (
//                             users.map((user) => (
//                               <option key={user.id} value={user.id}>
//                                 {user.name} ({user.phone})
//                               </option>
//                             ))
//                           )}
//                         </Form.Select>
//                       </Form.Group>
//                     </Col>
//                     {/* Phone Number */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Phone Number</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Telephone />
//                           </span>
//                           <Form.Control
//                             type="tel"
//                             name="phoneNumber"
//                             value={formData.phoneNumber || ""}
//                             placeholder="Enter phone number"
//                             required
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Email */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Email</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">@</span>
//                           <Form.Control
//                             type="email"
//                             name="customerEmail"
//                             value={formData.customerEmail || ""}
//                             placeholder="Enter email"
//                             readOnly
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Table Dropdown */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Table</Form.Label>
//                         <Dropdown
//                           show={showTableTypeDropdown}
//                           onToggle={(isOpen) => setShowTableTypeDropdown(isOpen)}
//                         >
//                           <Dropdown.Toggle
//                             className="w-100 text-dark text-start d-flex justify-content-between align-items-center"
//                             style={{
//                               fontSize: "1rem",
//                               height: "38px",
//                               borderRadius: "6px",
//                               border: "1px solid #dee2e6",
//                               backgroundColor: "white",
//                             }}
//                           >
//                             {formData.tableName || "Select table"}
//                           </Dropdown.Toggle>
//                           <Dropdown.Menu
//                             className="w-100 custom-dropdown-menu"
//                             style={{
//                               maxHeight: "200px",
//                               overflowY: "auto",
//                               overflowX: "hidden"
//                             }}
//                           >
//                             {tables.length > 0 ? (
//                               tables.map((table) => (
//                                 <Dropdown.Item
//                                   key={table.id}
//                                   onClick={() => handleTableSelect(table)}
//                                   className="text-dark"
//                                 >
//                                   {table.table_name} ({table.table_number})
//                                 </Dropdown.Item>
//                               ))
//                             ) : (
//                               <Dropdown.Item disabled>No tables available</Dropdown.Item>
//                             )}
//                           </Dropdown.Menu>
//                         </Dropdown>
//                       </Form.Group>
//                     </Col>
//                     {/* Date */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Date</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Calendar />
//                           </span>
//                           <Form.Control
//                             type="date"
//                             name="date"
//                             value={formData.date}
//                             onChange={handleInputChange}
//                             min={today}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Time */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Time</Form.Label>
//                         <div className="input-group">
//                           <span className="input-group-text">
//                             <Clock />
//                           </span>
//                           <Form.Control
//                             type="time"
//                             name="time"
//                             value={formData.time}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </Form.Group>
//                     </Col>
//                     {/* Duration Hours */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Duration (hours)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="durationHours"
//                           min="1"
//                           value={formData.durationHours}
//                           onChange={handleInputChange}
//                           placeholder="Enter duration"
//                         />
//                       </Form.Group>
//                     </Col>
//                     {/* Party Size */}
//                     <Col md={6}>
//                       <Form.Group>
//                         <Form.Label>Party Size</Form.Label>
//                         <Form.Control
//                           type="number"
//                           name="partySize"
//                           min="1"
//                           value={formData.partySize}
//                           onChange={handleInputChange}
//                           placeholder="Number of people"
//                         />
//                       </Form.Group>
//                     </Col>
//                     {/* Special Requests */}
//                     <Col md={12}>
//                       <Form.Group>
//                         <Form.Label>Special Requests</Form.Label>
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           name="specialRequests"
//                           value={formData.specialRequests}
//                           onChange={handleInputChange}
//                           placeholder="Any special requests (optional)"
//                         />
//                       </Form.Group>
//                     </Col>
//                   </Row>
//                   <Button
//                     type="submit"
//                     variant="warning"
//                     className="w-100 mt-4 text-white"
//                   >
//                     Add Reservation
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//           {/* Right Column - Today's Summary */}
//           <Col lg={4}>
//             <Card className="mb-4"></Card>
//             <Card>
//               <Card.Body>
//                 <h3 className="h5 mb-3">Today's Summary</h3>
//                 <div className="d-flex flex-column gap-2">
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Total Reservations</span>
//                     <span className="fw-bold">{todayStats.total}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Confirmed</span>
//                     <span className="fw-bold text-primary">{todayStats.confirmed}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Arrived</span>
//                     <span className="fw-bold text-success">{todayStats.arrived}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span className="small text-muted">Cancelled</span>
//                     <span className="fw-bold text-danger">{todayStats.cancelled}</span>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//         {/* Reservations Table */}
//         <Card className="mt-4">
//           <Card.Body>
//             {/* Header */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
//               <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
//               <div className="text-muted small">{todayFormatted}</div>
//             </div>
//             {/* Filter buttons */}
//             <div className="d-flex flex-wrap gap-2 mb-4">
//               {["all", "confirmed", "arrived", "cancelled"].map((status) => (
//                 <Button
//                   key={status}
//                   variant={activeFilter === status ? "warning" : "outline-secondary"}
//                   size="sm"
//                   className="text-dark"
//                   onClick={() => setActiveFilter(status)}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                 </Button>
//               ))}
//             </div>
//             {/* Reservations table */}
//             <div className="table-responsive">
//               <Table striped bordered hover>
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Phone</th>
//                     <th>Email</th>
//                     <th>Table</th>
//                     <th>Type</th>
//                     <th>Date</th>
//                     <th>Time</th>
//                     <th>Guests</th>
//                     <th>Requests</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredReservations.length > 0 ? (
//                     filteredReservations.map((reservation) => (
//                       <tr key={reservation.id}>
//                         <td className="fw-bold">{reservation.customer_name}</td>
//                         <td>{reservation.customer_phone}</td>
//                         <td>{reservation.customer_email || "N/A"}</td>
//                         <td>{reservation.table_name}</td>
//                         <td>{reservation.table_type}</td>
//                         <td>
//                           {new Date(reservation.reservation_date).toLocaleDateString()}
//                         </td>
//                         <td>{reservation.reservation_time}</td>
//                         <td>{reservation.party_size}</td>
//                         <td>{reservation.special_requests || "None"}</td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <Badge bg="primary">Confirmed</Badge>
//                           )}
//                           {reservation.status === "arrived" && (
//                             <Badge bg="success">Arrived</Badge>
//                           )}
//                           {reservation.status === "cancelled" && (
//                             <Badge bg="danger">Cancelled</Badge>
//                           )}
//                         </td>
//                         <td>
//                           {reservation.status === "confirmed" && (
//                             <>
//                               <Button
//                                 variant="success"
//                                 size="sm"
//                                 className="me-2 mb-2"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "arrived")
//                                 }
//                               >
//                                 Mark Arrived
//                               </Button>
//                               <Button
//                                 variant="danger"
//                                 size="sm"
//                                 onClick={() =>
//                                   handleStatusChange(reservation.id, "cancelled")
//                                 }
//                               >
//                                 Cancel
//                               </Button>
//                             </>
//                           )}
//                           {/* Session controls for arrived reservations */}
//                           {reservation.status === "arrived" && sessions[reservation.id] && (
//                             <div className="d-flex flex-wrap gap-1">
//                               {sessions[reservation.id].status === 'active' && (
//                                 <>
//                                   <Button
//                                     variant="warning"
//                                     size="sm"
//                                     title="Pause Session"
//                                     onClick={() => pauseSession(reservation.id)}
//                                   >
//                                     <Pause size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                               {sessions[reservation.id].status === 'paused' && (
//                                 <>
//                                   <Button
//                                     variant="success"
//                                     size="sm"
//                                     title="Resume Session"
//                                     onClick={() => resumeSession(reservation.id)}
//                                   >
//                                     <Play size={14} />
//                                   </Button>
//                                   <Button
//                                     variant="danger"
//                                     size="sm"
//                                     title="Stop Session"
//                                     onClick={() => stopSession(reservation.id)}
//                                   >
//                                     <StopCircle size={14} />
//                                   </Button>
//                                 </>
//                               )}
//                               {/* Delete button for arrived reservations */}
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 title="Delete Reservation"
//                                 onClick={() => deleteReservation(reservation.id)}
//                               >
//                                 <Trash size={14} />
//                               </Button>
//                             </div>
//                           )}
//                           {reservation.status === "arrived" && !sessions[reservation.id] && (
//                             <div className="d-flex flex-wrap gap-1">
//                               <span className="text-muted small me-2">Session not started</span>
//                               {/* Delete button for arrived reservations without session */}
//                               <Button
//                                 variant="outline-danger"
//                                 size="sm"
//                                 title="Delete Reservation"
//                                 onClick={() => deleteReservation(reservation.id)}
//                               >
//                                 <Trash size={14} />
//                               </Button>
//                             </div>
//                           )}
//                           {/* Delete button for cancelled reservations */}
//                           {reservation.status === "cancelled" && (
//                             <Button
//                               variant="outline-danger"
//                               size="sm"
//                               onClick={() => deleteReservation(reservation.id)}
//                             >
//                               <Trash size={14} className="me-1" /> Delete
//                             </Button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="11" className="text-center">
//                         No reservations found for today
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </Card.Body>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ReservationsManagement;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
import axiosInstance from "../../../utils/axiosInstance";
import {
  Calendar,
  Person,
  Telephone,
  Table as TableIcon,
  Clock,
  Plus,
  Pause,
  Play,
  StopCircle,
  Trash
} from 'react-bootstrap-icons';
const ReservationsManagement = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    tableId: null,
    tableName: "",
    customerName: "",
    customerEmail: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
    durationHours: 1,
    partySize: 1,
    specialRequests: "",
  });
  const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sessions, setSessions] = useState({}); // Track sessions by reservation ID
  // Get today's date
  const today = new Date().toISOString().split("T")[0];
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await axiosInstance.get("/users?page=1&limit=10&role=user");
        if (res.data?.data?.users) {
          setUsers(res.data.data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);
  // Fetch tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axiosInstance.get("/tables?status=available");
        setTables(response.data.data.tables || []);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);
  // Fetch reservations - removed pagination
  const fetchReservations = async () => {
    try {
      let url = `/reservations`;
      if (activeFilter !== "all") {
        url += `?status=${activeFilter}`;
      }
      const res = await axiosInstance.get(url);
      if (res.data?.success) {
        setReservations(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  useEffect(() => {
    fetchReservations();
  }, [activeFilter]);
  // Handle table selection
  const handleTableSelect = (table) => {
    setFormData({
      ...formData,
      tableId: table.id,
      tableName: `${table.table_name} (${table.table_number})`,
    });
    setShowTableTypeDropdown(false);
  };
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validations
    if (!formData.tableId) return alert("Please select a table.");
    if (!formData.customerName.trim()) return alert("Please enter customer name.");
    if (!formData.phoneNumber.trim()) return alert("Please enter phone number.");
    if (!formData.date) return alert("Please select a reservation date.");
    if (!formData.time) return alert("Please select a reservation time.");
    // Additional validations
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.trim())) {
      return alert("Please enter a valid 10-digit phone number.");
    }
    if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail.trim())) {
      return alert("Please enter a valid email address.");
    }
    const payload = {
      table_id: formData.tableId,
      customer_name: formData.customerName.trim(),
      customer_phone: formData.phoneNumber.trim(),
      customer_email: formData.customerEmail.trim() || null,
      reservation_date: formData.date,
      reservation_time: formData.time,
      duration_hours: Number(formData.durationHours) || 1,
      party_size: Number(formData.partySize) || 1,
      special_requests: formData.specialRequests.trim(),
    };
    try {
      await axiosInstance.post("/reservations", payload);
      alert("✅ Reservation created successfully!");
      setFormData({
        tableId: null,
        tableName: "",
        customerName: "",
        customerEmail: "",
        phoneNumber: "",
        email: "",
        date: "",
        time: "",
        durationHours: 1,
        partySize: 1,
        specialRequests: "",
      });
      fetchReservations();
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert(err?.response?.data?.message || "❌ Failed to create reservation.");
    }
  };
  const fetchTableById = async (tableId) => {
    try {
      const response = await axiosInstance.get(`/tables/${tableId}`);
      if (response.data?.success) {
        return response.data.data.table;
      }
      return null;
    } catch (error) {
      console.error("Error fetching table:", error);
      return null;
    }
  };
  // Start a new session
  const startSession = async (reservation) => {
    try {
      // Get current user ID (assuming it's stored in localStorage)
      const userId = localStorage.getItem('userId');
      // Fetch table details to get hourly rate
      const table = await fetchTableById(reservation.table_id);
      if (!table) {
        throw new Error('Table details not found');
      }
      // Calculate amount based on hourly rate and duration
      const hourlyRate = parseFloat(table.hourly_rate) || 0;
      const duration = parseFloat(reservation.duration_hours) || 1;
      const amount = hourlyRate * duration;
      const payload = {
        table_id: reservation.table_id,
        customer_name: reservation.customer_name,
        customer_phone: reservation.customer_phone,
        user_id: reservation.user_id,
        amount: amount, // Calculated amount
        time_limit: "30" // Default 30 minutes
      };
      const response = await axiosInstance.post('/sessions/start', payload);
      if (response.data.success) {
        const session = response.data.data.session;
        // Update sessions state
        setSessions(prev => ({
          ...prev,
          [reservation.id]: {
            id: session.id,
            status: session.status
          }
        }));
        return session; // Return session data
      } else {
        throw new Error(response.data.message || 'Failed to start session');
      }
    } catch (err) {
      console.error('Error starting session:', err);
      throw err; // Re-throw error to be caught by caller
    }
  };
  // Pause session
  const pauseSession = async (reservationId) => {
    try {
      const sessionId = sessions[reservationId]?.id;
      if (!sessionId) return;
      const response = await axiosInstance.patch(`/sessions/${sessionId}/pause`);
      if (response.data.success) {
        // Update session status
        setSessions(prev => ({
          ...prev,
          [reservationId]: {
            ...prev[reservationId],
            status: 'paused'
          }
        }));
      } else {
        throw new Error(response.data.message || 'Failed to pause session');
      }
    } catch (err) {
      console.error('Error pausing session:', err);
      alert(`Error pausing session: ${err.message}`);
    }
  };
  // Resume session
  const resumeSession = async (reservationId) => {
    try {
      const sessionId = sessions[reservationId]?.id;
      if (!sessionId) return;
      const response = await axiosInstance.patch(`/sessions/${sessionId}/resume`);
      if (response.data.success) {
        // Update session status
        setSessions(prev => ({
          ...prev,
          [reservationId]: {
            ...prev[reservationId],
            status: 'active'
          }
        }));
      } else {
        throw new Error(response.data.message || 'Failed to resume session');
      }
    } catch (err) {
      console.error('Error resuming session:', err);
      alert(`Error resuming session: ${err.message}`);
    }
  };
  // Update reservation status
  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await axiosInstance.patch(`/reservations/${reservationId}/status`, { status });
      if (response.data.success) {
        // Update the local state
        setReservations((prev) =>
          prev.map((res) =>
            String(res.id) === String(reservationId) ? { ...res, status } : res
          )
        );
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to update reservation status');
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      return false;
    }
  };
  // Stop session
  const stopSession = async (reservationId) => {
    try {
      const sessionId = sessions[reservationId]?.id;
      if (!sessionId) return;

      const response = await axiosInstance.patch(`/sessions/${sessionId}/end`);
      if (response.data.success) {
        // Remove session from state
        setSessions(prev => {
          const newSessions = { ...prev };
          delete newSessions[reservationId];
          return newSessions;
        });

        // Update reservation status to "completed"
        const statusUpdated = await updateReservationStatus(reservationId, "completed");
        if (statusUpdated) {
          alert('Session stopped and reservation marked as completed!');
        } else {
          alert('Session stopped, but failed to update reservation status.');
        }
      } else {
        throw new Error(response.data.message || 'Failed to stop session');
      }
    } catch (err) {
      console.error('Error stopping session:', err);
      alert(`Error stopping session: ${err.message}`);
    }
  };
  // Delete reservation
  const deleteReservation = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        const response = await axiosInstance.delete(`/reservations/${id}`);
        if (response.data.success) {
          alert("✅ Reservation deleted successfully!");
          fetchReservations(); // Refresh the reservations list
        } else {
          throw new Error(response.data.message || 'Failed to delete reservation');
        }
      } catch (error) {
        console.error("Error deleting reservation:", error);
        alert("❌ Failed to delete reservation: " + error.message);
      }
    }
  };
  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // If status is being changed to "arrived", start session first
      if (newStatus === 'arrived') {
        const reservation = reservations.find(r => r.id === id);
        if (reservation) {
          // Start session first
          await startSession(reservation);
          // Only update status after session is successfully started
          const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
          if (response.data.success) {
            const updatedStatus = response.data.data.status;
            const updatedId = response.data.data.reservationId;
            // Update the local state
            setReservations((prev) =>
              prev.map((res) =>
                String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
              )
            );
            alert("✅ Session started and reservation marked as arrived!");
          } else {
            throw new Error(response.data.message || 'Failed to update status');
          }
        }
      } else {
        // For other status changes, proceed normally
        const response = await axiosInstance.patch(`/reservations/${id}/status`, { status: newStatus });
        if (response.data.success) {
          const updatedStatus = response.data.data.status;
          const updatedId = response.data.data.reservationId;
          // Update the local state
          setReservations((prev) =>
            prev.map((res) =>
              String(res.id) === String(updatedId) ? { ...res, status: updatedStatus } : res
            )
          );
        } else {
          throw new Error(response.data.message || 'Failed to update status');
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("❌ Failed to update reservation status: " + error.message);
    }
  };
  // Filter reservations
  const filteredReservations = reservations?.filter((res) => {
    const statusMatch =
      activeFilter === "all" ? true : res.status === activeFilter;
    return statusMatch;
  }) || [];
  // Stats for today's summary
  const todayStats = {
    total: filteredReservations.length,
    confirmed: filteredReservations.filter(r => r.status === 'confirmed').length,
    arrived: filteredReservations.filter(r => r.status === 'arrived').length,
    cancelled: filteredReservations.filter(r => r.status === 'cancelled').length,
    completed: filteredReservations.filter(r => r.status === 'completed').length
  };
  return (
    <div className="p-3">
      <div className="flex-grow-1">
        <div className="mb-4">
          <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
          <p className="text-muted">Manage customer reservations and bookings</p>
        </div>
        <Row className="g-4">
          {/* Left Column - Add New Reservation Form */}
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <span className="me-3 text-warning"><Plus size={20} /></span>
                  <h2 className="h5 mb-0">Add New Reservation</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    {/* Customer Dropdown */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Customer</Form.Label>
                        <Form.Select
                          value={formData.customerId || ""}
                          onChange={(e) => {
                            const selectedUser = users.find(
                              (u) => String(u.id) === e.target.value
                            );
                            if (selectedUser) {
                              setFormData({
                                ...formData,
                                customerId: selectedUser.id,
                                customerName: selectedUser.name,
                                phoneNumber: selectedUser.phone,
                                customerEmail: selectedUser.email,
                              });
                            }
                          }}
                          required
                        >
                          <option value="">Select Customer</option>
                          {loadingUsers ? (
                            <option disabled>Loading...</option>
                          ) : (
                            users.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name} ({user.phone})
                              </option>
                            ))
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {/* Phone Number */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Telephone />
                          </span>
                          <Form.Control
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber || ""}
                            placeholder="Enter phone number"
                            required
                            readOnly
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {/* Email */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">@</span>
                          <Form.Control
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail || ""}
                            placeholder="Enter email"
                            readOnly
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {/* Table Dropdown */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Table</Form.Label>
                        <Dropdown
                          show={showTableTypeDropdown}
                          onToggle={(isOpen) => setShowTableTypeDropdown(isOpen)}
                        >
                          <Dropdown.Toggle
                            className="w-100 text-dark text-start d-flex justify-content-between align-items-center"
                            style={{
                              fontSize: "1rem",
                              height: "38px",
                              borderRadius: "6px",
                              border: "1px solid #dee2e6",
                              backgroundColor: "white",
                            }}
                          >
                            {formData.tableName || "Select table"}
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            className="w-100 custom-dropdown-menu"
                            style={{
                              maxHeight: "200px",
                              overflowY: "auto",
                              overflowX: "hidden"
                            }}
                          >
                            {tables.length > 0 ? (
                              tables.map((table) => (
                                <Dropdown.Item
                                  key={table.id}
                                  onClick={() => handleTableSelect(table)}
                                  className="text-dark"
                                >
                                  {table.table_name} ({table.table_number})
                                </Dropdown.Item>
                              ))
                            ) : (
                              <Dropdown.Item disabled>No tables available</Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                    {/* Date */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Calendar />
                          </span>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            min={today}
                            required
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {/* Time */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <Clock />
                          </span>
                          <Form.Control
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    {/* Duration Hours */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Duration (hours)</Form.Label>
                        <Form.Control
                          type="number"
                          name="durationHours"
                          min="1"
                          value={formData.durationHours}
                          onChange={handleInputChange}
                          placeholder="Enter duration"
                        />
                      </Form.Group>
                    </Col>
                    {/* Party Size */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Party Size</Form.Label>
                        <Form.Control
                          type="number"
                          name="partySize"
                          min="1"
                          value={formData.partySize}
                          onChange={handleInputChange}
                          placeholder="Number of people"
                        />
                      </Form.Group>
                    </Col>
                    {/* Special Requests */}
                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Special Requests</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requests (optional)"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    variant="warning"
                    className="w-100 mt-4 text-white"
                  >
                    Add Reservation
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          {/* Right Column - Today's Summary */}
          <Col lg={4}>
            <Card className="mb-4"></Card>
            <Card>
              <Card.Body>
                <h3 className="h5 mb-3">Today's Summary</h3>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Total Reservations</span>
                    <span className="fw-bold">{todayStats.total}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Confirmed</span>
                    <span className="fw-bold text-primary">{todayStats.confirmed}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Arrived</span>
                    <span className="fw-bold text-success">{todayStats.arrived}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Completed</span>
                    <span className="fw-bold text-info">{todayStats.completed}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="small text-muted">Cancelled</span>
                    <span className="fw-bold text-danger">{todayStats.cancelled}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Reservations Table */}
        <Card className="mt-4">
          <Card.Body>
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
              <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
              <div className="text-muted small">{todayFormatted}</div>
            </div>
            {/* Filter buttons */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {["all", "confirmed", "arrived", "completed", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={activeFilter === status ? "warning" : "outline-secondary"}
                  size="sm"
                  className="text-dark"
                  onClick={() => setActiveFilter(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
            {/* Reservations table */}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Table</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Requests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="fw-bold">{reservation.customer_name}</td>
                        <td>{reservation.customer_phone}</td>
                        <td>{reservation.customer_email || "N/A"}</td>
                        <td>{reservation.table_name}</td>
                        <td>{reservation.table_type}</td>
                        <td>
                          {new Date(reservation.reservation_date).toLocaleDateString()}
                        </td>
                        <td>{reservation.reservation_time}</td>
                        <td>{reservation.party_size}</td>
                        <td>{reservation.special_requests || "None"}</td>
                        <td>
                          {reservation.status === "confirmed" && (
                            <Badge bg="primary">Confirmed</Badge>
                          )}
                          {reservation.status === "arrived" && (
                            <Badge bg="success">Arrived</Badge>
                          )}
                          {reservation.status === "completed" && (
                            <Badge bg="info">Completed</Badge>
                          )}
                          {reservation.status === "cancelled" && (
                            <Badge bg="danger">Cancelled</Badge>
                          )}
                        </td>
                        <td>
                          {reservation.status === "confirmed" && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2 mb-2"
                                onClick={() =>
                                  handleStatusChange(reservation.id, "arrived")
                                }
                              >
                                Mark Arrived
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(reservation.id, "cancelled")
                                }
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {/* Session controls for arrived reservations */}
                          {reservation.status === "arrived" && sessions[reservation.id] && (
                            <div className="d-flex flex-wrap gap-1">
                              {sessions[reservation.id].status === 'active' && (
                                <>
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    title="Pause Session"
                                    onClick={() => pauseSession(reservation.id)}
                                  >
                                    <Pause size={14} />
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    title="Stop Session"
                                    onClick={() => stopSession(reservation.id)}
                                  >
                                    <StopCircle size={14} />
                                  </Button>
                                </>
                              )}
                              {sessions[reservation.id].status === 'paused' && (
                                <>
                                  <Button
                                    variant="success"
                                    size="sm"
                                    title="Resume Session"
                                    onClick={() => resumeSession(reservation.id)}
                                  >
                                    <Play size={14} />
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    title="Stop Session"
                                    onClick={() => stopSession(reservation.id)}
                                  >
                                    <StopCircle size={14} />
                                  </Button>
                                </>
                              )}
                              {/* Delete button for arrived reservations */}
                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Delete Reservation"
                                onClick={() => deleteReservation(reservation.id)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          )}
                          {reservation.status === "arrived" && !sessions[reservation.id] && (
                            <div className="d-flex flex-wrap gap-1">
                              <span className="text-muted small me-2">Session not started</span>
                              {/* Delete button for arrived reservations without session */}
                              <Button
                                variant="outline-danger"
                                size="sm"
                                title="Delete Reservation"
                                onClick={() => deleteReservation(reservation.id)}
                              >
                                <Trash size={14} />
                              </Button>
                            </div>
                          )}
                          {/* Delete button for completed reservations */}
                          {reservation.status === "completed" && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteReservation(reservation.id)}
                            >
                              <Trash size={14} className="me-1" /> Delete
                            </Button>
                          )}
                          {/* Delete button for cancelled reservations */}
                          {reservation.status === "cancelled" && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => deleteReservation(reservation.id)}
                            >
                              <Trash size={14} className="me-1" /> Delete
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No reservations found for today
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
export default ReservationsManagement;