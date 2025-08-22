// import React, { useState } from 'react';
// import {
//     FaGamepad, FaTable, FaUsers, FaEdit,
//     FaTrashAlt, FaPlay, FaStop, FaTimes,
//     FaTableTennis, FaClock, FaPlug, FaPlus, FaAngleDown, FaUtensils, FaFilter
// } from 'react-icons/fa';
// import { Button } from 'react-bootstrap';

// const MapSmartPlug = () => {

//     // State for table management
//     const [tables, setTables] = useState([
//         { id: 1, name: 'Snooker Table 1', type: 'Snooker', status: 'active', plugId: 'PLUG_001' },
//         { id: 2, name: 'Pool Table A', type: 'Pool', status: 'active', plugId: 'PLUG_002' },
//         { id: 3, name: 'PlayStation Zone 1', type: 'PlayStation', status: 'active', plugId: 'PLUG_003' },
//         { id: 4, name: 'Snooker Table 2', type: 'Snooker', status: 'active', plugId: 'PLUG_004' },
//         { id: 5, name: 'Pool Table B', type: 'Pool', status: 'active', plugId: 'PLUG_005' }
//     ]);

//     // Form states
//     const [tableForm, setTableForm] = useState({
//         name: '',
//         type: 'Select table type',
//         status: 'active',
//         plugId: ''
//     });


//     const [plugTableDropdownOpen, setPlugTableDropdownOpen] = useState(false);
//     const [plugStatus, setPlugStatus] = useState({
//         PLUG_001: 'online',
//         PLUG_002: 'offline',
//         PLUG_003: 'online',
//         PLUG_004: 'offline',
//         PLUG_005: 'offline'
//     });

//     // Filter states for plug control
//     const [plugFilters, setPlugFilters] = useState({
//         Snooker: true,
//         Pool: true,
//         PlayStation: true,
//         Food: false
//     });

//     // Toggle plug filters
//     const togglePlugFilter = (type) => {
//         setPlugFilters(prev => ({
//             ...prev,
//             [type]: !prev[type]
//         }));
//     };

//     // Get filtered tables for plug control
//     const getFilteredTables = () => {
//         return tables.filter(table =>
//             table.plugId &&
//             table.type !== 'Food' &&
//             plugFilters[table.type]
//         );
//     };

//     // Toggle plug status
//     const togglePlug = (plugId, action) => {
//         setPlugStatus(prev => ({
//             ...prev,
//             [plugId]: action === 'on' ? 'online' : 'offline'
//         }));
//     };

//     return (
//         <div>
//             {/* Smart Plug Mapping Section */}
//             <div className="col-12">
//                 <div className="bg-white rounded shadow-sm p-3 p-md-4">
//                     <div className="d-flex align-items-center gap-3 mb-4">
//                         <div className="bg-warning rounded p-2">
//                             <FaPlug className="text-dark" />
//                         </div>
//                         <h5 className="fw-light text-dark mb-0">Map Smart Plug (ON/OFF Control)</h5>
//                     </div>

//                     <div className="row g-4">
//                         {/* Plug Assignment Form */}
//                         <div className="col-12 col-lg-6">
//                             <h4 className="fw-medium text-dark mb-3">Assign Smart Plug</h4>
//                             <form>
//                                 <div className="mb-3">
//                                     <label className="form-label">Select Table</label>
//                                     <div className="position-relative">
//                                         <button
//                                             type="button"
//                                             className="form-control text-start d-flex justify-content-between align-items-center"
//                                             onClick={() => toggleDropdown('plugTable')}
//                                         >
//                                             <span>{tableForm.name || 'Select table'}</span>
//                                             <FaAngleDown />
//                                         </button>
//                                         {plugTableDropdownOpen && (
//                                             <div className="position-absolute top-100 start-0 end-0 bg-white border rounded mt-1 shadow-lg z-3">
//                                                 <div className="py-1">
//                                                     {tables.filter(table => table.type !== 'Food').map(table => (
//                                                         <button
//                                                             key={table.id}
//                                                             type="button"
//                                                             className="w-100 text-start btn btn-light"
//                                                             onClick={() => {
//                                                                 setTableForm(prev => ({ ...prev, name: table.name }));
//                                                                 setPlugTableDropdownOpen(false);
//                                                             }}
//                                                         >
//                                                             {table.name}
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="mb-4">
//                                     <label className="form-label">Smart Plug ID</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         placeholder="Enter plug ID (e.g., PLUG_001)"
//                                         value={tableForm.plugId}
//                                         onChange={(e) => setTableForm(prev => ({ ...prev, plugId: e.target.value }))}
//                                     />
//                                 </div>

