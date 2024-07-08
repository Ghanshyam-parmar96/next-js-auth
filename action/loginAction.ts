"use server";

import { login, logout } from "@/lib";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  await login(formData);
  redirect("/");
};

export const logoutAction = async () => {
  logout();
  redirect("/");
};
