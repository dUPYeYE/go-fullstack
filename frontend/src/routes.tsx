import { NotFoundPage } from "@/app/notfound";
import { SettingsPage } from "@/app/settings/page";
import Layout from "./components/layout/Layout";
import { DashboardPage } from "./app/dashboard/page";

export const userRoutes = [
  {
    path: "/",
    element: <Layout><DashboardPage /></Layout>,
    errorElement: <Layout><NotFoundPage /></Layout>,
  },
  {
    path: "/settings",
    element: <Layout><SettingsPage/></Layout>,
  }
];
