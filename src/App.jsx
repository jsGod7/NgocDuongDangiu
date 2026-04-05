import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BlogEditor from "./pages/BlogEditor";
import PostsList from "./pages/PostsList";
import PostDetail from "./pages/PostDetail";
import Album from "./pages/Album";
import SecretDiary from "./pages/SecretDiary";
import LoveLetters from "./pages/LoveLetters";
import Timeline from "./pages/Timeline";
import LoveMood from "./pages/LoveMood";
import PromiseWall from "./pages/PromiseWall";
import WishList from "./pages/WishList";
import LoveQuiz from "./pages/LoveQuiz";
import OurSong from "./pages/OurSong";

const NAV_ITEMS = [
  { to: "/", label: "Trang chủ", icon: "🏠" },
  { to: "/mood", label: "Cảm xúc", icon: "💘" },
  { to: "/promises", label: "Lời hứa", icon: "🌹" },
  { to: "/wishlist", label: "Bucket List", icon: "🎁" },
  { to: "/quiz", label: "Quiz Tình Yêu", icon: "💕" },
  { to: "/songs", label: "Nhạc đôi ta", icon: "🎵" },
  { to: "/letters", label: "Thư tình", icon: "💌" },
  { to: "/timeline", label: "Timeline", icon: "📅" },
  { to: "/diary", label: "Nhật ký", icon: "🔐" },
  { to: "/album", label: "Album ảnh", icon: "🖼️" },
  { to: "/blog", label: "Viết blog", icon: "✍️" },
  { to: "/posts", label: "Blog", icon: "📚" },
];

function FloatingHearts() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes floatHeart {
          0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-10vh) scale(1) rotate(20deg); opacity: 0; }
        }
        .fheart {
          position: absolute;
          bottom: -20px;
          animation: floatHeart linear infinite;
          font-size: 20px;
          user-select: none;
        }
      `}</style>
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="fheart"
          style={{
            left: `${(i * 9) % 100}%`,
            animationDuration: `${6 + (i * 1.3) % 8}s`,
            animationDelay: `${(i * 0.7) % 5}s`,
            fontSize: `${14 + (i * 3) % 16}px`,
            opacity: 0.5,
          }}
        >
          {["❤️", "💕", "🌹", "💗", "✨", "💖"][i % 6]}
        </span>
      ))}
    </div>
  );
}

function Nav() {
  const location = useLocation();
  return (
    <nav
      style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        flexWrap: "wrap",
        justifyContent: "center",
        background: "rgba(255,255,255,0.28)",
        backdropFilter: "blur(14px)",
        borderRadius: 20,
        margin: "12px 12px 0",
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <style>{`
        .nav-link {
          text-decoration: none;
          padding: 7px 13px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          transition: all .2s;
          display: flex;
          align-items: center;
          gap: 5px;
          color: #555;
          background: transparent;
        }
        .nav-link:hover {
          background: rgba(248,87,166,.15);
          color: #d81b60;
          transform: translateY(-1px);
        }
        .nav-link.active {
          background: linear-gradient(90deg,#f857a6,#ff5858);
          color: white !important;
          box-shadow: 0 4px 12px rgba(248,87,166,.4);
        }
      `}</style>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`nav-link ${location.pathname === item.to ? "active" : ""}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#fbc2eb 0%,#a6c0fe 50%,#fddb92 100%)",
          width: "100%",
          position: "relative",
        }}
      >
        <FloatingHearts />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Nav />
          <div style={{ paddingBottom: 40 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogEditor />} />
              <Route path="/posts" element={<PostsList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/album" element={<Album />} />
              <Route path="/diary" element={<SecretDiary />} />
              <Route path="/letters" element={<LoveLetters />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/mood" element={<LoveMood />} />
              <Route path="/promises" element={<PromiseWall />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/quiz" element={<LoveQuiz />} />
              <Route path="/songs" element={<OurSong />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
