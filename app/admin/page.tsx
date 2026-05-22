import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.isAdmin) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-page">
      <section className="admin-panel">
        <p className="eyebrow">Admin</p>
        <h1>Dust & Ember 管理頁</h1>
        <p>
          已登入：{session.user?.email}
          <br />
          初版後台用於確認 Google 管理員登入已設定完成。訂位通知會直接寄到
          <strong> RESERVATION_TO_EMAIL </strong>
          指定的 Gmail。
        </p>
        <div className="admin-actions">
          <Link className="secondary-button" href="/">
            回到網站
          </Link>
          <SignOutButton />
        </div>
      </section>
    </main>
  );
}
