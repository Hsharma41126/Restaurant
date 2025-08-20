import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Dropdown, Badge } from 'react-bootstrap';
import axiosInstance from "../../../utils/axiosInstance";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Calendar,
  Person,
  Telephone,
  Table as TableIcon,
  Clock,
  Gear,
  GraphUp,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'react-bootstrap-icons';

const ReservationsManagement = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    tableId: null,       // ← we'll send this as table_id
    tableName: "",       // only for UI display
    customerName: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "",
    durationHours: 1,
    partySize: 1,
    specialRequests: "",
  });

  // State for table type dropdown
  const [showTableTypeDropdown, setShowTableTypeDropdown] = useState(false);
  const [reservations, setReservations] = useState([]); // ✅ define state

  // State for active filter
  //const [activeFilter, setActiveFilter] = useState('all');

  const [tables, setTables] = useState("");

  // State for reservations data
  // const [reservations, setReservations] = useState([
  //   {
  //     id: 1,
  //     customer: 'Michael Johnson',
  //     phone: '+1 (555) 123-4567',
  //     tableType: 'Snooker Table',
  //     time: '2:00 PM',
  //     status: 'confirmed'
  //   },
  //   {
  //     id: 2,
  //     customer: 'Sarah Williams',
  //     phone: '+1 (555) 987-6543',
  //     tableType: 'PlayStation Station',
  //     time: '3:30 PM',
  //     status: 'arrived'
  //   },
  //   {
  //     id: 3,
  //     customer: 'David Chen',
  //     phone: '+1 (555) 456-7890',
  //     tableType: 'Pool Table',
  //     time: '5:00 PM',
  //     status: 'confirmed'
  //   },
  //   {
  //     id: 4,
  //     customer: 'Emma Rodriguez',
  //     phone: '+1 (555) 321-0987',
  //     tableType: 'Restaurant Table',
  //     time: '6:30 PM',
  //     status: 'cancelled'
  //   },
  //   {
  //     id: 5,
  //     customer: 'James Wilson',
  //     phone: '+1 (555) 654-3210',
  //     tableType: 'Snooker Table',
  //     time: '8:00 PM',
  //     status: 'confirmed'
  //   }
  // ]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // how many rows per page
  const [totalPages, setTotalPages] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [activeFilter, setActiveFilter] = useState("all");


  // make the table type dropdown dynamic
  const [tables, setTables] = useState([]);

  // Fetch available tables on mount
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

  const handleTableSelect = (table) => {
    setFormData({
      ...formData,
      tableId: table.id,         // store id for backend
      tableName: `${table.table_name} (${table.table_number})`, // ← for UI
    });
    setShowTableTypeDropdown(false);
  };


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle table type selection
  const handleTableTypeSelect = (type, text) => {
    setFormData(prev => ({
      ...prev,
      tableType: text
    }));
    setShowTableTypeDropdown(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic required validations
    if (!formData.tableId) return alert("Please select a table.");
    if (!formData.customerName) return alert("Please enter customer name.");
    if (!formData.phoneNumber) return alert("Please enter phone number.");
    if (!formData.date) return alert("Please select a reservation date.");
    if (!formData.time) return alert("Please select a reservation time.");

    console.log("Submitting reservation with data:", formData);

    // Build API payload in the exact shape your backend expects
    const payload = {
      table_id: formData.tableId,
      customer_name: formData.customerName.trim(),
      customer_phone: formData.phoneNumber.trim(),
      customer_email: formData.email.trim(),
      reservation_date: formData.date,
      reservation_time: formData.time,
      duration_hours: Number(formData.durationHours),
      party_size: Number(formData.partySize),
      special_requests: formData.specialRequests.trim(),
    };

    try {
      await axiosInstance.post("/reservations", payload);

      alert("Reservation created successfully!");
      // Reset form
      setFormData({
        tableId: null,
        tableName: "",
        customerName: "",
        phoneNumber: "",
        email: "",
        date: "",
        time: "",
        durationHours: 1,
        partySize: 1,
        specialRequests: "",
      });
    } catch (err) {
      console.error("Error creating reservation:", err);
      alert(err?.message || "Failed to create reservation.");
    }
  };



  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/reservations/${id}/status`, { status: newStatus });
      setReservations((prev) =>
        prev.map((res) =>
          res.id === id ? { ...res, status: newStatus } : res
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  // ✅ Fetch reservations dynamically
  const fetchReservations = async () => {
    try {
      const res = await axiosInstance.get(
        `/reservations?page=${page}&limit=${limit}&status=${activeFilter !== "all" ? activeFilter : ""}`
      );

      if (res.data?.status) {
        setReservations(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, activeFilter]);




// ✅ Remove extra status filter from frontend
const filteredReservations =
  reservations?.filter(
    (res) => res.reservation_date.split("T")[0] === today
  ) || [];

  // Get today's date in readable format for display
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };






  // Stats for today's summary
  const todayStats = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    arrived: reservations.filter(r => r.status === 'arrived').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length
  };

  return (
    <div className="p-3">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="mb-4">
          <h1 className="fs-3 fw-bold text-dark">Reservations Management</h1>
          <p className="text-muted">Manage customer reservations and bookings</p>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-4">
                  <span className="me-3 text-warning"><Plus size={20} /></span>
                  <h2 className="h5 mb-0">Add New Reservation</h2>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">

                    {/* Customer Name */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Customer Name</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text"><Person /></span>
                          <Form.Control
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="Enter customer name"
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Phone Number */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text"><Telephone /></span>
                          <Form.Control
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
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
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            placeholder="Enter email address"
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

                          <Dropdown.Menu className="w-100">
                            {tables.length > 0 ? (
                              tables.map((table) => (
                                <Dropdown.Item
                                  key={table.id}
                                  onClick={() => handleTableSelect(table)} // store id + name
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
                          <span className="input-group-text"><Calendar /></span>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>

                    {/* Time */}
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <div className="input-group">
                          <span className="input-group-text"><Clock /></span>
                          <Form.Control
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
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

                  <Button type="submit" variant="warning" className="w-100 mt-4 text-white">
                    Add Reservation
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Side Summary */}
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
                    <span className="small text-muted">Cancelled</span>
                    <span className="fw-bold text-danger">{todayStats.cancelled}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Card className="mt-4">
          <Card.Body>
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
              <h2 className="h5 mb-2 mb-md-0">Today's Reservations</h2>
              <div className="text-muted small">{todayFormatted}</div>
            </div>

            {/* Filter buttons */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              {["all", "confirmed", "arrived", "cancelled"].map((status) => (
                <Button
                  key={status}
                  variant={activeFilter == status ? "warning" : "outline-secondary"}
                  size="sm"
                  className="text-dark"
                  onClick={() => {
                    setPage(1); // reset to first page on filter change
                    setActiveFilter(status);
                  }}
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
                        <td>{reservation.reservation_date.split("T")[0]}</td>
                        <td>{reservation.reservation_time}</td>
                        <td>{reservation.party_size}</td>
                        <td>{reservation.special_requests}</td>
                        <td>
                          {reservation.status === "confirmed" && (
                            <Badge bg="primary">Confirmed</Badge>
                          )}
                          {reservation.status === "arrived" && (
                            <Badge bg="success">Arrived</Badge>
                          )}
                          {reservation.status === "cancelled" && (
                            <Badge bg="danger">Cancelled</Badge>
                          )}
                        </td>
                        <td>
                          {reservation.status === "confirmed" ? (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="me-2 mb-2"
                                onClick={() => handleStatusChange(reservation.id, "arrived")}
                              >
                                Mark Arrived
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleStatusChange(reservation.id, "cancelled")}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <span className="text-muted small">
                              {reservation.status === "arrived"
                                ? "No actions available"
                                : reservation.status === "cancelled" &&
                                "Cancelled by customer"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No reservations found
                      </td>
                    </tr>
                  )}

                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="secondary"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span className="small">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ReservationsManagement;