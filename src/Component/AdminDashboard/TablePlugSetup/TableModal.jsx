import React from "react";

const TableModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  groups,
  editingTable,
}) => {
  if (!isOpen) return null;

  const tableTypes = [
    {
      type: "Snooker",
      icon: "🎯",
      color: "#28a745",
      description: "Snooker Table",
    },
    {
      type: "Pool",
      icon: "🎱",
      color: "#17a2b8",
      description: "Pool Table",
    },
    {
      type: "PlayStation",
      icon: "🎮",
      color: "#6f42c1",
      description: "PlayStation",
    },
    {
      type: "Food",
      icon: "🍽️",
      color: "#fd7e14",
      description: "Dining Table",
    },
    {
      type: "Large Table",
      icon: "🪑",
      color: "#ffc107",
      description: "Group Table",
    },
  ];

  return (
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
            onClick={onClose}
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
        <form onSubmit={onSubmit}>
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
                value={formData.group || ""}
                onChange={onFormChange}
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
                  <option key={g.id} value={g.name}>
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
                value={formData.name}
                onChange={onFormChange}
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: "12px",
                }}
              >
                {tableTypes.map((tableType) => (
                  <div
                    key={tableType.type}
                    onClick={() => {
                      onFormChange({
                        target: {
                          name: "type",
                          value: tableType.type,
                        },
                      });
                    }}
                    style={{
                      border: `2px solid ${
                        formData.type === tableType.type
                          ? tableType.color
                          : "#ddd"
                      }`,
                      borderRadius: "8px",
                      padding: "12px",
                      textAlign: "center",
                      cursor: "pointer",
                      backgroundColor:
                        formData.type === tableType.type
                          ? `${tableType.color}20`
                          : "white",
                      transition: "all 0.2s",
                      position: "relative",
                    }}
                  >
                    <div style={{ fontSize: "30px", marginBottom: "5px" }}>
                      {tableType.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {formData.type === "Large Table" && (
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
                  value={formData.seats}
                  onChange={onFormChange}
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
            {formData.type !== "Food" && formData.type !== "Large Table" && (
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
                <input
                  type="text"
                  name="plugId"
                  value={formData.plugId}
                  onChange={onFormChange}
                  placeholder="Enter plug ID (e.g., PLUG_001)"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </div>
            )}
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
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={onFormChange}
                  />
                  <span>Active</span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={onFormChange}
                  />
                  <span>Inactive</span>
                </label>
              </div>
            </div>
          </div>
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
              onClick={onClose}
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
  );
};

export default TableModal;