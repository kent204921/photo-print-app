import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { supabase } from "./supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert("注册成功，请登录！");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
      alert("登录成功！");
      setQrCode(`${window.location.origin}/upload?user=${email}`);
    }
  };

  return (
    <div>
      <h1>照片打印系统</h1>
      <input placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>注册</button>
      <button onClick={handleLogin}>登录</button>

      {qrCode && (
        <div>
          <h2>你的二维码</h2>
          <QRCodeCanvas value={qrCode} size={128} />
        </div>
      )}
    </div>
  );
}
