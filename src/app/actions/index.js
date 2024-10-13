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
    const response = await signIn("credentials", {
      email: formData?.email,
      password: formData?.password,
      redirect: false,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export { dologout, doGitHubLogin, doCredentialsLogin };
