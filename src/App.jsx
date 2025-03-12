import { Outlet } from "react-router";
import { useThemeStore } from "./store/useThemeStore";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

// .env  ->  VITE_BASE_URL=https://swd392-project.onrender.com

function App() {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
