import { Camera, Heart, Search } from "lucide-react";
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
import { ModeToggle } from "@/components/ModeToggle";
import { ThemeSwitcher } from "../ui/shadcn-io/theme-switcher/them-switcher";

export function NavSearchMovies() {
  const { isMobile } = useSidebar()
  const [theme, setTheme] = useState('system');

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <Link to='/'>
        <SidebarHeader className="mb-7 flex-row">
          <Camera />
          <span>Film Forge</span>
        </SidebarHeader>
      </Link>
      <SidebarMenu>
        {/* Them Switcher component */}
        {/* <ModeToggle isMobile={isMobile} /> */}
        <ThemeSwitcher className='justify-around mb-3' />
        {/* Movie Links */}
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="mb-3">
            <Link to='/'>
              <Search />
              <span>Search Movie</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild className="mb-3">
            <Link to='/favorites'>
              <Heart />
              <span>Favorite Movie</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup >
  );
}
