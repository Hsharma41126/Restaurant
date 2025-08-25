// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faUserGear,


//     faBriefcase,

//     faCalendarCheck,
//     faReceipt,
//     faClock,
//     faHistory,

//     faHome,
//     faUsers,
//     faFileAlt,
//     faUserTie,
//     faDesktopAlt,
//     faUtensils
// } from "@fortawesome/free-solid-svg-icons";
// import "./Sidebar.css";

// const Sidebar = ({ collapsed, setCollapsed }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const role = localStorage.getItem("role");

//     // Define menu items based on roles
//     const adminMenuItems = [
//         { name: "Dashboard", path: "/admin/dashboard", icon: faHome },
//         { name: "Staff Management", path: "/admin/staffmanagement", icon: faUserTie },
//         { name: "Table & Plug Setup", path: "/admin/tableplugsetup", icon: faUserGear },
//          { name: "Add Items", path: "/admin/additems", icon: faUtensils },
//         { name: "Printer Setup", path: "/admin/printersetup", icon: faUsers },
//         { name: "Business Settings", path: "/admin/businesssettings", icon: faFileAlt },
//         { name: "Reports Analytics", path: "/admin/reportanalytics", icon: faBriefcase },
//         { name: "Device Monitor", path: "/admin/devicemonitor", icon: faDesktopAlt  },
//     ];

//     const staffMenuItems = [
//         { name: "Tables", path: "/staff/tablesmanagement", icon: faHome },
//         { name: "Orders​", path: "/staff/ordermanagement", icon: faBriefcase },
//         { name: "KOT Queue​", path: "/staff/kotqueue", icon: faFileAlt },
//         { name: "Reservations", path: "/staff/reservationsmanagement", icon: faBriefcase },
//         // { name: "Billing​", path: "/staff/billingpayment", icon: faFileAlt },
//         { name: "Alerts", path: "/staff/alertsnotifications", icon: faDesktopAlt },
//     ];

//     const userMenuItems = [
//         { name: "Book Table", path: "/user/booktable", icon: faHome },
//         { name: "My Reservations", path: "/user/myreservations", icon: faCalendarCheck },
//         { name: "My Bill", path: "/user/mybilling", icon: faReceipt },
//         { name: "Session Tracker", path: "/user/sessiontracker", icon: faClock },
//         { name: "Session History", path: "/user/sessionhistory", icon: faHistory },
//     ];

//     // Get menu items based on role
//     const getMenuItems = () => {
//         switch (role) {
//             case "admin":
//                 return adminMenuItems;
//             case "staff":
//                 return staffMenuItems;
//             case "user":
//                 return userMenuItems;
//             default:
//                 return [];
//         }
//     };

//     const menuItems = getMenuItems();

//     const isActive = (path) => location.pathname === path;

//     const handleMenuItemClick = (path) => {
//         navigate(path);
//         // Check if window width is mobile size (768px or less)
//         if (window.innerWidth <= 768) {
//             setCollapsed(true);
//         }
//     };

//     return (
//         <div className={`sidebar-container shadow-sm  ${collapsed ? "collapsed" : ""}`}>
//             <div className="sidebar">
//                 <ul className="menu">
//                     {menuItems.map((item, index) => (
//                         <li
//                             key={index}
//                             className={`menu-item ${isActive(item.path) ? "active" : ""}`}
//                             data-tooltip={collapsed ? item.name : ""}
//                         >
//                             <div
//                                 className="menu-link"
//                                 onClick={() => handleMenuItemClick(item.path)}
//                             >
//                                 <FontAwesomeIcon icon={item.icon} className="menu-icon" />
//                                 {!collapsed && <span className="menu-text">{item.name}</span>}
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;


import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGear,
    faBriefcase,
    faCalendarCheck,
    faReceipt,
    faClock,
    faHistory,
    faHome,
    faUsers,
    faFileAlt,
    faUserTie,
    faDesktopAlt,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem("role");
    const permissions = JSON.parse(localStorage.getItem("permissions") || "{}");

    // Menu definitions with required permissions
    const staffMenuItems = [
        {
            name: "Tables",
            path: "/staff/tablesmanagement",
            icon: faHome,
            show: permissions?.tablesManagement?.enabled && permissions?.tablesManagement?.viewTables,
        },
        {
            name: "Orders",
            path: "/staff/ordermanagement",
            icon: faBriefcase,
            show: permissions?.orderProcessing?.enabled && permissions?.orderProcessing?.createOrders,
        },
        {
            name: "Reservations",
            path: "/staff/reservationsmanagement",
            icon: faBriefcase,
            show:
                permissions?.tablesManagement?.enabled &&
                permissions?.tablesManagement?.manageReservations,
        },
        {
            name: "KOT Queue",
            path: "/staff/kotqueue",
            icon: faFileAlt,
            show: permissions?.orderProcessing?.enabled,
        },
        {
            name: "Alerts",
            path: "/staff/alertsnotifications",
            icon: faDesktopAlt,
            show: true, // Always visible
        },
    ];

    const userMenuItems = [
        { name: "Book Table", path: "/user/booktable", icon: faHome, show: true },
        { name: "My Reservations", path: "/user/myreservations", icon: faCalendarCheck, show: true },
        { name: "My Bill", path: "/user/mybilling", icon: faReceipt, show: true },
        { name: "Session Tracker", path: "/user/sessiontracker", icon: faClock, show: true },
        { name: "Session History", path: "/user/sessionhistory", icon: faHistory, show: true },
    ];

    const adminMenuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: faHome, show: true },
        { name: "Staff Management", path: "/admin/staffmanagement", icon: faUserTie, show: true },
        { name: "Table & Plug Setup", path: "/admin/tableplugsetup", icon: faUserGear, show: true },
        { name: "Add Items", path: "/admin/additems", icon: faUtensils, show: true },
        { name: "Printer Setup", path: "/admin/printersetup", icon: faUsers, show: true },
        { name: "Business Settings", path: "/admin/businesssettings", icon: faFileAlt, show: true },
        { name: "Reports Analytics", path: "/admin/reportanalytics", icon: faBriefcase, show: true },
        { name: "Device Monitor", path: "/admin/devicemonitor", icon: faDesktopAlt, show: true },
    ];

    // Get menu items by role
    const getMenuItems = () => {
        switch (role) {
            case "admin":
                return adminMenuItems;
            case "staff":
                return staffMenuItems;
            case "user":
                return userMenuItems;
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();
    const isActive = (path) => location.pathname === path;

    const handleMenuItemClick = (path) => {
        navigate(path);
        if (window.innerWidth <= 768) {
            setCollapsed(true);
        }
    };

    return (
        <div className={`sidebar-container shadow-sm ${collapsed ? "collapsed" : ""}`}>
            <div className="sidebar">
                <ul className="menu">
                    {menuItems
                        .filter((item) => item.show) // 👈 Only show allowed
                        .map((item, index) => (
                            <li
                                key={index}
                                className={`menu-item ${isActive(item.path) ? "active" : ""}`}
                                data-tooltip={collapsed ? item.name : ""}
                            >
                                <div className="menu-link" onClick={() => handleMenuItemClick(item.path)}>
                                    <FontAwesomeIcon icon={item.icon} className="menu-icon" />
                                    {!collapsed && <span className="menu-text">{item.name}</span>}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
