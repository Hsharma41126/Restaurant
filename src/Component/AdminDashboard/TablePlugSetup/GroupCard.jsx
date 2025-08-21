import React from "react";

const GroupCard = ({ group, tables, onEdit, onDelete }) => {
  const selectedTables = tables.filter((table) =>
    group.selectedTables.includes(table.id)
  );

  const getTableIcon = (type) => {
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

  const getTableColor = (type) => {
    switch (type) {
      case "Pool":
        return "#4caf50";
      case "Snooker":
        return "#2196f3";
      case "PlayStation":
        return "#9c27b0";
      case "Large Table":
        return "#795548";
      default:
        return "#ff9800";
    }
  };

  return (
    <div
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
        <h3 style={{ margin: 0, color: "#f57f17", fontWeight: "bold" }}>
          {group.name}
        </h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => onEdit(group)}
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
            onClick={() => onDelete(group.id)}
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
          💰 ${group.hourlyRate}/hr
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
          🎯 ${group.fixedRate} fixed
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
          📊 {selectedTables.length} tables
        </div>
        {group.discount > 0 && (
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
            🎁 {group.discount}% off
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
          }}
        >
          {selectedTables.map((table) => (
            <div
              key={table.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "5px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: table.type === "Food" ? "50%" : "8px",
                  backgroundColor: getTableColor(table.type || "Food"),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  border: "2px solid white",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                {getTableIcon(table.type || "Food")}
                {table.status === "occupied" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-3px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: "#f44336",
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
                      backgroundColor: "#ff9800",
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
                {table.name}
              </div>
            </div>
          ))}
        </div>
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
        {group.discount > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#e91e63",
            }}
          >
            <span>
              <strong>After Discount:</strong>
            </span>
            <span style={{ fontWeight: "bold" }}>
              $
              {(
                group.hourlyRate *
                selectedTables.length *
                (1 - group.discount / 100)
              ).toFixed(2)}
              /hr
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;