"use server";
import { signIn, signOut } from "@/auth";

const dologout = async () => {
  await signOut({ redirectTo: "/" });
};

const doGitHubLogin = async (formData) => {
  await signIn(formData.get("action"), { redirectTo: "/home" });
};

const doCredentialsLogin = async (formData) => {
  await signIn("credentials", formData);
};

export { dologout, doGitHubLogin, doCredentialsLogin };
