import { useState } from "react";

const DEFAULT_SONGS = [
  {
    title: "Có Chắc Yêu Là Đây",
    artist: "Sơn Tùng M-TP",
    youtubeId: "ScVRS6MDrjE",
    note: "Bài hát đầu tiên mình nghe cùng nhau 🎵",
  },
  {
    title: "Thần Thoại",
    artist: "Trịnh Nam Sơn",
    youtubeId: "sYSgT_MsLF0",
    note: "Nhạc phim yêu thích của bọn mình 💕",
  },
];

export default function OurSong() {
  const [songs, setSongs] = useState(() => {
    const saved = localStorage.getItem("ourSongs");
    return saved ? JSON.parse(saved) : DEFAULT_SONGS;
  });

  const [form, setForm] = useState({ title: "", artist: "", youtubeId: "", note: "" });
  const [playing, setPlaying] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const save = (list) => {
    setSongs(list);
    localStorage.setItem("ourSongs", JSON.stringify(list));
  };

  const add = () => {
    if (!form.title || !form.youtubeId) return;
    save([...songs, { ...form }]);
    setForm({ title: "", artist: "", youtubeId: "", note: "" });
    setShowForm(false);
  };

  const remove = (i) => {
    if (playing === i) setPlaying(null);
    save(songs.filter((_, idx) => idx !== i));
  };

  const extractId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : url;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes pulse {
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.06)}
        }
        .playing-card{animation:pulse 2s infinite}
        .song-card{transition:all .25s}
        .song-card:hover{transform:translateY(-4px)}
      `}</style>

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 28,
            textShadow: "0 0 20px rgba(248,87,166,.8)",
            marginBottom: 4,
          }}
        >
          🎵 Nhạc Của Hai Đứa Mình
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,.6)",
            marginTop: 0,
            marginBottom: 24,
          }}
        >
          Những bài nhạc gắn liền với tình yêu của chúng mình 💿
        </p>

        {/* ADD BUTTON */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "12px 28px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: showForm
                ? "rgba(255,255,255,.2)"
                : "linear-gradient(90deg,#f857a6,#ff5858)",
              color: "white",
              fontWeight: "bold",
              fontSize: 15,
              boxShadow: showForm ? "none" : "0 8px 20px rgba(255,0,100,.4)",
            }}
          >
            {showForm ? "✕ Hủy" : "➕ Thêm bài hát"}
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div
            style={{
              background: "rgba(255,255,255,.08)",
              backdropFilter: "blur(14px)",
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              border: "1px solid rgba(255,255,255,.15)",
            }}
          >
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { key: "title", ph: "🎵 Tên bài hát..." },
                { key: "artist", ph: "🎤 Ca sĩ..." },
                { key: "youtubeId", ph: "🔗 YouTube URL hoặc Video ID..." },
                { key: "note", ph: "💬 Ghi chú về bài hát này..." },
              ].map(({ key, ph }) => (
                <input
                  key={key}
                  placeholder={ph}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 14,
                    border: "1px solid rgba(255,255,255,.2)",
                    background: "rgba(255,255,255,.12)",
                    color: "white",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => {
                const id = extractId(form.youtubeId);
                add({ ...form, youtubeId: id });
                add();
              }}
              style={{
                marginTop: 12,
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
              🎶 Thêm vào playlist
            </button>
          </div>
        )}

        {/* SONG LIST */}
        <div style={{ display: "grid", gap: 16 }}>
          {songs.map((song, i) => (
            <div
              key={i}
              className={`song-card ${playing === i ? "playing-card" : ""}`}
              style={{
                background:
                  playing === i
                    ? "rgba(248,87,166,.15)"
                    : "rgba(255,255,255,.06)",
                backdropFilter: "blur(14px)",
                borderRadius: 24,
                border:
                  playing === i
                    ? "1px solid rgba(248,87,166,.5)"
                    : "1px solid rgba(255,255,255,.1)",
                overflow: "hidden",
                boxShadow:
                  playing === i
                    ? "0 0 30px rgba(248,87,166,.3)"
                    : "0 4px 16px rgba(0,0,0,.3)",
              }}
            >
              {/* PLAYER */}
              {playing === i && (
                <div style={{ width: "100%", aspectRatio: "16/9" }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ border: "none", display: "block" }}
                  />
                </div>
              )}

              {/* INFO */}
              <div
                style={{
                  padding: "16px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <button
                  onClick={() => setPlaying(playing === i ? null : i)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    background:
                      playing === i
                        ? "linear-gradient(135deg,#f857a6,#ff5858)"
                        : "rgba(255,255,255,.15)",
                    color: "white",
                    fontSize: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow:
                      playing === i
                        ? "0 6px 18px rgba(248,87,166,.6)"
                        : "none",
                  }}
                >
                  {playing === i ? "⏸" : "▶"}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "bold",
                      color: "white",
                      fontSize: 16,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    🎵 {song.title}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      color: "rgba(255,255,255,.6)",
                      fontSize: 13,
                    }}
                  >
                    {song.artist}
                  </p>
                  {song.note && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "rgba(248,87,166,.9)",
                        fontSize: 13,
                        fontStyle: "italic",
                      }}
                    >
                      💬 {song.note}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => remove(i)}
                  style={{
                    background: "rgba(244,67,54,.2)",
                    border: "none",
                    borderRadius: 10,
                    color: "#ef9a9a",
                    cursor: "pointer",
                    padding: "6px 10px",
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {songs.length === 0 && (
          <p style={{ textAlign: "center", color: "rgba(255,255,255,.5)", marginTop: 30 }}>
            Chưa có bài hát nào! Hãy thêm vào nhé 🎶
          </p>
        )}
      </div>
    </div>
  );
}
