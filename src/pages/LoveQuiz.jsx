import { useState } from "react";

const QUESTIONS = [
  {
    q: "Lần đầu gặp, người ấy mặc màu gì?",
    a: "Xanh dương",
    opts: ["Đỏ", "Xanh dương", "Trắng", "Đen"],
  },
  {
    q: "Món ăn yêu thích của người ấy là?",
    a: "Bún bò",
    opts: ["Phở", "Bún bò", "Cơm tấm", "Bánh mì"],
  },
  {
    q: "Ngày kỷ niệm của hai đứa là ngày mấy dương lịch?",
    a: localStorage.getItem("startDate") || "Chưa biết",
    opts: [],
    type: "text",
  },
  {
    q: "Người ấy thích nhất điều gì ở bạn?",
    a: "Tính cách",
    opts: ["Nụ cười", "Giọng nói", "Tính cách", "Mái tóc"],
  },
  {
    q: "Ca sĩ yêu thích của hai đứa?",
    a: "Sơn Tùng MTP",
    opts: ["Sơn Tùng MTP", "Đen Vâu", "Jack", "Hoàng Thùy Linh"],
  },
  {
    q: "Nơi hai đứa mình hẹn hò lần đầu?",
    a: "Trung tâm thương mại",
    opts: ["Quán cà phê", "Rạp phim", "Công viên", "Trung tâm thương mại"],
  },
  {
    q: "Màu sắc đại diện cho tình yêu của hai đứa?",
    a: "Xanh",
    opts: ["Đỏ", "Hồng", "Tím", "Xanh"],
  },
];

export default function LoveQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");

  const q = QUESTIONS[current];
  const isLast = current === QUESTIONS.length - 1;

  const choose = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === q.a) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setTextAnswer("");
    }
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setTextAnswer("");
  };

  const getResult = () => {
    if (score >= 6) return { msg: "Hai đứa hiểu nhau quá trời luôn! 🥰🎉", emoji: "🏆" };
    if (score >= 4) return { msg: "Khá hiểu nhau rồi, cần tìm hiểu thêm nha! 😊", emoji: "💕" };
    if (score >= 2) return { msg: "Còn nhiều điều chưa biết về nhau đó! 🤭", emoji: "🤗" };
    return { msg: "Dành thời gian tìm hiểu nhau nhiều hơn nhé! 💪", emoji: "🌸" };
  };

  if (finished) {
    const result = getResult();
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 28,
            padding: 36,
            maxWidth: 480,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 30px 60px rgba(0,0,0,.25)",
          }}
        >
          <div style={{ fontSize: 72, marginBottom: 8 }}>{result.emoji}</div>
          <h2
            style={{
              background: "linear-gradient(90deg,#f093fb,#f5576c)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontSize: 28,
              margin: 0,
            }}
          >
            {score}/{QUESTIONS.length} điểm!
          </h2>
          <p style={{ color: "#555", fontSize: 17, marginTop: 10 }}>{result.msg}</p>

          {/* score bar */}
          <div
            style={{
              background: "#ffe0ec",
              borderRadius: 99,
              height: 16,
              margin: "20px 0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(score / QUESTIONS.length) * 100}%`,
                background: "linear-gradient(90deg,#f093fb,#f5576c)",
                borderRadius: 99,
                transition: "width 1s ease",
              }}
            />
          </div>

          <button
            onClick={restart}
            style={{
              padding: "12px 32px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg,#f093fb,#f5576c)",
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              boxShadow: "0 8px 20px rgba(245,87,108,.4)",
            }}
          >
            🔄 Chơi lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        .opt-btn:hover:not(:disabled){transform:scale(1.03)}
        .opt-btn{transition:all .2s}
      `}</style>

      <div
        style={{
          background: "white",
          borderRadius: 28,
          padding: "28px 24px",
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 30px 60px rgba(0,0,0,.25)",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg,#f093fb,#f5576c)",
              color: "white",
              borderRadius: 99,
              padding: "4px 14px",
              fontSize: 13,
              fontWeight: "bold",
            }}
          >
            Câu {current + 1}/{QUESTIONS.length}
          </span>
          <span style={{ fontSize: 13, color: "#999" }}>
            ⭐ {score} điểm
          </span>
        </div>

        {/* progress */}
        <div
          style={{
            background: "#ffe0ec",
            borderRadius: 99,
            height: 8,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((current) / QUESTIONS.length) * 100}%`,
              background: "linear-gradient(90deg,#f093fb,#f5576c)",
              borderRadius: 99,
            }}
          />
        </div>

        <h3
          style={{
            fontSize: 19,
            color: "#333",
            lineHeight: 1.5,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          💕 {q.q}
        </h3>

        {/* options */}
        {q.type === "text" ? (
          <div style={{ textAlign: "center" }}>
            <input
              placeholder="Nhập câu trả lời..."
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 16,
                border: "2px solid #f093fb",
                outline: "none",
                fontSize: 15,
                boxSizing: "border-box",
                marginBottom: 10,
              }}
            />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {q.opts.map((opt) => {
              let bg = "rgba(248,87,166,.07)";
              let border = "2px solid rgba(248,87,166,.25)";
              let color = "#333";

              if (selected !== null) {
                if (opt === q.a) {
                  bg = "#e8f5e9";
                  border = "2px solid #4caf50";
                  color = "#2e7d32";
                } else if (opt === selected && opt !== q.a) {
                  bg = "#ffebee";
                  border = "2px solid #f44336";
                  color = "#c62828";
                }
              }

              return (
                <button
                  key={opt}
                  className="opt-btn"
                  disabled={selected !== null}
                  onClick={() => choose(opt)}
                  style={{
                    padding: "14px 12px",
                    borderRadius: 16,
                    border,
                    cursor: selected !== null ? "default" : "pointer",
                    fontSize: 14,
                    background: bg,
                    color,
                    fontWeight: selected && opt === q.a ? "bold" : "normal",
                  }}
                >
                  {opt}
                  {selected !== null && opt === q.a && " ✓"}
                  {selected !== null && opt === selected && opt !== q.a && " ✗"}
                </button>
              );
            })}
          </div>
        )}

        {/* next btn */}
        {(selected !== null || q.type === "text") && (
          <button
            onClick={next}
            style={{
              marginTop: 18,
              width: "100%",
              padding: "13px 0",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(90deg,#f093fb,#f5576c)",
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: "0 8px 20px rgba(245,87,108,.4)",
            }}
          >
            {isLast ? "🏁 Xem kết quả" : "Câu tiếp theo →"}
          </button>
        )}
      </div>
    </div>
  );
}
