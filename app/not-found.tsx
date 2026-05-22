import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">404</p>
        <h1>找不到頁面</h1>
        <p>這條荒野小徑沒有通往餐廳。</p>
        <Link className="primary-button" href="/">
          回首頁
        </Link>
      </section>
    </main>
  );
}
