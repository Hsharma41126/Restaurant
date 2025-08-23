// import React, { useState, useEffect } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import { RiDashboardLine, RiTableLine, RiBarChartLine, RiSettingsLine, RiUserLine, RiNotificationLine, RiGridLine, RiListCheck, RiBilliardsLine, RiGamepadLine, RiRestaurantLine, RiStopLine, RiPlayLine, RiArrowDownSLine } from 'react-icons/ri';
// import { FaPlaystation } from 'react-icons/fa';
// import { Modal, Button } from 'react-bootstrap';

// const TablesManagement = () => {


//     const [showTableModal, setShowTableModal] = useState(false);
//     const [selectedTable, setSelectedTable] = useState(null);
//     const [showCloseConfirm, setShowCloseConfirm] = useState(false);
//     const [members, setMembers] = useState([
//         { id: 1, name: 'John Doe', discount: 10 },
//         { id: 2, name: 'Jane Smith', discount: 5 }
//     ]);
//     const [selectedMember, setSelectedMember] = useState(null);

//     // Handler for table click
//     const handleTableClick = (table) => {
//         setSelectedTable(table);
//         setShowTableModal(true);
//     };

//     // Handler for closing session
//     const handleCloseSession = () => {
//         setShowCloseConfirm(true);
//     };

//     // Confirm close and print
//     const confirmCloseAndPrint = () => {
//         // ...close logic...
//         setShowCloseConfirm(false);
//         setShowTableModal(false);
//         // TODO: Trigger print logic here
//     };

//     // Example: Render member/customer select
//     const renderMemberSelect = () => (
//         <select
//             className="form-select"
//             value={selectedMember ? selectedMember.id : ''}
//             onChange={e => {
//                 const member = members.find(m => m.id === Number(e.target.value));
//                 setSelectedMember(member);
//             }}
//         >
//             <option value="">Select Customer</option>
//             {members.map(m => (
//                 <option key={m.id} value={m.id}>
//                     {m.name} ({m.discount}%)
//                 </option>
//             ))}
//         </select>
//     );

//     // Example: Render item options for restaurant
//     const renderItemOptions = () => (
//         <div>
//             <label>
//                 <input type="checkbox" /> No Cheese
//             </label>
//             <label>
//                 <input type="checkbox" /> Add Cucumber
//             </label>
//             {/* Add more options as needed */}
//         </div>
//     );


//     const [currentTime, setCurrentTime] = useState('');
//     const [tableTypeFilter, setTableTypeFilter] = useState('all');
//     const [viewMode, setViewMode] = useState('grid');
//     const [tables, setTables] = useState([
//         {
//             id: 'S1',
//             name: 'Table S1',
//             type: 'snooker',
//             status: 'running',
//             sessionTime: '02:34:15',
//             currentBill: '$45.50',
//             lightOn: true
//         },
//         {
//             id: 'P1',
//             name: 'Table P1',
//             type: 'pool',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false
//         },
//         {
//             id: 'PS1',
//             name: 'PS1',
//             type: 'playstation',
//             status: 'running',
//             sessionTime: '01:15:32',
//             currentBill: '$22.75',
//             lightOn: true
//         },
//         {
//             id: 'R1',
//             name: 'Table R1',
//             type: 'restaurant',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false
//         },
//         {
//             id: 'S2',
//             name: 'Table S2',
//             type: 'snooker',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false
//         },
//         {
//             id: 'P2',
//             name: 'Table P2',
//             type: 'pool',
//             status: 'running',
//             sessionTime: '00:45:20',
//             currentBill: '$18.25',
//             lightOn: true
//         },
//         {
//             id: 'PS2',
//             name: 'PS2',
//             type: 'playstation',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false
//         },
//         {
//             id: 'R2',
//             name: 'Table R2',
//             type: 'restaurant',
//             status: 'running',
//             sessionTime: '03:22:45',
//             currentBill: '$67.50',
//             lightOn: true
//         }
//     ]);

//     // Update current time every second
//     useEffect(() => {
//         const updateClock = () => {
//             const now = new Date();
//             const timeString = now.toLocaleTimeString('en-US', { hour12: false });
//             setCurrentTime(timeString);
//         };

//         updateClock();
//         const interval = setInterval(updateClock, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     // Update session timers for running tables
//     useEffect(() => {
//         const runningTables = tables.filter(table => table.status === 'running');
//         if (runningTables.length === 0) return;

//         const interval = setInterval(() => {
//             setTables(prevTables =>
//                 prevTables.map(table => {
//                     if (table.status === 'running') {
//                         const [hours, minutes, seconds] = table.sessionTime.split(':').map(Number);
//                         let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;

//                         const h = Math.floor(totalSeconds / 3600);
//                         const m = Math.floor((totalSeconds % 3600) / 60);
//                         const s = totalSeconds % 60;

//                         const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

//                         return {
//                             ...table,
//                             sessionTime: formattedTime
//                         };
//                     }
//                     return table;
//                 })
//             );
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [tables]);

//     const toggleLight = (tableId) => {
//         setTables(prevTables =>
//             prevTables.map(table =>
//                 table.id === tableId ? { ...table, lightOn: !table.lightOn } : table
//             )
//         );
//     };

//     const toggleSession = (tableId) => {
//         setTables(prevTables =>
//             prevTables.map(table => {
//                 if (table.id === tableId) {
//                     const newStatus = table.status === 'running' ? 'free' : 'running';
//                     return {
//                         ...table,
//                         status: newStatus,
//                         sessionTime: newStatus === 'running' ? '00:00:01' : '00:00:00',
//                         lightOn: newStatus === 'running' ? true : false
//                     };
//                 }
//                 return table;
//             })
//         );
//     };

//     const filteredTables = tables.filter(table =>
//         tableTypeFilter === 'all' || table.type === tableTypeFilter
//     );

//     const getTableIcon = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return <RiBilliardsLine className="text-success fs-5" />;
//             case 'pool':
//                 return <RiBilliardsLine className="text-primary fs-5" />;
//             case 'playstation':
//                 return <FaPlaystation className="text-purple fs-5" />;
//             case 'restaurant':
//                 return <RiRestaurantLine className="text-warning fs-5" />;
//             default:
//                 return <RiTableLine className="text-secondary fs-5" />;
//         }
//     };

//     const getTableIconBg = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return 'bg-success bg-opacity-10';
//             case 'pool':
//                 return 'bg-primary bg-opacity-10';
//             case 'playstation':
//                 return 'bg-purple bg-opacity-10';
//             case 'restaurant':
//                 return 'bg-warning bg-opacity-10';
//             default:
//                 return 'bg-secondary bg-opacity-10';
//         }
//     };

//     return (
//         <div className="">
//             {/* Main Content */}
//             <div className="d-flex flex-column flex-grow-1 overflow-hidden">
//                 {/* Header */}
//                 <header className="p-4">
//                     <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//                         <div>
//                             <h1 className="fs-3 fw-bold text-dark">Tables Management</h1>
//                             <p className="mb-0 text-muted">Monitor and control all gaming tables</p>
//                         </div>
//                         <div className="d-flex align-items-center gap-3 gap-md-4">
//                             <div className="text-end">
//                                 <p className="mb-0 small text-muted">Current Time</p>
//                                 <p className="mb-0 fs-5 fw-semibold">{currentTime}</p>
//                             </div>
//                             <div className="d-flex align-items-center justify-content-center bg-gray-100 rounded-circle" style={{ width: '32px', height: '32px' }}>
//                                 <RiNotificationLine className="text-muted" />
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Filter Bar */}
//                 <div className="bg-white border-bottom p-3">
//                     <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//                         <div className="d-flex align-items-center gap-2 gap-md-3 flex-wrap">
//                             {/* Table Type Filter */}
//                             <div className="position-relative">
//                                 <select
//                                     id="tableTypeFilter"
//                                     className="form-select pe-5"
//                                     value={tableTypeFilter}
//                                     onChange={(e) => setTableTypeFilter(e.target.value)}
//                                 >
//                                     <option value="all">All Tables</option>
//                                     <option value="snooker">Snooker</option>
//                                     <option value="pool">Pool</option>
//                                     <option value="playstation">PlayStation</option>
//                                     <option value="restaurant">Restaurant</option>
//                                 </select>
//                                 <div className="position-absolute top-50 end-0 translate-middle-y pe-2 pointer-events-none">

//                                 </div>
//                             </div>

//                             {/* View Toggle */}
//                             <div className="d-flex bg-gray-100 rounded-3 p-1">
//                                 <button
//                                     className={`btn btn-sm px-2 px-md-3 py-1 rounded-2 ${viewMode === 'grid' ? 'bg-white shadow-sm fw-medium' : 'text-muted'}`}
//                                     onClick={() => setViewMode('grid')}
//                                 >
//                                     <RiGridLine className="me-1" /> Grid
//                                 </button>
//                                 <button
//                                     className={`btn btn-sm px-2 px-md-3 py-1 rounded-2 ${viewMode === 'list' ? 'bg-white shadow-sm fw-medium' : 'text-muted'}`}
//                                     onClick={() => setViewMode('list')}
//                                 >
//                                     <RiListCheck className="me-1" /> List
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="d-flex align-items-center gap-3 gap-md-4 flex-wrap">
//                             <div className="text-center">
//                                 <p className="mb-0 h4 fw-bold">8</p>
//                                 <p className="mb-0 small text-muted">Total Tables</p>
//                             </div>
//                             <div className="text-center">
//                                 <p className="mb-0 h4 fw-bold text-success">4</p>
//                                 <p className="mb-0 small text-muted">Running</p>
//                             </div>
//                             <div className="text-center">
//                                 <p className="mb-0 h4 fw-bold text-success">4</p>
//                                 <p className="mb-0 small text-muted">Available</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tables Content */}
//                 <div className="flex-grow-1 overflow-auto p-3 p-md-4">
//                     {viewMode === 'grid' ? (
//                         <div className="row g-3 g-md-4">
//                             {filteredTables.map(table => (
//                                 <div key={table.id} className="col-12 col-sm-6 col-md-4 col-lg-3" onClick={() => handleTableClick(table)}
//                                     style={{ cursor: 'pointer' }}>
//                                     <div className="bg-white rounded-3 shadow-sm border overflow-hidden h-100 d-flex flex-column">
//                                         <div className={`h-2 ${table.status === 'running' ? 'bg-danger' : 'bg-success'}`}></div>
//                                         <div className="p-3 p-md-4 flex-grow-1 d-flex flex-column">
//                                             <div className="d-flex align-items-center justify-content-between mb-3">
//                                                 <div className="d-flex align-items-center gap-2 gap-md-3">
//                                                     <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
//                                                         {getTableIcon(table.type)}
//                                                     </div>
//                                                     <div>
//                                                         <h3 className="mb-0 fw-semibold fs-5">{table.name}</h3>
//                                                         <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                     </div>
//                                                 </div>
//                                                 <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                     {table.status === 'running' ? 'Running' : 'Available'}
//                                                 </span>
//                                             </div>

//                                             <div className="mb-3 mb-md-4 flex-grow-1">
//                                                 {table.status === 'running' ? (
//                                                     <>
//                                                         <div className="d-flex align-items-center justify-content-between mb-2">
//                                                             <span className="small text-muted">Session Time</span>
//                                                             <span className="font-monospace fw-bold">{table.sessionTime}</span>
//                                                         </div>
//                                                         <div className="d-flex align-items-center justify-content-between">
//                                                             <span className="small text-muted">Current Bill</span>
//                                                             <span className="fw-bold text-primary">{table.currentBill}</span>
//                                                         </div>
//                                                     </>
//                                                 ) : (
//                                                     <div className="text-center py-3 py-md-4">
//                                                         <p className="small text-muted">Ready for new session</p>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="d-grid gap-2 gap-md-3">
//                                                 <button
//                                                     className={`btn w-100 ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                     onClick={() => toggleSession(table.id)}
//                                                 >
//                                                     {table.status === 'running' ? (
//                                                         <>
//                                                             <RiStopLine className="me-2" /> Stop Session
//                                                         </>
//                                                     ) : (
//                                                         <>
//                                                             <RiPlayLine className="me-2" /> Start Session
//                                                         </>
//                                                     )}
//                                                 </button>

