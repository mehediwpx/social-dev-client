"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  HandHeart,
  Home,
  LogOut,
  Settings,
  PlusCircle,
  CalendarCog,
  CalendarCheck2,
} from "lucide-react";
import { cn } from "cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

// Import your auth client instances
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/theme-toggle";

const { useSession, signOut } = authClient;

export function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // Redirect user to home page on successful logout
          router.refresh(); // Refresh state across server/client components
        },
      },
    });
  };

  return (
    <header className="relative z-20 w-full bg-white">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-6 px-6 sm:h-[88px] sm:px-10 lg:px-16">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <HandHeart
            className="size-10 text-brand sm:size-11"
            strokeWidth={2.1}
            aria-hidden="true"
          />
          <span className="leading-none">
            <span className="block text-xl font-extrabold tracking-tight text-brand-dark sm:text-[26px]">
              SocialServe
            </span>
            <span className="mt-1 block text-[10px] font-medium tracking-tight text-brand-dark/70 sm:text-[11px]">
              Together for a Better Society
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-10 lg:flex"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            <Home className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Home
          </Link>
          <Link
            href="/events"
            className="flex items-center gap-2 rounded-lg bg-brand-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
          >
            <Home className="size-4" strokeWidth={2.4} aria-hidden="true" />
            Events
          </Link>

          <Link
            href="/uc-events"
            className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            <CalendarDays
              className="size-5"
              strokeWidth={2.2}
              aria-hidden="true"
            />
            Upcoming Events
          </Link>
        </nav>

        <ThemeToggle />

        {user ? (
          <Popover>
            <PopoverTrigger className="cursor-pointer rounded-full outline-none transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand">
              <Avatar>
                <AvatarImage
                  src={user.image || "https://github.com"}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name?.slice(0, 2).toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-4" align="end" sideOffset={8}>
              <div className="flex flex-col space-y-1 pb-2">
                <p className="text-sm font-semibold text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <Separator className="my-2" />

              <div className="flex flex-col space-y-1">
                <Link
                  href="/add-event"
                  className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <PlusCircle className="size-4 text-muted-foreground" />
                  Create Event
                </Link>
                <Link
                  href="/manage-events"
                  className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <CalendarCog className="size-4 text-muted-foreground" />
                  Manage Events
                </Link>
                <Link
                  href="/joined-events"
                  className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <CalendarCheck2 className="size-4 text-muted-foreground" />
                  Joined Events
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Settings className="size-4 text-muted-foreground" />
                  Settings
                </Link>
              </div>
              <Separator className="my-2" />

              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ size: "lg" }),
                "ml-auto h-11 shrink-0 rounded-lg border-transparent bg-brand px-7 text-sm font-semibold text-white hover:bg-brand/90 lg:ml-0",
              )}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "ml-auto h-11 shrink-0 rounded-lg border-transparent bg-brand px-7 text-sm font-semibold text-white hover:bg-brand/90 lg:ml-0",
              )}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
