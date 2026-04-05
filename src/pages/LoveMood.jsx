import { useState } from "react";

const MOODS = [
  { emoji: "🥰", label: "Yêu lắm lắm" },
  { emoji: "😍", label: "Mê người ấy" },
  { emoji: "🤗", label: "Hạnh phúc" },
  { emoji: "😊", label: "Vui vẻ" },
  { emoji: "🥹", label: "Xúc động" },
  { emoji: "😘", label: "Muốn hôn" },
  { emoji: "🥺", label: "Nhớ quá" },
  { emoji: "😔", label: "Buồn tí" },
  { emoji: "😤", label: "Giận chú tí" },
  { emoji: "😴", label: "Buồn ngủ" },
];

export default function LoveMood() {
  const [moods, setMoods] = useState(() => {
    const saved = localStorage.getItem("loveMoods");
    return saved ? JSON.parse(saved) : [];
  });
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");

  const save = () => {
    if (!selected) return;
    const entry = {
      mood: selected,
      note: note.trim(),
      date: new Date().toLocaleString("vi-VN"),
    };
    const updated = [entry, ...moods];
    setMoods(updated);
    localStorage.setItem("loveMoods", JSON.stringify(updated));
    setSelected(null);
    setNote("");
  };

  const remove = (i) => {
    const updated = moods.filter((_, idx) => idx !== i);
    setMoods(updated);
    localStorage.setItem("loveMoods", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f8cdda 0%,#1d2b64 100%)",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes floatUp {
          0%{transform:translateY(0) scale(1);opacity:1}
          100%{transform:translateY(-60px) scale(1.4);opacity:0}
        }
        .mood-btn:hover{transform:scale(1.15)!important;box-shadow:0 8px 24px rgba(0,0,0,.2)!important}
        .mood-btn{transition:all .25s!important}
        .entry-card{animation:fadeIn .4s ease}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <h2
        style={{
          textAlign: "center",
          color: "white",
          fontSize: 28,
          textShadow: "0 3px 10px rgba(0,0,0,.3)",
          marginBottom: 8,
        }}
      >
        💘 Cảm xúc hôm nay của em
      </h2>
      <p style={{ textAlign: "center", color: "rgba(255,255,255,.8)", marginTop: 0 }}>
        Chọn một emoji diễn tả tâm trạng của nàng 🥰
      </p>

      {/* MOOD PICKER */}
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto 20px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 24,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 16,
          }}
        >
          {MOODS.map((m) => (
            <button
              key={m.emoji}
              className="mood-btn"
              onClick={() => setSelected(m)}
              style={{
                fontSize: 26,
                border: "none",
                borderRadius: 16,
                padding: "10px 14px",
                cursor: "pointer",
                background:
                  selected?.emoji === m.emoji
                    ? "rgba(255,255,255,.9)"
                    : "rgba(255,255,255,.35)",
                boxShadow:
                  selected?.emoji === m.emoji
                    ? "0 6px 20px rgba(0,0,0,.25)"
                    : "none",
                outline:
                  selected?.emoji === m.emoji ? "3px solid #ff6fb0" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                minWidth: 70,
              }}
            >
              <span>{m.emoji}</span>
              <span
                style={{
                  fontSize: 11,
                  color: selected?.emoji === m.emoji ? "#d81b60" : "#fff",
                  fontWeight: selected?.emoji === m.emoji ? "bold" : "normal",
                }}
              >
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "white", fontWeight: "bold", marginBottom: 8 }}>
              {selected.emoji} {selected.label}
            </p>
            <textarea
              rows={3}
              placeholder="Kể thêm cho người ấy biết nha... 💗"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 16,
                border: "none",
                padding: "12px 14px",
                fontSize: 14,
                outline: "none",
                resize: "none",
                background: "rgba(255,255,255,.85)",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={save}
              style={{
                marginTop: 10,
                padding: "10px 28px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(90deg,#f857a6,#ff5858)",
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
                boxShadow: "0 8px 20px rgba(255,0,100,.35)",
              }}
            >
              💾 Lưu cảm xúc
            </button>
          </div>
        )}
      </div>

      {/* MOOD LOG */}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {moods.length === 0 && (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,.7)" }}>
            Chưa có cảm xúc nào được ghi lại 🌸
          </p>
        )}
        {moods.map((m, i) => (
          <div
            key={i}
            className="entry-card"
            style={{
              background: "rgba(255,255,255,.18)",
              backdropFilter: "blur(10px)",
              borderRadius: 20,
              padding: 16,
              marginBottom: 12,
              color: "white",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              position: "relative",
            }}
          >
            <span style={{ fontSize: 38 }}>{m.mood.emoji}</span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontWeight: "bold",
                  margin: 0,
                  fontSize: 16,
                }}
              >
                {m.mood.label}
              </p>
              {m.note && (
                <p style={{ margin: "4px 0 0", opacity: 0.9, fontSize: 14 }}>
                  {m.note}
                </p>
              )}
              <p style={{ margin: "6px 0 0", opacity: 0.6, fontSize: 12 }}>
                🕐 {m.date}
              </p>
            </div>
            <button
              onClick={() => remove(i)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "rgba(255,255,255,.2)",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                color: "white",
                fontSize: 13,
                padding: "4px 8px",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
