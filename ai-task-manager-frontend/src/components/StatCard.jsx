function StatCard({ title, value, onClick }) {
  const hexToRgba = (hex, alpha) => {
    const normalized = hex.replace("#", "");
    const value = normalized.length === 3
      ? normalized.split("").map((char) => char + char).join("")
      : normalized;
    const num = parseInt(value, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getColor = () => {
    if (title.includes("High")) return "#ef4444";
    if (title.includes("Medium")) return "#f59e0b";
    if (title.includes("Low")) return "#10b981";
    if (title.includes("Completed")) return "#3b82f6";
    return "#6366f1";
  };

  const color = getColor();

  return (
    <div
      onClick={onClick}
      style={{
        background: "rgba(248, 250, 252, 0.9)",
        padding: "22px",
        borderRadius: "12px",
        width: "100%",
        minWidth: 0,
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
        textAlign: "center",
        border: "1px solid rgba(148, 163, 184, 0.22)",
        borderTop: `4px solid ${color}`,
        cursor: "pointer",
        transition: "0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 14px 26px ${hexToRgba(color, 0.35)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 10px 24px rgba(15, 23, 42, 0.08)";
      }}
    >
      <h4 style={{ marginBottom: "12px", color: "#6b7280" }}>
        {title}
      </h4>

      <h2 style={{ color: color, margin: 0 }}>
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
