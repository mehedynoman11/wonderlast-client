"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserRound, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "cn";
import { CircleUserIcon, CompassIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "Destinations", href: "/destination" },
  { label: "My Bookings", href: `/my-bookings` },
  { label: "Admin", href: "#" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-brand">
      <CompassIcon className="size-6" />
      <span className="text-lg font-bold tracking-wide">Wanderlast</span>
    </Link>
  );
}

// One link, used in both the desktop bar and the mobile menu.
function NavLink({
  label,
  href,
  isActive,
  className,
  onClick,
}: {
  label: string;
  href: string;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        "text-neutral-600 hover:bg-neutral-100 hover:text-black",
        isActive && "bg-brand/10 text-brand hover:bg-brand/10 hover:text-brand",
        className,
      )}
    >
      {label}
    </Link>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  // We control open/close ourselves so tapping a link can close the menu.
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* `render` replaces the default trigger element with our Button */}
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="lg:hidden" />}
      >
        <MenuIcon className="size-5" />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-72 flex-col gap-6 p-6">
        <SheetHeader className="p-0">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              {...link}
              isActive={pathname === link.href}
              className="rounded-lg"
              onClick={close}
            />
          ))}
        </nav>

        {/* Account actions pinned to the bottom */}
        <div className="mt-auto flex flex-col gap-2 border-t pt-4">
          {user ? <>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              nativeButton={false}
              render={<Link href="#" onClick={close} />}
            >
              <CircleUserIcon className="size-4" />
              Profile
            </Button>

            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </> : <>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="#" onClick={close} />}
            >
              Sign In
            </Button>
            <Button
              className="bg-brand text-white hover:bg-brand/90"
              nativeButton={false}
              render={<Link href="#" onClick={close} />}
            >
              Sign Up
            </Button>
          </>}

        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function NavBar() {
  // The current URL decides which link is highlighted.
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Left: logo */}
        <Logo />

        {/* Center: page links (desktop only) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <NavLink {...link} isActive={pathname === link.href} />
            </li>
          ))}
        </ul>

        {/* Right: account actions (desktop only) */}
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full border px-2 py-1.5 hover:bg-muted"
                  />
                }
              >
                <Avatar className="size-9 border-2 border-primary/20">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-medium">
                  {user.name}
                </span>

                <ChevronDown className="size-4 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl p-2"
                sideOffset={10}
              >
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 py-2">
                      <Avatar className="size-11">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuItem className="cursor-pointer rounded-lg">
                    <Link href="/profile">
                      <UserRound className="mr-2 size-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-lg">
                    <Link href="/settings">
                      <Settings className="mr-2 size-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer rounded-lg text-destructive focus:text-destructive"
                  onClick={async () => {
                    await authClient.signOut();
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" className="rounded-full px-5">
                <Link href="/signin">Login</Link>
              </Button>

              <Button
                size="sm"
                className="rounded-full bg-brand px-5 text-white shadow-sm hover:bg-brand/90"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile / tablet: hamburger */}
        <MobileMenu pathname={pathname} />
      </nav>
    </header>
  );
}
