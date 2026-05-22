"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button className="primary-button" type="button" onClick={() => signOut({ callbackUrl: "/" })}>
      登出
    </button>
  );
}
