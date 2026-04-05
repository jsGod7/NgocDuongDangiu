import { useState, useEffect } from "react";

export default function Home() {
  const [name1, setName1] = useState(() => localStorage.getItem("name1") || "");
  const [name2, setName2] = useState(() => localStorage.getItem("name2") || "");
  const [startDate, setStartDate] = useState(() => localStorage.getItem("startDate") || "");
  const [now, setNow] = useState(new Date());

  const milestones = [
    { label: "50 ngày", days: 50 },
    { label: "100 ngày", days: 100 },
    { label: "150 ngày", days: 150 },
    { label: "200 ngày", days: 200 },
    { label: "300 ngày", days: 300 },
    { label: "365 ngày (1 năm)", days: 365 },
    { label: "500 ngày", days: 500 },
    { label: "730 ngày (2 năm)", days: 730 },
    { label: "1000 ngày", days: 1000 },
    { label: "1095 ngày (3 năm)", days: 1095 },
  ];

  useEffect(() => {
    if (name1) localStorage.setItem("name1", name1);
    if (name2) localStorage.setItem("name2", name2);
    if (startDate) localStorage.setItem("startDate", startDate);
  }, [name1, name2, startDate]);

  // Realtime clock
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate duration
  let days = 0, hours = 0, minutes = 0, seconds = 0;
  if (startDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const diff = now - start;
    if (diff >= 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }

  const nextMilestone = milestones.find((m) => m.days > days);
  const prevMilestones = milestones.filter((m) => m.days <= days);
  const daysLeft = nextMilestone ? nextMilestone.days - days : null;
  const progress = nextMilestone
    ? ((days - (prevMilestones.length > 0 ? prevMilestones[prevMilestones.length - 1].days : 0)) /
        (nextMilestone.days - (prevMilestones.length > 0 ? prevMilestones[prevMilestones.length - 1].days : 0))) *
      100
    : 100;

  const getLoveMessage = () => {
    if (days < 7) return "Chào mừng đến với tình yêu! 🌸";
    if (days < 30) return "Những ngày đầu ngọt ngào nhất 🍯";
    if (days < 100) return "Tình yêu đang nảy nở đẹp đẽ 🌺";
    if (days < 365) return "Bên nhau từng ngày, hạnh phúc lắm nha 💕";
    if (days < 730) return "Một năm rồi! Tình yêu bền vững lắm 🏆";
    return "Tình yêu chúng mình trường tồn mãi mãi 💎✨";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 16,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes heartbeat {
          0%,100%{transform:scale(1)}
          25%{transform:scale(1.12)}
          50%{transform:scale(1.05)}
          75%{transform:scale(1.09)}
        }
        @keyframes shimmer {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes countUp {
          from{transform:translateY(10px);opacity:0}
          to{transform:translateY(0);opacity:1}
        }
        .heart-beat{animation:heartbeat 1.2s ease infinite}
        .shimmer-text {
          background: linear-gradient(270deg,#ff6fb0,#ff4fa3,#a855f7,#3b82f6,#ff6fb0);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 3s ease infinite;
        }
        .count-unit {
          transition: all .3s;
        }
        @media (max-width: 650px){
          .love-box{padding:14px!important}
          .love-title{font-size:22px!important}
          .love-days{font-size:52px!important}
          .love-names{font-size:18px!important}
          .input-group{flex-direction:column}
          .time-units{gap:8px!important}
          .time-box{min-width:60px!important;padding:10px 8px!important}
          .time-num{font-size:28px!important}
        }
      `}</style>
      <div
        className="love-box"
        style={{
          maxWidth: 860,
          margin: "16px auto 0",
          padding: 28,
          borderRadius: 28,
          background: "rgba(255,255,255,.85)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 25px 60px rgba(0,0,0,.15)",
        }}
      >
        {/* TITLE */}
        <h1
          className="love-title shimmer-text"
          style={{
            textAlign: "center",
            marginBottom: 6,
            fontSize: 30,
            fontWeight: 900,
          }}
        >
          💞 Đếm ngày yêu nhau 💞
        </h1>

        {/* NAMES */}
        <p
          className="love-names"
          style={{ textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#d81b60", marginBottom: 18 }}
        >
          {name1 && name2
            ? `${name1}  ❤️  ${name2}`
            : "Nhập tên hai bạn để bắt đầu 💗"}
        </p>

        {/* INPUT */}
        <div className="input-group" style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <input
            placeholder="Tên bạn / người ấy 1"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            style={{ flex: 1, padding: "11px 14px", borderRadius: 14, border: "2px solid #f48fb1", outline: "none", fontSize: 14 }}
          />
          <input
            placeholder="Tên bạn / người ấy 2"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            style={{ flex: 1, padding: "11px 14px", borderRadius: 14, border: "2px solid #f48fb1", outline: "none", fontSize: 14 }}
          />
        </div>

        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <label style={{ fontSize: 13, color: "#888", display: "block", marginBottom: 6 }}>
            📅 Ngày bắt đầu yêu nhau
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: "10px 16px", borderRadius: 14, border: "2px solid #f48fb1", outline: "none", fontSize: 14 }}
          />
        </div>

        {startDate && (
          <>
            {/* BIG DAYS COUNTER */}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                className="love-days heart-beat"
                style={{
                  fontSize: 80,
                  fontWeight: 900,
                  lineHeight: 1,
                  background: "linear-gradient(135deg,#ff4fa3,#a855f7,#3b82f6)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: 4,
                }}
              >
                {days}
              </div>
              <p style={{ fontSize: 18, color: "#888", margin: 0 }}>ngày yêu nhau 💕</p>
              <p style={{ fontSize: 13, color: "#aaa", margin: "4px 0 0" }}>
                Từ ngày {new Date(startDate + "T00:00:00").toLocaleDateString("vi-VN")}
              </p>
            </div>

            {/* REALTIME HH:MM:SS */}
            <div
              className="time-units"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                marginBottom: 24,
                flexWrap: "wrap",
              }}
            >
              {[
                { val: hours, label: "Giờ", icon: "🕐" },
                { val: minutes, label: "Phút", icon: "⏱" },
                { val: seconds, label: "Giây", icon: "⚡" },
              ].map(({ val, label, icon }) => (
                <div
                  key={label}
                  className="time-box"
                  style={{
                    background: "linear-gradient(135deg,#ff4fa3,#a855f7)",
                    borderRadius: 18,
                    padding: "14px 18px",
                    minWidth: 80,
                    textAlign: "center",
                    color: "white",
                    boxShadow: "0 8px 20px rgba(168,85,247,.3)",
                  }}
                >
                  <div
                    className="time-num count-unit"
                    style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}
                  >
                    {String(val).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>
                    {icon} {label}
                  </div>
                </div>
              ))}
            </div>

            {/* LOVE MESSAGE */}
            <div
              style={{
                textAlign: "center",
                padding: "12px 20px",
                background: "linear-gradient(135deg,rgba(255,79,163,.08),rgba(168,85,247,.08))",
                borderRadius: 16,
                marginBottom: 20,
                border: "1px solid rgba(255,79,163,.2)",
              }}
            >
              <p style={{ margin: 0, fontSize: 15, color: "#c2185b", fontStyle: "italic", fontWeight: 600 }}>
                ✨ {getLoveMessage()}
              </p>
            </div>

            {/* MILESTONE PROGRESS */}
            {nextMilestone && (
              <div
                style={{
                  background: "rgba(255,79,163,.06)",
                  borderRadius: 20,
                  padding: 18,
                  marginBottom: 16,
                  border: "1px solid rgba(255,79,163,.15)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    fontSize: 14,
                    color: "#666",
                    fontWeight: 600,
                  }}
                >
                  <span>🎯 Mốc tiếp theo: <b style={{ color: "#c2185b" }}>{nextMilestone.label}</b></span>
                  <span>⏳ Còn <b style={{ color: "#c2185b" }}>{daysLeft}</b> ngày</span>
                </div>
                <div style={{ background: "#f8bbd0", borderRadius: 99, height: 12, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(progress, 100)}%`,
                      background: "linear-gradient(90deg,#ff4fa3,#a855f7)",
                      borderRadius: 99,
                      transition: "width .5s ease",
                    }}
                  />
                </div>
                <p style={{ textAlign: "right", margin: "4px 0 0", fontSize: 12, color: "#e91e63" }}>
                  {Math.round(progress)}%
                </p>
              </div>
            )}

            {/* PAST MILESTONES */}
            {prevMilestones.length > 0 && (
              <div>
                <p style={{ fontSize: 13, color: "#888", fontWeight: "bold", marginBottom: 8 }}>
                  🏆 Mốc đã đạt được:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {prevMilestones.map((m) => (
                    <span
                      key={m.days}
                      style={{
                        background: "linear-gradient(90deg,#ff4fa3,#a855f7)",
                        color: "white",
                        borderRadius: 99,
                        padding: "5px 14px",
                        fontSize: 13,
                        fontWeight: "bold",
                      }}
                    >
                      ✓ {m.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
