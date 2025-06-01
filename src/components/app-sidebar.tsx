"use client";

import * as React from "react";
import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CheckCheckIcon,
  DumbbellIcon,
  HomeIcon,
  PlusIcon,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const pathname = usePathname();

  console.log(pathname);

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser
          user={{
            name: session.data?.user?.name || "",
            email: session.data?.user?.email || "",
            avatar: session.data?.user?.image || "",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1.5 text-left text-sm">
            App
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" as={"/"} className="cursor-pointer">
                  <SidebarMenuButton
                    className={
                      pathname === "/"
                        ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                        : ""
                    }
                  >
                    <HomeIcon />
                    Tableau de bord
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/register-workout-data"
                  as={"/register-workout-data"}
                  className="cursor-pointer"
                >
                  <SidebarMenuButton
                    className={
                      pathname === "/register-workout-data"
                        ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                        : ""
                    }
                  >
                    <CheckCheckIcon />
                    Enregistrer une séance
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1.5 text-left text-sm">
            Édition
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link
                  href="/exercise-schemas"
                  as={"/exercise-schemas"}
                  className="cursor-pointer"
                >
                  <SidebarMenuButton
                    className={
                      pathname === "/exercise-schemas"
                        ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                        : ""
                    }
                  >
                    <TargetIcon />
                    Schémas d'exercices
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link
                  href="/workout-schemas"
                  as={"/workout-schemas"}
                  className="cursor-pointer"
                >
                  <SidebarMenuButton
                    className={
                      pathname === "/workout-schemas"
                        ? "bg-foreground text-background hover:bg-foreground hover:text-background"
                        : ""
                    }
                  >
                    <DumbbellIcon />
                    Schémas de séances
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DatePicker />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
