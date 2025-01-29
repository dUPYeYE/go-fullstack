import { useUsersLazyQuery } from "@/graphql/types/graphql";
import { useAppContext } from "@/hooks/use-context";
import { useEffect } from "react";
import { DataTable } from "./components/data-table";

const columns = [
  "id",
  "name",
  "email",
  "role",
];

export function DashboardPage() {
  const { user, accessToken } = useAppContext();
  const [getUsers, { data, loading, error }] = useUsersLazyQuery();

  useEffect(() => {
    if (user?.role === "admin") {
      getUsers({
        context: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      });
    }
  }, [accessToken, user, getUsers]);

  if (user?.role !== "admin") {
    return (
      <div className="container-wrapper">
        <div className="container">
          <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Hello</h2>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="container-wrapper">
      <div className="container p-4">
        <div className="hidden min-h-svh flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Users</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of registered users.
              </p>
            </div>
          </div>
          {data?.users && !error && (
            <DataTable data={data?.users} columns={columns} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}
