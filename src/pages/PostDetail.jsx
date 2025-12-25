import { useParams, Link } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();

  const posts = JSON.parse(localStorage.getItem("lovePosts") || "[]");
  const post = posts[id];

  if (!post)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
          color: "white",
          fontSize: 20,
          textAlign: "center",
          padding: 20,
        }}
      >
        🚫 Bài viết không tồn tại
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background:
          "linear-gradient(135deg, rgba(100,181,246,.35), rgba(244,143,177,.35))",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* responsive css */}
      <style>
        {`
          @media (max-width: 768px) {
            .post-wrapper {
              padding: 18px !important;
              margin: 0 5px !important;
            }

            .post-title {
              font-size: 22px !important;
              text-align: center;
            }

            .post-content {
              font-size: 15px !important;
              line-height: 1.6 !important;
            }

            .back-btn {
              display: inline-block;
              margin-bottom: 10px;
              font-size: 14px !important;
            }
          }

          @media (min-width: 1024px) {
            .post-title {
              font-size: 32px !important;
            }
          }
        `}
      </style>

      <div
        className="post-wrapper"
        style={{
          maxWidth: 900,
          width: "100%",
          background: "white",
          borderRadius: 24,
          padding: 30,
          boxShadow: "0 25px 45px rgba(0,0,0,.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -5,
            right: 10,
            fontSize: 40,
            opacity: 0.15,
          }}
        >
          💗💙💗
        </div>

        <Link
          to="/blog"
          className="back-btn"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: "bold",
          }}
        >
          ← Quay lại danh sách blog
        </Link>

        <h1
          className="post-title"
          style={{
            marginTop: 10,
            background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            wordBreak: "break-word",
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            fontSize: 14,
            opacity: 0.7,
            marginBottom: 15,
            textAlign: "center",
          }}
        >
          ✨ Bài viết dành cho Ngiuuu ✨
        </div>

        <hr style={{ opacity: 0.2 }} />

        <p
          className="post-content"
          style={{
            whiteSpace: "pre-line",
            fontSize: 17,
            lineHeight: 1.8,
            marginTop: 15,
            wordBreak: "break-word",
          }}
        >
          {post.content}
        </p>

        <div
          style={{
            marginTop: 25,
            textAlign: "right",
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          💌 viết bằng cả trái tim đấy nhé  💕
        </div>
      </div>
    </div>
  );
}
