import { Camera, Search } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState } from "react";

import {
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSwitcher } from "../ui/shadcn-io/theme-switcher/them-switcher";

export function NavProjects() {
  const { isMobile } = useSidebar()
  const [theme, setTheme] = useState('system');

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarHeader className="mb-5 flex-row">
          <Camera />
          <span>Film Forge</span>
      </SidebarHeader>
      <SidebarMenu>
        {/* Them Switcher component */}
        {/* <ModeToggle isMobile={isMobile} /> */}
        <ThemeSwitcher className='justify-around mb-5' />
        {/* Movie Links */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link to='/'>
              <Search />
              <span>Search Movie</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup >
  );
}
