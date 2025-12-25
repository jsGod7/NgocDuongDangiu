import { useState, useRef, useEffect } from "react";
import "./timeline.css";

export default function Timeline() {
  const [text, setText] = useState("");

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("loveTimeline");
    return saved ? JSON.parse(saved) : [];
  });

  const bottomRef = useRef(null);

  const add = () => {
    if (!text.trim()) return;

    const updated = [...items, text];
    setItems(updated);
    localStorage.setItem("loveTimeline", JSON.stringify(updated));
    setText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [items]);

  return (
    <div className="timeline-wrapper">
      <div className="timeline-card">
        <h2 className="title">📅 Timeline yêu nhau  của Thinh và Dương </h2>
        <p className="subtitle">Ghi lại từng khoảnh khắc đáng iuuu 💗</p>

        <div className="input-group">
          <input
            placeholder="Ví dụ: 14/2 – nắm tay nhau lần đầu 🥹"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input"
          />

          <button onClick={add} className="btn">
            ➕ Thêm
          </button>
        </div>

        <div className="timeline-container">
          <div className="line" />
          <ul className="timeline-list">
            {items.map((t, i) => (
              <li key={i} className="timeline-item">
                <span className="dot">❤️</span>

                <div className="bubble">✨ {t}</div>
              </li>
            ))}
          </ul>

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
