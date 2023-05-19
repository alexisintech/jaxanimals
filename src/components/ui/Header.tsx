import * as React from "react";
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
} from "./DropdownMenu";
import CreateListing from "../index/CreateListing";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="text-xl font-bold text-white sm:inline-block">
              JaxAnimals
            </span>
          </Link>
        </div>
        <NavigationMenu className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <CreateListing />
            </NavigationMenuItem>
            <NavigationMenuItem>
              {theme === "dark" ? (
                <Button
                  variant="ghost"
                  className="h-10 w-10 px-0 text-white"
                  onClick={() => setTheme("light")}
                  title="Switch to light mode"
                >
                  <BsMoonStarsFill className="h-6 w-6" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="h-10 w-10 px-0 text-white hover:text-white"
                  onClick={() => setTheme("dark")}
                  title="Switch to dark mode"
                >
                  <FiSun className="h-7 w-7" />
                </Button>
              )}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="ghost"
                    className="h-10 w-10 px-0 text-white hover:text-white"
                  >
                    <BiUser className="h-7 w-7" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  sideOffset={5}
                  className="z-50 mr-8 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                >
                  <Link href="/login">
                    <DropdownMenuItem className="cursor-pointer">
                      Login
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/login">
                    <DropdownMenuItem className="cursor-pointer">
                      Sign up
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
