import { Outlet } from "react-router";
import { useThemeStore } from "./store/useThemeStore";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
