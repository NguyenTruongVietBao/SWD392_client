import useAuthStore from "../store/useAuthStore";

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="container h-screen mx-auto px-4 pt-20 max-w-5xl">
      <div className="text-3xl font-bold">Landing Page</div>
      <div className="text-3xl font-bold">
        {user?.role === "ADVERTISER" && "Advertiser"}
        {user?.role === "PUBLISHER" && "Publisher"}
        {user?.role === "CUSTOMER" && "Customer"}
        {user?.role === "ADMIN" && "Admin"}
      </div>
    </div>
  );
}
