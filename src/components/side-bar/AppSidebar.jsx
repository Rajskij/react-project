import { NavSearchMovies } from "@/components/side-bar/NavSearchMovies"
import { NavUser } from "@/components/side-bar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Bob",
    email: "bob@example.com"
  }
}

export function AppSidebar() {

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavSearchMovies />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
