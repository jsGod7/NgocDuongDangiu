import { useState } from "react";

const WISHES = [
  "🌮 Đi ăn bánh tráng trộn",
  "☕ Cùng uống cà phê sáng",
  "🎬 Xem phim cùng nhau",
  "🌅 Ngắm hoàng hôn cùng nhau",
  "🎂 Làm bánh cho nhau",
  "✈️ Đi du lịch cùng nhau",
  "💐 Tặng hoa bất ngờ",
  "🎮 Cùng chơi game cả đêm",
  "📸 Chụp ảnh couple",
  "🍜 Nấu ăn cho nhau",
];

export default function WishList() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("loveWishList");
    return saved
      ? JSON.parse(saved)
      : WISHES.map((w) => ({ text: w, done: false }));
  });
  const [input, setInput] = useState("");

  const save = (list) => {
    setItems(list);
    localStorage.setItem("loveWishList", JSON.stringify(list));
  };

  const add = () => {
    if (!input.trim()) return;
    save([...items, { text: input.trim(), done: false }]);
    setInput("");
  };

  const toggle = (i) => {
    const u = [...items];
    u[i].done = !u[i].done;
    save(u);
  };

  const remove = (i) => save(items.filter((_, idx) => idx !== i));

  const doneCount = items.filter((x) => x.done).length;
  const percent = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#fddb92 0%,#d1fdff 50%,#f5a7c7 100%)",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        .wish-item{transition:all .2s}
        .wish-item:hover{transform:translateX(6px)}
        @keyframes slide{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
        .wish-item{animation:slide .3s ease}
      `}</style>

      <div style={{ maxWidth: "100%", margin: "0 auto", padding: "0 8px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 28,
            background: "linear-gradient(90deg,#f857a6,#764ba2)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textShadow: "none",
            marginBottom: 4,
          }}
        >
          🎁 Bucket List Tình Yêu
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: 0,
            marginBottom: 16,
          }}
        >
          Những điều hai đứa muốn làm cùng nhau 💑
        </p>

        {/* PROGRESS */}
        <div
          style={{
            background: "rgba(255,255,255,.7)",
            borderRadius: 20,
            padding: "14px 20px",
            marginBottom: 20,
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 24px rgba(0,0,0,.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              fontWeight: "bold",
              color: "#555",
              fontSize: 14,
            }}
          >
            <span>💪 Tiến độ yêu nhau</span>
            <span>{doneCount}/{items.length} hoàn thành</span>
          </div>
          <div
            style={{
              height: 14,
              borderRadius: 99,
              background: "#ffe0ec",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${percent}%`,
                background: "linear-gradient(90deg,#f857a6,#ff5858)",
                borderRadius: 99,
                transition: "width .5s ease",
              }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              margin: "8px 0 0",
              fontSize: 13,
              color: "#e91e63",
              fontWeight: "bold",
            }}
          >
            {percent}% ❤️
            {percent === 100 && " Hai đứa mình tuyệt vời quá! 🎉"}
          </p>
        </div>

        {/* ADD INPUT */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <input
            placeholder="Thêm điều ước mới... 💕"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 16,
              border: "2px solid rgba(248,87,166,.35)",
              outline: "none",
              fontSize: 14,
              background: "rgba(255,255,255,.8)",
            }}
          />
          <button
            onClick={add}
            style={{
              padding: "12px 20px",
              borderRadius: 16,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#f857a6,#ff5858)",
              color: "white",
              fontWeight: "bold",
              fontSize: 18,
              boxShadow: "0 6px 16px rgba(255,0,100,.3)",
            }}
          >
            ＋
          </button>
        </div>

        {/* LIST */}
        {items.map((item, i) => (
          <div
            key={i}
            className="wish-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: item.done
                ? "rgba(76,175,80,.12)"
                : "rgba(255,255,255,.75)",
              backdropFilter: "blur(8px)",
              borderRadius: 18,
              padding: "14px 16px",
              marginBottom: 10,
              boxShadow: "0 4px 16px rgba(0,0,0,.08)",
              border: item.done ? "2px solid rgba(76,175,80,.3)" : "2px solid transparent",
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                border: "2px solid",
                borderColor: item.done ? "#4caf50" : "#f857a6",
                background: item.done
                  ? "#4caf50"
                  : "transparent",
                color: "white",
                cursor: "pointer",
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.done ? "✓" : ""}
            </button>

            <span
              style={{
                flex: 1,
                fontSize: 15,
                color: item.done ? "#888" : "#333",
                textDecoration: item.done ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>

            <button
              onClick={() => remove(i)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#ccc",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <p style={{ textAlign: "center", color: "#999", marginTop: 30 }}>
            Chưa có điều ước nào! Hãy thêm vào nhé 🌸
          </p>
        )}
      </div>
    </div>
  );
}
