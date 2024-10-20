"use server";
import { signIn, signOut } from "@/auth";

const dologout = async () => {
  await signOut({ redirectTo: "/" });
};

const doGitHubLogin = async (formData) => {
  await signIn(formData.get("action"), { redirectTo: "/home" });
};

const doCredentialsLogin = async (formData) => {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    throw error;
  }
};

export { dologout, doGitHubLogin, doCredentialsLogin };
