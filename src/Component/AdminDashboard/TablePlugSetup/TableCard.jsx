import React from "react";

const getCategoryIcon = (type) => {
  switch (type) {
    case "Pool":
      return "🎱";
    case "Snooker":
      return "🎯";
    case "PlayStation":
      return "🎮";
    case "Large Table":
      return "🪑";
    default:
      return "🍽️";
  }
};

const statusColors = {
  available: "#9E9E9E",
  occupied: "#4CAF50",
  reserved: "#FFC107",
  inactive: "#f44336",
};

const TableCard = ({ table, isSelected, onClick }) => {
  return (
    <div
      id={`table-${table.id}`}
      onClick={onClick}
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
        boxShadow: isSelected
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
        {getCategoryIcon(table.type)}
      </div>
      <div style={{ fontWeight: "bold", color: "#333", marginBottom: "3px" }}>
        {table.name}
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
};

export default TableCard;