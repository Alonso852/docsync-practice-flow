
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  User, 
  Calendar, 
  Home, 
  Users, 
  LogOut, 
  Settings,
  BarChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  userRole: "Doctor" | "Assistant";
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  userRole,
  userName
}) => {
  const location = useLocation();
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-4">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 mr-2 text-docsync-blue"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M14.5 4H9.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
              <span className="font-bold text-xl">DocSync</span>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/dashboard'}>
                      <Link to="/dashboard">
                        <Home />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/appointments'}>
                      <Link to="/appointments">
                        <Calendar />
                        <span>Appointments</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/patients'}>
                      <Link to="/patients">
                        <Users />
                        <span>Patients</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Doctor-specific menu items */}
            {userRole === "Doctor" && (
              <SidebarGroup>
                <SidebarGroupLabel>Analytics</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link to="/analytics">
                          <BarChart />
                          <span>Analytics</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/profile'}>
                      <Link to="/profile">
                        <User />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={location.pathname === '/settings'}>
                      <Link to="/settings">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="px-3 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-2">
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-gray-500">{userRole}</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <SidebarTrigger />
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
