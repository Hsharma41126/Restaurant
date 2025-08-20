import React from "react";

const QuickJump = ({ value, onChange, onJump, onAddTable, onAddGroup }) => {
  return (
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
            value={value}
            onChange={onChange}
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
            onClick={onJump}
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
            onClick={onAddTable}
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
            onClick={onAddGroup}
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
  );
};

export default QuickJump;