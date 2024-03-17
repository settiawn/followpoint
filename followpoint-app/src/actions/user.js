"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleRegister = async (input) => {
  const { name, email, password } = input;

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return redirect("/register?error=" + result.error);
  }

  return redirect("/login");
};

export const handleLogin = async (input) => {
  const { email, password } = input;

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return redirect("/login?error=" + result.error);
  }

  cookies().set("Authorization", `Bearer ${result.accessToken}`);

  return redirect("/");
};
