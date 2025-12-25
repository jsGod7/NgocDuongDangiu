import { useState } from "react";

export default function SecretDiary() {
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);

  const real = "ThinhyeuDuong";

  const [savedAt, setSavedAt] = useState("");

  const [text, setText] = useState(() => {
    const saved = localStorage.getItem("secretDiary");
    return saved || "";
  });

  const saveDiary = (value) => {
    setText(value);
    localStorage.setItem("secretDiary", value);
    setSavedAt(new Date().toLocaleTimeString());
  };

  // LOGIN SCREEN
  if (!ok)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Segoe UI, sans-serif",
          padding: 16,
        }}
      >
        {/* responsive css */}
        <style>
          {`
            @media(max-width: 480px){
              .box-login {
                width: 100% !important;
                padding: 18px !important;
              }

              .box-login h2{
                font-size: 18px !important;
              }
            }
          `}
        </style>

        <div
          className="box-login"
          style={{
            background: "white",
            padding: 28,
            borderRadius: 20,
            width: 360,
            maxWidth: "100%",
            boxShadow: "0 15px 40px rgba(0,0,0,.15)",
            textAlign: "center",
          }}
        >
          <h2>🔐 Nhật ký bí mật</h2>
          <p style={{ color: "#777" }}>Nhập mật khẩu để mở trái tim 💗</p>

          <input
            type="password"
            placeholder="Mật khẩu..."
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 12,
              border: "1px solid #ddd",
              marginTop: 10,
              fontSize: 14,
            }}
          />

          <button
            onClick={() => setOk(pass === real)}
            style={{
              marginTop: 15,
              padding: "10px 22px",
              borderRadius: 30,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#ff0844,#ffb199)",
              color: "white",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            ❤️ Mở nhật ký
          </button>

          {pass && pass !== real && (
            <p style={{ color: "red", marginTop: 10 }}>Sai mật khẩu 😠</p>
          )}
        </div>
      </div>
    );

  // DIARY SCREEN
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
        padding: 16,
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <style>
        {`
          @media(max-width: 768px){
            .diary-box{
              padding: 16px !important;
            }
            .diary-box h2{
              font-size: 18px !important;
            }
            .diary-text{
              font-size: 14px !important;
              height: 260px !important;
            }
          }

          @media(max-width: 480px){
            .diary-text{
              height: 220px !important;
            }
          }
        `}
      </style>

      <div
        className="diary-box"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "white",
          padding: 24,
          borderRadius: 24,
          boxShadow: "0 20px 50px rgba(0,0,0,.15)",
        }}
      >
        <h2>📝 Nhật ký của hai ta</h2>

        <p style={{ color: "#777" }}>
          Viết bất cứ điều gì taaaa muốn… 💕 Chỉ chúng mình đọc được
        </p>

        <textarea
          className="diary-text"
          rows={12}
          value={text}
          placeholder="Hôm nay mình nhớ người ấy như thế nào nhỉ…"
          onChange={(e) => saveDiary(e.target.value)}
          style={{
            width: "100%",
            marginTop: 12,
            padding: 16,
            borderRadius: 18,
            border: "1px solid #ddd",
            outline: "none",
            resize: "none",
            lineHeight: 1.6,
            fontSize: 15,
            background: "#fffdfd",
          }}
        />

        {savedAt && (
          <p style={{ textAlign: "right", fontSize: 12, color: "#4caf50" }}>
            ✓ Đã lưu lúc {savedAt}
          </p>
        )}

        <button
          onClick={() => setOk(false)}
          style={{
            marginTop: 15,
            padding: "9px 20px",
            borderRadius: 20,
            border: "none",
            background: "#ef5350",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔒 Khoá lại
        </button>
      </div>
    </div>
  );
}
