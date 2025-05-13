"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // セッションが変更されたらログを出力
    console.log("session: ", session);
  }, [session]);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-800">
            sw2-mk System
          </Link>

          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <>
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32} // w-8 = 32px
                      height={32} // h-8 = 32px
                      className="rounded-full"
                    />
                  )}
                  <span className="text-gray-700">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                ログイン
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
