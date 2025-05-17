"use client";

import DiscordLogo from "@/components/ui/DiscordLogo";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("discord", { callbackUrl: "/" });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">ログイン</h1>
        <p className="text-gray-600 mb-6 text-center">
          Discordアカウントでログインしてください
        </p>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-3 transition-colors"
        >
          {isLoading ? (
            <span>処理中...</span>
          ) : (
            <>
              <DiscordLogo size={24} />
              <span>Discordでログイン</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
}
