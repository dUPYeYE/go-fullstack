import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTheme } from "@/components/theme-provider"
import { Skeleton } from "../ui/skeleton";
import {
  LogOutIcon,
  PaletteIcon,
  ChevronsUpDownIcon,
  CheckIcon,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/hooks/use-context";
import { useNavigate } from "react-router-dom";

type UserMenuProps = {
  className?: string;
};

export function UserMenu({ className }: UserMenuProps): JSX.Element {
  const navigate = useNavigate();
  const { user, isAppInitialized, logOut } = useAppContext();
  const { theme, setTheme } = useTheme();

  const userInitial = user?.name[0].toUpperCase();

  if (!isAppInitialized) {
    return <Skeleton className="h-[48px] w-[250px]" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="none"
          className={cn(
            "relative flex h-12 flex-row items-center px-0 py-2 ring-0 focus:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-transparent md:px-2",
            className,
          )}
          data-testid="user-menu"
        >
          <Avatar>
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
          <div className="text-left min-w-36 max-w-64">
            <span
              className="block text-sm font-semibold overflow-hidden text-ellipsis"
              data-testid="user-menu-username"
            >
              {user?.name}
            </span>
            <span
              className="block text-sm font-normal opacity-80 overflow-hidden text-ellipsis"
              data-testid="user-menu-email"
            >
              {user?.email}
            </span>
          </div>
          <ChevronsUpDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" forceMount className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PaletteIcon />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
                {theme === "light" && <CheckIcon />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
                {theme === "dark" && <CheckIcon />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
                {theme === "system" && <CheckIcon />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          onClick={() => navigate("/settings")}
        >
          <Settings />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="mt-2" />

        <DropdownMenuItem onClick={logOut}>
          <LogOutIcon />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