//                                                 <div className="d-flex align-items-center justify-content-between">
//                                                     <span className="small text-muted">Light/TV Control</span>
//                                                     <div className="d-flex align-items-center gap-2">
//                                                         <div
//                                                             className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
//                                                             onClick={() => toggleLight(table.id)}
//                                                         >
//                                                             <div className="toggle-slider"></div>
//                                                         </div>
//                                                         <span className="x-small text-muted">{table.lightOn ? 'ON' : 'OFF'}</span>
//                                                     </div>
//                                                 </div>

//                                                 <button className="btn btn-outline-secondary w-100 btn-sm">
//                                                     Manual Bill Entry
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
//                             <div className="table-responsive">
//                                 <table className="table table-hover mb-0">
//                                     <thead className="table-light">
//                                         <tr>
//                                             <th>Table Info</th>
//                                             <th>Status</th>
//                                             <th>Session Time</th>
//                                             <th className="text-end">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredTables.map(table => (
//                                             <tr key={table.id}>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3">
//                                                         <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
//                                                             {getTableIcon(table.type)}
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="mb-0 fw-semibold fs-6 fs-md-5">{table.name}</h3>
//                                                             <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2">
//                                                         <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                             {table.status === 'running' ? 'Running' : 'Available'}
//                                                         </span>
//                                                         {table.status === 'running' && (
//                                                             <span className="small text-muted d-none d-md-inline">• Bill: {table.currentBill}</span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <span className="font-monospace fw-bold">
//                                                         {table.status === 'running' ? table.sessionTime : 'Ready'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="text-end">
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3 justify-content-end">
//                                                         <button
//                                                             className={`btn btn-sm ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                             onClick={() => toggleSession(table.id)}
//                                                         >
//                                                             {table.status === 'running' ? (
//                                                                 <>
//                                                                     <RiStopLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Stop</span>
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     <RiPlayLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Start</span>
//                                                                 </>
//                                                             )}
//                                                         </button>
//                                                         <div
//                                                             className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
//                                                             onClick={() => toggleLight(table.id)}
//                                                         >
//                                                             <div className="toggle-slider"></div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <Modal show={showTableModal} onHide={() => setShowTableModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             {selectedTable?.name} Options
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedTable?.status === 'running' ? (
//                             <>
//                                 <Button variant="primary" className="mb-2 w-100">Admin Discount</Button>
//                                 <Button variant="warning" className="mb-2 w-100">Void</Button>
//                                 <Button variant="info" className="mb-2 w-100">Transfer</Button>
//                                 <Button variant="secondary" className="mb-2 w-100">Pause</Button>
//                                 <Button variant="light" className="mb-2 w-100">Show Time & Bill</Button>
//                                 <Button variant="danger" className="mb-2 w-100" onClick={handleCloseSession}>Close</Button>
//                             </>
//                         ) : (
//                             <>
//                                 {selectedTable?.type === 'restaurant' ? (
//                                     <>
//                                         <h5>New Order</h5>
//                                         {renderMemberSelect()}
//                                         {renderItemOptions()}
//                                         <Button variant="success" className="mt-3 w-100">Start Order</Button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <h5>New Session</h5>
//                                         {renderMemberSelect()}
//                                         <Button variant="success" className="mt-3 w-100">Start Session</Button>
//                                     </>
//                                 )}
//                             </>
//                         )}
//                     </Modal.Body>
//                 </Modal>

// // Close confirmation modal
//                 <Modal show={showCloseConfirm} onHide={() => setShowCloseConfirm(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm Close</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Are you sure you want to close this session? This will print the bill.
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>Cancel</Button>
//                         <Button variant="danger" onClick={confirmCloseAndPrint}>OK</Button>
//                     </Modal.Footer>
//                 </Modal>

//             </div>

//             {/* Custom CSS */}
//             <style jsx>{`
//         .w-sidebar {
//           width: 16rem;
//         }
//         .hover-bg-gray:hover {
//           background-color: #f8f9fa;
//         }
//         .bg-gray-100 {
//           background-color: #f8f9fa;
//         }
//         .text-purple {
//           color: #6f42c1;
//         }
//         .bg-purple {
//           background-color: #6f42c1;
//         }
//         .toggle-switch {
//           width: 40px;
//           height: 20px;
//           background-color: #e9ecef;
//           border-radius: 20px;
//           position: relative;
//           cursor: pointer;
//           transition: background-color 0.3s;
//         }
//         .toggle-switch.active {
//           background-color: #198754;
//         }
//         .toggle-slider {
//           width: 16px;
//           height: 16px;
//           background-color: white;
//           border-radius: 50%;
//           position: absolute;
//           top: 2px;
//           left: 2px;
//           transition: transform 0.3s;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//         }
//         .toggle-switch.active .toggle-slider {
//           transform: translateX(20px);
//         }
//         .x-small {
//           font-size: 0.75rem;
//         }
//         @media (max-width: 576px) {
//           .table-responsive {
//             font-size: 0.875rem;
//           }
//         }
//       `}</style>
//         </div>
//     );
// };

// export default TablesManagement;










// import React, { useState, useEffect } from 'react';
// import { RiDashboardLine, RiTableLine, RiBarChartLine, RiSettingsLine, RiUserLine, RiNotificationLine, RiGridLine, RiListCheck, RiBilliardsLine, RiGamepadLine, RiRestaurantLine, RiStopLine, RiPlayLine, RiArrowDownSLine, RiCloseLine } from 'react-icons/ri';
// import { FaPlaystation } from 'react-icons/fa';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import MemberSelect from './MemberSelect';

// const TablesManagement = () => {

//     const navigate = useNavigate()
//     const [showFoodModal, setShowFoodModal] = useState(false);

//     // State declarations
//     const [showTableModal, setShowTableModal] = useState(false);
//     const [selectedTable, setSelectedTable] = useState(null);
//     const [showCloseConfirm, setShowCloseConfirm] = useState(false);
//     const [confirmToggleTable, setConfirmToggleTable] = useState(null);
//     const [showToggleConfirm, setShowToggleConfirm] = useState(false);

//     const [members, setMembers] = useState([
//         { id: 1, name: 'John Doe', discount: 10 },
//         { id: 2, name: 'Jane Smith', discount: 5 },
//         { id: 3, name: 'Mike Johnson', discount: 15 },
//         { id: 4, name: 'Sarah Williams', discount: 0 }
//     ]);
//     const [selectedMember, setSelectedMember] = useState(null);
//     const [menuItems, setMenuItems] = useState([
//         { id: 1, name: 'Burger', options: ['No Cheese', 'Extra Cheese', 'No Pickles'] },
//         { id: 2, name: 'Pizza', options: ['Thin Crust', 'Thick Crust', 'Extra Sauce'] },
//         { id: 3, name: 'Salad', options: ['No Dressing', 'Extra Dressing', 'Add Chicken'] }
//     ]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [itemOptions, setItemOptions] = useState({});
//     const [currentTime, setCurrentTime] = useState('');
//     const [tableTypeFilter, setTableTypeFilter] = useState('all');
//     const [viewMode, setViewMode] = useState('grid');
//     const [timeLimit, setTimeLimit] = useState();  // in minutes
//     const [amount, setAmount] = useState();        // in $
//     const hourlyRate = 10; // Example: 1 hour = $10

//     const [tables, setTables] = useState([
//         {
//             id: 'S1',
//             name: 'Table S1',
//             type: 'snooker',
//             status: 'running',
//             sessionTime: '02:34:15',
//             currentBill: '$45.50',
//             lightOn: true,
//             customer: 'John Doe'
//         },
//         {
//             id: 'P1',
//             name: 'Table P1',
//             type: 'pool',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false,
//             customer: null
//         },
//         {
//             id: 'PS1',
//             name: 'PS1',
//             type: 'playstation',
//             status: 'running',
//             sessionTime: '01:15:32',
//             currentBill: '$22.75',
//             lightOn: true,
//             customer: 'Jane Smith'
//         },
//         // {
//         //     id: 'R1',
//         //     name: 'Table R1',
//         //     type: 'restaurant',
//         //     status: 'free',
//         //     sessionTime: '00:00:00',
//         //     currentBill: '$0.00',
//         //     lightOn: false,
//         //     customer: null
//         // },
//         {
//             id: 'S2',
//             name: 'Table S2',
//             type: 'snooker',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false,
//             customer: null
//         },
//         {
//             id: 'P2',
//             name: 'Table P2',
//             type: 'pool',
//             status: 'running',
//             sessionTime: '00:45:20',
//             currentBill: '$18.25',
//             lightOn: true,
//             customer: 'Mike Johnson'
//         },
//         {
//             id: 'PS2',
//             name: 'PS2',
//             type: 'playstation',
//             status: 'free',
//             sessionTime: '00:00:00',
//             currentBill: '$0.00',
//             lightOn: false,
//             customer: null
//         },
//         // {
//         //     id: 'R2',
//         //     name: 'Table R2',
//         //     type: 'restaurant',
//         //     status: 'running',
//         //     sessionTime: '03:22:45',
//         //     currentBill: '$67.50',
//         //     lightOn: true,
//         //     customer: 'Sarah Williams'
//         // }
//     ]);

//     // Handler for table click
//     const handleTableClick = (table) => {
//         setSelectedTable(table);
//         setShowTableModal(true);
//         setSelectedItems([]);
//         setItemOptions({});
//     };

//     // Handler for closing session
//     const handleCloseSession = () => {
//         setShowCloseConfirm(true);
//     };

//     // Confirm close and print
//     const confirmCloseAndPrint = () => {
//         setTables(prevTables =>
//             prevTables.map(table =>
//                 table.id === selectedTable.id
//                     ? { ...table, status: 'free', sessionTime: '00:00:00', currentBill: '$0.00', lightOn: false, customer: null }
//                     : table
//             )
//         );
//         setShowCloseConfirm(false);
//         setShowTableModal(false);
//         alert(`Printing bill for ${selectedTable.name}\nTotal: ${selectedTable.currentBill}`);
//     };

//     // Start new session
//     const startNewSession = () => {
//         if (selectedTable.type === 'restaurant' && selectedItems.length === 0) {
//             navigate("/staff/ordermanagement")
//             return;
//         }

//         const customerName = selectedMember ? selectedMember.name : 'Guest';
//         setTables(prevTables =>
//             prevTables.map(table =>
//                 table.id === selectedTable.id
//                     ? {
//                         ...table,
//                         status: 'running',
//                         sessionTime: '00:00:01',
//                         currentBill: selectedTable.type === 'restaurant' ? '$15.00' : '$5.00',
//                         lightOn: true,
//                         customer: customerName
//                     }
//                     : table
//             )
//         );
//         setShowTableModal(false);
//     };

//     // Toggle light status
//     const toggleLight = (tableId) => {
//         setTables(prevTables =>
//             prevTables.map(table =>
//                 table.id === tableId ? { ...table, lightOn: !table.lightOn } : table
//             )
//         );
//     };

//     // Toggle session status
//     const toggleSession = (tableId, e) => {
//         e.stopPropagation();
//         setTables(prevTables =>
//             prevTables.map(table => {
//                 if (table.id === tableId) {
//                     const newStatus = table.status === 'running' ? 'free' : 'running';
//                     return {
//                         ...table,
//                         status: newStatus,
//                         sessionTime: newStatus === 'running' ? '00:00:01' : '00:00:00',
//                         lightOn: newStatus === 'running' ? true : false,
//                         customer: newStatus === 'running' ? 'Guest' : null
//                     };
//                 }
//                 return table;
//             })
//         );
//     };

//     // Add item to order
//     const addItemToOrder = (item) => {
//         setSelectedItems([...selectedItems, item]);
//         setItemOptions({ ...itemOptions, [item.id]: [] });
//     };

//     // Remove item from order
//     const removeItemFromOrder = (itemId) => {
//         setSelectedItems(selectedItems.filter(item => item.id !== itemId));

//         const newOptions = { ...itemOptions };
//         delete newOptions[itemId];
//         setItemOptions(newOptions);
//     };

//     // Update item options
//     const handleOptionChange = (itemId, option, isChecked) => {
//         setItemOptions(prev => {
//             const currentOptions = prev[itemId] || [];
//             const newOptions = isChecked
//                 ? [...currentOptions, option]
//                 : currentOptions.filter(opt => opt !== option);

//             return { ...prev, [itemId]: newOptions };
//         });
//     };

//     // Update current time
//     useEffect(() => {
//         const updateClock = () => {
//             const now = new Date();
//             const timeString = now.toLocaleTimeString('en-US', { hour12: false });
//             setCurrentTime(timeString);
//         };

//         updateClock();
//         const interval = setInterval(updateClock, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     // Update session timers
//     useEffect(() => {
//         const runningTables = tables.filter(table => table.status === 'running');
//         if (runningTables.length === 0) return;

//         const interval = setInterval(() => {
//             setTables(prevTables =>
//                 prevTables.map(table => {
//                     if (table.status === 'running') {
//                         const [hours, minutes, seconds] = table.sessionTime.split(':').map(Number);
//                         let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;

//                         const h = Math.floor(totalSeconds / 3600);
//                         const m = Math.floor((totalSeconds % 3600) / 60);
//                         const s = totalSeconds % 60;

//                         const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

//                         let bill = table.currentBill.replace('$', '');
//                         bill = parseFloat(bill) + (table.type === 'restaurant' ? 0.15 : 0.05);

//                         return {
//                             ...table,
//                             sessionTime: formattedTime,
//                             currentBill: `$${bill.toFixed(2)}`
//                         };
//                     }
//                     return table;
//                 })
//             );
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [tables]);

