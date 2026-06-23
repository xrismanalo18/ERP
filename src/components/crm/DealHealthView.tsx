"use client";

import DealHealthPanel from "./DealHealthPanel";

export default function DealHealthView() {
  return (
    <div
      style={{
        height: "calc(100vh - 48px)",
        overflowY: "auto",
        background: "#F3F4F6",
        padding: 24,
      }}
    >
      <DealHealthPanel />
    </div>
  );
}
