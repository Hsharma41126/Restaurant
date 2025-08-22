

// import React, { useState, useEffect } from "react";

// const categoryOrder = {
//   electric: [
//     "PlayStation",
//     "Pool",
//   ],
//   nonElectric: [
//     "Food",
//     "Snooker",
//     "Large Table",
//   ],
// };

// const getCategoryIcon = (type) => {
//   switch (type) {
//     case "Pool": return "🎱";
//     case "Snooker": return "🎯";
//     case "PlayStation": return "🎮";
//     case "Large Table": return "🪑";
//     default: return "🍽️";
//   }
// };

// const getCategoryColor = (type) => {
//   switch (type) {
//     case "Large Table": return "#ffc107";
//     case "Food": return "#fd7e14";
//     case "Pool": return "#17a2b8";
//     case "Snooker": return "#28a745";
//     case "PlayStation": return "#6f42c1";
//     default: return "#adb5bd";
//   }
// };

// const statusColors = {
//   available: "#9E9E9E",
//   occupied: "#4CAF50",
//   reserved: "#FFC107",
//   inactive: "#f44336",
// };

// const Tables = () => {
//   // State management
//   const [quickJumpInput, setQuickJumpInput] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showPanel, setShowPanel] = useState(!isMobile);

//   // Modal states
//   const [tableModalOpen, setTableModalOpen] = useState(false);
//   const [groupModalOpen, setGroupModalOpen] = useState(false);
//   const [editingTable, setEditingTable] = useState(null);
//   const [editingGroup, setEditingGroup] = useState(null);

//   // Form states
//   const [tableForm, setTableForm] = useState({
//     name: "",
//     type: "Snooker",
//     plugId: "",
//     status: "active",
//     seats: 8,
//     group: "",
//   });

//   const [groupForm, setGroupForm] = useState({
//     name: "",
//     selectedTables: [],
//     hourlyRate: "",
//     fixedRate: "",
//     discount: "",
//   });

//   // Tables and groups (initial demo data)
//   const [tables, setTables] = useState([
//     { id: 1, name: "Table 1", type: "Food", status: "occupied", guests: 4, order: "Order #1234", plugId: null, group: "" },
//     { id: 2, name: "Table 2", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 3, name: "Table 3", type: "Food", status: "occupied", guests: 2, order: "Order #1235", plugId: null, group: "" },
//     { id: 4, name: "Table 4", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 5, name: "Table 5", type: "Food", status: "reserved", guests: 6, order: null, plugId: null, group: "" },
//     { id: 6, name: "Table 6", type: "Food", status: "occupied", guests: 3, order: "Order #1236", plugId: null, group: "" },
//     { id: 101, name: "Pool 1", type: "Pool", status: "occupied", guests: 2, order: "Order #P101", plugId: "PLUG_101", group: "" },
//     { id: 102, name: "Pool 2", type: "Pool", status: "available", guests: 0, order: null, plugId: "PLUG_102", group: "" },
//     { id: 103, name: "Pool 3", type: "Pool", status: "reserved", guests: 4, order: null, plugId: "PLUG_103", group: "" },
//     { id: 104, name: "Pool 4", type: "Pool", status: "reserved", guests: 4, order: null, plugId: "PLUG_104", group: "" },
//     { id: 105, name: "Pool 5", type: "Pool", status: "reserved", guests: 4, order: null, plugId: "PLUG_105", group: "" },
//     { id: 106, name: "Pool 6", type: "Pool", status: "reserved", guests: 4, order: null, plugId: "PLUG_106", group: "" },
//     { id: 7, name: "Table 7", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 8, name: "Table 8", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 9, name: "Table 9", type: "Food", status: "occupied", guests: 2, order: "Order #1237", plugId: null, group: "" },
//     { id: 10, name: "Table 10", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 11, name: "Table 11", type: "Food", status: "available", guests: 0, order: null, plugId: null, group: "" },
//     { id: 12, name: "Table 12", type: "Food", status: "occupied", guests: 5, order: "Order #1238", plugId: null, group: "" },
//   ]);

//   const [groupTables, setGroupTables] = useState([
//     { id: 201, name: "Large Table 1", type: "Large Table", seats: 8, status: "available", guests: 0, order: null, group: "" },
//     { id: 202, name: "Large Table 2", type: "Large Table", seats: 8, status: "available", guests: 0, order: null, group: "" },
//     { id: 203, name: "Large Table 3", type: "Large Table", seats: 8, status: "available", guests: 0, order: null, group: "" },
//   ]);

//   const [groups, setGroups] = useState([]);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [showTableActions, setShowTableActions] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) setShowPanel(true);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // FORM HANDLERS
//   const handleTableFormChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "type") {
//       setTableForm((prev) => ({
//         ...prev,
//         [name]: value,
//         seats: value === "Large Table" ? 8 : prev.seats,
//       }));
//     } else {
//       setTableForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleGroupFormChange = (e) => {
//     const { name, value } = e.target;
//     setGroupForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTableSelection = (tableId) => {
//     setGroupForm((prev) => ({
//       ...prev,
//       selectedTables: prev.selectedTables.includes(tableId)
//         ? prev.selectedTables.filter((id) => id !== tableId)
//         : [...prev.selectedTables, tableId],
//     }));
//   };

//   // TABLE SUBMIT
//   const handleTableSubmit = (e) => {
//     e.preventDefault();
//     if (editingTable) {
//       // Update existing table
//       const updatedTable = {
//         ...editingTable,
//         name: tableForm.name,
//         type: tableForm.type,
//         plugId: tableForm.plugId || null,
//         status: tableForm.status === "active" ? "available" : "inactive",
//         seats: tableForm.type === "Large Table" ? parseInt(tableForm.seats) : editingTable.seats,
//         group: tableForm.group,
//       };
//       if (tableForm.type === "Large Table") {
//         setGroupTables((prev) =>
//           prev.map((t) => (t.id === editingTable.id ? updatedTable : t))
//         );
//         setTables((prev) => prev.filter((t) => t.id !== editingTable.id));
//       } else {
//         setTables((prev) =>
//           prev.map((t) => (t.id === editingTable.id ? updatedTable : t))
//         );
//         setGroupTables((prev) => prev.filter((t) => t.id !== editingTable.id));
//       }
//     } else {
//       // Add new table
//       const newId = Math.max(
//         ...tables.map((t) => t.id),
//         ...groupTables.map((t) => t.id),
//         0
//       ) + 1;
//       const newTable = {
//         id: newId,
//         name: tableForm.name,
//         type: tableForm.type,
//         status: tableForm.status === "active" ? "available" : "inactive",
//         guests: 0,
//         order: null,
//         plugId: tableForm.plugId || null,
//         seats: tableForm.type === "Large Table" ? parseInt(tableForm.seats) : undefined,
//         group: tableForm.group,
//       };
//       if (tableForm.type === "Large Table") {
//         setGroupTables((prev) => [...prev, newTable]);
//       } else {
//         setTables((prev) => [...prev, newTable]);
//       }
//     }
//     setTableForm({
//       name: "",
//       type: "Snooker",
//       plugId: "",
//       status: "active",
//       seats: 8,
//       group: "",
//     });
//     setTableModalOpen(false);
//     setEditingTable(null);
//   };

//   const handleEditTable = (table) => {
//     setEditingTable(table);
//     setTableForm({
//       name: table.name,
//       type: table.type || "Food",
//       plugId: table.plugId || "",
//       status: table.status === "inactive" ? "inactive" : "active",
//       seats: table.seats || 8,
//       group: table.group || "",
//     });
//     setTableModalOpen(true);
//     setShowTableActions(false);
//   };

//   const handleDeleteTable = (tableId) => {
//     if (window.confirm("Are you sure you want to delete this table?")) {
//       setTables((prev) => prev.filter((table) => table.id !== tableId));
//       setGroupTables((prev) => prev.filter((table) => table.id !== tableId));
//       setGroups((prev) =>
//         prev.map((group) => ({
//           ...group,
//           selectedTables: group.selectedTables.filter((id) => id !== tableId),
//         }))
//       );
//       setShowTableActions(false);
//     }
//   };

//   const handleDeleteGroup = (groupId) => {
//     if (window.confirm("Are you sure you want to delete this group?")) {
//       setGroups((prev) => prev.filter((group) => group.id !== groupId));
//     }
//   };

