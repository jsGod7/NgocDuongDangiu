import { Link } from "react-router-dom";

export default function PostsList() {
  const posts = JSON.parse(localStorage.getItem("lovePosts") || "[]");

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {

            .posts-grid {
              grid-template-columns: repeat(1, 1fr) !important;
              gap: 12px !important;
            }

            .post-card {
              padding: 14px !important;
            }

            h2 {
              font-size: 20px !important;
            }

            .post-title {
              font-size: 16px !important;
            }

            .post-desc {
              font-size: 13px !important;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .posts-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (min-width: 1025px) {
            .posts-grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
        `}
      </style>

      <h2
        style={{
          textAlign: "center",
          marginBottom: 20,
          color: "#e91e63",
        }}
      >
        📚 Danh sách bài về tình yêu của Thịnh và Dương 
      </h2>

      {posts.length === 0 && (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          Chưa có bài viết nào cả… 💔
        </p>
      )}

      <div
        className="posts-grid"
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {posts.map((p, i) => (
          <Link
            key={i}
            to={`/posts/${i}`}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className="post-card"
              style={{
                background: "white",
                padding: 18,
                borderRadius: 16,
                boxShadow: "0 10px 25px rgba(0,0,0,.1)",
                transition: ".2s",
                height: "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <h3
                className="post-title"
                style={{
                  margin: 0,
                  marginBottom: 8,
                  color: "#333",
                  wordBreak: "break-word",
                }}
              >
                ❤️ {p.title}
              </h3>

              <p
                className="post-desc"
                style={{
                  color: "#555",
                  fontSize: 14,
                  lineHeight: 1.5,
                  maxHeight: 72,
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {p.content.slice(0, 100)}
                {p.content.length > 100 ? "..." : ""}
              </p>

              <p
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  textAlign: "right",
                  color: "#9c27b0",
                }}
              >
                👉 Xem chi tiết
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
