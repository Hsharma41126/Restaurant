// import React, { useState } from 'react';
// import {
//   RiGamepadLine,
//   RiBilliardsLine,
//   RiRestaurantLine,
//   RiTvLine,
//   RiLightbulbLine,
//   RiMusicLine,
//   RiRefreshLine,
//   RiSearchLine,
//   RiFilterLine,
//   RiArrowDownSLine,
//   RiAlertLine,
//   RiCheckLine
// } from 'react-icons/ri';

// const DeviceMonitor = () => {
//   const [devices, setDevices] = useState([
//     {
//       id: 1,
//       name: 'PlayStation 5',
//       location: 'Table PS-01',
//       icon: <RiGamepadLine className="text-blue-600" />,
//       status: 'online',
//       powerState: 'on',
//       powerConsumption: 180,
//       lastUpdated: '2 min ago',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       id: 2,
//       name: 'Snooker Table',
//       location: 'Table SN-03',
//       icon: <RiBilliardsLine className="text-green-600" />,
//       status: 'online',
//       powerState: 'off',
//       powerConsumption: 0,
//       lastUpdated: '1 min ago',
//       bgColor: 'bg-green-50'
//     },
//     {
//       id: 3,
//       name: 'Coffee Machine',
//       location: 'Restaurant Area',
//       icon: <RiRestaurantLine className="text-purple-600" />,
//       status: 'offline',
//       powerState: 'off',
//       powerConsumption: null,
//       lastUpdated: '15 min ago',
//       bgColor: 'bg-purple-50'
//     },
//     {
//       id: 4,
//       name: 'Xbox Series X',
//       location: 'Table XB-02',
//       icon: <RiGamepadLine className="text-orange-600" />,
//       status: 'online',
//       powerState: 'on',
//       powerConsumption: 165,
//       lastUpdated: '30 sec ago',
//       bgColor: 'bg-orange-50'
//     },
//     {
//       id: 5,
//       name: 'Pool Table',
//       location: 'Table PL-05',
//       icon: <RiBilliardsLine className="text-teal-600" />,
//       status: 'online',
//       powerState: 'on',
//       powerConsumption: 45,
//       lastUpdated: '1 min ago',
//       bgColor: 'bg-teal-50'
//     },
//     {
//       id: 6,
//       name: 'Smart TV',
//       location: 'Lounge Area',
//       icon: <RiTvLine className="text-red-600" />,
//       status: 'online',
//       powerState: 'off',
//       powerConsumption: 2,
//       lastUpdated: '45 sec ago',
//       bgColor: 'bg-red-50'
//     },
//     {
//       id: 7,
//       name: 'LED Lighting',
//       location: 'Main Hall',
//       icon: <RiLightbulbLine className="text-indigo-600" />,
//       status: 'online',
//       powerState: 'on',
//       powerConsumption: 120,
//       lastUpdated: '3 min ago',
//       bgColor: 'bg-indigo-50'
//     },
//     {
//       id: 8,
//       name: 'Sound System',
//       location: 'Entertainment Zone',
//       icon: <RiMusicLine className="text-pink-600" />,
//       status: 'offline',
//       powerState: 'off',
//       powerConsumption: null,
//       lastUpdated: '8 min ago',
//       bgColor: 'bg-pink-50'
//     }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [currentDevice, setCurrentDevice] = useState(null);
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const toggleDevice = (deviceId) => {
//     setDevices(devices.map(device => {
//       if (device.id === deviceId) {
//         const newPowerState = device.powerState === 'on' ? 'off' : 'on';
//         const message = `${device.name} has been turned ${newPowerState.toUpperCase()}`;

//         setToastMessage(message);
//         setShowToast(true);
//         setTimeout(() => setShowToast(false), 3000);

//         return {
//           ...device,
//           powerState: newPowerState
//         };
//       }
//       return device;
//     }));
//   };

//   const showOverrideModal = (device) => {
//     setCurrentDevice(device);
//     setShowModal(true);
//   };

//   const confirmOverride = () => {
//     setToastMessage(`Manual override applied to ${currentDevice.name}`);
//     setShowToast(true);
//     setShowModal(false);
//     setTimeout(() => setShowToast(false), 3000);
//   };


//   const onlineCount = devices.filter(d => d.status === 'online').length;
//   const offlineCount = devices.filter(d => d.status === 'offline').length;

//   return (
//     <div className="p-3">
//       {/* Header */}
//       <header className="">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
//           <div className="mb-3">
//             <h1 className="fs-3 fw-bold text-dark">Device Monitor</h1>
//             <p className="text-muted mb-0">Monitor and control smart plugs across all gaming areas</p>
//           </div>
//           <div className="d-flex align-items-center gap-3">
//             <div className="d-flex align-items-center px-3 py-2 bg-success bg-opacity-10 rounded-3">
//               <span className="device-status-dot bg-success me-2"></span>
//               <span className="text-success small fw-medium">Live Updates Active</span>
//             </div>
//             <button className="btn btn-warning d-flex align-items-center">
//               <RiRefreshLine className="me-2" />
//               Refresh All
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Search and Filter Bar */}
//       <div className="bg-white px-4 py-3 border-bottom">
//         <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
//           <div className="d-flex flex-wrap gap-3 mb-3 mb-md-0">
//             <div className="position-relative">
//               <RiSearchLine className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
//               <input
//                 type="text"
//                 placeholder="Search devices..."
//                 className="form-control ps-5"
//               />
//             </div>
//             <div className="dropdown">
//               <button
//                 className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
//                 type="button"
//                 data-bs-toggle="dropdown"
//               >
//                 <RiFilterLine className="me-2" />
//                 Filter by Status
//               </button>
//               <ul className="dropdown-menu">
//                 <li><button className="dropdown-item">All Status</button></li>
//                 <li><button className="dropdown-item">Online</button></li>
//                 <li><button className="dropdown-item">Offline</button></li>
//               </ul>
//             </div>
//           </div>
//           <div className="d-flex gap-3 text-muted small">
//             <span>Total Devices: <strong className="text-dark">{devices.length}</strong></span>
//             <span className="text-success">Online: <strong>{onlineCount}</strong></span>
//             <span className="text-danger">Offline: <strong>{offlineCount}</strong></span>
//           </div>
//         </div>
//       </div>

