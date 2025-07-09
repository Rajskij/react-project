import { NavProjects } from "@/components/side-bar/nav-projects"
import { NavUser } from "@/components/side-bar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Bob",
    email: "bob@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavProjects />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
