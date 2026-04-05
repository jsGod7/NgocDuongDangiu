import { useState } from "react";

export default function PromiseWall() {
  const [promises, setPromises] = useState(() => {
    const saved = localStorage.getItem("lovePromises");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [author, setAuthor] = useState("Thinh");

  const name1 = localStorage.getItem("name1") || "Thinh";
  const name2 = localStorage.getItem("name2") || "Dương";

  const colors = [
    "linear-gradient(135deg,#f5a7c7,#f9d4e2)",
    "linear-gradient(135deg,#a8edea,#fed6e3)",
    "linear-gradient(135deg,#ffecd2,#fcb69f)",
    "linear-gradient(135deg,#e0c3fc,#8ec5fc)",
    "linear-gradient(135deg,#fdfcfb,#e2d1c3)",
    "linear-gradient(135deg,#84fab0,#8fd3f4)",
    "linear-gradient(135deg,#fddb92,#d1fdff)",
  ];

  const add = () => {
    if (!input.trim()) return;
    const entry = {
      text: input.trim(),
      author,
      date: new Date().toLocaleDateString("vi-VN"),
      color: colors[Math.floor(Math.random() * colors.length)],
      kept: false,
    };
    const updated = [entry, ...promises];
    setPromises(updated);
    localStorage.setItem("lovePromises", JSON.stringify(updated));
    setInput("");
  };

  const toggleKept = (i) => {
    const updated = [...promises];
    updated[i].kept = !updated[i].kept;
    setPromises(updated);
    localStorage.setItem("lovePromises", JSON.stringify(updated));
  };

  const remove = (i) => {
    const updated = promises.filter((_, idx) => idx !== i);
    setPromises(updated);
    localStorage.setItem("lovePromises", JSON.stringify(updated));
  };

  const keptCount = promises.filter((p) => p.kept).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        .promise-card{transition:all .2s;cursor:pointer}
        .promise-card:hover{transform:rotate(0deg) scale(1.04)!important;z-index:10;box-shadow:0 16px 40px rgba(0,0,0,.3)!important}
        @keyframes popIn{0%{transform:scale(.7);opacity:0}100%{transform:scale(1);opacity:1}}
        .promise-card{animation:popIn .35s ease}
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 30,
            textShadow: "0 4px 12px rgba(0,0,0,.3)",
            marginBottom: 4,
          }}
        >
          🌹 Bức tường lời hứa
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,.8)",
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          {keptCount}/{promises.length} lời hứa đã giữ được 💜
        </p>

        {/* INPUT BOX */}
        <div
          style={{
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(14px)",
            borderRadius: 24,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setAuthor(name1)}
              style={{
                flex: 1,
                minWidth: 120,
                padding: "10px 16px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 14,
                background:
                  author === name1
                    ? "white"
                    : "rgba(255,255,255,.3)",
                color: author === name1 ? "#764ba2" : "white",
                boxShadow:
                  author === name1
                    ? "0 4px 12px rgba(0,0,0,.2)"
                    : "none",
              }}
            >
              💙 {name1} hứa
            </button>
            <button
              onClick={() => setAuthor(name2)}
              style={{
                flex: 1,
                minWidth: 120,
                padding: "10px 16px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 14,
                background:
                  author === name2
                    ? "white"
                    : "rgba(255,255,255,.3)",
                color: author === name2 ? "#764ba2" : "white",
                boxShadow:
                  author === name2
                    ? "0 4px 12px rgba(0,0,0,.2)"
                    : "none",
              }}
            >
              💗 {name2} hứa
            </button>
          </div>

          <textarea
            rows={3}
            placeholder="Viết lời hứa ở đây... Ví dụ: Em hứa sẽ không giận lâu hơn 5 phút 🥹"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: "100%",
              borderRadius: 16,
              border: "none",
              padding: "12px 14px",
              fontSize: 14,
              resize: "none",
              outline: "none",
              background: "rgba(255,255,255,.85)",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={add}
            style={{
              marginTop: 10,
              padding: "11px 28px",
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
            🌹 Thêm lời hứa
          </button>
        </div>

        {/* PROMISE CARDS - Masonry style */}
        <div
          style={{
            columns: "3 220px",
            gap: 16,
          }}
        >
          {promises.map((p, i) => (
            <div
              key={i}
              className="promise-card"
              style={{
                background: p.color,
                borderRadius: 20,
                padding: 18,
                marginBottom: 16,
                boxShadow: "0 8px 24px rgba(0,0,0,.14)",
                breakInside: "avoid",
                transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                opacity: p.kept ? 0.75 : 1,
                position: "relative",
              }}
            >
              {p.kept && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    background: "#4caf50",
                    color: "white",
                    borderRadius: 8,
                    padding: "2px 8px",
                    fontSize: 11,
                    fontWeight: "bold",
                  }}
                >
                  ✓ Giữ lời
                </div>
              )}

              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "#333",
                  textDecoration: p.kept ? "line-through" : "none",
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                "{p.text}"
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "#666",
                  fontWeight: "bold",
                }}
              >
                — {p.author} · {p.date}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 10,
                }}
              >
                <button
                  onClick={() => toggleKept(i)}
                  style={{
                    flex: 1,
                    padding: "6px 0",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: "bold",
                    background: p.kept
                      ? "rgba(76,175,80,.2)"
                      : "rgba(0,0,0,.08)",
                    color: p.kept ? "#2e7d32" : "#555",
                  }}
                >
                  {p.kept ? "↩ Chưa xong" : "✓ Đã giữ lời"}
                </button>
                <button
                  onClick={() => remove(i)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    background: "rgba(244,67,54,.12)",
                    color: "#c62828",
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {promises.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,.7)",
              marginTop: 20,
            }}
          >
            Hãy viết những lời hứa đầu tiên nhé 🌸
          </p>
        )}
      </div>
    </div>
  );
}