//       {/* Device Grid */}
//       <div className="row g-3">
//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">PlayStation 5</h6>
//                 <div className="text-muted small">Table PS-01</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-primary">ON</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">180W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-warning" style={{ width: "70%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 2 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Snooker Table</h6>
//                 <div className="text-muted small">Table SN-03</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-danger">OFF</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">0W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-secondary" style={{ width: "0%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 1 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Coffee Machine</h6>
//                 <div className="text-muted small">Restaurant Area</div>
//               </div>
//               <div>
//                 <span className="badge bg-secondary me-1">Offline</span>
//                 <span className="badge bg-danger">OFF</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">--W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-secondary" style={{ width: "0%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-danger">Last seen: 15 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" disabled />
//                 </div>
//                 <button className="btn btn-outline-secondary btn-sm" disabled>Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Xbox Series X</h6>
//                 <div className="text-muted small">Table XB-02</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-primary">ON</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">165W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-warning" style={{ width: "60%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 30 sec ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Pool Table</h6>
//                 <div className="text-muted small">Table PL-05</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-primary">ON</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">45W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-warning" style={{ width: "20%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 1 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Smart TV</h6>
//                 <div className="text-muted small">Lounge Area</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-danger">OFF</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">2W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-secondary" style={{ width: "2%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 45 sec ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">LED Lighting</h6>
//                 <div className="text-muted small">Main Hall</div>
//               </div>
//               <div>
//                 <span className="badge bg-success me-1">Online</span>
//                 <span className="badge bg-primary">ON</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">120W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-warning" style={{ width: "60%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-muted">Updated: 3 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" defaultChecked />
//                 </div>
//                 <button className="btn btn-outline-dark btn-sm">Override</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card shadow-sm p-3">
//             <div className="d-flex justify-content-between">
//               <div>
//                 <h6 className="fw-bold">Sound System</h6>
//                 <div className="text-muted small">Entertainment Zone</div>
//               </div>
//               <div>
//                 <span className="badge bg-secondary me-1">Offline</span>
//                 <span className="badge bg-danger">OFF</span>
//               </div>
//             </div>
//             <div className="mt-3 mb-2">Power Consumption</div>
//             <div className="fw-bold">--W</div>
//             <div className="progress my-2" style={{ height: "6px" }}>
//               <div className="progress-bar bg-secondary" style={{ width: "0%" }}></div>
//             </div>
//             <div className="d-flex justify-content-between align-items-center mt-2">
//               <small className="text-danger">Last seen: 8 min ago</small>
//               <div className="d-flex align-items-center gap-2">
//                 <div className="form-check form-switch m-0">
//                   <input className="form-check-input" type="checkbox" role="switch" disabled />
//                 </div>
//                 <button className="btn btn-outline-secondary btn-sm" disabled>Override</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Override Modal */}
//       {showModal && (
//         <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="bg-white rounded-3 p-4" style={{ maxWidth: '500px', width: '90%' }}>
//             <div className="d-flex align-items-center mb-4">
//               <div className="bg-warning bg-opacity-25 rounded-circle p-3 me-3">
//                 <RiAlertLine className="text-warning fs-4" />
//               </div>
//               <h3 className="fs-5 fw-bold mb-0">Manual Override Confirmation</h3>
//             </div>
//             <p className="text-muted mb-4">
//               Are you sure you want to manually override the power state for <strong>{currentDevice?.name}</strong>? This action will bypass automated controls.
//             </p>
//             <div className="d-flex justify-content-end gap-3">
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={confirmOverride}
//               >
//                 Confirm Override
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Success Toast */}
//       {showToast && (
//         <div
//           className="bg-success text-white px-4 py-3 rounded-3 shadow d-flex align-items-center"

