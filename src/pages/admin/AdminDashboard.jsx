import { Link, Navigate } from "react-router";
import useAuthStore from "../../store/useAuthStore";

export default function AdminDashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen pt-20 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-5xl text-primary font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 mt-10">
        Management:
        <Link to={"campaigns"} className="btn">
          Campaigns
        </Link>
        <Link to={"/categories"} className="btn">
          Category
        </Link>
      </div>
    </div>
  );
}