//                                 <button
//                                     type="button"
//                                     className="w-100 btn btn-warning text-dark fw-medium"
//                                     onClick={() => {
//                                         if (tableForm.name && tableForm.plugId) {
//                                             const updatedTables = tables.map(table =>
//                                                 table.name === tableForm.name
//                                                     ? { ...table, plugId: tableForm.plugId }
//                                                     : table
//                                             );
//                                             setTables(updatedTables);
//                                             setPlugStatus(prev => ({ ...prev, [tableForm.plugId]: 'offline' }));
//                                             setTableForm(prev => ({ ...prev, plugId: '' }));
//                                         }
//                                     }}
//                                 >
//                                     Map Smart Plug
//                                 </button>
//                             </form>
//                         </div>

//                         {/* Plug Control Panel */}
//                         <div className="col-12 col-lg-6">
//                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                 <h4 className="fw-medium text-dark mb-0">Smart Plug Control</h4>
//                                 <div className="dropdown">
//                                     <Button
//                                         size="sm"
//                                         variant="outline-secondary"
//                                         type="button"
//                                         id="plugFilterDropdown"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         <FaFilter />
//                                         <span>Filter</span>
//                                     </Button>
//                                     <ul className="dropdown-menu" aria-labelledby="plugFilterDropdown">
//                                         <li>
//                                             <div className="dropdown-item">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="filterSnooker"
//                                                         checked={plugFilters.Snooker}
//                                                         onChange={() => togglePlugFilter('Snooker')}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="filterSnooker">
//                                                         Snooker Tables
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <div className="dropdown-item">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="filterPool"
//                                                         checked={plugFilters.Pool}
//                                                         onChange={() => togglePlugFilter('Pool')}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="filterPool">
//                                                         Pool Tables
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <div className="dropdown-item">
//                                                 <div className="form-check">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         id="filterPlayStation"
//                                                         checked={plugFilters.PlayStation}
//                                                         onChange={() => togglePlugFilter('PlayStation')}
//                                                     />
//                                                     <label className="form-check-label" htmlFor="filterPlayStation">
//                                                         PlayStation
//                                                     </label>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>

//                             <div className="d-flex flex-column gap-3">
//                                 {getFilteredTables().map(table => (
//                                     <div key={table.id} className="border rounded p-3">
//                                         <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
//                                             <div className="d-flex align-items-center gap-3">
//                                                 {table.type === 'Snooker' && <FaTableTennis className="text-success fs-5" />}
//                                                 {table.type === 'Pool' && <FaTableTennis className="text-primary fs-5" />}
//                                                 {table.type === 'PlayStation' && <FaGamepad className="text-purple fs-5" />}
//                                                 <div>
//                                                     <div className="fw-medium text-dark">{table.name}</div>
//                                                     <div className="text-muted small">Plug ID: {table.plugId}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="d-flex align-items-center gap-2">
//                                                 <div className={`rounded-circle ${plugStatus[table.plugId] === 'online' ? 'bg-success' : 'bg-danger'}`} style={{ width: '12px', height: '12px' }}></div>
//                                                 <span className={`small fw-medium ${plugStatus[table.plugId] === 'online' ? 'text-success' : 'text-danger'}`}>
//                                                     {plugStatus[table.plugId] === 'online' ? 'ONLINE' : 'OFFLINE'}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="d-flex gap-3">
//                                             <button
//                                                 className={`btn flex-grow-1 ${plugStatus[table.plugId] === 'online' ? 'btn-success' : 'btn-secondary'}`}
//                                                 onClick={() => togglePlug(table.plugId, 'on')}
//                                                 disabled={plugStatus[table.plugId] === 'online'}
//                                             >
//                                                 <div className="d-flex align-items-center justify-content-center gap-2">
//                                                     <FaPlay />
//                                                     <span>Turn ON</span>
//                                                 </div>
//                                             </button>
//                                             <button
//                                                 className={`btn flex-grow-1 ${plugStatus[table.plugId] === 'offline' ? 'btn-danger' : 'btn-secondary'}`}
//                                                 onClick={() => togglePlug(table.plugId, 'off')}
//                                                 disabled={plugStatus[table.plugId] === 'offline'}
//                                             >
//                                                 <div className="d-flex align-items-center justify-content-center gap-2">
//                                                     <FaStop />
//                                                     <span>Turn OFF</span>
//                                                 </div>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 ))}
//                                 {getFilteredTables().length === 0 && (
//                                     <div className="border rounded p-4 text-center text-muted">
//                                         No tables with smart plugs configured for selected filters
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MapSmartPlug


