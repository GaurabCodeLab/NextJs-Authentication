import { doGitHubLogin } from "@/app/actions";

const SocialLogin = () => {
  return (
    <form className="mt-2" action={doGitHubLogin}>
      <button
        type="submit"
        className="btn btn-info me-3"
        name="action"
        value="google"
      >
        Sign In With Google
      </button>
      <button
        type="submit"
        className="btn btn-dark"
        name="action"
        value="github"
      >
        Sign In With GitHub
      </button>
    </form>
  );
};

export default SocialLogin;
