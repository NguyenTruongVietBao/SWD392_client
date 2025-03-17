import App from "../App";
import { createBrowserRouter } from "react-router";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import SettingPage from "../pages/Setting";
import Profile from "../pages/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";

import PublisherDashboard from "../pages/publisher/PublisherDashboard";
import PublisherRegister from "../pages/auth/PublisherRegister";
import CampaignList from "../pages/publisher/CampaignList";

import AdvertiserDashboard from "../pages/advertiser/AdvertiserDashboard";
import CampaignDetail from "../pages/advertiser/CampaignDetail";
import AdvertiserRegister from "../pages/auth/AdvertiserRegister";
import ListCampaign from "../pages/admin/ListCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "publisher-register",
        Component: PublisherRegister,
      },
      {
        path: "advertiser-register",
        Component: AdvertiserRegister,
      },
      {
        path: "setting",
        Component: SettingPage,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "admin/",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "course",
            element: <ListCampaign />,
          },
        ],
      },
      {
        path: "advertiser/",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["ADVERTISER"]}>
                <AdvertiserDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaign/:id",
            element: (
              <ProtectedRoute
                allowedRoles={["ADVERTISER", "ADMIN", "PUBLISHER"]}
              >
                <CampaignDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "publisher",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["PUBLISHER"]}>
                <PublisherDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaigns",
            element: (
              <ProtectedRoute allowedRoles={["PUBLISHER"]}>
                <CampaignList />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
