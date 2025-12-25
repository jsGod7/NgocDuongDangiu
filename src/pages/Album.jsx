import { useState } from "react";

export default function Album() {
  const REAL_PASSWORD = "ThinhYeuDuong";

  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");

  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("loveImages");
    return saved ? JSON.parse(saved) : [];
  });

  const [previewIndex, setPreviewIndex] = useState(null);

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const updated = [...images, { src: reader.result, rotate: 0 }];
        setImages(updated);
        localStorage.setItem("loveImages", JSON.stringify(updated));
      };
      reader.readAsDataURL(file);
    });
  };

  const remove = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    localStorage.setItem("loveImages", JSON.stringify(updated));
  };

  const rotate = (index) => {
    const updated = [...images];
    updated[index].rotate = (updated[index].rotate + 90) % 360;
    setImages(updated);
    localStorage.setItem("loveImages", JSON.stringify(updated));
  };

  const next = () => setPreviewIndex((i) => (i + 1) % images.length);
  const prev = () => setPreviewIndex((i) => (i - 1 + images.length) % images.length);

  // ---------------- PASSWORD UI ----------------
  if (!auth)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#ff9a9e,#fad0c4 40%,#fad0c4)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(18px)",
            background: "rgba(255,255,255,.45)",
            padding: 30,
            width: 360,
            borderRadius: 28,
            boxShadow: "0 25px 50px rgba(0,0,0,.2)",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>🔐 Secret Love Album</h2>
          <p style={{ opacity: 0.7 }}>Only for 2 of us 💗</p>

          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password..."
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 18,
              border: "1px solid #ddd",
              outline: "none",
              marginTop: 10,
            }}
          />

          <button
            onClick={() => setAuth(pass === REAL_PASSWORD)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 18,
              border: "none",
              background: "linear-gradient(135deg,#ff0844,#ffb199)",
              color: "white",
              fontWeight: "bold",
              marginTop: 10,
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(255,0,90,.35)",
            }}
          >
            ❤️ Unlock
          </button>

          {pass && pass !== REAL_PASSWORD && (
            <p style={{ color: "#e91e63" }}>Sai mật khẩu rồi bé 😡</p>
          )}
        </div>
      </div>
    );

  // ---------------- MAIN UI ----------------
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        background:
          "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        @media(max-width:600px){
          .grid{ grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:400px){
          .grid{ grid-template-columns:repeat(1,1fr); }
        }

        .card:hover img{
          transform:scale(1.08);
        }
      `}</style>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: 22,
          borderRadius: 28,
          backdropFilter: "blur(14px)",
          background: "rgba(255,255,255,.55)",
          boxShadow: "0 25px 60px rgba(0,0,0,.25)",
        }}
      >
        <h2 style={{ textAlign: "center", marginTop: 4 }}>
          💞 Kỷ niệm  💞
        </h2>

        {/* upload */}
        <label
          style={{
            marginTop: 14,
            display: "block",
            border: "2px dashed rgba(255,255,255,.9)",
            padding: 25,
            borderRadius: 22,
            textAlign: "center",
            cursor: "pointer",
            background:
              "linear-gradient(135deg, rgba(255,255,255,.4), rgba(255,255,255,.25))",
          }}
        >
          📂 Chọn hoặc kéo thả ảnh
          <input
            multiple
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* grid */}
        <div
          className="grid"
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px,1fr))",
            gap: 14,
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="card"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 22,
                boxShadow: "0 18px 40px rgba(0,0,0,.25)",
              }}
            >
              <img
                src={img.src}
                onClick={() => setPreviewIndex(i)}
                style={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  transition: ".35s",
                  transform: `rotate(${img.rotate}deg)`,
                  cursor: "pointer",
                }}
              />

              {/* top action */}
              <div
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "flex",
                  gap: 6,
                }}
              >
                <button
                  onClick={() => rotate(i)}
                  style={iconBtn}
                >
                  🔄
                </button>

                <button
                  onClick={() => remove(i)}
                  style={iconBtn}
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX */}
        {previewIndex !== null && (
          <div
            onClick={() => setPreviewIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <img
              src={images[previewIndex].src}
              style={{
                maxWidth: "88%",
                maxHeight: "85%",
                borderRadius: 24,
                boxShadow: "0 30px 80px rgba(0,0,0,.6)",
                transform: `rotate(${images[previewIndex].rotate}deg)`,
              }}
            />

            <button style={navBtnLeft} onClick={(e) => {e.stopPropagation(); prev();}}>⬅</button>
            <button style={navBtnRight} onClick={(e) => {e.stopPropagation(); next();}}>➡</button>
          </div>
        )}
      </div>
    </div>
  );
}

const iconBtn = {
  border: "none",
  background: "rgba(0,0,0,.55)",
  color: "white",
  borderRadius: 100,
  padding: "6px 9px",
  cursor: "pointer",
};

const navBtnLeft = {
  position: "absolute",
  left: 20,
  top: "50%",
  fontSize: 28,
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
};

const navBtnRight = {
  position: "absolute",
  right: 20,
  top: "50%",
  fontSize: 28,
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
};
