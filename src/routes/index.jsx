import App from "../App";
import { createBrowserRouter } from "react-router";
import { Role } from "../constants/enums";

import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import SettingPage from "../pages/Setting";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PublisherDashboard from "../pages/publisher/PublisherDashboard";
import PublisherRegister from "../pages/auth/PublisherRegister";
import AdvertiserDashboard from "../pages/advertiser/AdvertiserDashboard";
import CampaignDetail from "../pages/advertiser/CampaignDetail";
import AdvertiserRegister from "../pages/auth/AdvertiserRegister";
import ErrorPage from "../pages/Error";
import ListCampaignAdmin from "../pages/admin/ListCampaignAdmin";
import ListCampaignPublisher from "../pages/publisher/ListCampaignPublisher";
import Payment from "../pages/publisher/Payment";
import CampaignDetailPublisher from "../pages/publisher/CampaignDetailPublisher";
const { ADMIN, PUBLISHER, ADVERTISER } = Role;

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
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
              <ProtectedRoute allowedRoles={[ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaigns",
            element: (
              <ProtectedRoute allowedRoles={[ADMIN]}>
                <ListCampaignAdmin />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "advertiser/",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER]}>
                <AdvertiserDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaign/:id",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER, ADMIN, PUBLISHER]}>
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
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <PublisherDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaigns",
            element: (
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <ListCampaignPublisher />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaigns/:id",
            element: (
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <CampaignDetailPublisher />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <Payment />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
