import { NotFoundPage } from "@/app/notfound";
import { SettingsPage } from "@/app/settings/page";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { User } from "./graphql/types/graphql";
import Layout from "./components/layout/Layout";

export const userRoutes = (user: User) => {
  return [
    {
      path: "/",
      element:
        <Layout>
          <div className="container-wrapper">
            <div className="container p-4">
              <div className="flex min-h-svh flex-col justify-between gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                  <Card>
                    <CardHeader>{user.name}.</CardHeader>
                    <CardContent>

                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Layout>,
      errorElement: <Layout><NotFoundPage /></Layout>,
    },
    {
      path: "/settings",
      element: <Layout><SettingsPage/></Layout>,
    }
  ];
}
