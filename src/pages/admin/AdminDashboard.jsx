import { Link } from "react-router";
import useAuthStore from "../../store/useAuthStore";

export default function AdminDashboard() {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Please login first.</div>;
  }

  return (
    <div className="h-screen pt-20 flex flex-col justify-center items-center">
      <div>
        <h1 className="text-5xl text-primary font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2 mt-10">
        Management:
        <Link to={"course"} className="btn">
          Course
        </Link>
        <Link to={"/categories"} className="btn">
          Category
        </Link>
      </div>
    </div>
  );
}