//   const handleTableClick = (table, event) => {
//     event.stopPropagation();
//     setSelectedTable(table);
//     setShowTableActions(true);
//   };

//   useEffect(() => {
//     const handleClickOutside = () => {
//       setShowTableActions(false);
//     };
//     if (showTableActions) {
//       document.addEventListener("click", handleClickOutside);
//       return () => document.removeEventListener("click", handleClickOutside);
//     }
//   }, [showTableActions]);

//   const handleGroupSubmit = (e) => {
//     e.preventDefault();
//     const newId = Math.max(...groups.map((g) => g.id), 0) + 1;
//     const newGroup = {
//       id: newId,
//       name: groupForm.name,
//       selectedTables: [...groupForm.selectedTables],
//       hourlyRate: parseFloat(groupForm.hourlyRate),
//       fixedRate: parseFloat(groupForm.fixedRate),
//       discount: parseFloat(groupForm.discount) || 0,
//     };
//     setGroups((prev) => [...prev, newGroup]);
//     setGroupForm({
//       name: "",
//       selectedTables: [],
//       hourlyRate: "",
//       fixedRate: "",
//       discount: "",
//     });
//     setGroupModalOpen(false);
//     setEditingGroup(null);
//   };

//   // UI HELPERS

//   // For table display, merge normal and large tables
//   const allTableData = [...tables, ...groupTables];
//   const tablesByCategory = Object.keys(categoryOrder).map(category => ({
//     category,
//     tables: allTableData.filter(table => categoryOrder[category].includes(table.type))
//   }));

//   // Quick jump
//   const handleJump = () => {
//     const num = parseInt(quickJumpInput, 10);
//     if (isNaN(num)) return;
//     const tableElement = document.getElementById(`table-${num}`);
//     if (tableElement) {
//       document.querySelectorAll(".table-highlight").forEach((el) => {
//         el.classList.remove("table-highlight", "animate-pulse");
//       });
//       tableElement.classList.add("table-highlight", "animate-pulse");
//       tableElement.scrollIntoView({ behavior: "smooth", block: "center" });
//       setTimeout(() => {
//         tableElement.classList.remove("table-highlight", "animate-pulse");
//       }, 2000);
//     }
//   };

//   // Card renderer for category
//   const renderTableCard = (table) => (
//     <div
//       key={table.id}
//       id={`table-${table.id}`}
//       onClick={(e) => handleTableClick(table, e)}
//       style={{
//         background: "#fff",
//         border: `3px solid ${statusColors[table.status] || "#bbb"}`,
//         borderRadius: "12px",
//         margin: "15px",
//         padding: "12px",
//         minWidth: "150px",
//         maxWidth: "200px",
//         minHeight: "150px",
//         maxHeight: "200px",
//         boxShadow: selectedTable?.id === table.id ? "0 0 8px #ffc107" : "0 2px 8px rgba(0,0,0,0.05)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         cursor: "pointer",
//         position: "relative",
//         transition: "all 0.2s",
//         textAlign: "center",
//       }}
//     >
//       <div style={{
//         fontSize: "40px",
//         marginBottom: "8px",
//       }}>
//         {getCategoryIcon(table.type)}
//       </div>
//       <div style={{ fontWeight: "bold", color: "#333", marginBottom: "3px" }}>
//         {table.name}
//       </div>
//       <div style={{ fontSize: "14px", color: "#666" }}>
//         Status: {table.status}
//       </div>
//       {table.guests > 0 &&
//         <div style={{
//           position: "absolute",
//           top: "8px",
//           right: "8px",
//           background: "#17a2b8",
//           color: "#fff",
//           borderRadius: "10px",
//           padding: "3px 7px",
//           fontSize: "12px",
//           fontWeight: "bold"
//         }}>
//           Guests: {table.guests}
//         </div>
//       }
//       {table.seats && (
//         <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
//           Seats: {table.seats}
//         </div>
//       )}
//       {table.group && (
//         <div style={{
//           marginTop: "2px",
//           fontSize: "11px",
//           background: "#ffc10760",
//           color: "#444",
//           borderRadius: "7px",
//           padding: "2px 7px"
//         }}>
//           Group: {table.group}
//         </div>
//       )}
//     </div>
//   );

//   // main UI
//   return (
//     <div>
//       {/* Quick Jump */}
//       <div style={{
//         marginBottom: "20px",
//         backgroundColor: "white",
//         padding: "15px",
//         borderRadius: "8px",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       }}>
//         <div style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}>
//           <div style={{
//             display: "flex",
//             gap: "10px",
//             alignItems: "center",
//             flexWrap: "wrap",
//             flex: "1 1 300px",
//           }}>
//             <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
//               Quick Jump to Table:
//             </label>
//             <input
//               type="number"
//               value={quickJumpInput}
//               onChange={(e) => setQuickJumpInput(e.target.value)}
//               placeholder="Enter table ID"
//               style={{
//                 padding: "5px 10px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px",
//                 width: "150px",
//                 maxWidth: "100%",
//               }}
//             />
//             <button
//               onClick={handleJump}
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "white",
//                 border: "none",
//                 padding: "5px 15px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 flexShrink: 0,
//               }}
//             >
//               Jump
//             </button>
//           </div>
//           <div style={{
//             display: "flex",
//             gap: "10px",
//             flexWrap: "wrap",
//             justifyContent: "flex-end",
//             flex: "1 1 200px",
//           }}>
//             <button
//               onClick={() => setTableModalOpen(true)}
//               style={{
//                 backgroundColor: "#ffc107",
//                 color: "black",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 flex: "1 1 auto",
//               }}
//             >
//               + Add Table
//             </button>
//             <button onClick={() => setGroupModalOpen(true)}
//               style={{
//                 backgroundColor: "#17a2b8",
//                 color: "white",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 flex: "1 1 auto",
//               }}
//             >
//               + Add Group
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Category Wise Table Display */}
//       <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", minHeight: "600px", marginBottom: "30px" }}>
//         {tablesByCategory.map((cat) =>
//           cat.tables.length ? (
//             <div key={cat.category} style={{ marginBottom: "30px" }}>
//               <h2
//                 style={{
//                   background: getCategoryColor(cat.category === "electric" ? "PlayStation" : "Food"),
//                   color: "#fff",
//                   padding: "10px 25px",
//                   borderRadius: "8px",
//                   marginBottom: "13px",
//                   fontSize: "20px",
//                   fontWeight: "bold",
//                   textAlign: "left",
//                   display: "inline-block",
//                 }}
//               >
//                 {cat.category === "electric" ? "🔌 Electric Tables" : "🛋️ Non-Electric Tables"}
//               </h2>
//               <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {cat.tables.map(renderTableCard)}
//               </div>
//             </div>
//           ) : null
//         )}
//       </div>