import React, { useEffect, useState } from "react";
import {
    FaGamepad,
    FaTableTennis,
    FaPlug,
    FaPlay,
    FaStop,
    FaAngleDown,
    FaFilter,
} from "react-icons/fa";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const API_BASE = "https://restaurant-backend-production-a63a.up.railway.app/api";

const MapSmartPlug = () => {
    const [tables, setTables] = useState([]);
    const [plugs, setPlugs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    // Filter
    const [plugFilters, setPlugFilters] = useState({
        snooker: true,
        pool: true,
        playstation: true,
        food: false,
    });

    // Form states
    const [plugTableDropdownOpen, setPlugTableDropdownOpen] = useState(false);
    const [tableForm, setTableForm] = useState({
        name: "",
        plugId: "",
    });

    useEffect(() => {
        fetchTables();
        fetchPlugs();
    }, []);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/tables`);
            const tables = res.data?.data?.tables || [];

            setTables(tables || []);
        } catch (err) {
            console.error("Error fetching tables", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlugs = async () => {
        try {
            const res = await axiosInstance.get("/plugs");
            const plugsData = res.data?.data?.plugs || [];
            setPlugs(plugsData || []);
        } catch (err) {
            console.error("Error fetching plugs", err);
        }
    };

    // Handle form changes
    const handleTableFormChange = (e) => {
        const { name, value } = e.target;
        setTableForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // filters
    const togglePlugFilter = (type) => {
        setPlugFilters((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    // only show tables that have plug mapped
    const getFilteredTables = () => {
        return tables.filter(
            (table) =>
                table.plug_id &&
                plugFilters[table.table_type?.toLowerCase()]
        );
    };

    // toggle plug ON/OFF
    const togglePlug = async (plugId, action) => {
        try {
            setActionLoading((prev) => ({ ...prev, [plugId]: true }));
            await axiosInstance.post(`/plugs/${plugId}/power`, { action });

            // Update plug status locally
            const updatedPlugs = plugs.map((plug) =>
                plug.id === plugId
                    ? {
                        ...plug,
                        power_state: action,
                        status: action === "on" ? "online" : "offline",
                    }
                    : plug
            );
            setPlugs(updatedPlugs);
        } catch (err) {
            console.error("Error controlling plug", err);
        } finally {
            setActionLoading((prev) => ({ ...prev, [plugId]: false }));
        }
    };

    return (
        <div className="col-12">
            <div className="bg-white rounded shadow-sm p-3 p-md-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-warning rounded p-2">
                        <FaPlug className="text-dark" />
                    </div>
                    <h5 className="fw-light text-dark mb-0">
                        Map Smart Plug (ON/OFF Control)
                    </h5>
                </div>

                {loading ? (
                    <div className="text-center p-4">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <div className="row g-4">
                        {/* LEFT FORM (mapping if needed) */}
                        <div className="col-12 col-lg-6">
                            <h4 className="fw-medium text-dark mb-3">Assign Smart Plug</h4>
                            <div className="mb-3">
                                <label className="form-label">Select Table</label>
                                <div className="position-relative">
                                    <button
                                        type="button"
                                        className="form-control text-start d-flex justify-content-between align-items-center"
                                        onClick={() =>
                                            setPlugTableDropdownOpen(!plugTableDropdownOpen)
                                        }
                                    >
                                        <span>{tableForm.name || "Select table"}</span>
                                        <FaAngleDown />
                                    </button>
                                    {plugTableDropdownOpen && (
                                        <div className="position-absolute top-100 start-0 end-0 bg-white border rounded mt-1 shadow-lg z-3">
                                            <div className="py-1">
                                                {tables.map((table) => (
                                                    <button
                                                        key={table.id}
                                                        type="button"
                                                        className="w-100 text-start btn btn-light"
                                                        onClick={() => {
                                                            setTableForm((prev) => ({
                                                                ...prev,
                                                                name: table.table_name,
                                                            }));
                                                            setPlugTableDropdownOpen(false);
                                                        }}
                                                    >
                                                        {table.table_name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Smart Plug</label>
                                <select
                                    name="plugId"
                                    value={tableForm.plugId || ""}
                                    onChange={handleTableFormChange}
                                    className="form-control"
                                >
                                    <option value="">-- Select Plug --</option>
                                    {plugs.map((plug) => (
                                        <option key={plug.id} value={plug.plug_id}>
                                            {plug.plug_id} ({plug.name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                className="w-100 btn btn-warning text-dark fw-medium"
                            >
                                Map Smart Plug
                            </button>
                        </div>

                        {/* RIGHT CONTROL PANEL */}
                        <div className="col-12 col-lg-6">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="fw-medium text-dark mb-0">Smart Plug Control</h4>
                                <div className="dropdown">
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <FaFilter /> <span>Filter</span>
                                    </Button>
                                    <ul className="dropdown-menu">
                                        {["snooker", "pool", "playstation"].map((type) => (
                                            <li key={type}>
                                                <div className="dropdown-item">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`filter${type}`}
                                                            checked={plugFilters[type]}
                                                            onChange={() => togglePlugFilter(type)}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`filter${type}`}
                                                        >
                                                            {type.toUpperCase()} Tables
                                                        </label>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="d-flex flex-column gap-3">
                                {plugs.map((plug) => {
                                    const connectedTables = tables.filter(
                                        (t) => t.plug_id === plug.plug_id
                                    );

                                    return (
                                        <div key={plug.id} className="border rounded p-3">
                                            {/* PLUG HEADER */}
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <div className="fw-medium text-dark">{plug.name}</div>
                                                    <div className="text-muted small">Plug ID: {plug.plug_id}</div>
                                                    <div className="text-muted small">
                                                        IP: {plug.ip_address} | MAC: {plug.mac_address}
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div
                                                        className={`rounded-circle ${plug.status === "online" ? "bg-success" : "bg-danger"
                                                            }`}
                                                        style={{ width: "12px", height: "12px" }}
                                                    />
                                                    <span
                                                        className={`small fw-medium ${plug.status === "online" ? "text-success" : "text-danger"
                                                            }`}
                                                    >
                                                        {plug.status?.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* ON / OFF BUTTONS */}
                                            <div className="d-flex gap-3 mb-3">
                                                <button
                                                    className={`btn flex-grow-1 ${plug.power_state === "on" ? "btn-success" : "btn-outline-success"
                                                        }`}
                                                    onClick={() => togglePlug(plug.id, "on")}
                                                    disabled={plug.power_state === "on" || actionLoading[plug.id]}
                                                >
                                                    {actionLoading[plug.id] ? (
                                                        <Spinner size="sm" />
                                                    ) : (
                                                        <>
                                                            <FaPlay /> Turn ON
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    className={`btn flex-grow-1 ${plug.power_state === "off" ? "btn-danger" : "btn-outline-danger"
                                                        }`}
                                                    onClick={() => togglePlug(plug.id, "off")}
                                                    disabled={plug.power_state === "off" || actionLoading[plug.id]}
                                                >
                                                    {actionLoading[plug.id] ? (
                                                        <Spinner size="sm" />
                                                    ) : (
                                                        <>
                                                            <FaStop /> Turn OFF
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            {/* CONNECTED TABLES */}
                                            <div>
                                                <div className="fw-medium mb-2">Connected Tables:</div>
                                                {connectedTables.length > 0 ? (
                                                    <ul className="list-unstyled mb-0">
                                                        {connectedTables.map((t) => (
                                                            <li key={t.id} className="small text-muted">
                                                                • {t.table_name} ({t.table_type})
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-muted small fst-italic">
                                                        No tables mapped to this plug
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}

                                {plugs.length === 0 && (
                                    <div className="border rounded p-4 text-center text-muted">
                                        No plugs available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MapSmartPlug;