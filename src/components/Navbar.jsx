import { BookHeadphones, LogIn, LogOut, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import { Role } from "../constants/enums";
const { ADMIN, PUBLISHER, ADVERTISER } = Role;
export default function Navbar() {
  const { logout, user } = useAuthStore();
  const navigation = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigation("/login");
  };

  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case ADMIN:
        return [
          { label: "Dashboard", path: "/admin" },
          { label: "Campaigns", path: "/admin/campaigns" },
          { label: "Users", path: "/admin/users" },
        ];
      case PUBLISHER:
        return [
          { label: "Home", path: "" },
          { label: "Campaigns", path: "publisher/campaigns" },
          { label: "Payment", path: "publisher/payment" },
        ];
      case ADVERTISER:
        return [
          { label: "Campaign", path: `/advertiser/campaigns/${user.id}` },
          { label: "Payment", path: `/advertiser/payment` },
          { label: "Tracking", path: `/advertiser/payment` },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg mb-20">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookHeadphones className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Affiliate Network</h1>
            </Link>

            {user && (
              <nav className="hidden md:flex items-center gap-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="text-base-content/70 hover:text-base-content transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/setting"}
              className={`btn btn-sm gap-2 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {user ? (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  className="flex gap-2 items-center text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4 cursor-pointer" />
                  <span className="hidden text-sm sm:inline cursor-pointer ">
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className={`btn btn-sm gap-2 transition-colors`}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
