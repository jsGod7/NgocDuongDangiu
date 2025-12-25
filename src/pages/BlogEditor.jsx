import { useState } from "react";

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("lovePosts");
    return saved ? JSON.parse(saved) : [];
  });

  const savePosts = (data) => {
    setPosts(data);
    localStorage.setItem("lovePosts", JSON.stringify(data));
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editIndex !== null) {
      const updated = [...posts];
      updated[editIndex] = { title, content };
      savePosts(updated);
      setEditIndex(null);
    } else {
      savePosts([...posts, { title, content }]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(posts[index].title);
    setContent(posts[index].content);
  };

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index);
    savePosts(updated);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        background:
          "linear-gradient(135deg, rgba(100,181,246,.25), rgba(244,143,177,.25))",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          padding: "16px",
          borderRadius: 20,
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 16,
            background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          ✍️ Blog tình yêu 💗
        </h2>

        {/* input area */}
        <div
          style={{
            padding: 12,
            borderRadius: 16,
            boxShadow: "0 10px 20px rgba(0,0,0,.08)",
            marginBottom: 20,
          }}
        >
          <input
            placeholder="🌷 Tiêu đề bài viết"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #ccc",
              marginBottom: 8,
              fontSize: 15,
            }}
          />

          <textarea
            rows={6}
            placeholder="💌 Viết điều bạn muốn nói…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: "1px solid #ccc",
              fontSize: 15,
              resize: "vertical",
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              marginTop: 10,
              padding: "10px 16px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editIndex !== null ? "💾 Lưu thay đổi" : "➕ Thêm bài viết"}
          </button>
        </div>

        <h3 style={{ fontSize: 18 }}>📚 Danh sách bài viết</h3>

        {posts.length === 0 && (
          <p
            style={{
              fontStyle: "italic",
              opacity: 0.8,
              marginTop: 4,
            }}
          >
            💫 Chưa có bài nào. Viết thử vài dòng đi bạn ơi~
          </p>
        )}

        <div
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: "1fr",
          }}
        >
          {posts.map((p, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,.95), rgba(255,255,255,.7))",
                boxShadow: "0 12px 25px rgba(0,0,0,.12)",
              }}
            >
              <h4
                style={{
                  marginBottom: 6,
                  color: "#ff4fa3",
                  wordBreak: "break-word",
                }}
              >
                💖 {p.title}
              </h4>

              <p
                style={{
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {p.content}
              </p>

              <div
                style={{
                  marginTop: 10,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() => handleEdit(i)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: "#64B5F6",
                    color: "white",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  ✏ Sửa
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: "#ff6b6b",
                    color: "white",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  🗑 Xoá
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