//     // Filter tables by type
//     const filteredTables = tables.filter(table =>
//         tableTypeFilter === 'all' || table.type === tableTypeFilter
//     );

//     // Get table icon based on type
//     const getTableIcon = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return <RiBilliardsLine className="text-success fs-6" />;
//             case 'pool':
//                 return <RiBilliardsLine className="text-primary fs-6" />;
//             case 'playstation':
//                 return <FaPlaystation className="text-purple fs-6" />;
//             case 'restaurant':
//                 return <RiRestaurantLine className="text-warning fs-6" />;
//             default:
//                 return <RiTableLine className="text-secondary fs-6" />;
//         }
//     };

//     // Get table icon background based on type
//     const getTableIconBg = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return 'bg-success bg-opacity-10';
//             case 'pool':
//                 return 'bg-primary bg-opacity-10';
//             case 'playstation':
//                 return 'bg-purple bg-opacity-10';
//             case 'restaurant':
//                 return 'bg-warning bg-opacity-10';
//             default:
//                 return 'bg-secondary bg-opacity-10';
//         }
//     };

//     // Render member select dropdown
//     const renderMemberSelect = () => (
//         <MemberSelect
//             members={members}
//             selectedMember={selectedMember}
//             setSelectedMember={setSelectedMember}
//             setMembers={setMembers}
//         />
//     );
//     // Render menu items for restaurant
//     const renderMenuItems = () => (
//         <div className="mb-3">
//             <h5>Menu Items</h5>
//             <div className="d-flex flex-wrap gap-2 mb-3">
//                 {menuItems.map(item => (
//                     <Button
//                         key={item.id}
//                         variant="outline-primary"
//                         size="sm"
//                         onClick={() => addItemToOrder(item)}
//                     >
//                         {item.name}
//                     </Button>
//                 ))}
//             </div>

//             {selectedItems.length > 0 && (
//                 <div className="border rounded p-3">
//                     <h6>Selected Items</h6>
//                     {selectedItems.map(item => (
//                         <div key={item.id} className="mb-2 border-bottom pb-2">
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <div className="fw-medium">{item.name}</div>
//                                 <Button
//                                     variant="link"
//                                     size="sm"
//                                     className="text-danger p-0"
//                                     onClick={() => removeItemFromOrder(item.id)}
//                                 >
//                                     <RiCloseLine />
//                                 </Button>
//                             </div>

//                             {item.options.length > 0 && (
//                                 <div className="mt-1">
//                                     <small className="text-muted d-block mb-1">Options:</small>
//                                     <div className="d-flex flex-wrap gap-2">
//                                         {item.options.map(option => (
//                                             <Form.Check
//                                                 key={option}
//                                                 type="checkbox"
//                                                 label={option}
//                                                 checked={(itemOptions[item.id] || []).includes(option)}
//                                                 onChange={(e) => handleOptionChange(item.id, option, e.target.checked)}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );

//     return (
//         <div className="p-3">
//             {/* Main Content */}
//             <div className="d-flex flex-column flex-grow-1 overflow-hidden">
//                 {/* Header */}
//                 <header className="">
//                     <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//                         <div>
//                             <h1 className="fs-3 fw-bold text-dark">Tables Management</h1>
//                             <p className="mb-0 text-muted">Monitor and control all gaming tables</p>
//                         </div>
//                         <div className="d-flex align-items-center gap-3 gap-md-4">
//                             <div className="text-end">
//                                 <p className="mb-0 small text-muted">Current Time</p>
//                                 <p className="mb-0 fs-5 fw-semibold">{currentTime}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Filter Bar */}
//                 <div className="mt-3">
//                     <div className="d-flex gap-2 flex-wrap">
//                         {["All", "Pool", "Playstation", "Snooker", "TV"].map((type) => (
//                             <button
//                                 key={type}
//                                 type="button"
//                                 onClick={() => setTableTypeFilter(type.toLowerCase())}
//                                 className={`px-3 py-1 border fw-medium ${tableTypeFilter === type.toLowerCase()
//                                     ? "border-dark text-dark rounded"
//                                     : "border-secondary text-muted rounded"
//                                     }`}


//                                 style={{
//                                     backgroundColor:
//                                         tableTypeFilter === type.toLowerCase() ? "#facc15" : "transparent",
//                                     minWidth: "110px",
//                                     textAlign: "center",
//                                     borderWidth: "2px",
//                                 }}
//                             >
//                                 {type}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Tables Content */}
//                 <div className="flex-grow-1 mt-3">
//                     {viewMode === 'grid' ? (
//                         <div className="row g-2 g-md-3">
//                             {filteredTables.map(table => (
//                                 <div key={table.id} className="col-6 col-sm-4 col-md-3 col-lg-2" onClick={() => handleTableClick(table)}
//                                     style={{ cursor: 'pointer' }}>
//                                     <div className="bg-white rounded-3 shadow-sm border overflow-hidden h-100 d-flex flex-column">
//                                         <div className={`h-1 ${table.status === 'running' ? 'bg-danger' : 'bg-success'}`}></div>
//                                         <div className="p-2 p-md-3 flex-grow-1 d-flex flex-column">
//                                             <div className="d-flex align-items-center justify-content-between mb-2">
//                                                 <div className="d-flex align-items-center gap-2">
//                                                     <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '32px', height: '32px' }}>
//                                                         {getTableIcon(table.type)}
//                                                     </div>
//                                                     <div>
//                                                         <h3 className="mb-0 fw-semibold fs-6">{table.name}</h3>
//                                                         <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                     </div>
//                                                 </div>
//                                                 <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                     {table.status === 'running' ? 'Running' : 'Free'}
//                                                 </span>
//                                             </div>

//                                             <div className="flex-grow-1">
//                                                 {table.status === 'running' ? (
//                                                     <>
//                                                         {table.customer && (
//                                                             <div className="d-flex align-items-center justify-content-between mb-1">
//                                                                 <span className="small text-muted">Customer</span>
//                                                                 <span className="fw-medium small">{table.customer}</span>
//                                                             </div>
//                                                         )}
//                                                         <div className="d-flex align-items-center justify-content-between mb-1">
//                                                             <span className="small text-muted">Time</span>
//                                                             <span className="font-monospace fw-bold small">{table.sessionTime}</span>
//                                                         </div>
//                                                         <div className="mt-2 text-center mb-2 w-80">
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-sm btn-primary"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation(); // Prevents table card click
//                                                                     setSelectedTable(table); // ✅ Ensure table is tracked
//                                                                     setShowFoodModal(true);  // ✅ Open food modal
//                                                                 }}
//                                                             >
//                                                                 🍽 Order
//                                                             </button>
//                                                         </div>

//                                                     </>
//                                                 ) : (
//                                                     <div className="text-center py-2 py-md-3">
//                                                         <p className="small text-muted">Ready for new session</p>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="d-grid gap-1 gap-md-2">
//                                                 <div className="d-flex gap-1">
//                                                     <button
//                                                         className={`btn btn-sm flex-grow-1 ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setConfirmToggleTable(table);
//                                                             setShowToggleConfirm(true);
//                                                         }}
//                                                     >
//                                                         {table.status === 'running' ? (
//                                                             <RiStopLine className="fs-6" />
//                                                         ) : (
//                                                             <RiPlayLine className="fs-6" />
//                                                         )}
//                                                     </button>


