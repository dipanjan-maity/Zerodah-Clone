import React from "react";

const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function DashboardPage() {
  return (
    <main style={{ width: "100%", height: "calc(100vh - 80px)" }}>
      <iframe
        title="Zerodha dashboard"
        src={DASHBOARD_URL}
        style={{ width: "100%", height: "100%", border: 0 }}
      />
    </main>
  );
}

export default DashboardPage;