//       {/* Table Modal */}
//       {tableModalOpen && (
//         <div style={{
//           position: "fixed",
//           top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           zIndex: 1050,
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             borderRadius: "8px",
//             width: "90%",
//             maxWidth: "600px",
//             maxHeight: "90vh",
//             overflow: "auto",
//           }}>
//             <div style={{
//               padding: "20px",
//               borderBottom: "1px solid #ddd",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}>
//               <h5 style={{ margin: 0 }}>
//                 {editingTable ? "Edit Table" : "Add Table"}
//               </h5>
//               <button
//                 onClick={() => setTableModalOpen(false)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                   padding: 0,
//                   color: "#666",
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleTableSubmit}>
//               <div style={{ padding: "20px" }}>
//                 {/* Select Group - DYNAMIC */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "5px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Select Group
//                   </label>
//                   <select
//                     name="group"
//                     value={tableForm.group || ""}
//                     onChange={handleTableFormChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       border: "1px solid #ddd",
//                       borderRadius: "4px",
//                       backgroundColor: "white",
//                     }}
//                   >
//                     <option value="">-- Select Group --</option>
//                     {groups.map(g => (
//                       <option key={g.id} value={g.name}>{g.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {/* Table Name */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <label style={{
//                     display: "block", marginBottom: "5px", fontWeight: "bold"
//                   }}>Table Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={tableForm.name}
//                     onChange={handleTableFormChange}
//                     placeholder="Enter table name"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       border: "1px solid #ddd",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 </div>
//                 {/* Select Table Type */}
//                 <div style={{ marginBottom: "15px" }}>
//                   <label style={{
//                     display: "block", marginBottom: "15px", fontWeight: "bold"
//                   }}>Select Table Type</label>
//                   <div style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
//                     gap: "12px",
//                   }}>
//                     {[
//                       { type: "Snooker", icon: "🎯", color: "#28a745", description: "Snooker Table" },
//                       { type: "Pool", icon: "🎱", color: "#17a2b8", description: "Pool Table" },
//                       { type: "PlayStation", icon: "🎮", color: "#6f42c1", description: "PlayStation" },
//                       { type: "Food", icon: "🍽️", color: "#fd7e14", description: "Dining Table" },
//                       { type: "Large Table", icon: "🪑", color: "#ffc107", description: "Group Table" }
//                     ].map((tableType) => (
//                       <div
//                         key={tableType.type}
//                         onClick={() => {
//                           setTableForm(prev => ({
//                             ...prev,
//                             type: tableType.type,
//                             seats: tableType.type === "Large Table"
//                               ? prev.seats || 8
//                               : undefined
//                           }));
//                         }}
//                         style={{
//                           border: `2px solid ${tableForm.type === tableType.type
//                             ? tableType.color : "#ddd"}`,
//                           borderRadius: "8px",
//                           padding: "12px",
//                           textAlign: "center",
//                           cursor: "pointer",
//                           backgroundColor: tableForm.type === tableType.type
//                             ? `${tableType.color}20` : "white",
//                           transition: "all 0.2s",
//                           position: "relative",
//                         }}
//                       >
//                         <div style={{ fontSize: "30px", marginBottom: "5px" }}>
//                           {tableType.icon}
//                         </div>
//                         {/* <div style={{
//                           fontWeight: "bold",
//                           color: tableForm.type === tableType.type
//                             ? tableType.color : "#495057"
//                         }}>
//                           {tableType.description}
//                         </div> */}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 {tableForm.type === "Large Table" && (
//                   <div style={{ marginBottom: "15px" }}>
//                     <label style={{
//                       display: "block", marginBottom: "5px", fontWeight: "bold"
//                     }}>Number of Seats</label>
//                     <input
//                       type="number"
//                       name="seats"
//                       value={tableForm.seats}
//                       onChange={handleTableFormChange}
//                       placeholder="Enter number of seats"
//                       min="4"
//                       max="20"
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   </div>
//                 )}
//                 {tableForm.type !== "Food" &&
//                   tableForm.type !== "Large Table" && (
//                     <div style={{ marginBottom: "15px" }}>
//                       <label style={{
//                         display: "block",
//                         marginBottom: "5px",
//                         fontWeight: "bold",
//                       }}>Smart Plug ID</label>
//                       <input
//                         type="text"
//                         name="plugId"
//                         value={tableForm.plugId}
//                         onChange={handleTableFormChange}
//                         placeholder="Enter plug ID (e.g., PLUG_001)"
//                         style={{
//                           width: "100%",
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                           borderRadius: "4px",
//                         }}
//                       />
//                     </div>
//                   )}
//                 <div style={{ marginBottom: "20px" }}>
//                   <label style={{
//                     display: "block", marginBottom: "10px", fontWeight: "bold"
//                   }}>Status</label>
//                   <div style={{ display: "flex", gap: "20px" }}>
//                     <label
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         cursor: "pointer",
//                       }}>
//                       <input
//                         type="radio"
//                         name="status"
//                         value="active"
//                         checked={tableForm.status === "active"}
//                         onChange={handleTableFormChange}
//                       />
//                       <span>Active</span>
//                     </label>
//                     <label
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "8px",
//                         cursor: "pointer",
//                       }}>
//                       <input
//                         type="radio"
//                         name="status"
//                         value="inactive"
//                         checked={tableForm.status === "inactive"}
//                         onChange={handleTableFormChange}
//                       />
//                       <span>Inactive</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               <div style={{
//                 padding: "20px",
//                 borderTop: "1px solid #ddd",
//                 display: "flex",
//                 gap: "10px",
//                 justifyContent: "flex-end",
//               }}>
//                 <button
//                   type="button"
//                   onClick={() => setTableModalOpen(false)}
//                   style={{
//                     padding: "10px 20px",
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     backgroundColor: "white",
//                     cursor: "pointer",
//                   }}>Cancel</button>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "4px",
//                     backgroundColor: "#ffc107",
//                     color: "black",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                   }}>
//                   {editingTable ? "Update Table" : "Add Table"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Table Action Popup */}
//       {showTableActions && selectedTable && (
//         <div
//           style={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "white",
//             border: "3px solid #ffc107",
//             borderRadius: "12px",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
//             zIndex: 1000,
//             minWidth: "280px",
//             animation: "fadeInScale 0.2s ease-out",
//           }}
//         >
//           <div
//             style={{
//               padding: "20px",
//               borderBottom: "2px solid #ffc107",
//               fontWeight: "bold",
//               textAlign: "center",
//               backgroundColor: "#ffc107",
//               color: "#333",
//               borderRadius: "8px 8px 0 0",
//               fontSize: "16px",
//             }}
//           >
//             🏷️ {selectedTable.name}
//             <div
//               style={{
//                 fontSize: "12px",
//                 fontWeight: "normal",
//                 marginTop: "4px",
//                 color: "#666",
//               }}
//             >
//               {selectedTable.type || "Food"} • {selectedTable.status}
//             </div>
//           </div>
//           <div style={{ padding: "20px" }}>
//             <button
//               onClick={() => handleEditTable(selectedTable)}
//               style={{
//                 width: "100%",
//                 padding: "15px",
//                 marginBottom: "12px",
//                 border: "none",
//                 borderRadius: "8px",
//                 backgroundColor: "#17a2b8",
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 fontSize: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "8px",
//                 transition: "all 0.2s",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               <span style={{ fontSize: "16px" }}>✏️</span>
//               Edit Table
//             </button>
//             <button
//               onClick={() => handleDeleteTable(selectedTable.id)}
//               style={{
//                 width: "100%",
//                 padding: "15px",
//                 marginBottom: "12px",
//                 border: "none",
//                 borderRadius: "8px",
//                 backgroundColor: "#dc3545",
//                 color: "white",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 fontSize: "14px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "8px",
//                 transition: "all 0.2s",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               <span style={{ fontSize: "16px" }}>🗑️</span>
//               Delete Table
//             </button>
//             <button
//               onClick={() => {
//                 setShowTableActions(false);
//                 setSelectedTable(null);
//               }}
//               style={{
//                 width: "100%",
//                 padding: "12px",
//                 border: "2px solid #6c757d",
//                 borderRadius: "8px",
//                 backgroundColor: "transparent",
//                 color: "#6c757d",
//                 cursor: "pointer",
//                 fontWeight: "bold",
//                 fontSize: "14px",
//                 transition: "all 0.2s ease",
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//           <button
//             onClick={() => {
//               setShowTableActions(false);
//               setSelectedTable(null);
//             }}
//             style={{
//               position: "absolute",
//               top: "8px",
//               right: "8px",
//               background: "none",
//               border: "none",
//               fontSize: "20px",
//               cursor: "pointer",
//               color: "#666",
//               width: "30px",
//               height: "30px",
//               borderRadius: "50%",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "all 0.2s ease",
//             }}
//           >
//             ×
//           </button>
//         </div>
//       )}
//       {/* Backdrop */}
//       {showTableActions && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.3)",
//             zIndex: 999,
//           }}
//           onClick={() => {
//             setShowTableActions(false);
//             setSelectedTable(null);
//           }}
//         />
//       )}

//       {/* Groups Display - Graphical View */}
//       {groups.length > 0 && (
//         <div
//           style={{
//             marginTop: "30px",
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//           }}
//         >
//           <h2
//             style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
//           >
//             Created Groups - Visual Overview
//           </h2>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
//               gap: "30px",
//             }}
//           >
//             {groups.map((group) => {
//               const allTables = [...tables, ...groupTables];
//               const selectedTables = allTables.filter((table) =>
//                 group.selectedTables.includes(table.id)
//               );

