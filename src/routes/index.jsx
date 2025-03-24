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
import PublisherListCampaign from "../pages/publisher/PublisherListCampaign";
import PublisherPayment from "../pages/publisher/PublisherPayment";
import PublisherCampaignDetail from "../pages/publisher/PublisherCampaignDetail";
import ListUser from "../pages/admin/ListUser";
import AdvertiserCreateCampaign from "../pages/advertiser/AdvertiserCreateCampaign";
import CampaignEdit from "../pages/advertiser/CampaignEdit";
import AdvertiserPayment from "../pages/advertiser/AdvertiserPayment";
import AdvertiserListCampaigns from "../pages/advertiser/AdvertiserListCampaigns";
import AffiliateRedirect from "../pages/AffiliateRedirect";
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
        path: "redirect",
        Component: AffiliateRedirect,
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
          {
            path: "users",
            element: (
              <ProtectedRoute allowedRoles={[ADMIN]}>
                <ListUser />
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
            path: "campaigns",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER]}>
                <AdvertiserListCampaigns />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaign/create",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER]}>
                <AdvertiserCreateCampaign />
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
          {
            path: "campaign/edit/:id",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER, ADMIN, PUBLISHER]}>
                <CampaignEdit />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute allowedRoles={[ADVERTISER]}>
                <AdvertiserPayment />
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
                <PublisherListCampaign />
              </ProtectedRoute>
            ),
          },
          {
            path: "campaigns/:id",
            element: (
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <PublisherCampaignDetail />
              </ProtectedRoute>
            ),
          },
          {
            path: "payment",
            element: (
              <ProtectedRoute allowedRoles={[PUBLISHER]}>
                <PublisherPayment />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