//         >
//           <RiCheckLine className="me-2" />
//           <span>{toastMessage}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeviceMonitor;

import React, { useState, useEffect } from 'react';
import {
  RiGamepadLine,
  RiBilliardsLine,
  RiRestaurantLine,
  RiTvLine,
  RiLightbulbLine,
  RiMusicLine,
  RiRefreshLine,
  RiSearchLine,
  RiFilterLine,
  RiArrowDownSLine,
  RiAlertLine,
  RiCheckLine,
  RiErrorWarningLine,
  RiCloseLine
} from 'react-icons/ri';
import { apiUrl } from '../../../utils/config';

const DeviceMonitor = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingDevices, setUpdatingDevices] = useState({});

  // Fetch devices from API
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/plugs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Transform API data to match our device format
        const transformedDevices = data.data.plugs.map(plug => {
          // Determine icon based on table type
          let icon;
          let bgColor;

          switch (plug.table_type) {
            case 'playstation':
              icon = <RiGamepadLine className="text-blue-600" />;
              bgColor = 'bg-blue-50';
              break;
            case 'billiards':
            case 'snooker':
            case 'pool':
              icon = <RiBilliardsLine className="text-green-600" />;
              bgColor = 'bg-green-50';
              break;
            case 'restaurant':
              icon = <RiRestaurantLine className="text-purple-600" />;
              bgColor = 'bg-purple-50';
              break;
            case 'tv':
              icon = <RiTvLine className="text-red-600" />;
              bgColor = 'bg-red-50';
              break;
            case 'lighting':
              icon = <RiLightbulbLine className="text-indigo-600" />;
              bgColor = 'bg-indigo-50';
              break;
            case 'sound':
              icon = <RiMusicLine className="text-pink-600" />;
              bgColor = 'bg-pink-50';
              break;
            default:
              icon = <RiGamepadLine className="text-orange-600" />;
              bgColor = 'bg-orange-50';
          }

          return {
            id: plug.id,
            plugId: plug.plug_id,
            name: plug.name,
            location: plug.table_name ? `Table ${plug.table_name}` : 'Unknown Location',
            icon: icon,
            status: plug.status,
            powerState: plug.power_state,
            powerConsumption: plug.power_consumption ? parseFloat(plug.power_consumption) : null,
            lastUpdated: formatLastUpdated(plug.updated_at),
            bgColor: bgColor,
            tableType: plug.table_type
          };
        });

        setDevices(transformedDevices);
      } else {
        throw new Error('API response indicates failure');
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
      setError(err.message);

      // Fallback to sample data if API fails
      setDevices([
        {
          id: 1,
          name: 'PlayStation 5',
          location: 'Table PS-01',
          icon: <RiGamepadLine className="text-blue-600" />,
          status: 'online',
          powerState: 'on',
          powerConsumption: 180,
          lastUpdated: '2 min ago',
          bgColor: 'bg-blue-50'
        },
        {
          id: 2,
          name: 'Snooker Table',
          location: 'Table SN-03',
          icon: <RiBilliardsLine className="text-green-600" />,
          status: 'online',
          powerState: 'off',
          powerConsumption: 0,
          lastUpdated: '1 min ago',
          bgColor: 'bg-green-50'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Format last updated time
  const formatLastUpdated = (dateString) => {
    const updatedDate = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - updatedDate) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 min ago';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  // Toggle device power state with API call
  const toggleDevice = async (deviceId) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device || device.status === 'offline') return;

    const newPowerState = device.powerState === 'on' ? 'off' : 'on';

    // Show loading state
    setUpdatingDevices(prev => ({ ...prev, [deviceId]: true }));

    try {
      const response = await fetch(`${apiUrl}/plugs/${deviceId}/power`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          action: newPowerState
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Update device state on success
        setDevices(devices.map(device => {
          if (device.id === deviceId) {
            const message = `${device.name} has been turned ${newPowerState.toUpperCase()}`;
            setToastMessage(message);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);

            return {
              ...device,
              powerState: newPowerState,
              lastUpdated: 'Just now'
            };
          }
          return device;
        }));
      } else {
        throw new Error('API response indicates failure');
      }
    } catch (err) {
      console.error('Error toggling device:', err);
      setToastMessage(`Failed to toggle ${device.name}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      // Remove loading state
      setUpdatingDevices(prev => ({ ...prev, [deviceId]: false }));
    }
  };

  // Fetch devices on component mount
  useEffect(() => {
    fetchDevices();
  }, []);

  const refreshAll = () => {
    fetchDevices();
    setToastMessage('Devices refreshed');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter devices based on search and status filter
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'online' && device.status === 'online') ||
      (statusFilter === 'offline' && device.status === 'offline');

    return matchesSearch && matchesStatus;
  });

  const onlineCount = devices.filter(d => d.status === 'online').length;
  const offlineCount = devices.filter(d => d.status === 'offline').length;

  if (loading) {
    return (
      <div className="p-5 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading devices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      {/* Header */}
      <header className="">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div className="mb-3">
            <h1 className="fs-3 fw-bold text-dark">Device Monitor</h1>
            <p className="text-muted mb-0">Monitor and control smart plugs across all gaming areas</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center px-3 py-2 bg-success bg-opacity-10 rounded-3">
              <span className="device-status-dot bg-success me-2"></span>
              <span className="text-success small fw-medium">Live Updates Active</span>
            </div>
            <button className="btn btn-warning d-flex align-items-center" onClick={refreshAll}>
              <RiRefreshLine className="me-2" />
              Refresh All
            </button>
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-warning d-flex align-items-center" role="alert">
          <RiErrorWarningLine className="me-2" />
          <div>
            Error fetching data: {error}. Showing sample data.
          </div>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-white px-4 py-3 border-bottom">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
          <div className="d-flex flex-wrap gap-3 mb-3 mb-md-0">
            <div className="position-relative">
              <RiSearchLine className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              <input
                type="text"
                placeholder="Search devices..."
                className="form-control ps-5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                <RiFilterLine className="me-2" />
                Filter by Status
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setStatusFilter('all')}>All Status</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter('online')}>Online</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter('offline')}>Offline</button></li>
              </ul>
            </div>
          </div>
          <div className="d-flex gap-3 text-muted small">
            <span>Total Devices: <strong className="text-dark">{devices.length}</strong></span>
            <span className="text-success">Online: <strong>{onlineCount}</strong></span>
            <span className="text-danger">Offline: <strong>{offlineCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="row g-3 mt-2">
        {filteredDevices.length === 0 ? (
          <div className="col-12 text-center py-5">
            <RiSearchLine className="text-muted mb-2" style={{ fontSize: '3rem' }} />
            <h5 className="text-muted">No devices found</h5>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredDevices.map(device => (
            <div key={device.id} className="col-md-3">
              <div className={`card shadow-sm p-3 ${device.bgColor}`}>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="fw-bold">{device.name}</h6>
                    <div className="text-muted small">{device.location}</div>
                  </div>
                  <div>
                    <span className={`badge ${device.status === 'online' ? 'bg-success' : 'bg-secondary'} me-1`}>
                      {device.status === 'online' ? 'Online' : 'Offline'}
                    </span>
                    <span className={`badge ${device.powerState === 'on' ? 'bg-primary' : 'bg-danger'}`}>
                      {device.powerState === 'on' ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
                <div className="mt-3 mb-2">Power Consumption</div>
                <div className="fw-bold">
                  {device.powerConsumption !== null ? `${device.powerConsumption}W` : '--W'}
                </div>
                <div className="progress my-2" style={{ height: "6px" }}>
                  <div
                    className={`progress-bar ${device.powerState === 'on' ? 'bg-warning' : 'bg-secondary'}`}
                    style={{ width: device.powerConsumption ? `${Math.min(device.powerConsumption / 3, 100)}%` : '0%' }}
                  ></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className={device.status === 'offline' ? 'text-danger' : 'text-muted'}>
                    {device.status === 'offline' ? `Last seen: ${device.lastUpdated}` : `Updated: ${device.lastUpdated}`}
                  </small>
                  <div className="d-flex align-items-center gap-2">
                    {updatingDevices[device.id] ? (
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <div className="form-check form-switch m-0">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={device.powerState === 'on'}
                          onChange={() => toggleDevice(device.id)}
                          disabled={device.status === 'offline' || updatingDevices[device.id]}
                        />
                      </div>
                    )}
                    <button
                      className={`btn ${device.powerState === 'on' ? 'btn-danger' : 'btn-success'} btn-sm d-flex align-items-center`}
                      onClick={() => toggleDevice(device.id)}
                      disabled={device.status === 'offline' || updatingDevices[device.id]}
                    >
                      {device.powerState === 'on' ? (
                        <div className="d-flex align-items-center">
                          <RiCloseLine className="me-1" />
                          Turn Off
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <RiCheckLine className="me-1" />
                          Turn On
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Success Toast */}
      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 m-4 bg-success text-white px-4 py-3 rounded-3 shadow d-flex align-items-center"
          style={{ zIndex: 1060, transition: 'opacity 0.3s ease-in-out' }}
        >
          <RiCheckLine className="me-2" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default DeviceMonitor;