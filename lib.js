"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decrypt(token) {
  const decodedToken = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });

  return decodedToken;
}

export async function getSession() {
  const token = cookies().get("jwt")?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = await decrypt(token);
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function authCheck(request) {
  const session = request.cookies.get("jwt")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decoded = await decrypt(session);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
