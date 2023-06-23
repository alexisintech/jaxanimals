import { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./Button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "~/components/ui/NavigationMenu";
import { BiUser } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./DropdownMenu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { cn } from "~/utils/cn";

const Header = ({ loggingIn }: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: sessionData } = useSession();
  const { push, asPath } = useRouter();
  const user = sessionData?.user;

  // fixing a hydration error for next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogin = () => push(`/login?callbackUrl=${asPath}`);

  return (
    <header className="sticky top-0 z-40 w-full items-center justify-between backdrop-blur">
      <div className="container flex h-16 items-center ">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="text-lg font-bold text-background dark:text-foreground sm:inline-block lg:text-xl xl:text-2xl">
              JaxAnimals
            </span>
          </Link>
        </div>
        <NavigationMenu className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <NavigationMenuList className="gap-1">
            {/* if /login, then do not show this component */}
            {!loggingIn && (
              <NavigationMenuItem>
                {sessionData ? (
                  <Link href="/listing/create">
                    <Button
                      variant="outline"
                      className="mr-2 border border-background text-background hover:text-background dark:border-foreground dark:text-foreground dark:hover:text-foreground"
                    >
                      Create a listing
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={handleLogin}
                    variant="outline"
                    className="h-8 border border-background px-4 py-0 text-background hover:border-background dark:border-foreground dark:text-foreground dark:hover:border-foreground md:mr-2 md:h-9 md:px-4 md:py-2"
                  >
                    Login
                  </Button>
                )}
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              {theme === "dark" ? (
                <Button
                  aria-label="Switch to light mode"
                  variant="ghost"
                  className="h-10 w-10 px-0 text-background dark:text-foreground"
                  onClick={() => setTheme("light")}
                  title="Switch to light mode"
                >
                  <BsMoonStarsFill className="h-6 w-6" />
                </Button>
              ) : (
                <Button
                  aria-label="Switch to dark mode"
                  variant="ghost"
                  className="hover:dark-foreground h-10 w-10 px-0 text-background hover:text-background dark:text-foreground"
                  onClick={() => setTheme("dark")}
                  title="Switch to dark mode"
                >
                  <FiSun className="h-7 w-7" />
                </Button>
              )}
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-md bg-transparent px-0 text-background ring-offset-transparent transition-colors hover:bg-slate-50/20 hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 dark:text-foreground"
                    )}
                    aria-label="User information rounded"
                  >
                    <BiUser className="h-7 w-7" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    sideOffset={5}
                    className="z-50 mr-10 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                  >
                    <DropdownMenuItem>My Listings</DropdownMenuItem>
                    <DropdownMenuItem>Saved Listings</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={`/user/${user.id}`}>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => void signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

interface HeaderProps {
  loggingIn: boolean;
}

export default Header;
