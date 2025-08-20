import React from "react";

const GroupModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onFormChange,
  onTableSelection,
  tablesByCategory,
  allTableData,
  editingGroup,
}) => {
  if (!isOpen) return null;

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
            {editingGroup ? "Edit Group" : "Create Group"}
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
                value={formData.name}
             
                
              />
            </div>
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
                      <div
                        key={cat.category}
                        style={{ marginBottom: "10px" }}
                      >
                        <div
                          style={{
                            backgroundColor: "#f8f9fa",
                            padding: "8px 15px",
                            fontWeight: "bold",
                            borderBottom: "1px solid #dee2e6",
                          }}
                        >
                          {cat.category === "electric"
                            ? "🔌 Electric Tables"
                            : "🛋️ Non-Electric Tables"}
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
                                checked={formData.selectedTables.includes(
                                  table.id
                                )}
                                onChange={() => onTableSelection(table.id)}
                              />
                              <label
                                htmlFor={`table-${table.id}`}
                                style={{ cursor: "pointer" }}
                              >
                                {table.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            {formData.selectedTables.length > 0 && (
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
                  {formData.selectedTables.map((id) => {
                    const table = allTableData.find((t) => t.id === id);
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
                          {table.name}
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
                              onFormChange({
                                target: {
                                  name: "selectedTables",
                                  value: formData.selectedTables.filter(
                                    (tid) => tid !== table.id
                                  ),
                                },
                              });
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
                  value={formData.hourlyRate}
                  onChange={onFormChange}
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
                  value={formData.fixedRate}
                  onChange={onFormChange}
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
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Discounted Rate (%){" "}
                <span style={{ color: "#6c757d", fontWeight: "normal" }}>
                  Optional
                </span>
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={onFormChange}
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
              {editingGroup ? "Update Group" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupModal;