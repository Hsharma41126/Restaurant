// import React, { useState, useEffect } from 'react';
// import './TableManagement.css';

// const TableManagement = ({ onJumpToOrders, onSelectTable }) => {
//   // State management
//   const [activeTab, setActiveTab] = useState('Restaurant');
//   const [quickJumpInput, setQuickJumpInput] = useState('');
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showPanel, setShowPanel] = useState(!isMobile);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const categories = ['Restaurant', 'Coffee shop', 'Terrace', 'Smoking area'];
//   const tables = [
//     { id: 1, status: 'occupied', guests: 4, order: 'Order #1234', category: 'Restaurant' },
//     { id: 2, status: 'available', guests: 0, order: null, category: 'Restaurant' },
//     { id: 3, status: 'occupied', guests: 2, order: 'Order #1235', category: 'Restaurant' },
//     { id: 4, status: 'available', guests: 0, order: null, category: 'Restaurant' },
//     { id: 5, status: 'reserved', guests: 6, order: null, category: 'Terrace' },
//     { id: 6, status: 'occupied', guests: 3, order: 'Order #1236', category: 'Terrace' },
//     { id: 7, status: 'available', guests: 0, order: null, category: 'Coffee shop' },
//     { id: 8, status: 'available', guests: 0, order: null, category: 'Coffee shop' },
//     { id: 9, status: 'occupied', guests: 2, order: 'Order #1237', category: 'Smoking area' },
//     { id: 10, status: 'available', guests: 0, order: null, category: 'Smoking area' },
//     { id: 11, status: 'available', guests: 0, order: null, category: 'Smoking area' },
//     { id: 12, status: 'occupied', guests: 5, order: 'Order #1238', category: 'Restaurant' },
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) setShowPanel(true);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleJump = () => {
//     const num = parseInt(quickJumpInput, 10);
//     if (isNaN(num)) return;
//     const tableElement = document.getElementById(`table-${num}`);
//     if (tableElement) {
//       document.querySelectorAll('.table-highlight').forEach((el) => {
//         el.classList.remove('table-highlight', 'animate-pulse');
//       });
//       tableElement.classList.add('table-highlight', 'animate-pulse');
//       tableElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       setTimeout(() => {
//         tableElement.classList.remove('table-highlight', 'animate-pulse');
//       }, 2000);
//     }
//   };

//   // Handle table selection
//   const handleTableSelect = (tableId) => {
//     // Format table ID as T1, T2, etc.
//     const formattedTableId = `T${tableId}`;
//     setSelectedTable(tableId);
//     onSelectTable(formattedTableId);
//     onJumpToOrders();
//   };

//   const renderTable = (table) => {
//     const statusColor =
//       table.status === 'occupied' ? '#4CAF50' :
//         table.status === 'reserved' ? '#FFC107' : '#9E9E9E';

//     // Restaurant → Round tables
//     const isRestaurant = activeTab === 'Restaurant';

//     return (
//       <div
//         key={table.id}
//         id={`table-${table.id}`}
//         className={`restaurant-table ${isRestaurant ? 'round-table ' : ''} table-selectable ${selectedTable === table.id ? 'selected' : ''}`}
//         style={{ borderColor: statusColor, cursor: 'pointer' }}
//         onClick={() => handleTableSelect(table.id)}
//       >
//         <div className="table-number">{table.id}</div>
//         <div className="table-chairs"></div>
//         {/* Add status indicator */}
//         <div className="table-status-indicator" style={{ backgroundColor: statusColor }}></div>
//       </div>
//     );
//   };

//   return (
//     <div className="table-management-container">
//       <div className="main-content">
//         <div className="floor-plan">
//           {/* Kitchen + Tabs */}
//           <div className="kitchen-area">
//             <div className="kitchen-equipment fw-bold text-dark">
//               KITCHEN
//               <div className="tab-container mt-2">
//                 <ul className="category-list">
//                   {categories.map((tab) => (
//                     <li
//                       key={tab}
//                       className={`category-item ${activeTab === tab ? 'active' : ''}`}
//                       onClick={() => setActiveTab(tab)}
//                     >
//                       {tab}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//             <div className="kitchen-storage fw-bold text-dark">KITCHEN STORAGE</div>
//           </div>

//           {/* Dining Area (changes with tab) */}
//           <div className="dining-area">
//             <h3 className="text-center mb-3">{activeTab}</h3>

//             {/* Regular Tables */}
//             <div className="tables-grid">
//               {tables.filter((t) => t.category === activeTab && !t.type).map(renderTable)}
//             </div>

//             {/* Bar Area */}
//             {activeTab === 'Restaurant' && (
//               <div className="bar-area">
//                 <div className="bar-counter">DRINKING ZONE</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Control Panel */}
//         {showPanel && (
//           <div className="control-panel">
//             <h2>Table Management</h2>
//             <div className="panel-content">
//               <input
//                 type="number"
//                 placeholder="Enter table number"
//                 value={quickJumpInput}
//                 onChange={(e) => setQuickJumpInput(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleJump()}
//               />
//               <div className="number-pad">
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
//                   <button
//                     key={num}
//                     onClick={() => setQuickJumpInput((prev) => prev + num.toString())}
//                   >
//                     {num}
//                   </button>
//                 ))}
//               </div>
//               <div className="action-buttons">
//                 <button
//                   className="back-btn"
//                   onClick={() => setQuickJumpInput((prev) => prev.slice(0, -1))}
//                 >
//                   ← Back
//                 </button>
//                 <button
//                   className="jump-btn"
//                   onClick={() => {
//                     handleJump();
//                     if (quickJumpInput) {
//                       handleTableSelect(quickJumpInput);
//                     }
//                   }}
//                 >
//                   Jump
//                 </button>
//               </div>
//               <div className="status-legend">
//                 <h3>Table Status</h3>
//                 <div className="legend-item">
//                   <div className="status-indicator occupied"></div>
//                   <span>Occupied</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="status-indicator available"></div>
//                   <span>Available</span>
//                 </div>
//                 <div className="legend-item">
//                   <div className="status-indicator reserved"></div>
//                   <span>Reserved</span>
//                 </div>
//               </div>
//             </div>
//             {isMobile && (
//               <button className="close-panel-btn" onClick={() => setShowPanel(false)}>
//                 Close Panel
//               </button>
//             )}
//           </div>
//         )}
//         {!showPanel && isMobile && (
//           <button className="show-panel-btn" onClick={() => setShowPanel(true)}>
//             Show Panel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TableManagement;
import React, { useState, useEffect } from 'react';
import './TableManagement.css';
import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';

const TableManagement = ({ onJumpToOrders, onSelectTable }) => {
  // State management
  const [activeTab, setActiveTab] = useState('Electric');
  const [quickJumpInput, setQuickJumpInput] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showPanel, setShowPanel] = useState(!isMobile);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('snooker');
  const [searchTerm, setSearchTerm] = useState('');

  // Table categories
  const electricCategories = [
    { id: 'snooker', name: 'Snooker' },
    { id: 'pool', name: 'Pool' },
    { id: 'playstation', name: 'PlayStation' }
  ];

  const nonElectricCategories = [
    { id: 'dining', name: 'Dining' },
    { id: 'largetable', name: 'Large Table' }
  ];

  // Fetch tables from API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/tables?status=available`);
        setTables(response.data.data.tables);
      } catch (err) {
        setError('Failed to fetch tables');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setShowPanel(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleJump = () => {
    const table = tables.find(t => t.table_number === quickJumpInput);
    if (table) {
      const tableElement = document.getElementById(`table-${table.id}`);
      if (tableElement) {
        document.querySelectorAll('.table-highlight').forEach((el) => {
          el.classList.remove('table-highlight', 'animate-pulse');
        });
        tableElement.classList.add('table-highlight', 'animate-pulse');
        tableElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          tableElement.classList.remove('table-highlight', 'animate-pulse');
        }, 2000);
      }
    }
  };

  // Handle table selection
  // In TableManagement.js, modify the handleTableSelect function:

  const handleTableSelect = (tableId) => {
    const table = tables.find(t => t.id === tableId);
    if (table) {
      setSelectedTable(tableId);
      // Pass the entire table object instead of just the table number
      onSelectTable(table); // Changed from table.table_number to table
      onJumpToOrders();
    }
  };

  // Get tables by category and search term
  const getFilteredTables = () => {
    let filteredTables = tables.filter(table => table.table_type == selectedCategory);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredTables = filteredTables.filter(table =>
        table.table_name.toLowerCase().includes(term) ||
        table.table_number.toLowerCase().includes(term) ||
        table.id.toString().includes(term)
      );
    }

    return filteredTables;
  };

  // Render table based on category
  const renderTable = (table) => {
    const statusColor =
      table.status === 'occupied' ? '#4CAF50' :
        table.status === 'reserved' ? '#FFC107' : '#9E9E9E';

    // Different styling based on table type
    const isElectric = electricCategories.some(cat => cat.id === table.table_type);

    return (
      <div
        key={table.id}
        id={`table-${table.id}`}
        className={`table-selectable ${selectedTable === table.id ? 'selected' : ''} ${isElectric ? 'electric-table' : 'non-electric-table'}`}
        style={{ borderColor: statusColor, cursor: 'pointer' }}
        onClick={() => handleTableSelect(table.id)}
      >
        <div className="table-number">{table.table_number}</div>
        <div className="table-name">{table.table_name}</div>
        <div className="table-status-indicator" style={{ backgroundColor: statusColor }}></div>
        {table.hourly_rate && (
          <div className="table-rate">${table.hourly_rate}/hr</div>
        )}
        {table.capacity && (
          <div className="table-capacity">Capacity: {table.capacity}</div>
        )}
      </div>
    );
  };

  // Render category section
  const renderCategorySection = (categories, title) => (
    <div className="category-section">
      <h3 className="category-title">{title}</h3>
      <div className="categories-container">
        {categories.map(category => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="category-icon">
              {category.id === 'snooker' && '🎱'}
              {category.id === 'pool' && '🎱'}
              {category.id === 'playstation' && '🎮'}
              {category.id === 'dining' && '🍽️'}
              {category.id === 'largetable' && '🪑'}
            </div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading tables...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="table-management-container">
      <div className="main-content">
        {/* Left Panel - Categories */}
        <div className="categories-panel">
          {renderCategorySection(electricCategories, 'Electric')}
          {renderCategorySection(nonElectricCategories, 'Non-Electric')}
        </div>

        {/* Right Panel - Tables */}
        <div className="tables-panel">
          <div className="tables-header">
            <h2>
              {electricCategories.find(c => c.id === selectedCategory)?.name ||
                nonElectricCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="table-count">
              {getFilteredTables().length} tables
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by name, number, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="tables-grid">
            {getFilteredTables().length > 0 ? (
              getFilteredTables().map(renderTable)
            ) : (
              <div className="no-tables-message">
                {searchTerm ? "No tables match your search" : "No tables available in this category"}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Control Panel */}
      {showPanel && (
        <div className="control-panel">
          <h2>Table Management</h2>
          <div className="panel-content">
            <input
              type="text"
              placeholder="Enter table number"
              value={quickJumpInput}
              onChange={(e) => setQuickJumpInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJump()}
            />
            <div className="action-buttons">
              <button
                className="jump-btn"
                onClick={() => {
                  handleJump();
                  if (quickJumpInput) {
                    const table = tables.find(t => t.table_number === quickJumpInput);
                    if (table) {
                      handleTableSelect(table.id);
                    }
                  }
                }}
              >
                Jump to Table
              </button>
            </div>
            <div className="status-legend">
              <h3>Table Status</h3>
              <div className="legend-item">
                <div className="status-indicator occupied"></div>
                <span>Occupied</span>
              </div>
              <div className="legend-item">
                <div className="status-indicator available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="status-indicator reserved"></div>
                <span>Reserved</span>
              </div>
            </div>
          </div>
          {isMobile && (
            <button className="close-panel-btn" onClick={() => setShowPanel(false)}>
              Close Panel
            </button>
          )}
        </div>
      )}
      {!showPanel && isMobile && (
        <button className="show-panel-btn" onClick={() => setShowPanel(true)}>
          Show Panel
        </button>
      )}
    </div>
  );
};

export default TableManagement;