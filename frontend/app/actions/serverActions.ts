"use server";
import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  refreshToken: string
) {
  cookies().set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  cookies().set("session_accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });
  cookies().set("session_refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function resetAuthCookies() {
  cookies().set("session_userId", "");
  cookies().set("session_accessToken", "");
  cookies().set("session_refreshToken", "");
}

export async function getUserId() {
  const userId = cookies().get("session_userId")?.value;
  if (userId) {
    return userId;
  } else {
    return null;
  }
}

export async function getAccessToken() {
  let accessToken = cookies().get("session_accessToken")?.value;
  return accessToken;
}
