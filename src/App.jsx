import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BlogEditor from "./pages/BlogEditor";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import Album from "./pages/Album";
import SecretDiary from "./pages/SecretDiary";
import LoveLetters from "./pages/LoveLetters";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#64B5F6,#F48FB1)",
          paddingBottom: 40,
          width: "100%",
        }}
        

      >
        <nav
          style={{
            display: "flex",
            gap: 12,
            padding: 16,
            flexWrap: "wrap",
            justifyContent: "center",
            background: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(6px)",
            borderRadius: 16,
            margin: 16,
          }}
        >
          <Link to="/">🏠 Trang chủ</Link>
          <Link to="/blog">✍️ Viết blog</Link>
          <Link to="/posts">📚 Danh sách blog</Link>
          <Link to="/album">🖼️ Album ảnh</Link>
          <Link to="/diary">🔐 Nhật ký bí mật</Link>
          <Link to="/letters">💌 Gửi thư tình</Link>
          <Link to="/timeline">📅 Mốc thời gian yêu</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogEditor />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/album" element={<Album />} />
          <Route path="/diary" element={<SecretDiary />} />
          <Route path="/letters" element={<LoveLetters />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
