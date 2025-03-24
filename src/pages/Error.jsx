import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="hero bg-base-200 min-min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Oops! Something went wrong.</h1>
          <p className="py-6">
            Please try again later or contact support if the problem persists.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
