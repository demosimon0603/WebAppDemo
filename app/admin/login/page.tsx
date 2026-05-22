"use client";

import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">Google Admin Login</p>
        <h1>管理員登入</h1>
        <p>請使用已加入 ADMIN_EMAILS 白名單的 Google 帳號登入。</p>
        <button className="primary-button" type="button" onClick={() => signIn("google", { callbackUrl: "/admin" })}>
          使用 Google 登入
        </button>
      </section>
    </main>
  );
}