//               return (
//                 <div
//                   key={group.id}
//                   style={{
//                     border: "2px solid #ffc107",
//                     padding: "20px",
//                     borderRadius: "12px",
//                     backgroundColor: "#fff8e1",
//                     position: "relative",
//                     minHeight: "300px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "15px",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         margin: 0,
//                         color: "#f57f17",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {group.name}
//                     </h3>
//                     <div style={{ display: "flex", gap: "8px" }}>
//                       <button
//                         onClick={() => {
//                           setEditingGroup(true);
//                           setGroupForm({
//                             id: group.id,
//                             name: group.name,
//                             hourlyRate: group.hourlyRate,
//                             fixedRate: group.fixedRate,
//                             discount: group.discount,
//                             selectedTables: group.selectedTables,
//                           });
//                           setGroupModalOpen(true);
//                         }}
//                         style={{
//                           background: "#17a2b8",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "50%",
//                           width: "30px",
//                           height: "30px",
//                           cursor: "pointer",
//                           fontWeight: "bold",
//                           fontSize: "14px",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                         title="Edit Group"
//                       >
//                         ✏️
//                       </button>
//                       <button
//                         onClick={() => handleDeleteGroup(group.id)}
//                         style={{
//                           background: "#dc3545",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "50%",
//                           width: "30px",
//                           height: "30px",
//                           cursor: "pointer",
//                           fontWeight: "bold",
//                           fontSize: "14px",
//                         }}
//                         title="Delete Group"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   </div>

//                   {/* Group Stats */}
//                   <div
//                     style={{
//                       display: "grid",
//                       gridTemplateColumns: "1fr 1fr",
//                       gap: "10px",
//                       marginBottom: "20px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         backgroundColor: "#4caf50",
//                         color: "white",
//                         padding: "8px",
//                         borderRadius: "6px",
//                         textAlign: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       💰 ${group.hourlyRate}/hr
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: "#2196f3",
//                         color: "white",
//                         padding: "8px",
//                         borderRadius: "6px",
//                         textAlign: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       🎯 ${group.fixedRate} fixed
//                     </div>
//                     <div
//                       style={{
//                         backgroundColor: "#ff9800",
//                         color: "white",
//                         padding: "8px",
//                         borderRadius: "6px",
//                         textAlign: "center",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       📊 {selectedTables.length} tables
//                     </div>
//                     {group.discount > 0 && (
//                       <div
//                         style={{
//                           backgroundColor: "#e91e63",
//                           color: "white",
//                           padding: "8px",
//                           borderRadius: "6px",
//                           textAlign: "center",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         🎁 {group.discount}% off
//                       </div>
//                     )}
//                   </div>

//                   {/* Visual representation of tables in group */}
//                   <div
//                     style={{
//                       border: "1px dashed #ffc107",
//                       borderRadius: "8px",
//                       padding: "15px",
//                       minHeight: "150px",
//                       backgroundColor: "#ffffff",
//                       position: "relative",
//                     }}
//                   >
//                     <div
//                       style={{
//                         fontSize: "12px",
//                         fontWeight: "bold",
//                         color: "#f57f17",
//                         marginBottom: "10px",
//                         textAlign: "center",
//                       }}
//                     >
//                       GROUP LAYOUT
//                     </div>

