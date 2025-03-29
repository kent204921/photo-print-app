// src/Upload.js
import { useState, useEffect } from "react";

export default function Upload() {
  const [user, setUser] = useState("");
  const [photo, setPhoto] = useState(null);

  // 获取 URL 中的 user 参数
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get("user") || "未知用户");
  }, []);

  // 当选择照片时生成本地预览 URL
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // 调用浏览器打印功能（模拟打印）
  const handlePrint = () => {
    if (!photo) {
      alert("请先选择一张照片");
      return;
    }
    window.print();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>上传并打印照片</h1>
      <p>客户：{user}</p>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />
      {photo && <img src={photo} alt="预览" style={{ maxWidth: "300px" }} />}
      <br /><br />
      <button onClick={handlePrint}>打印</button>
    </div>
  );
}
