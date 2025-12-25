import { useState, useEffect } from "react";

export default function Home() {
  const [name1, setName1] = useState(() => localStorage.getItem("name1") || "");
  const [name2, setName2] = useState(() => localStorage.getItem("name2") || "");
  const [startDate, setStartDate] = useState(() => {
    return localStorage.getItem("startDate") || "";
  });

  const [days, setDays] = useState(0);

  useEffect(() => {
    if (name1) localStorage.setItem("name1", name1);
    if (name2) localStorage.setItem("name2", name2);
    if (startDate) localStorage.setItem("startDate", startDate);
  }, [name1, name2, startDate]);

  useEffect(() => {
    if (!startDate) return;

    const s = new Date(startDate);
    const now = new Date();

    const diff = Math.floor((now - s) / (1000 * 60 * 60 * 24));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(diff >= 0 ? diff : 0);
  }, [startDate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        background:
          "linear-gradient(135deg, rgba(100,181,246,.25), rgba(244,143,177,.25))",
      }}
    >
      <style>
        {`
        @media (max-width: 650px){
          .love-box{padding:14px}
          .love-title{font-size:20px}
          .love-days{font-size:36px}
          .love-names{font-size:16px}
          .input-group{flex-direction:column}
        }
        `}
      </style>

      <div
        className="love-box"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 20,
          borderRadius: 20,
          background: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          className="love-title"
          style={{
            textAlign: "center",
            marginBottom: 10,
            background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          💞 Đếm ngày yêu 💞
        </h2>

        <p
          className="love-names"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 14,
          }}
        >
          {name1 && name2
            ? `${name1}  💗  ${name2}`
            : "Nhập tên hai bạn để bắt đầu"}
        </p>

        <div
          className="input-group"
          style={{ display: "flex", gap: 10, marginBottom: 10 }}
        >
          <input
            placeholder="Tên bạn nam / nữ 1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />

          <input
            placeholder="Tên bạn nam / nữ 2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 6 }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: 10,
              borderRadius: 12,
              border: "1px solid #ccc",
            }}
          />
        </div>

        {startDate && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div
              className="love-days"
              style={{
                fontSize: 48,
                fontWeight: "bold",
                background: "linear-gradient(135deg,#ff4fa3,#64B5F6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              ❤️ {days} ngày ❤️
            </div>

            <p style={{ opacity: 0.8 }}>
              Từ ngày {new Date(startDate).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
