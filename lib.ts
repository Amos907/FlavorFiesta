
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

interface Error {
  message: string;
}

const BASE_URL = "http://localhost:5000";
const key = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decrypt(token) {
  const decodedToken = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });

  return decodedToken;
}

export async function getSession(): Promise<any> {
  console.log("Getting session!!");
  const token = cookies().get("jwt")?.value;
  console.log("Cookie time:", token);
  if (!token) return null;

  const decoded = await decrypt(token);
  console.log("Decoded:", decoded);
  return decoded;
}

export async function authCheck(request: NextRequest) {
  const session = request.cookies.get("jwt")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decoded = await decrypt(session);
    console.log("Decoded:", decoded);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export async function login(formData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function register(formData) {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return await res.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchSavedRecipes(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/saved-recipes`);
    return await res.json();
  } catch (err) {
    throw new Error("Unable to retrieve recipes!");
  }
}
