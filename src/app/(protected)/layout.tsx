import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) redirect("/auth");

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
    </SessionProvider>
  );
}