//                                                     <button
//                                                         className="btn btn-sm btn-outline-secondary flex-grow-1"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             handleTableClick(table);
//                                                         }}
//                                                     >
//                                                         {table.status === 'running' ? 'Manage' : 'Start'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
//                             <div className="table-responsive">
//                                 <table className="table table-hover mb-0">
//                                     <thead className="table-light">
//                                         <tr>
//                                             <th>Table Info</th>
//                                             <th>Status</th>
//                                             <th>Session Time</th>
//                                             <th className="text-end">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredTables.map(table => (
//                                             <tr key={table.id} onClick={() => handleTableClick(table)} style={{ cursor: 'pointer' }}>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3">
//                                                         <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
//                                                             {getTableIcon(table.type)}
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="mb-0 fw-semibold fs-6 fs-md-5">{table.name}</h3>
//                                                             <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2">
//                                                         <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                             {table.status === 'running' ? 'Running' : 'Available'}
//                                                         </span>
//                                                         {table.status === 'running' && table.customer && (
//                                                             <span className="small text-muted d-none d-md-inline">• {table.customer}</span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <span className="font-monospace fw-bold">
//                                                         {table.status === 'running' ? table.sessionTime : 'Ready'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="text-end">
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3 justify-content-end">
//                                                         <button
//                                                             className={`btn btn-sm ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleSession(table.id, e);
//                                                             }}
//                                                         >
//                                                             {table.status === 'running' ? (
//                                                                 <>
//                                                                     <RiStopLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Stop</span>
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     <RiPlayLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Start</span>
//                                                                 </>
//                                                             )}
//                                                         </button>
//                                                         <div
//                                                             className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleLight(table.id);
//                                                             }}
//                                                         >
//                                                             <div className="toggle-slider"></div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Table Modal */}
//                 <Modal show={showTableModal} onHide={() => setShowTableModal(false)} size="lg">
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             {selectedTable?.name} - {selectedTable?.type.toUpperCase()}
//                             {selectedTable?.status === 'running' && selectedTable?.customer && (
//                                 <div className="small text-muted">Customer: {selectedTable.customer}</div>
//                             )}
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedTable?.status === 'running' ? (
//                             <>
//                                 <h5 className="mb-3">Session Management</h5>
//                                 <div className="d-flex flex-wrap gap-2 mb-3">
//                                     <Button variant="warning" className="mb-2">
//                                         Void
//                                     </Button>
//                                     <Button variant="info" className="mb-2">
//                                         Transfer
//                                     </Button>
//                                     <Button variant="secondary" className="mb-2">
//                                         Pause
//                                     </Button>
//                                     <Button variant="light" className="mb-2">
//                                         Show Time & Bill
//                                     </Button>
//                                 </div>

//                                 <div className="bg-light p-3 rounded mb-3">
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <span className="text-muted">Session Time:</span>
//                                             <span className="fw-bold ms-2">{selectedTable?.sessionTime}</span>
//                                         </div>
//                                         <div>
//                                             <span className="text-muted">Current Bill:</span>
//                                             <span className="fw-bold text-primary ms-2">{selectedTable?.currentBill}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <Button variant="danger" className="w-100" onClick={handleCloseSession}>
//                                     Close Session & Print Bill
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <h5 className="mb-3">
//                                     {selectedTable?.type === 'restaurant' ? 'Start New Order' : 'Start New Session'}
//                                 </h5>

//                                 {renderMemberSelect()}
//                                 {selectedTable?.type === 'restaurant' && renderMenuItems()}

//                                 {/* Time/Money Inputs */}
//                                 {selectedTable?.type !== 'restaurant' && (
//                                     <div className="mb-3">
//                                         <label className="form-label">Set Time Limit (minutes)</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={timeLimit}
//                                             onChange={(e) => {
//                                                 const minutes = Number(e.target.value);
//                                                 setTimeLimit(minutes);
//                                                 setAmount((minutes / 60) * hourlyRate); // auto update money
//                                             }}
//                                             placeholder="Enter minutes"
//                                         />

//                                         <label className="form-label mt-3">Or Set by Amount ($)</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={amount}
//                                             onChange={(e) => {
//                                                 const money = Number(e.target.value);
//                                                 setAmount(money);
//                                                 setTimeLimit((money / hourlyRate) * 60); // auto update minutes
//                                             }}
//                                             placeholder="Enter amount"
//                                         />

//                                         {/* Preview */}
//                                         <div className="mt-2">
//                                             <small>
//                                                 {timeLimit} minutes = ${amount}
//                                             </small>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <Button
//                                     variant="success"
//                                     className="w-100 mt-3"
//                                     onClick={startNewSession}
//                                 >
//                                     {selectedTable?.type === 'restaurant' ? 'Start Order' : 'Start Session'}
//                                 </Button>
//                             </>

//                         )}
//                     </Modal.Body>
//                 </Modal>

//                 {/* Close confirmation modal */}
//                 <Modal show={showCloseConfirm} onHide={() => setShowCloseConfirm(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm Close Session</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Are you sure you want to close this session? This will print the bill.</p>
//                         <div className="bg-light p-3 rounded">
//                             <div className="d-flex justify-content-between">
//                                 <div>
//                                     <span className="text-muted">Table:</span>
//                                     <span className="fw-bold ms-2">{selectedTable?.name}</span>
//                                 </div>
//                                 <div>
//                                     <span className="text-muted">Total Bill:</span>
//                                     <span className="fw-bold text-primary ms-2">{selectedTable?.currentBill}</span>
//                                 </div>
//                             </div>
//                             {selectedTable?.customer && (
//                                 <div className="mt-2">
//                                     <span className="text-muted">Customer:</span>
//                                     <span className="fw-bold ms-2">{selectedTable.customer}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant="danger" onClick={confirmCloseAndPrint}>
//                             Confirm & Print
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>



//                 {/*  Add a new modal for confirmation (similar to close session modal): */}
//                 <Modal show={showToggleConfirm} onHide={() => setShowToggleConfirm(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             {confirmToggleTable?.status === 'running' ? 'Confirm Stop Session' : 'Confirm Start Session'}
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Are you sure you want to {confirmToggleTable?.status === 'running' ? 'stop' : 'start'} the session for <strong>{confirmToggleTable?.name}</strong>?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowToggleConfirm(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant={confirmToggleTable?.status === 'running' ? 'danger' : 'success'} onClick={() => {
//                             toggleSession(confirmToggleTable.id, new Event('click'));
//                             setShowToggleConfirm(false);
//                         }}>
//                             {confirmToggleTable?.status === 'running' ? 'Stop' : 'Start'}
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>


//                 {/* Food Order Modal */}
//                 <Modal
//                     show={showFoodModal}
//                     onHide={() => setShowFoodModal(false)}
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Order Food</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* Food menu UI */}
//                         {renderMenuItems()}
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowFoodModal(false)}>
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="primary"
//                             onClick={() => {
//                                 if (selectedItems.length === 0) {
//                                     alert("Please select at least one item to order.");
//                                     return;
//                                 }
//                                 navigate("/staff/ordermanagement");
//                                 setShowFoodModal(false);
//                             }}
//                         >
//                             Place Order
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>

//             </div>

//             {/* Custom CSS */}
//             <style jsx>{`
//                 .w-sidebar {
//                     width: 16rem;
//                 }
//                 .hover-bg-gray:hover {
//                     background-color: #f8f9fa;
//                 }
//                 .bg-gray-100 {
//                     background-color: #f8f9fa;
//                 }
//                 .text-purple {
//                     color: #6f42c1;
//                 }
//                 .bg-purple {
//                     background-color: #ddd2f1ff;
//                 }
//                 .toggle-switch {
//                     width: 40px;
//                     height: 20px;
//                     background-color: #e9ecef;
//                     border-radius: 20px;
//                     position: relative;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }
//                 .toggle-switch.active {
//                     background-color: #198754;
//                 }
//                 .toggle-slider {
//                     width: 16px;
//                     height: 16px;
//                     background-color: white;
//                     border-radius: 50%;
//                     position: absolute;
//                     top: 2px;
//                     left: 2px;
//                     transition: transform 0.3s;
//                     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//                 }
//                 .toggle-switch.active .toggle-slider {
//                     transform: translateX(20px);
//                 }
//                 .x-small {
//                     font-size: 0.75rem;
//                 }
//                 @media (max-width: 576px) {
//                     .table-responsive {
//                         font-size: 0.875rem;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default TablesManagement;


// import React, { useState, useEffect } from 'react';
// import { RiDashboardLine, RiTableLine, RiBarChartLine, RiSettingsLine, RiUserLine, RiNotificationLine, RiGridLine, RiListCheck, RiBilliardsLine, RiGamepadLine, RiRestaurantLine, RiStopLine, RiPlayLine, RiArrowDownSLine, RiCloseLine } from 'react-icons/ri';
// import { FaPlaystation } from 'react-icons/fa';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import MemberSelect from './MemberSelect';
// import { apiUrl } from '../../../utils/config';

// const TablesManagement = () => {
//     const navigate = useNavigate()
//     const [showFoodModal, setShowFoodModal] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // State declarations
//     const [showTableModal, setShowTableModal] = useState(false);
//     const [selectedTable, setSelectedTable] = useState(null);
//     const [showCloseConfirm, setShowCloseConfirm] = useState(false);
//     const [confirmToggleTable, setConfirmToggleTable] = useState(null);
//     const [showToggleConfirm, setShowToggleConfirm] = useState(false);

//     const [members, setMembers] = useState([
//         { id: 1, name: 'John Doe', discount: 10 },
//         { id: 2, name: 'Jane Smith', discount: 5 },
//         { id: 3, name: 'Mike Johnson', discount: 15 },
//         { id: 4, name: 'Sarah Williams', discount: 0 }
//     ]);
//     const [selectedMember, setSelectedMember] = useState(null);
//     const [menuItems, setMenuItems] = useState([
//         { id: 1, name: 'Burger', options: ['No Cheese', 'Extra Cheese', 'No Pickles'] },
//         { id: 2, name: 'Pizza', options: ['Thin Crust', 'Thick Crust', 'Extra Sauce'] },
//         { id: 3, name: 'Salad', options: ['No Dressing', 'Extra Dressing', 'Add Chicken'] }
//     ]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [itemOptions, setItemOptions] = useState({});
//     const [currentTime, setCurrentTime] = useState('');
//     const [tableTypeFilter, setTableTypeFilter] = useState('all');
//     const [viewMode, setViewMode] = useState('grid');
//     const [timeLimit, setTimeLimit] = useState();  // in minutes
//     const [amount, setAmount] = useState();        // in $
//     const hourlyRate = 10; // Default hourly rate if not provided

//     const [tables, setTables] = useState([]);

//     // Fetch tables from API
//     useEffect(() => {
//         const fetchTables = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`${apiUrl}/tables`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // Add authorization header if needed
//                         'Authorization': `Bearer ${localStorage.getItem("token")}` // Ensure token is set correctly
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 if (data.success) {
//                     // Transform API data to match component structure
//                     const formattedTables = data.data.tables.map(table => ({
//                         id: table.id.toString(),
//                         name: table.table_name,
//                         type: table.table_type,
//                         status: table.status === 'available' ? 'free' : 'running',
//                         sessionTime: '00:00:00',
//                         currentBill: '$0.00',
//                         lightOn: false,
//                         customer: null,
//                         hourlyRate: table.hourly_rate || hourlyRate,
//                         capacity: table.capacity,
//                         location: table.location
//                     }));

//                     setTables(formattedTables);
//                 } else {
//                     throw new Error(data.message || 'Failed to fetch tables');
//                 }
//             } catch (err) {
//                 console.error('Error fetching tables:', err);
//                 setError(err.message);

//                 // Fallback to sample data if API fails
//                 setTables([
//                     {
//                         id: 'S1',
//                         name: 'Table S1',
//                         type: 'snooker',
//                         status: 'running',
//                         sessionTime: '02:34:15',
//                         currentBill: '$45.50',
//                         lightOn: true,
//                         customer: 'John Doe',
//                         hourlyRate: 15
//                     },
//                     {
//                         id: 'P1',
//                         name: 'Table P1',
//                         type: 'pool',
//                         status: 'free',
//                         sessionTime: '00:00:00',
//                         currentBill: '$0.00',
//                         lightOn: false,
//                         customer: null,
//                         hourlyRate: 10
//                     }
//                 ]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTables();
//     }, []);

//     // Handler for table click
//     const handleTableClick = (table) => {
//         setSelectedTable(table);
//         setShowTableModal(true);
//         setSelectedItems([]);
//         setItemOptions({});
//     };

//     // Handler for closing session
//     const handleCloseSession = () => {
//         setShowCloseConfirm(true);
//     };

//     // Confirm close and print
//     const confirmCloseAndPrint = async () => {
//         try {
//             // API call to close session
//             const response = await fetch(`${apiUrl}/tables/${selectedTable.id}/close`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();

//                 // Update local state
//                 setTables(prevTables =>
//                     prevTables.map(table =>
//                         table.id === selectedTable.id
//                             ? {
//                                 ...table,
//                                 status: 'free',
//                                 sessionTime: '00:00:00',
//                                 currentBill: '$0.00',
//                                 lightOn: false,
//                                 customer: null
//                             }
//                             : table
//                     )
//                 );

//                 alert(`Printing bill for ${selectedTable.name}\nTotal: ${data.totalAmount}`);
//             } else {
//                 throw new Error('Failed to close session');
//             }
//         } catch (err) {
//             console.error('Error closing session:', err);
//             alert('Error closing session. Please try again.');
//         } finally {
//             setShowCloseConfirm(false);
//             setShowTableModal(false);
//         }
//     };

//     // Start new session
//     const startNewSession = async () => {
//         if (selectedTable.type === 'restaurant' && selectedItems.length === 0) {
//             navigate("/staff/ordermanagement")
//             return;
//         }

//         try {
//             const customerName = selectedMember ? selectedMember.name : 'Guest';

//             // API call to start session
//             const response = await fetch(`${apiUrl}/tables/${selectedTable.id}/start`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     customer: customerName,
//                     memberId: selectedMember?.id,
//                     timeLimit: timeLimit,
//                     amount: amount
//                 })
//             });

//             if (response.ok) {
//                 const data = await response.json();

//                 // Update local state
//                 setTables(prevTables =>
//                     prevTables.map(table =>
//                         table.id === selectedTable.id
//                             ? {
//                                 ...table,
//                                 status: 'running',
//                                 sessionTime: data.startTime || '00:00:01',
//                                 currentBill: data.currentBill || (selectedTable.type === 'restaurant' ? '$15.00' : '$5.00'),
//                                 lightOn: true,
//                                 customer: customerName
//                             }
//                             : table
//                     )
//                 );
//             } else {
//                 throw new Error('Failed to start session');
//             }
//         } catch (err) {
//             console.error('Error starting session:', err);
//             alert('Error starting session. Please try again.');
//         } finally {
//             setShowTableModal(false);
//         }
//     };

//     // Toggle light status
//     const toggleLight = async (tableId) => {
//         try {
//             // API call to toggle light
//             const response = await fetch(`${apiUrl}/tables/${tableId}/light`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();

//                 // Update local state
//                 setTables(prevTables =>
//                     prevTables.map(table =>
//                         table.id === tableId ? { ...table, lightOn: data.lightOn } : table
//                     )
//                 );
//             } else {
//                 throw new Error('Failed to toggle light');
//             }
//         } catch (err) {
//             console.error('Error toggling light:', err);
//             alert('Error toggling light. Please try again.');
//         }
//     };

//     // Toggle session status
//     const toggleSession = async (tableId, e) => {
//         e.stopPropagation();

//         try {
//             const table = tables.find(t => t.id === tableId);
//             const isStarting = table.status === 'free';

//             // API call to toggle session
//             const response = await fetch(`${apiUrl}/tables/${tableId}/${isStarting ? 'start' : 'stop'}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: isStarting ? JSON.stringify({
//                     customer: 'Guest',
//                     timeLimit: 60 // Default 1 hour
//                 }) : undefined
//             });

//             if (response.ok) {
//                 const data = await response.json();

//                 // Update local state
//                 setTables(prevTables =>
//                     prevTables.map(table => {
//                         if (table.id === tableId) {
//                             const newStatus = table.status === 'running' ? 'free' : 'running';
//                             return {
//                                 ...table,
//                                 status: newStatus,
//                                 sessionTime: newStatus === 'running' ? (data.startTime || '00:00:01') : '00:00:00',
//                                 lightOn: newStatus === 'running' ? true : false,
//                                 customer: newStatus === 'running' ? (data.customer || 'Guest') : null,
//                                 currentBill: newStatus === 'running' ? (data.currentBill || '$5.00') : '$0.00'
//                             };
//                         }
//                         return table;
//                     })
//                 );
//             } else {
//                 throw new Error(`Failed to ${isStarting ? 'start' : 'stop'} session`);
//             }
//         } catch (err) {
//             console.error('Error toggling session:', err);
//             alert(`Error ${isStarting ? 'starting' : 'stopping'} session. Please try again.`);
//         }
//     };

//     // Add item to order
//     const addItemToOrder = (item) => {
//         setSelectedItems([...selectedItems, item]);
//         setItemOptions({ ...itemOptions, [item.id]: [] });
//     };

//     // Remove item from order
//     const removeItemFromOrder = (itemId) => {
//         setSelectedItems(selectedItems.filter(item => item.id !== itemId));

//         const newOptions = { ...itemOptions };
//         delete newOptions[itemId];
//         setItemOptions(newOptions);
//     };

//     // Update item options
//     const handleOptionChange = (itemId, option, isChecked) => {
//         setItemOptions(prev => {
//             const currentOptions = prev[itemId] || [];
//             const newOptions = isChecked
//                 ? [...currentOptions, option]
//                 : currentOptions.filter(opt => opt !== option);

//             return { ...prev, [itemId]: newOptions };
//         });
//     };

//     // Update current time
//     useEffect(() => {
//         const updateClock = () => {
//             const now = new Date();
//             const timeString = now.toLocaleTimeString('en-US', { hour12: false });
//             setCurrentTime(timeString);
//         };

//         updateClock();
//         const interval = setInterval(updateClock, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     // Update session timers
//     useEffect(() => {
//         const runningTables = tables.filter(table => table.status === 'running');
//         if (runningTables.length === 0) return;

//         const interval = setInterval(() => {
//             setTables(prevTables =>
//                 prevTables.map(table => {
//                     if (table.status === 'running') {
//                         const [hours, minutes, seconds] = table.sessionTime.split(':').map(Number);
//                         let totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;

//                         const h = Math.floor(totalSeconds / 3600);
//                         const m = Math.floor((totalSeconds % 3600) / 60);
//                         const s = totalSeconds % 60;

//                         const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

//                         // Calculate bill based on hourly rate
//                         const rate = table.hourlyRate || hourlyRate;
//                         const billIncrement = rate / 3600; // per second
//                         let bill = parseFloat(table.currentBill.replace('$', '')) + billIncrement;

//                         return {
//                             ...table,
//                             sessionTime: formattedTime,
//                             currentBill: `$${bill.toFixed(2)}`
//                         };
//                     }
//                     return table;
//                 })
//             );
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [tables]);

//     // Filter tables by type
//     const filteredTables = tables.filter(table =>
//         tableTypeFilter === 'all' || table.type === tableTypeFilter
//     );

//     // Get table icon based on type
//     const getTableIcon = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return <RiBilliardsLine className="text-success fs-6" />;
//             case 'pool':
//                 return <RiBilliardsLine className="text-primary fs-6" />;
//             case 'playstation':
//                 return <FaPlaystation className="text-purple fs-6" />;
//             case 'restaurant':
//                 return <RiRestaurantLine className="text-warning fs-6" />;
//             default:
//                 return <RiTableLine className="text-secondary fs-6" />;
//         }
//     };

//     // Get table icon background based on type
//     const getTableIconBg = (type) => {
//         switch (type) {
//             case 'snooker':
//                 return 'bg-success bg-opacity-10';
//             case 'pool':
//                 return 'bg-primary bg-opacity-10';
//             case 'playstation':
//                 return 'bg-purple bg-opacity-10';
//             case 'restaurant':
//                 return 'bg-warning bg-opacity-10';
//             default:
//                 return 'bg-secondary bg-opacity-10';
//         }
//     };

//     // Render member select dropdown
//     const renderMemberSelect = () => (
//         <MemberSelect
//             members={members}
//             selectedMember={selectedMember}
//             setSelectedMember={setSelectedMember}
//             setMembers={setMembers}
//         />
//     );

//     // Render menu items for restaurant
//     const renderMenuItems = () => (
//         <div className="mb-3">
//             <h5>Menu Items</h5>
//             <div className="d-flex flex-wrap gap-2 mb-3">
//                 {menuItems.map(item => (
//                     <Button
//                         key={item.id}
//                         variant="outline-primary"
//                         size="sm"
//                         onClick={() => addItemToOrder(item)}
//                     >
//                         {item.name}
//                     </Button>
//                 ))}
//             </div>

//             {selectedItems.length > 0 && (
//                 <div className="border rounded p-3">
//                     <h6>Selected Items</h6>
//                     {selectedItems.map(item => (
//                         <div key={item.id} className="mb-2 border-bottom pb-2">
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <div className="fw-medium">{item.name}</div>
//                                 <Button
//                                     variant="link"
//                                     size="sm"
//                                     className="text-danger p-0"
//                                     onClick={() => removeItemFromOrder(item.id)}
//                                 >
//                                     <RiCloseLine />
//                                 </Button>
//                             </div>

//                             {item.options.length > 0 && (
//                                 <div className="mt-1">
//                                     <small className="text-muted d-block mb-1">Options:</small>
//                                     <div className="d-flex flex-wrap gap-2">
//                                         {item.options.map(option => (
//                                             <Form.Check
//                                                 key={option}
//                                                 type="checkbox"
//                                                 label={option}
//                                                 checked={(itemOptions[item.id] || []).includes(option)}
//                                                 onChange={(e) => handleOptionChange(item.id, option, e.target.checked)}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );

//     if (loading) {
//         return <div className="p-3 text-center">Loading tables...</div>;
//     }

//     if (error) {
//         return <div className="p-3 text-center text-danger">Error: {error}</div>;
//     }

//     return (
//         <div className="p-3">
//             {/* Main Content */}
//             <div className="d-flex flex-column flex-grow-1 overflow-hidden">
//                 {/* Header */}
//                 <header className="">
//                     <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//                         <div>
//                             <h1 className="fs-3 fw-bold text-dark">Tables Management</h1>
//                             <p className="mb-0 text-muted">Monitor and control all gaming tables</p>
//                         </div>
//                         <div className="d-flex align-items-center gap-3 gap-md-4">
//                             <div className="text-end">
//                                 <p className="mb-0 small text-muted">Current Time</p>
//                                 <p className="mb-0 fs-5 fw-semibold">{currentTime}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Filter Bar */}
//                 <div className="mt-3">
//                     <div className="d-flex gap-2 flex-wrap">
//                         {["All", "Pool", "Playstation", "Snooker", "Restaurant"].map((type) => (
//                             <button
//                                 key={type}
//                                 type="button"
//                                 onClick={() => setTableTypeFilter(type.toLowerCase())}
//                                 className={`px-3 py-1 border fw-medium ${tableTypeFilter === type.toLowerCase()
//                                     ? "border-dark text-dark rounded"
//                                     : "border-secondary text-muted rounded"
//                                     }`}
//                                 style={{
//                                     backgroundColor:
//                                         tableTypeFilter === type.toLowerCase() ? "#facc15" : "transparent",
//                                     minWidth: "110px",
//                                     textAlign: "center",
//                                     borderWidth: "2px",
//                                 }}
//                             >
//                                 {type}
//                             </button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Tables Content */}
//                 <div className="flex-grow-1 mt-3">
//                     {viewMode === 'grid' ? (
//                         <div className="row g-2 g-md-3">
//                             {filteredTables.map(table => (
//                                 <div key={table.id} className="col-6 col-sm-4 col-md-3 col-lg-2" onClick={() => handleTableClick(table)}
//                                     style={{ cursor: 'pointer' }}>
//                                     <div className="bg-white rounded-3 shadow-sm border overflow-hidden h-100 d-flex flex-column">
//                                         <div className={`h-1 ${table.status === 'running' ? 'bg-danger' : 'bg-success'}`}></div>
//                                         <div className="p-2 p-md-3 flex-grow-1 d-flex flex-column">
//                                             <div className="d-flex align-items-center justify-content-between mb-2">
//                                                 <div className="d-flex align-items-center gap-2">
//                                                     <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '32px', height: '32px' }}>
//                                                         {getTableIcon(table.type)}
//                                                     </div>
//                                                     <div>
//                                                         <h3 className="mb-0 fw-semibold fs-6">{table.name}</h3>
//                                                         <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                     </div>
//                                                 </div>
//                                                 <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                     {table.status === 'running' ? 'Running' : 'Free'}
//                                                 </span>
//                                             </div>

//                                             <div className="flex-grow-1">
//                                                 {table.status === 'running' ? (
//                                                     <>
//                                                         {table.customer && (
//                                                             <div className="d-flex align-items-center justify-content-between mb-1">
//                                                                 <span className="small text-muted">Customer</span>
//                                                                 <span className="fw-medium small">{table.customer}</span>
//                                                             </div>
//                                                         )}
//                                                         <div className="d-flex align-items-center justify-content-between mb-1">
//                                                             <span className="small text-muted">Time</span>
//                                                             <span className="font-monospace fw-bold small">{table.sessionTime}</span>
//                                                         </div>
//                                                         <div className="mt-2 text-center mb-2 w-80">
//                                                             <button
//                                                                 type="button"
//                                                                 className="btn btn-sm btn-primary"
//                                                                 onClick={(e) => {
//                                                                     e.stopPropagation(); // Prevents table card click
//                                                                     setSelectedTable(table); // ✅ Ensure table is tracked
//                                                                     setShowFoodModal(true);  // ✅ Open food modal
//                                                                 }}
//                                                             >
//                                                                 🍽 Order
//                                                             </button>
//                                                         </div>

//                                                     </>
//                                                 ) : (
//                                                     <div className="text-center py-2 py-md-3">
//                                                         <p className="small text-muted">Ready for new session</p>
//                                                     </div>
//                                                 )}
//                                             </div>

//                                             <div className="d-grid gap-1 gap-md-2">
//                                                 <div className="d-flex gap-1">
//                                                     <button
//                                                         className={`btn btn-sm flex-grow-1 ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             setConfirmToggleTable(table);
//                                                             setShowToggleConfirm(true);
//                                                         }}
//                                                     >
//                                                         {table.status === 'running' ? (
//                                                             <RiStopLine className="fs-6" />
//                                                         ) : (
//                                                             <RiPlayLine className="fs-6" />
//                                                         )}
//                                                     </button>


//                                                     <button
//                                                         className="btn btn-sm btn-outline-secondary flex-grow-1"
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             handleTableClick(table);
//                                                         }}
//                                                     >
//                                                         {table.status === 'running' ? 'Manage' : 'Start'}
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
//                             <div className="table-responsive">
//                                 <table className="table table-hover mb-0">
//                                     <thead className="table-light">
//                                         <tr>
//                                             <th>Table Info</th>
//                                             <th>Status</th>
//                                             <th>Session Time</th>
//                                             <th className="text-end">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {filteredTables.map(table => (
//                                             <tr key={table.id} onClick={() => handleTableClick(table)} style={{ cursor: 'pointer' }}>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3">
//                                                         <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(table.type)}`} style={{ width: '40px', height: '40px' }}>
//                                                             {getTableIcon(table.type)}
//                                                         </div>
//                                                         <div>
//                                                             <h3 className="mb-0 fw-semibold fs-6 fs-md-5">{table.name}</h3>
//                                                             <p className="mb-0 small text-muted text-capitalize">{table.type}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <div className="d-flex align-items-center gap-2">
//                                                         <span className={`px-2 py-1 rounded-pill small fw-medium ${table.status === 'running' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-success bg-opacity-10 text-success'}`}>
//                                                             {table.status === 'running' ? 'Running' : 'Available'}
//                                                         </span>
//                                                         {table.status === 'running' && table.customer && (
//                                                             <span className="small text-muted d-none d-md-inline">• {table.customer}</span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td>
//                                                     <span className="font-monospace fw-bold">
//                                                         {table.status === 'running' ? table.sessionTime : 'Ready'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="text-end">
//                                                     <div className="d-flex align-items-center gap-2 gap-md-3 justify-content-end">
//                                                         <button
//                                                             className={`btn btn-sm ${table.status === 'running' ? 'btn-danger' : 'btn-success'}`}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleSession(table.id, e);
//                                                             }}
//                                                         >
//                                                             {table.status === 'running' ? (
//                                                                 <>
//                                                                     <RiStopLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Stop</span>
//                                                                 </>
//                                                             ) : (
//                                                                 <>
//                                                                     <RiPlayLine className="me-1 me-md-2" /> <span className="d-none d-md-inline">Start</span>
//                                                                 </>
//                                                             )}
//                                                         </button>
//                                                         <div
//                                                             className={`toggle-switch ${table.lightOn ? 'active' : ''}`}
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation();
//                                                                 toggleLight(table.id);
//                                                             }}
//                                                         >
//                                                             <div className="toggle-slider"></div>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Table Modal */}
//                 <Modal show={showTableModal} onHide={() => setShowTableModal(false)} size="lg">
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             {selectedTable?.name} - {selectedTable?.type.toUpperCase()}
//                             {selectedTable?.status === 'running' && selectedTable?.customer && (
//                                 <div className="small text-muted">Customer: {selectedTable.customer}</div>
//                             )}
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedTable?.status === 'running' ? (
//                             <>
//                                 <h5 className="mb-3">Session Management</h5>
//                                 <div className="d-flex flex-wrap gap-2 mb-3">
//                                     <Button variant="warning" className="mb-2">
//                                         Void
//                                     </Button>
//                                     <Button variant="info" className="mb-2">
//                                         Transfer
//                                     </Button>
//                                     <Button variant="secondary" className="mb-2">
//                                         Pause
//                                     </Button>
//                                     <Button variant="light" className="mb-2">
//                                         Show Time & Bill
//                                     </Button>
//                                 </div>

//                                 <div className="bg-light p-3 rounded mb-3">
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <span className="text-muted">Session Time:</span>
//                                             <span className="fw-bold ms-2">{selectedTable?.sessionTime}</span>
//                                         </div>
//                                         <div>
//                                             <span className="text-muted">Current Bill:</span>
//                                             <span className="fw-bold text-primary ms-2">{selectedTable?.currentBill}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <Button variant="danger" className="w-100" onClick={handleCloseSession}>
//                                     Close Session & Print Bill
//                                 </Button>
//                             </>
//                         ) : (
//                             <>
//                                 <h5 className="mb-3">
//                                     {selectedTable?.type === 'restaurant' ? 'Start New Order' : 'Start New Session'}
//                                 </h5>

//                                 {renderMemberSelect()}
//                                 {selectedTable?.type === 'restaurant' && renderMenuItems()}

//                                 {/* Time/Money Inputs */}
//                                 {selectedTable?.type !== 'restaurant' && (
//                                     <div className="mb-3">
//                                         <label className="form-label">Set Time Limit (minutes)</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={timeLimit}
//                                             onChange={(e) => {
//                                                 const minutes = Number(e.target.value);
//                                                 setTimeLimit(minutes);
//                                                 const rate = selectedTable?.hourlyRate || hourlyRate;
//                                                 setAmount((minutes / 60) * rate); // auto update money
//                                             }}
//                                             placeholder="Enter minutes"
//                                         />

//                                         <label className="form-label mt-3">Or Set by Amount ($)</label>
//                                         <input
//                                             type="number"
//                                             className="form-control"
//                                             value={amount}
//                                             onChange={(e) => {
//                                                 const money = Number(e.target.value);
//                                                 setAmount(money);
//                                                 const rate = selectedTable?.hourlyRate || hourlyRate;
//                                                 setTimeLimit((money / rate) * 60); // auto update minutes
//                                             }}
//                                             placeholder="Enter amount"
//                                         />

//                                         {/* Preview */}
//                                         <div className="mt-2">
//                                             <small>
//                                                 {timeLimit} minutes = ${amount?.toFixed(2)}
//                                             </small>
//                                         </div>
//                                     </div>
//                                 )}

//                                 <Button
//                                     variant="success"
//                                     className="w-100 mt-3"
//                                     onClick={startNewSession}
//                                 >
//                                     {selectedTable?.type === 'restaurant' ? 'Start Order' : 'Start Session'}
//                                 </Button>
//                             </>

//                         )}
//                     </Modal.Body>
//                 </Modal>

//                 {/* Close confirmation modal */}
//                 <Modal show={showCloseConfirm} onHide={() => setShowCloseConfirm(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm Close Session</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <p>Are you sure you want to close this session? This will print the bill.</p>
//                         <div className="bg-light p-3 rounded">
//                             <div className="d-flex justify-content-between">
//                                 <div>
//                                     <span className="text-muted">Table:</span>
//                                     <span className="fw-bold ms-2">{selectedTable?.name}</span>
//                                 </div>
//                                 <div>
//                                     <span className="text-muted">Total Bill:</span>
//                                     <span className="fw-bold text-primary ms-2">{selectedTable?.currentBill}</span>
//                                 </div>
//                             </div>
//                             {selectedTable?.customer && (
//                                 <div className="mt-2">
//                                     <span className="text-muted">Customer:</span>
//                                     <span className="fw-bold ms-2">{selectedTable.customer}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant="danger" onClick={confirmCloseAndPrint}>
//                             Confirm & Print
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>

//                 {/* Toggle confirmation modal */}
//                 <Modal show={showToggleConfirm} onHide={() => setShowToggleConfirm(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>
//                             {confirmToggleTable?.status === 'running' ? 'Confirm Stop Session' : 'Confirm Start Session'}
//                         </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Are you sure you want to {confirmToggleTable?.status === 'running' ? 'stop' : 'start'} the session for <strong>{confirmToggleTable?.name}</strong>?
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowToggleConfirm(false)}>
//                             Cancel
//                         </Button>
//                         <Button variant={confirmToggleTable?.status === 'running' ? 'danger' : 'success'} onClick={() => {
//                             toggleSession(confirmToggleTable.id, new Event('click'));
//                             setShowToggleConfirm(false);
//                         }}>
//                             {confirmToggleTable?.status === 'running' ? 'Stop' : 'Start'}
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>

//                 {/* Food Order Modal */}
//                 <Modal
//                     show={showFoodModal}
//                     onHide={() => setShowFoodModal(false)}
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Order Food</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {/* Food menu UI */}
//                         {renderMenuItems()}
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowFoodModal(false)}>
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="primary"
//                             onClick={() => {
//                                 if (selectedItems.length === 0) {
//                                     alert("Please select at least one item to order.");
//                                     return;
//                                 }
//                                 navigate("/staff/ordermanagement");
//                                 setShowFoodModal(false);
//                             }}
//                         >
//                             Place Order
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>

//             </div>

//             {/* Custom CSS */}
//             <style jsx>{`
//                 .w-sidebar {
//                     width: 16rem;
//                 }
//                 .hover-bg-gray:hover {
//                     background-color: #f8f9fa;
//                 }
//                 .bg-gray-100 {
//                     background-color: #f8f9fa;
//                 }
//                 .text-purple {
//                     color: #6f42c1;
//                 }
//                 .bg-purple {
//                     background-color: #ddd2f1ff;
//                 }
//                 .toggle-switch {
//                     width: 40px;
//                     height: 20px;
//                     background-color: #e9ecef;
//                     border-radius: 20px;
//                     position: relative;
//                     cursor: pointer;
//                     transition: background-color 0.3s;
//                 }
//                 .toggle-switch.active {
//                     background-color: #198754;
//                 }
//                 .toggle-slider {
//                     width: 16px;
//                     height: 16px;
//                     background-color: white;
//                     border-radius: 50%;
//                     position: absolute;
//                     top: 2px;
//                     left: 2px;
//                     transition: transform 0.3s;
//                     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//                 }
//                 .toggle-switch.active .toggle-slider {
//                     transform: translateX(20px);
//                 }
//                 .x-small {
//                     font-size: 0.75rem;
//                 }
//                 @media (max-width: 576px) {
//                     .table-responsive {
//                         font-size: 0.875rem;
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default TablesManagement;


import React, { useState, useEffect } from 'react';
import { RiDashboardLine, RiTableLine, RiBarChartLine, RiSettingsLine, RiUserLine, RiNotificationLine, RiGridLine, RiListCheck, RiBilliardsLine, RiGamepadLine, RiRestaurantLine, RiStopLine, RiPlayLine, RiArrowDownSLine, RiCloseLine, RiPauseLine, RiPlayCircleLine } from 'react-icons/ri';
import { FaPlaystation } from 'react-icons/fa';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MemberSelect from './MemberSelect';
import { apiUrl } from '../../../utils/config';

const TablesManagement = () => {
    const navigate = useNavigate()
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State declarations
    const [showTableModal, setShowTableModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [confirmToggleSession, setConfirmToggleSession] = useState(null);
    const [showToggleConfirm, setShowToggleConfirm] = useState(false);
    const [showStartSessionModal, setShowStartSessionModal] = useState(false);

    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Burger', options: ['No Cheese', 'Extra Cheese', 'No Pickles'] },
        { id: 2, name: 'Pizza', options: ['Thin Crust', 'Thick Crust', 'Extra Sauce'] },
        { id: 3, name: 'Salad', options: ['No Dressing', 'Extra Dressing', 'Add Chicken'] }
    ]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemOptions, setItemOptions] = useState({});
    const [currentTime, setCurrentTime] = useState('');
    const [tableTypeFilter, setTableTypeFilter] = useState('all');
    const [viewMode, setViewMode] = useState('grid');
    const [timeLimit, setTimeLimit] = useState();  // in minutes
    const [amount, setAmount] = useState();        // in $
    const hourlyRate = 10; // Default hourly rate if not provided

    const [sessions, setSessions] = useState([]);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTableForStart, setSelectedTableForStart] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // Load current user data
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(userData);
    }, []);

    // Fetch members from API
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${apiUrl}/users?role=user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    // Transform API data to match component structure
                    const formattedMembers = data.data.users.map(user => ({
                        id: user.id,
                        name: user.name,
                        discount: parseFloat(user.discount_percentage) || 0,
                        phone: user.phone,
                        email: user.email,
                        status: user.status,
                        role: user.role
                    }));

                    setMembers(formattedMembers);
                } else {
                    throw new Error(data.message || 'Failed to fetch members');
                }
            } catch (err) {
                console.error('Error fetching members:', err);
                // Fallback to sample data if API fails
                setMembers([
                    { id: 1, name: 'John Doe', discount: 10, phone: '123-456-7890' },
                    { id: 2, name: 'Jane Smith', discount: 5, phone: '123-456-7891' },
                    { id: 3, name: 'Mike Johnson', discount: 15, phone: '123-456-7892' },
                    { id: 4, name: 'Sarah Williams', discount: 0, phone: '123-456-7893' }
                ]);
            }
        };

        fetchMembers();
    }, []);

    // Fetch sessions from API
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/sessions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    setSessions(data.data.sessions || []);
                } else {
                    throw new Error(data.message || 'Failed to fetch sessions');
                }
            } catch (err) {
                console.error('Error fetching sessions:', err);
                setError(err.message);
                // Fallback to sample data if API fails
                setSessions([
                    {
                        id: 5,
                        session_id: "SES-1755757269519-190",
                        table_id: 28,
                        user_id: 11,
                        customer_name: "new user",
                        customer_phone: "9878458596",
                        start_time: "2025-08-21 06:21:09",
                        end_time: null,
                        duration_minutes: 0,
                        hourly_rate: "12.00",
                        session_cost: "0.00",
                        status: "active",
                        amount: null,
                        time_limit: null,
                        table_number: "P20",
                        table_name: "Pool Table 3",
                        table_type: "pool",
                        user_name: "govind singh"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, []);

    // Fetch available tables for starting new session
    const fetchAvailableTables = async () => {
        try {
            const response = await fetch(`${apiUrl}/tables?status=available`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setAvailableTables(data.data.tables || []);
                }
            }
        } catch (err) {
            console.error('Error fetching available tables:', err);
        }
    };

    // Handler for session click
    const handleSessionClick = (session) => {
        setSelectedSession(session);
        setShowTableModal(true);
        setSelectedItems([]);
        setItemOptions({});
    };

    // Handler for closing session
    const handleCloseSession = () => {
        setShowCloseConfirm(true);
    };

    // Confirm close and print
    const confirmCloseAndPrint = async () => {
        try {
            // API call to close session
            const response = await fetch(`${apiUrl}/sessions/${selectedSession.id}/end`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (response.ok) {
                const data = await response.json();

                // Update local state
                setSessions(prevSessions =>
                    prevSessions.filter(session => session.id !== selectedSession.id)
                );

                alert(`Printing bill for ${selectedSession.table_name}\nTotal: ${data.totalAmount}`);
            } else {
                throw new Error('Failed to close session');
            }
        } catch (err) {
            console.error('Error closing session:', err);
            alert('Error closing session. Please try again.');
        } finally {
            setShowCloseConfirm(false);
            setShowTableModal(false);
        }
    };

    // Start new session
    const startNewSession = async () => {
        if (!selectedTableForStart) {
            alert('Please select a table');
            return;
        }

        try {
            // Get current user data
            const userId = currentUser?.id;

            const customerName = selectedMember ? selectedMember.name : 'Guest';
            const customerPhone = selectedMember ? selectedMember.phone : '';

            // API call to start session
            const response = await fetch(`${apiUrl}/sessions/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    table_id: parseInt(selectedTableForStart.id),
                    customer_name: customerName,
                    customer_phone: customerPhone,
                    user_id: userId.toString(),
                    amount: amount || 0,
                    time_limit: timeLimit?.toString() || "30"
                })
            });

            if (response.ok) {
                const data = await response.json();

                // Add new session to the list
                if (data.success) {
                    setSessions(prevSessions => [...prevSessions, data.data.session]);
                }

                alert('Session started successfully!');
                setShowStartSessionModal(false);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to start session');
            }
        } catch (err) {
            console.error('Error starting session:', err);
            alert(`Error starting session: ${err.message}`);
        }
    };

    // Pause session
    const pauseSession = async (sessionId) => {
        try {
            const response = await fetch(`${apiUrl}/sessions/${sessionId}/pause`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (response.ok) {
                // Update session status locally
                setSessions(prevSessions =>
                    prevSessions.map(session =>
                        session.id === sessionId
                            ? { ...session, status: 'paused' }
                            : session
                    )
                );
            } else {
                throw new Error('Failed to pause session');
            }
        } catch (err) {
            console.error('Error pausing session:', err);
            alert('Error pausing session. Please try again.');
        }
    };

    // Resume session
    const resumeSession = async (sessionId) => {
        try {
            const response = await fetch(`${apiUrl}/sessions/${sessionId}/resume`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (response.ok) {
                // Update session status locally
                setSessions(prevSessions =>
                    prevSessions.map(session =>
                        session.id === sessionId
                            ? { ...session, status: 'active' }
                            : session
                    )
                );
            } else {
                throw new Error('Failed to resume session');
            }
        } catch (err) {
            console.error('Error resuming session:', err);
            alert('Error resuming session. Please try again.');
        }
    };

    // End session
    const endSession = async (sessionId) => {
        try {
            const response = await fetch(`${apiUrl}/sessions/${sessionId}/end`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (response.ok) {
                // Remove session from list
                setSessions(prevSessions =>
                    prevSessions.filter(session => session.id !== sessionId)
                );
            } else {
                throw new Error('Failed to end session');
            }
        } catch (err) {
            console.error('Error ending session:', err);
            alert('Error ending session. Please try again.');
        }
    };

    // Add item to order
    const addItemToOrder = (item) => {
        setSelectedItems([...selectedItems, item]);
        setItemOptions({ ...itemOptions, [item.id]: [] });
    };

    // Remove item from order
    const removeItemFromOrder = (itemId) => {
        setSelectedItems(selectedItems.filter(item => item.id !== itemId));

        const newOptions = { ...itemOptions };
        delete newOptions[itemId];
        setItemOptions(newOptions);
    };

    // Update item options
    const handleOptionChange = (itemId, option, isChecked) => {
        setItemOptions(prev => {
            const currentOptions = prev[itemId] || [];
            const newOptions = isChecked
                ? [...currentOptions, option]
                : currentOptions.filter(opt => opt !== option);

            return { ...prev, [itemId]: newOptions };
        });
    };

    // Update current time
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            setCurrentTime(timeString);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Filter sessions by table type
    const filteredSessions = sessions.filter(session =>
        tableTypeFilter === 'all' || session.table_type === tableTypeFilter
    );

    // Get table icon based on type
    const getTableIcon = (type) => {
        switch (type) {
            case 'snooker':
                return <RiBilliardsLine className="text-success fs-6" />;
            case 'pool':
                return <RiBilliardsLine className="text-primary fs-6" />;
            case 'playstation':
                return <FaPlaystation className="text-purple fs-6" />;
            case 'restaurant':
                return <RiRestaurantLine className="text-warning fs-6" />;
            default:
                return <RiTableLine className="text-secondary fs-6" />;
        }
    };

    // Get table icon background based on type
    const getTableIconBg = (type) => {
        switch (type) {
            case 'snooker':
                return 'bg-success bg-opacity-10';
            case 'pool':
                return 'bg-primary bg-opacity-10';
            case 'playstation':
                return 'bg-purple bg-opacity-10';
            case 'restaurant':
                return 'bg-warning bg-opacity-10';
            default:
                return 'bg-secondary bg-opacity-10';
        }
    };

    // Get session status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active':
                return 'bg-success bg-opacity-10 text-success';
            case 'paused':
                return 'bg-warning bg-opacity-10 text-warning';
            case 'ended':
                return 'bg-secondary bg-opacity-10 text-secondary';
            default:
                return 'bg-info bg-opacity-10 text-info';
        }
    };

    // Render member select dropdown
    const renderMemberSelect = () => (
        <MemberSelect
            members={members}
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            setMembers={setMembers}
        />
    );

    // Render menu items for restaurant
    const renderMenuItems = () => (
        <div className="mb-3">
            <h5>Menu Items</h5>
            <div className="d-flex flex-wrap gap-2 mb-3">
                {menuItems.map(item => (
                    <Button
                        key={item.id}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => addItemToOrder(item)}
                    >
                        {item.name}
                    </Button>
                ))}
            </div>

            {selectedItems.length > 0 && (
                <div className="border rounded p-3">
                    <h6>Selected Items</h6>
                    {selectedItems.map(item => (
                        <div key={item.id} className="mb-2 border-bottom pb-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="fw-medium">{item.name}</div>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="text-danger p-0"
                                    onClick={() => removeItemFromOrder(item.id)}
                                >
                                    <RiCloseLine />
                                </Button>
                            </div>

                            {item.options.length > 0 && (
                                <div className="mt-1">
                                    <small className="text-muted d-block mb-1">Options:</small>
                                    <div className="d-flex flex-wrap gap-2">
                                        {item.options.map(option => (
                                            <Form.Check
                                                key={option}
                                                type="checkbox"
                                                label={option}
                                                checked={(itemOptions[item.id] || []).includes(option)}
                                                onChange={(e) => handleOptionChange(item.id, option, e.target.checked)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    if (loading) {
        return <div className="p-3 text-center">Loading sessions...</div>;
    }

    if (error) {
        return <div className="p-3 text-center text-danger">Error: {error}</div>;
    }

    return (
        <div className="p-3">
            {/* Main Content */}
            <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                {/* Header */}
                <header className="">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div>
                            <h1 className="fs-3 fw-bold text-dark">Sessions Management</h1>
                            <p className="mb-0 text-muted">Monitor and control all active sessions</p>
                        </div>
                        <div className="d-flex align-items-center gap-3 gap-md-4">
                            <Button
                                variant="success"
                                onClick={() => {
                                    fetchAvailableTables();
                                    setShowStartSessionModal(true);
                                }}
                            >
                                <RiPlayLine className="me-2" />
                                Start New Session
                            </Button>
                            <div className="text-end">
                                <p className="mb-0 small text-muted">Current Time</p>
                                <p className="mb-0 fs-5 fw-semibold">{currentTime}</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Filter Bar */}
                <div className="mt-3">
                    <div className="d-flex gap-2 flex-wrap">
                        {["All", "Pool", "Playstation", "Snooker", "Restaurant"].map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setTableTypeFilter(type.toLowerCase())}
                                className={`px-3 py-1 border fw-medium ${tableTypeFilter === type.toLowerCase()
                                    ? "border-dark text-dark rounded"
                                    : "border-secondary text-muted rounded"
                                    }`}
                                style={{
                                    backgroundColor:
                                        tableTypeFilter === type.toLowerCase() ? "#facc15" : "transparent",
                                    minWidth: "110px",
                                    textAlign: "center",
                                    borderWidth: "2px",
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Sessions Content */}
                <div className="flex-grow-1 mt-3">
                    {viewMode === 'grid' ? (
                        <div className="row g-2 g-md-3">
                            {filteredSessions.map(session => (
                                <div key={session.id} className="col-6 col-sm-4 col-md-3 col-lg-2" onClick={() => handleSessionClick(session)}
                                    style={{ cursor: 'pointer' }}>
                                    <div className="bg-white rounded-3 shadow-sm border overflow-hidden h-100 d-flex flex-column">
                                        <div className={`h-1 ${session.status === 'active' ? 'bg-success' : session.status === 'paused' ? 'bg-warning' : 'bg-secondary'}`}></div>
                                        <div className="p-2 p-md-3 flex-grow-1 d-flex flex-column">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(session.table_type)}`} style={{ width: '32px', height: '32px' }}>
                                                        {getTableIcon(session.table_type)}
                                                    </div>
                                                    <div>
                                                        <h3 className="mb-0 fw-semibold fs-6">{session.table_name}</h3>
                                                        <p className="mb-0 small text-muted text-capitalize">{session.table_type}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 rounded-pill small fw-medium ${getStatusBadgeClass(session.status)}`}>
                                                    {session.status === 'active' ? 'Active' : session.status === 'paused' ? 'Paused' : 'Ended'}
                                                </span>
                                            </div>

                                            <div className="flex-grow-1">
                                                {session.customer_name && (
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <span className="small text-muted">Customer</span>
                                                        <span className="fw-medium small">{session.customer_name}</span>
                                                    </div>
                                                )}
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <span className="small text-muted">Started</span>
                                                    <span className="font-monospace fw-bold small">
                                                        {new Date(session.start_time).toLocaleTimeString()}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mb-1">
                                                    <span className="small text-muted">Cost</span>
                                                    <span className="fw-bold text-primary small">${session.session_cost}</span>
                                                </div>

                                                {session.table_type === 'restaurant' && (
                                                    <div className="mt-2 text-center mb-2 w-80">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedSession(session);
                                                                setShowFoodModal(true);
                                                            }}
                                                        >
                                                            🍽 Order
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="d-grid gap-1 gap-md-2">
                                                <div className="d-flex gap-1">
                                                    {session.status === 'active' && (
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="flex-grow-1"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                pauseSession(session.id);
                                                            }}
                                                        >
                                                            <RiPauseLine className="fs-6" />
                                                        </Button>
                                                    )}
                                                    {session.status === 'paused' && (
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            className="flex-grow-1"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                resumeSession(session.id);
                                                            }}
                                                        >
                                                            <RiPlayCircleLine className="fs-6" />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        className="flex-grow-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedSession(session);
                                                            setShowCloseConfirm(true);
                                                        }}
                                                    >
                                                        <RiStopLine className="fs-6" />
                                                    </Button>
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        className="flex-grow-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleSessionClick(session);
                                                        }}
                                                    >
                                                        Manage
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3 shadow-sm border overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Session Info</th>
                                            <th>Status</th>
                                            <th>Start Time</th>
                                            <th>Cost</th>
                                            <th className="text-end">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSessions.map(session => (
                                            <tr key={session.id} onClick={() => handleSessionClick(session)} style={{ cursor: 'pointer' }}>
                                                <td>
                                                    <div className="d-flex align-items-center gap-2 gap-md-3">
                                                        <div className={`rounded-3 d-flex align-items-center justify-content-center ${getTableIconBg(session.table_type)}`} style={{ width: '40px', height: '40px' }}>
                                                            {getTableIcon(session.table_type)}
                                                        </div>
                                                        <div>
                                                            <h3 className="mb-0 fw-semibold fs-6 fs-md-5">{session.table_name}</h3>
                                                            <p className="mb-0 small text-muted text-capitalize">{session.table_type}</p>
                                                            {session.customer_name && (
                                                                <p className="mb-0 small text-muted">Customer: {session.customer_name}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`px-2 py-1 rounded-pill small fw-medium ${getStatusBadgeClass(session.status)}`}>
                                                        {session.status === 'active' ? 'Active' : session.status === 'paused' ? 'Paused' : 'Ended'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="font-monospace fw-bold small">
                                                        {new Date(session.start_time).toLocaleTimeString()}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="fw-bold text-primary">
                                                        ${session.session_cost}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    <div className="d-flex align-items-center gap-2 gap-md-3 justify-content-end">
                                                        {session.status === 'active' && (
                                                            <Button
                                                                variant="warning"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    pauseSession(session.id);
                                                                }}
                                                            >
                                                                <RiPauseLine className="me-1" /> Pause
                                                            </Button>
                                                        )}
                                                        {session.status === 'paused' && (
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    resumeSession(session.id);
                                                                }}
                                                            >
                                                                <RiPlayCircleLine className="me-1" /> Resume
                                                            </Button>
                                                        )}
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedSession(session);
                                                                setShowCloseConfirm(true);
                                                            }}
                                                        >
                                                            <RiStopLine className="me-1" /> End
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Session Management Modal */}
                <Modal show={showTableModal} onHide={() => setShowTableModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {selectedSession?.table_name} - {selectedSession?.table_type.toUpperCase()}
                            {selectedSession?.customer_name && (
                                <div className="small text-muted">Customer: {selectedSession.customer_name}</div>
                            )}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="mb-3">Session Management</h5>

                        <div className="bg-light p-3 rounded mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <span className="text-muted">Start Time:</span>
                                        <span className="fw-bold ms-2">
                                            {selectedSession && new Date(selectedSession.start_time).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-muted">Status:</span>
                                        <span className={`fw-bold ms-2 ${getStatusBadgeClass(selectedSession?.status)}`}>
                                            {selectedSession?.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-2">
                                        <span className="text-muted">Current Cost:</span>
                                        <span className="fw-bold text-primary ms-2">${selectedSession?.session_cost}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-muted">Hourly Rate:</span>
                                        <span className="fw-bold ms-2">${selectedSession?.hourly_rate}/hr</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {selectedSession?.status === 'active' && (
                                <Button
                                    variant="warning"
                                    onClick={() => pauseSession(selectedSession.id)}
                                >
                                    <RiPauseLine className="me-2" /> Pause Session
                                </Button>
                            )}
                            {selectedSession?.status === 'paused' && (
                                <Button
                                    variant="success"
                                    onClick={() => resumeSession(selectedSession.id)}
                                >
                                    <RiPlayCircleLine className="me-2" /> Resume Session
                                </Button>
                            )}
                            <Button variant="info" className="mb-2">
                                Transfer
                            </Button>
                            <Button variant="light" className="mb-2">
                                Show Time & Bill
                            </Button>
                        </div>

                        <Button variant="danger" className="w-100" onClick={handleCloseSession}>
                            Close Session & Print Bill
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* Start Session Modal */}
                <Modal show={showStartSessionModal} onHide={() => setShowStartSessionModal(false)} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Start New Session</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Table</Form.Label>
                            <Form.Select
                                value={selectedTableForStart?.id || ''}
                                onChange={(e) => {
                                    const tableId = e.target.value;
                                    const table = availableTables.find(t => t.id.toString() === tableId);
                                    setSelectedTableForStart(table);
                                }}
                            >
                                <option value="">Select a table</option>
                                {availableTables.map(table => (
                                    <option key={table.id} value={table.id}>
                                        {table.table_name} ({table.table_type}) - ${table.hourly_rate}/hr
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {renderMemberSelect()}

                        {selectedTableForStart?.table_type === 'restaurant' && renderMenuItems()}

                        {/* Time/Money Inputs */}
                        {selectedTableForStart?.table_type !== 'restaurant' && (
                            <div className="mb-3">
                                <label className="form-label">Set Time Limit (minutes)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={timeLimit}
                                    onChange={(e) => {
                                        const minutes = Number(e.target.value);
                                        setTimeLimit(minutes);
                                        const rate = selectedTableForStart?.hourly_rate || hourlyRate;
                                        setAmount((minutes / 60) * rate);
                                    }}
                                    placeholder="Enter minutes"
                                />

                                <label className="form-label mt-3">Or Set by Amount ($)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={amount}
                                    onChange={(e) => {
                                        const money = Number(e.target.value);
                                        setAmount(money);
                                        const rate = selectedTableForStart?.hourly_rate || hourlyRate;
                                        setTimeLimit((money / rate) * 60);
                                    }}
                                    placeholder="Enter amount"
                                />

                                {/* Preview */}
                                <div className="mt-2">
                                    <small>
                                        {timeLimit} minutes = ${amount?.toFixed(2)}
                                    </small>
                                </div>
                            </div>
                        )}

                        <Button
                            variant="success"
                            className="w-100 mt-3"
                            onClick={startNewSession}
                            disabled={!selectedTableForStart}
                        >
                            Start Session
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* Close confirmation modal */}
                <Modal show={showCloseConfirm} onHide={() => setShowCloseConfirm(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Close Session</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to close this session? This will print the bill.</p>
                        <div className="bg-light p-3 rounded">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <span className="text-muted">Table:</span>
                                    <span className="fw-bold ms-2">{selectedSession?.table_name}</span>
                                </div>
                                <div>
                                    <span className="text-muted">Total Cost:</span>
                                    <span className="fw-bold text-primary ms-2">${selectedSession?.session_cost}</span>
                                </div>
                            </div>
                            {selectedSession?.customer_name && (
                                <div className="mt-2">
                                    <span className="text-muted">Customer:</span>
                                    <span className="fw-bold ms-2">{selectedSession.customer_name}</span>
                                </div>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCloseConfirm(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmCloseAndPrint}>
                            Confirm & Print
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Food Order Modal */}
                <Modal
                    show={showFoodModal}
                    onHide={() => setShowFoodModal(false)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Order Food</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Food menu UI */}
                        {renderMenuItems()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowFoodModal(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (selectedItems.length === 0) {
                                    alert("Please select at least one item to order.");
                                    return;
                                }
                                navigate("/staff/ordermanagement");
                                setShowFoodModal(false);
                            }}
                        >
                            Place Order
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>

            {/* Custom CSS */}
            <style jsx>{`
                .w-sidebar {
                    width: 16rem;
                }
                .hover-bg-gray:hover {
                    background-color: #f8f9fa;
                }
                .bg-gray-100 {
                    background-color: #f8f9fa;
                }
                .text-purple {
                    color: #6f42c1;
                }
                .bg-purple {
                    background-color: #ddd2f1ff;
                }
                .toggle-switch {
                    width: 40px;
                    height: 20px;
                    background-color: #e9ecef;
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .toggle-switch.active {
                    background-color: #198754;
                }
                .toggle-slider {
                    width: 16px;
                    height: 16px;
                    background-color: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: transform 0.3s;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                .toggle-switch.active .toggle-slider {
                    transform: translateX(20px);
                }
                .x-small {
                    font-size: 0.75rem;
                }
                @media (max-width: 576px) {
                    .table-responsive {
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default TablesManagement;