//                     <div
//                       style={{
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: "8px",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       {selectedTables.map((table, index) => {
//                         const getTableIcon = (type) => {
//                           switch (type) {
//                             case "Pool":
//                               return "🎱";
//                             case "Snooker":
//                               return "🎯";
//                             case "PlayStation":
//                               return "🎮";
//                             case "Large Table":
//                               return "🪑";
//                             default:
//                               return "🍽️";
//                           }
//                         };

//                         const getTableColor = (type) => {
//                           switch (type) {
//                             case "Pool":
//                               return "#4caf50";
//                             case "Snooker":
//                               return "#2196f3";
//                             case "PlayStation":
//                               return "#9c27b0";
//                             case "Large Table":
//                               return "#795548";
//                             default:
//                               return "#ff9800";
//                           }
//                         };

//                         return (
//                           <div
//                             key={table.id}
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               alignItems: "center",
//                               margin: "5px",
//                               position: "relative",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "40px",
//                                 height: "40px",
//                                 borderRadius:
//                                   table.type === "Food" ? "50%" : "8px",
//                                 backgroundColor: getTableColor(
//                                   table.type || "Food"
//                                 ),
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: "18px",
//                                 border: "2px solid white",
//                                 boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//                                 position: "relative",
//                               }}
//                             >
//                               {getTableIcon(table.type || "Food")}
//                               {table.status === "occupied" && (
//                                 <div
//                                   style={{
//                                     position: "absolute",
//                                     top: "-3px",
//                                     right: "-3px",
//                                     width: "12px",
//                                     height: "12px",
//                                     borderRadius: "50%",
//                                     backgroundColor: "#f44336",
//                                     border: "2px solid white",
//                                   }}
//                                 ></div>
//                               )}
//                               {table.status === "reserved" && (
//                                 <div
//                                   style={{
//                                     position: "absolute",
//                                     top: "-3px",
//                                     right: "-3px",
//                                     width: "12px",
//                                     height: "12px",
//                                     borderRadius: "50%",
//                                     backgroundColor: "#ff9800",
//                                     border: "2px solid white",
//                                   }}
//                                 ></div>
//                               )}
//                             </div>
//                             <div
//                               style={{
//                                 fontSize: "10px",
//                                 fontWeight: "bold",
//                                 color: "#666",
//                                 marginTop: "4px",
//                                 textAlign: "center",
//                                 lineHeight: "1",
//                               }}
//                             >
//                               {table.name}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>

//                     {/* Connection lines between tables */}
//                     <svg
//                       style={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         pointerEvents: "none",
//                         zIndex: 1,
//                       }}
//                     >
//                       {selectedTables.map((_, index) => {
//                         if (index === selectedTables.length - 1) return null;
//                         const startX = 50 + index * 60;
//                         const startY = 80;
//                         const endX = 50 + (index + 1) * 60;
//                         const endY = 80;

//                         return (
//                           <line
//                             key={index}
//                             x1={`${startX}px`}
//                             y1={`${startY}px`}
//                             x2={`${endX}px`}
//                             y2={`${endY}px`}
//                             stroke="#ffc107"
//                             strokeWidth="2"
//                             strokeDasharray="5,5"
//                             opacity="0.6"
//                           />
//                         );
//                       })}
//                     </svg>
//                   </div>

//                   {/* Group summary stats at bottom */}
//                   <div
//                     style={{
//                       marginTop: "15px",
//                       padding: "10px",
//                       backgroundColor: "#f8f9fa",
//                       borderRadius: "6px",
//                       fontSize: "12px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         marginBottom: "4px",
//                       }}
//                     >
//                       <span>
//                         <strong>Total Revenue Potential:</strong>
//                       </span>
//                       <span style={{ fontWeight: "bold", color: "#4caf50" }}>
//                         ${(group.hourlyRate * selectedTables.length).toFixed(2)}
//                         /hr
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         marginBottom: "4px",
//                       }}
//                     >
//                       <span>
//                         <strong>Fixed Revenue:</strong>
//                       </span>
//                       <span style={{ fontWeight: "bold", color: "#2196f3" }}>
//                         ${(group.fixedRate * selectedTables.length).toFixed(2)}
//                       </span>
//                     </div>
//                     {group.discount > 0 && (
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           color: "#e91e63",
//                         }}
//                       >
//                         <span>
//                           <strong>After Discount:</strong>
//                         </span>
//                         <span style={{ fontWeight: "bold" }}>
//                           $
//                           {(
//                             group.hourlyRate *
//                             selectedTables.length *
//                             (1 - group.discount / 100)
//                           ).toFixed(2)}
//                           /hr
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Group Management Modal */}
//       {groupModalOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1050,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               borderRadius: "8px",
//               width: "90%",
//               maxWidth: "600px",
//               maxHeight: "90vh",
//               overflow: "auto",
//             }}
//           >
//             <div
//               style={{
//                 padding: "20px",
//                 borderBottom: "1px solid #ddd",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <h5 style={{ margin: 0 }}>
//                 {editingGroup ? "Edit Group" : "Create Group"}
//               </h5>
//               <button
//                 onClick={() => setGroupModalOpen(false)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "24px",
//                   cursor: "pointer",
//                   padding: 0,
//                   color: "#666",
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleGroupSubmit}>
//               <div style={{ padding: "20px" }}>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "5px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Group Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={groupForm.name}
//                     onChange={handleGroupFormChange}
//                     placeholder="Enter group name"
//                     required
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       border: "1px solid #ddd",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label
//                     style={{
//                       display: "block",
//                       marginBottom: "5px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Select Tables
//                   </label>
//                   <div
//                     style={{
//                       border: "1px solid #ddd",
//                       borderRadius: "4px",
//                       maxHeight: "200px",
//                       overflow: "auto",
//                     }}
//                   >
//                     {tablesByCategory.map(cat => (
//                       cat.tables.length > 0 && (
//                         <div key={cat.category} style={{ marginBottom: "10px" }}>
//                           <div style={{
//                             backgroundColor: "#f8f9fa",
//                             padding: "8px 15px",
//                             fontWeight: "bold",
//                             borderBottom: "1px solid #dee2e6",
//                           }}>
//                             {cat.category === "electric" ? "🔌 Electric Tables" : "🛋️ Non-Electric Tables"}
//                           </div>
//                           <div style={{ padding: "10px 15px" }}>
//                             {cat.tables.map((table) => (
//                               <div
//                                 key={table.id}
//                                 style={{
//                                   display: "flex",
//                                   alignItems: "center",
//                                   gap: "8px",
//                                   marginBottom: "8px",
//                                 }}
//                               >
//                                 <input
//                                   type="checkbox"
//                                   id={`table-${table.id}`}
//                                   checked={groupForm.selectedTables.includes(table.id)}
//                                   onChange={() => handleTableSelection(table.id)}
//                                 />
//                                 <label
//                                   htmlFor={`table-${table.id}`}
//                                   style={{ cursor: "pointer" }}
//                                 >
//                                   {table.name}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )
//                     ))}
//                   </div>
//                 </div>
//                 {groupForm.selectedTables.length > 0 && (
//                   <div style={{ marginBottom: "15px" }}>
//                     <label
//                       style={{
//                         display: "block",
//                         marginBottom: "5px",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       Selected Tables
//                     </label>
//                     <div
//                       style={{
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                         padding: "10px",
//                         display: "flex",
//                         flexWrap: "wrap",
//                         gap: "8px"
//                       }}
//                     >
//                       {groupForm.selectedTables.map(id => {
//                         const table = allTableData.find(t => t.id === id);
//                         return table && (
//                           <span
//                             key={table.id}
//                             style={{
//                               backgroundColor: "#ffc107",
//                               color: "black",
//                               padding: "4px 8px",
//                               borderRadius: "12px",
//                               fontSize: "12px",
//                               fontWeight: "bold",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "6px"
//                             }}
//                           >
//                             {table.name}
//                             <button
//                               type="button"
//                               style={{
//                                 marginLeft: "4px",
//                                 background: "none",
//                                 border: "none",
//                                 color: "#dc3545",
//                                 fontWeight: "bold",
//                                 fontSize: "16px",
//                                 cursor: "pointer",
//                                 borderRadius: "50%",
//                                 padding: "0 4px",
//                                 lineHeight: 1
//                               }}
//                               title="Remove"
//                               onClick={() => {
//                                 setGroupForm(prev => ({
//                                   ...prev,
//                                   selectedTables: prev.selectedTables.filter(tid => tid !== table.id)
//                                 }));
//                               }}
//                             >
//                               ×
//                             </button>
//                           </span>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//                 <div style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "15px",
//                   marginBottom: "15px",
//                 }}>
//                   <div>
//                     <label style={{
//                       display: "block", marginBottom: "5px", fontWeight: "bold"
//                     }}>Hourly Rate ($)</label>
//                     <input
//                       type="number"
//                       name="hourlyRate"
//                       value={groupForm.hourlyRate}
//                       onChange={handleGroupFormChange}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label style={{
//                       display: "block", marginBottom: "5px", fontWeight: "bold"
//                     }}>Fixed Rate ($)</label>
//                     <input
//                       type="number"
//                       name="fixedRate"
//                       value={groupForm.fixedRate}
//                       onChange={handleGroupFormChange}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         borderRadius: "4px",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label style={{
//                     display: "block", marginBottom: "5px", fontWeight: "bold"
//                   }}>
//                     Discounted Rate (%) <span style={{ color: "#6c757d", fontWeight: "normal" }}>Optional</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="discount"
//                     value={groupForm.discount}
//                     onChange={handleGroupFormChange}
//                     placeholder="0"
//                     min="0"
//                     max="100"
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       border: "1px solid #ddd",
//                       borderRadius: "4px",
//                     }}
//                   />
//                 </div>
//               </div>
//               <div style={{
//                 padding: "20px",
//                 borderTop: "1px solid #ddd",
//                 display: "flex",
//                 gap: "10px",
//                 justifyContent: "flex-end",
//               }}>
//                 <button
//                   type="button"
//                   onClick={() => setGroupModalOpen(false)}
//                   style={{
//                     padding: "10px 20px",
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     backgroundColor: "white",
//                     cursor: "pointer",
//                   }}>
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "4px",
//                     backgroundColor: "#ffc107",
//                     color: "black",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                   }}>
//                   {editingGroup ? "Update Group" : "Create Group"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style>{`
//         .table-highlight {
//           box-shadow: 0 0 20px #ff6b6b !important;
//           transform: scale(1.1) !important;
//           transition: all 0.3s ease !important;
//         }
//         @keyframes pulse {0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; }}
//         .animate-pulse {animation: pulse 1s infinite;}
//       `}</style>
//     </div>
//   );
// };

// export default Tables;


// {previous code without integration above }




import React, { useState, useEffect, use } from "react";
import { apiUrl } from "../../../utils/config";
import axios from "axios";
import axiosInstance from "../../../utils/axiosInstance";

const categoryOrder = {
  electric: ["playstation", "pool"],
  nonElectric: ["food", "snooker", "largetable"],
};

const getCategoryIcon = (type) => {
  switch (type) {
    case "pool":
      return "🎱";
    case "snooker":
      return "🎯";
    case "playstation":
      return "🎮";

    case "largetable":
      return "🪑";
    default:
      return "🍽️";
  }
};

const getCategoryColor = (type) => {
  switch (type) {
    case "largetable":
      return "#ffc107";
    case "food":
      return "#fd7e14";
    case "pool":
      return "#17a2b8";
    case "snooker":
      return "#28a745";
    case "playstation":
      return "#6f42c1";
    default:
      return "#adb5bd";
  }
};

const statusColors = {
  available: "#9E9E9E",
  occupied: "#4CAF50",
  reserved: "#FFC107",
  inactive: "#f44336",
};

const Tables = () => {
  // State management


  const [tablesByCategory, setTablesByCategory] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPanel, setShowPanel] = useState(!isMobile);

  // Modal states
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);

  const [groupForm, setGroupForm] = useState({
    id: null,
    name: "",
    selectedTables: [],
    hourlyRate: "",
    fixedRate: "",
    discount: "",
  });

  // Tables and groups (initial demo data)
  const [tables, setTables] = useState([]);
  const [groupTables, setGroupTables] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [showTableActions, setShowTableActions] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowPanel(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGroupFormChange = (e) => {
    const { name, value } = e.target;
    setGroupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTableSelection = (tableId) => {
    setGroupForm((prev) => {
      const currentSelectedTables = Array.isArray(prev.selectedTables) ? prev.selectedTables : [];

      return {
        ...prev,
        selectedTables: currentSelectedTables.includes(tableId)
          ? currentSelectedTables.filter((id) => id !== tableId)
          : [...currentSelectedTables, tableId],
      };
    });
  };

  const handleDeleteTable = async (tableId) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        // Call API to delete the table
        await axiosInstance.delete(
          `/tables/${tableId}`
        );

        // Update state after successful deletion
        setTables((prev) => prev.filter((table) => table.id !== tableId));
        setGroupTables((prev) => prev.filter((table) => table.id !== tableId));
        setGroups((prev) =>
          prev.map((group) => ({
            ...group,
            selectedTables: group.selectedTables.filter((id) => id !== tableId),
          }))
        );
        setShowTableActions(false);

        alert("Table deleted successfully!");
      } catch (error) {
        console.error("Error deleting table:", error);
        alert("Failed to delete table. Please try again.");
      }
    }
  };

  const handleDeleteGroup = async (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      try {
        // ✅ Call DELETE API
        await axiosInstance.delete(`/tables/tablegroups/${groupId}`);

        // ✅ Remove group from state after successful delete
        setGroups((prev) => prev.filter((group) => group.id !== groupId));

        alert("Group deleted successfully!");
      } catch (error) {
        console.error("❌ Error deleting group:", error);
        alert("Failed to delete group!");
      }
    }
  };

  const handleTableClick = (table, event) => {
    event.stopPropagation();
    setSelectedTable(table);
    setShowTableActions(true);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowTableActions(false);
    };
    if (showTableActions) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showTableActions]);

  // UI HELPERS

  // For table display, merge normal and large tables
  const allTableData = [...tables, ...groupTables];
  // const tablesByCategory = Object.keys(categoryOrder).map((category) => ({
  //   category,
  //   tables: allTableData.filter((table) =>
  //     categoryOrder[category].includes(table.type)
  //   ),
  // }));

  // Quick jump


  // Card renderer for category
  const renderTableCard = (table) => (
    <div
      key={table.id}
      id={`table-${table.id}`}
      onClick={(e) => handleTableClick(table, e)}
      style={{
        background: "#fff",
        border: `3px solid ${statusColors[table.status] || "#bbb"}`,
        borderRadius: "12px",
        margin: "15px",
        padding: "12px",
        minWidth: "150px",
        maxWidth: "200px",
        minHeight: "150px",
        maxHeight: "200px",
        boxShadow:
          selectedTable?.id === table.id
            ? "0 0 8px #ffc107"
            : "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.2s",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          marginBottom: "8px",
        }}
      >
        {getCategoryIcon(table.table_type)}
      </div>
      <div style={{ fontWeight: "bold", color: "#333", marginBottom: "3px" }}>
        {table.table_name}
      </div>
      <div style={{ fontSize: "14px", color: "#666" }}>
        Status: {table.status}
      </div>
      {table.guests > 0 && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#17a2b8",
            color: "#fff",
            borderRadius: "10px",
            padding: "3px 7px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Guests: {table.guests}
        </div>
      )}
      {table.seats && (
        <div style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
          Seats: {table.seats}
        </div>
      )}
      {table.group && (
        <div
          style={{
            marginTop: "2px",
            fontSize: "11px",
            background: "#ffc10760",
            color: "#444",
            borderRadius: "7px",
            padding: "2px 7px",
          }}
        >
          Group: {table.group}
        </div>
      )}
    </div>
  );
  // add group api call

  // ✅ Group Submit Function
  const handleGroupSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: groupForm.name,
        description: groupForm.description || "Group for selected tables",
        hourly_rate: groupForm.hourlyRate,
        fixed_rate: groupForm.fixedRate,
        discout: groupForm.discount,
        selected_pool: Array.isArray(groupForm.selectedTables)
          ? groupForm.selectedTables.join(",")
          : groupForm.selectedTables, // fallback if it's already a string
      };


      let res;
      if (editingGroup) {
        // ✅ Update existing group
        res = await axiosInstance.put(`/tables/tablegroups/${groupForm.id}`, payload);
        console.log("✅ Group updated:", res.data);
        alert("Group updated successfully!");
      } else {
        // ✅ Create new group
        res = await axiosInstance.post(`/tables/groups`, payload);
        console.log("✅ Group created:", res.data);
        alert("Group created successfully!");
      }

      // ✅ Reset form & close modal after success
      setGroupModalOpen(false);
      setGroupForm({
        id: null,
        name: "",
        description: "",
        hourlyRate: "",
        fixedRate: "",
        discount: "",
        selectedTables: [],
      });
      setEditingGroup(null);
    } catch (error) {
      console.error("❌ Error creating/updating group:", error);
      alert(editingGroup ? "Failed to update group!" : "Failed to create group!");
    }
  };

  const [groups, setGroups] = useState([]);
  const [tableForm, setTableForm] = useState({
    group: "",
  });

  // ✅ Fetch Tables from API
  // ✅ API se groups fetch
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axiosInstance.get(`tables/groups/all`);
        console.log("Groups API Data:", res.data);

        setGroups(res.data.data.groups); // API array directly set
      } catch (error) {
        console.error("❌ Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  // ✅ Handle Change
  // table post api function

  const [plugs, setPlugs] = useState([]);

  // 🔹 API call for plugs
  const fetchPlugs = async () => {
    try {
      const res = await axiosInstance.get("/plugs");
      const plugsData = res.data?.data?.plugs || [];
      setPlugs(plugsData);
    } catch (err) {
      console.error("❌ Error fetching plugs:", err.message);
    }
  };

  useEffect(() => {
    if (tableModalOpen) {
      fetchPlugs();
    }
  }, [tableModalOpen]);

  const randomnumber = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const handleTableFormChange = (e) => {
    const { name, value } = e.target;
    setTableForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditTable = (table) => {
    setEditingTable(table);
    setTableForm({
      name: table.table_name,
      type: table.table_type,
      group: table.group_id,
      seats: table.capacity,
      plugId: table.plug_id,
      status: table.status,
    });
    setTableModalOpen(true);
  };

  const handleTableSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        table_number: editingTable ? editingTable.table_number : randomnumber(), // Keep old number if editing
        table_name: tableForm.name || editingTable?.table_name,
        table_type: tableForm.type || editingTable?.table_type,
        group_id: parseInt(tableForm.group || editingTable?.group_id, 10),
        capacity: tableForm.seats || editingTable?.capacity || 4,
        plug_id: tableForm.plugId || editingTable?.plug_id || null,
        status: tableForm.status || editingTable?.status || "available",
        location: editingTable ? editingTable.location : "Main Hall",
        hourly_rate: editingTable ? editingTable.hourly_rate : "0",
      };

      console.log("🚀 Submitting payload:", payload);

      let res;
      if (editingTable) {
        // ✅ PUT request for editing
        res = await axiosInstance.put(`tables/${editingTable.id}`, payload);
        console.log("✅ Table Updated:", res.data);
        alert("Table updated successfully!");
      } else {
        // ✅ POST request for adding new
        res = await axiosInstance.post(`tables`, payload);
        console.log("✅ Table Added:", res.data);
        alert("Table added successfully!");
      }

      setTableModalOpen(false);
      setEditingTable(null); // Clear editing state
      setTableForm({}); // Reset form
      fetchTables(); // Refresh UI
    } catch (err) {
      console.error("❌ Error saving table:", err.response?.data || err.message);
      alert("Failed to save table");
    }
  };

  // render table data according to data api cards
  const fetchTables = async () => {
    try {
      const res = await axiosInstance.get(`/tables`);

      console.log("API response:", res.data);

      // ✅ सही path से tables निकालना
      const tables = res.data?.data?.tables || [];

      const electricTables = tables.filter((t) => (t.plug_id !== null || t.table_type == "snooker" || t.table_type == "playstation" || t.table_type == "pool"));
      const nonElectricTables = tables.filter((t) => t.plug_id === null && t.table_type == "dining" || t.table_type == "largetable");


      //       const electricTables = tables.filter(
      //   (t) =>
      //     t.plug_id !== null &&
      //     ["pool", "snooker", "game"].includes(t.category?.toLowerCase())
      // );

      // const nonElectricTables = tables.filter(
      //   (t) =>
      //     t.plug_id === null &&
      //     ["table", "large table"].includes(t.category?.toLowerCase())
      // );


      setTablesByCategory([
        { category: "electric", tables: electricTables },
        { category: "non-electric", tables: nonElectricTables },
      ]);
    } catch (err) {
      console.error("Error fetching tables:", err);
    }
  };

  useEffect(() => {

    fetchTables();
  }, []);

  const getCategoryColor = (type) =>
    type === "playstation" ? "#007bff" : "#28a745";

  // {quickJumpInput && (api call to fetch table by ID)}

  const [quickJumpInput, setQuickJumpInput] = useState("");

  const handleJump = async () => {
    const num = parseInt(quickJumpInput, 10);
    if (isNaN(num)) return;

    try {
      // API hit karo
      const res = await axiosInstance.get(`/tables/${num}`);
      if (res.data?.success && res.data?.data?.table) {
        const table = res.data.data.table;

        // Table element ko page me dhundho
        const tableElement = document.getElementById(`table-${table.id}`);
        if (tableElement) {
          // purane highlights hatao
          document.querySelectorAll(".table-highlight").forEach((el) => {
            el.classList.remove("table-highlight", "animate-pulse");
          });

          // highlight add karo
          tableElement.classList.add("table-highlight", "animate-pulse");

          // smooth scroll
          tableElement.scrollIntoView({ behavior: "smooth", block: "center" });

          // 2 sec baad highlight hatao
          setTimeout(() => {
            tableElement.classList.remove("table-highlight", "animate-pulse");
          }, 2000);
        } else {
          alert(`Table with ID ${table.id} not found in DOM.`);
        }
      } else {
        alert("Table not found in API.");
      }
    } catch (err) {
      console.error("Error fetching table:", err);
      alert("Failed to fetch table. Please try again.");
    }
  };


  // main UI
  return (
    <div>
      {/* Quick Jump */}
      <div
        style={{
          marginBottom: "20px",
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
              flex: "1 1 300px",
            }}
          >
            <label style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
              Quick Jump to Table:
            </label>
            <input
              type="number"
              value={quickJumpInput}
              onChange={(e) => setQuickJumpInput(e.target.value)}
              placeholder="Enter table ID"
              style={{
                padding: "5px 10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                width: "150px",
                maxWidth: "100%",
              }}
            />
            <button
              onClick={handleJump}
              style={{
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                padding: "5px 15px",
                borderRadius: "4px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Jump
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              flex: "1 1 200px",
            }}
          >
            <button
              onClick={() => setTableModalOpen(true)}
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                flex: "1 1 auto",
              }}
            >
              + Add Table
            </button>
            <button
              onClick={() => setGroupModalOpen(true)}
              style={{
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                flex: "1 1 auto",
              }}
            >
              + Add Group
            </button>
          </div>
        </div>
      </div>

      {/* Category Wise Table Display */}
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          minHeight: "600px",
          marginBottom: "30px",
        }}
      >
        {tablesByCategory.map((cat) =>
          cat.tables.length ? (
            <div key={cat.category} style={{ marginBottom: "30px" }}>
              <h2
                style={{
                  background: getCategoryColor(
                    cat.category === "electric" ? "playstation" : "food"
                  ),
                  color: "#fff",
                  padding: "10px 25px",
                  borderRadius: "8px",
                  marginBottom: "13px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "left",
                  display: "inline-block",
                }}
              >
                {cat.category === "electric"
                  ? "🔌 Electric Tables"
                  : "🛋️ Non-Electric Tables"}
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {cat.tables.map(renderTableCard)}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Table Modal */}
      {tableModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0 }}>
                {editingTable ? "Edit Table" : "Add Table"}
              </h5>
              <button
                onClick={() => setTableModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: 0,
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleTableSubmit}>
              <div style={{ padding: "20px" }}>
                {/* Select Group */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Group
                  </label>
                  <select
                    name="group"
                    value={tableForm.group || ""}
                    onChange={handleTableFormChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="">-- Select Group --</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Table Name */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Table Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={tableForm.name || ""}
                    onChange={handleTableFormChange}
                    placeholder="Enter table name"
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                {/* Select Table Type */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Table Type
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {[
                      {
                        type: "snooker",
                        icon: "🎯",
                        color: "#28a745",
                      },
                      {
                        type: "pool",
                        icon: "🎱",
                        color: "#17a2b8",
                      },
                      {
                        type: "playstation",
                        icon: "🎮",
                        color: "#6f42c1",
                      },
                      {
                        type: "food",
                        icon: "🍽️",
                        color: "#fd7e14",
                      },
                      {
                        type: "largetable",
                        icon: "🪑",
                        color: "#ffc107",
                      },
                    ].map((tableType) => (
                      <div
                        key={tableType.type}
                        onClick={() => {
                          setTableForm((prev) => ({
                            ...prev,
                            type: tableType.type,
                            seats:
                              tableType.type === "largetable"
                                ? prev.seats || 8
                                : undefined,
                          }));
                        }}
                        style={{
                          border: `2px solid ${tableForm.type === tableType.type
                            ? tableType.color
                            : "#ddd"
                            }`,
                          borderRadius: "8px",
                          padding: "12px",
                          textAlign: "center",
                          cursor: "pointer",
                          backgroundColor:
                            tableForm.type === tableType.type
                              ? `${tableType.color}20`
                              : "white",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ fontSize: "30px", marginBottom: "5px" }}>
                          {tableType.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seats only for largetable */}
                {tableForm.type === "largetable" && (
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Number of Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      value={tableForm.seats || ""}
                      onChange={handleTableFormChange}
                      placeholder="Enter number of seats"
                      min="4"
                      max="20"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                )}

                {/* Smart Plug ID dropdown */}
                {tableForm.type !== "food" && tableForm.type !== "largetable" && (
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Smart Plug ID
                    </label>
                    <select
                      name="plugId"
                      value={tableForm.plugId || ""}
                      onChange={handleTableFormChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        backgroundColor: "white",
                      }}
                    >
                      <option value="">-- Select Plug --</option>
                      {plugs.map((plug) => (
                        <option key={plug.id} value={plug.plug_id}>
                          {plug.plug_id} ({plug.name})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Status */}
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </label>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={tableForm.status === "active"}
                        onChange={handleTableFormChange}
                      />
                      <span>Active</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={tableForm.status === "inactive"}
                        onChange={handleTableFormChange}
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
              <div
                style={{
                  padding: "20px",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => setTableModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {editingTable ? "Update Table" : "Add Table"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Action Popup */}
      {showTableActions && selectedTable && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "3px solid #ffc107",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            zIndex: 1000,
            minWidth: "280px",
            animation: "fadeInScale 0.2s ease-out",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: "2px solid #ffc107",
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: "#ffc107",
              color: "#333",
              borderRadius: "8px 8px 0 0",
              fontSize: "16px",
            }}
          >
            🏷️ {selectedTable.name}
            <div
              style={{
                fontSize: "12px",
                fontWeight: "normal",
                marginTop: "4px",
                color: "#666",
              }}
            >
              {selectedTable.type || "food"} • {selectedTable.status}
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            <button
              onClick={() => handleEditTable(selectedTable)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "12px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#17a2b8",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontSize: "16px" }}>✏️</span>
              Edit Table
            </button>
            <button
              onClick={() => handleDeleteTable(selectedTable.id)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "12px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#dc3545",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontSize: "16px" }}>🗑️</span>
              Delete Table
            </button>
            <button
              onClick={() => {
                setShowTableActions(false);
                setSelectedTable(null);
              }}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #6c757d",
                borderRadius: "8px",
                backgroundColor: "transparent",
                color: "#6c757d",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                transition: "all 0.2s ease",
              }}
            >
              Cancel
            </button>
          </div>
          <button
            onClick={() => {
              setShowTableActions(false);
              setSelectedTable(null);
            }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#666",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            ×
          </button>
        </div>
      )}
      {/* Backdrop */}
      {showTableActions && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
          onClick={() => {
            setShowTableActions(false);
            setSelectedTable(null);
          }}
        />
      )}

      {/* Groups Display - Graphical View */}
      {groups.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
          >
            Created Groups - Visual Overview
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
              gap: "30px",
            }}
          >
            {groups.map((group) => {
              const allTables = [...tables, ...groupTables];

              // safe check (agar selectedTables undefined ya null hai toh empty array use hoga)
              const selectedTables = allTables.filter((table) =>
                (group.selectedTables || []).includes(table.id)
              );

              return (
                <div
                  key={group.id}
                  style={{
                    border: "2px solid #ffc107",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "#fff8e1",
                    position: "relative",
                    minHeight: "300px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: "#f57f17",
                        fontWeight: "bold",
                      }}
                    >
                      {group.name}
                    </h3>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setEditingGroup(true);
                          setGroupForm({
                            id: group.id,
                            name: group.name,
                            hourlyRate: group.hourly_rate,
                            fixedRate: group.fixed_rate,
                            discount: group.discout,
                            selectedTables: group.selected_pool,
                          });
                          setGroupModalOpen(true);
                        }}
                        style={{
                          background: "#17a2b8",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        title="Edit Group"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteGroup(group.id)}
                        style={{
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        title="Delete Group"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Group Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginBottom: "20px",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#4caf50",
                        color: "white",
                        padding: "8px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ${group.hourly_rate}/hr
                    </div>
                    <div
                      style={{
                        backgroundColor: "#2196f3",
                        color: "white",
                        padding: "8px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      ${group.fixed_rate} fixed
                    </div>
                    <div
                      style={{
                        backgroundColor: "#ff9800",
                        color: "white",
                        padding: "8px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {group.selected_pool} tables
                    </div>
                    {group.discout > 0 && (
                      <div
                        style={{
                          backgroundColor: "#e91e63",
                          color: "white",
                          padding: "8px",
                          borderRadius: "6px",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {group.discout}% off
                      </div>
                    )}
                  </div>

                  {/* Visual representation of tables in group */}
                  <div
                    style={{
                      border: "1px dashed #ffc107",
                      borderRadius: "8px",
                      padding: "15px",
                      minHeight: "150px",
                      backgroundColor: "#ffffff",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#f57f17",
                        marginBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      GROUP LAYOUT
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {group.tables && group.tables.length > 0 ? (
                        group.tables.map((table, index) => {
                          const getTableIcon = (type) => {
                            switch (type) {
                              case "pool":
                                return "🎱";
                              case "snooker":
                                return "🎯";
                              case "playstation":
                                return "🎮";
                              case "largetable":
                                return "🪑";
                              default:
                                return "🍽️";
                            }
                          };

                          const getTableColor = (type) => {
                            switch (type) {
                              case "pool":
                                return "#4caf50"; // Green
                              case "snooker":
                                return "#2196f3"; // Blue
                              case "playstation":
                                return "#9c27b0"; // Purple
                              case "largetable":
                                return "#795548"; // Brown
                              default:
                                return "#ff9800"; // Orange
                            }
                          };

                          return (
                            <div
                              key={table.id || index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                margin: "5px",
                                position: "relative",
                                zIndex: 2,
                              }}
                            >
                              <div
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: table.table_type === "food" ? "50%" : "8px",
                                  backgroundColor: getTableColor(table.table_type || "food"),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "18px",
                                  border: "2px solid white",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                  position: "relative",
                                }}
                              >
                                {getTableIcon(table.table_type || "food")}

                                {table.status === "occupied" && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "-3px",
                                      right: "-3px",
                                      width: "12px",
                                      height: "12px",
                                      borderRadius: "50%",
                                      backgroundColor: "#f44336", // Red
                                      border: "2px solid white",
                                    }}
                                  ></div>
                                )}

                                {table.status === "reserved" && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      top: "-3px",
                                      right: "-3px",
                                      width: "12px",
                                      height: "12px",
                                      borderRadius: "50%",
                                      backgroundColor: "#ff9800", // Orange
                                      border: "2px solid white",
                                    }}
                                  ></div>
                                )}
                              </div>
                              <div
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "bold",
                                  color: "#666",
                                  marginTop: "4px",
                                  textAlign: "center",
                                  lineHeight: "1",
                                }}
                              >
                                {table.table_name || "Table"}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ fontSize: "12px", color: "#888" }}>No tables added</div>
                      )}
                    </div>

                    {/* Connection lines */}
                    <svg
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    >
                      {group.tables &&
                        group.tables.map((_, index) => {
                          if (index === group.tables.length - 1) return null;
                          const startX = 50 + index * 60;
                          const startY = 80;
                          const endX = 50 + (index + 1) * 60;
                          const endY = 80;

                          return (
                            <line
                              key={index}
                              x1={`${startX}px`}
                              y1={`${startY}px`}
                              x2={`${endX}px`}
                              y2={`${endY}px`}
                              stroke="#ffc107"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              opacity="0.6"
                            />
                          );
                        })}
                    </svg>
                  </div>


                  {/* Group summary stats at bottom */}
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "10px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  >
                    {/* ✅ Total Revenue Potential */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span>
                        <strong>Total Revenue Potential:</strong>
                      </span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ${(group.hourlyRate * selectedTables.length).toFixed(2)}/hr
                      </span>
                    </div>

                    {/* ✅ Fixed Revenue */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span>
                        <strong>Fixed Revenue:</strong>
                      </span>
                      <span style={{ fontWeight: "bold", color: "#2196f3" }}>
                        ${(group.fixedRate * selectedTables.length).toFixed(2)}
                      </span>
                    </div>

                    {/* ✅ Discounted Revenue (Only if discount > 0) */}
                    {Number(group.discout) > 0 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#e91e63", // Pink/Red for discount
                        }}
                      >
                        <span>
                          <strong>After Discount ({group.discount}%):</strong>
                        </span>
                        <span style={{ fontWeight: "bold", color: "#e91e63" }}>
                          $
                          {(
                            group.hourlyRate *
                            selectedTables.length *
                            (1 - Number(group.discout) / 100)
                          ).toFixed(2)}
                          /hr
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Group Management Modal */}
      {groupModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0 }}>
                {editingGroup ? "Edit Group" : "Create Group"}
              </h5>
              <button
                onClick={() => setGroupModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: 0,
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleGroupSubmit}>
              <div style={{ padding: "20px" }}>
                {/* Group Name */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={groupForm.name}
                    onChange={handleGroupFormChange}
                    placeholder="Enter group name"
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                </div>

                {/* Select Tables */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Select Tables
                  </label>
                  <div
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      maxHeight: "200px",
                      overflow: "auto",
                    }}
                  >
                    {tablesByCategory.map(
                      (cat) =>
                        cat.tables.length > 0 && (
                          <div key={cat.category} style={{ marginBottom: "10px" }}>
                            <div
                              style={{
                                backgroundColor: "#f8f9fa",
                                padding: "8px 15px",
                                fontWeight: "bold",
                                borderBottom: "1px solid #dee2e6",
                              }}
                            >
                              {cat.category === "electric"
                                ? "Electric Tables"
                                : "Non-Electric Tables"}
                            </div>
                            <div style={{ padding: "10px 15px" }}>
                              {cat.tables.map((table) => (
                                <div
                                  key={table.id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    id={`table-${table.id}`}
                                    checked={Array.isArray(groupForm.selectedTables) && groupForm.selectedTables.includes(table.id)}

                                    onChange={() => handleTableSelection(table.id)}
                                  />
                                  <label
                                    htmlFor={`table-${table.id}`}
                                    style={{ cursor: "pointer" }}
                                  >
                                    {table.table_name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>

                {/* Selected Tables */}
                {Array.isArray(groupForm.selectedTables) && groupForm.selectedTables.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Selected Tables
                    </label>
                    <div
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {groupForm.selectedTables.map((id) => {
                        // Find table by ID from allTableData or tablesByCategory
                        let table =
                          allTableData.find((t) => t.id === Number(id)) ||
                          tablesByCategory
                            .flatMap((cat) => cat.tables)
                            .find((t) => t.id === Number(id));

                        return (
                          table && (
                            <span
                              key={table.id}
                              style={{
                                backgroundColor: "#ffc107",
                                color: "black",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              {table.table_name || table.name}
                              <button
                                type="button"
                                style={{
                                  marginLeft: "4px",
                                  background: "none",
                                  border: "none",
                                  color: "#dc3545",
                                  fontWeight: "bold",
                                  fontSize: "16px",
                                  cursor: "pointer",
                                  borderRadius: "50%",
                                  padding: "0 4px",
                                  lineHeight: 1,
                                }}
                                title="Remove"
                                onClick={() => {
                                  setGroupForm((prev) => ({
                                    ...prev,
                                    selectedTables: prev.selectedTables.filter(
                                      (tid) => tid !== id
                                    ),
                                  }));
                                }}
                              >
                                ×
                              </button>
                            </span>
                          )
                        );
                      })}
                    </div>
                  </div>
                )}


                {/* Rates */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                    marginBottom: "15px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      name="hourlyRate"
                      value={groupForm.hourlyRate}
                      onChange={handleGroupFormChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      Fixed Rate ($)
                    </label>
                    <input
                      type="number"
                      name="fixedRate"
                      value={groupForm.fixedRate}
                      onChange={handleGroupFormChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>

                {/* Discount */}
                <div style={{ marginBottom: "15px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Discounted Rate (%)
                    <span style={{ color: "#6c757d", fontWeight: "normal" }}>
                      {" "}
                      Optional
                    </span>
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={groupForm.discount}
                    onChange={handleGroupFormChange}
                    placeholder="0"
                    min="0"
                    max="100"
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  padding: "20px",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  type="button"
                  onClick={() => setGroupModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "white",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "#ffc107",
                    color: "black",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  {editingGroup ? "Update Group" : "Create Group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Custom CSS */}
      <style>{`
        .table-highlight {
          box-shadow: 0 0 20px #ff6b6b !important;
          transform: scale(1.1) !important;
          transition: all 0.3s ease !important;
        }
        @keyframes pulse {0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; }}
        .animate-pulse {animation: pulse 1s infinite;}
      `}</style>
    </div>
  );
};

export default Tables;
