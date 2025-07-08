import { ThemeProvider } from "./components/ui/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import Main from "./pages/main"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Main />
      </ThemeProvider>
    </>
  )
}

export default App
