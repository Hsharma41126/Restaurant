import React from "react";

const TableActions = ({ table, onEdit, onDelete, onClose }) => {
  return (
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
        🏷️ {table.name}
        <div
          style={{
            fontSize: "12px",
            fontWeight: "normal",
            marginTop: "4px",
            color: "#666",
          }}
        >
          {table.type || "Food"} • {table.status}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <button
          onClick={() => onEdit(table)}
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
          onClick={() => onDelete(table.id)}
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
          onClick={onClose}
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
        onClick={onClose}
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
  );
};

export default TableActions;