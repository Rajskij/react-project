import { Folder } from "lucide-react";

import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle";

export function NavProjects() {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarHeader className="mb-5">Projects</SidebarHeader>
      <SidebarMenu>
        {/* Them Switcher component */}
        < ModeToggle isMobile={isMobile} />
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <a href='#'>
              <Folder />
              <span>Link to project</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
