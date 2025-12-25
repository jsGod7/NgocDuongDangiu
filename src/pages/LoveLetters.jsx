import { useState } from "react";

export default function LoveLetters() {
  const [msg, setMsg] = useState("");

  const [letters, setLetters] = useState(() => {
    const saved = localStorage.getItem("loveLetters");
    return saved ? JSON.parse(saved) : [];
  });

  const send = () => {
    if (!msg.trim()) return;
    const updated = [...letters, msg];
    setLetters(updated);
    localStorage.setItem("loveLetters", JSON.stringify(updated));
    setMsg("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background: "linear-gradient(135deg,#ffafbd 0%,#ffc3a0 100%)",
        fontFamily: "Comic Sans MS, Segoe UI, sans-serif",
      }}
    >
      {/* responsive css */}
      <style>
        {`
          @media (max-width: 768px) {
            h2 {
              font-size: 22px !important;
            }

            .love-box {
              margin: 10px !important;
              padding: 15px !important;
            }

            textarea {
              font-size: 14px !important;
            }

            .send-btn {
              width: 100% !important;
            }
          }

          @media (min-width: 1024px) {
            h2 {
              font-size: 34px !important;
            }
          }
        `}
      </style>

      <h2
        style={{
          textAlign: "center",
          fontSize: 28,
          color: "#fff",
          textShadow: "0 3px 10px rgba(0,0,0,.25)",
          margin: 0,
        }}
      >
        💌 Thư tình gửi Ngiuu 💌
      </h2>

      <div
        className="love-box"
        style={{
          maxWidth: 700,
          margin: "20px auto",
          background: "white",
          padding: 25,
          borderRadius: 20,
          boxShadow: "0 20px 40px rgba(0,0,0,.2)",
        }}
      >
        <textarea
          placeholder="Viết những điều bạn muốn nói… 💗"
          rows={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          style={{
            width: "100%",
            borderRadius: 15,
            padding: 15,
            border: "2px solid #ff6f91",
            outline: "none",
            fontSize: 16,
            resize: "vertical",
            boxSizing: "border-box",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
          }}
        />

        <button
          onClick={send}
          className="send-btn"
          style={{
            marginTop: 15,
            padding: "12px 25px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            fontSize: 16,
            fontWeight: "bold",
            background: "linear-gradient(90deg,#ff9a9e 0%,#fad0c4 100%)",
            boxShadow: "0 10px 20px rgba(0,0,0,.2)",
            width: "fit-content",
            display: "block",
          }}
        >
          ✨ Gửi thư 💗
        </button>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 40 }}>
        {letters.map((t, i) => (
          <div
            key={i}
            style={{
              background: "white",
              marginTop: 15,
              padding: 15,
              borderRadius: 20,
              boxShadow: "0 5px 20px rgba(0,0,0,.25)",
              wordBreak: "break-word",
            }}
          >
            <p style={{ fontSize: 16, margin: 0 }}>❤️ {t}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
