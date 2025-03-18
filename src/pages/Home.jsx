import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router";
import { Role } from "../constants/enums";

const { ADMIN, PUBLISHER, ADVERTISER } = Role;

export default function Home() {
  const { user } = useAuthStore();

  if (user?.role === ADVERTISER) {
    return <Navigate to="/advertiser" />;
  } else if (user?.role === PUBLISHER) {
    return <Navigate to="/publisher" />;
  } else if (user?.role === ADMIN) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="container min-h-screen mx-auto px-4 pt-20 max-w-5xl">
      <div className="text-3xl font-bold">Landing Page</div>
      <div className="text-3xl font-bold">
        {user?.role === "ADVERTISER" && "Advertiser"}
        {user?.role === "PUBLISHER" && "Publisher"}
        {user?.role === "ADMIN" && "Admin"}
      </div>
    </div>
  );
}
