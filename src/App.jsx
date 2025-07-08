import { ThemeProvider } from "./components/ui/theme-provider"
import { ModeToggle } from "./components/ModeToggle"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <h1>Vite + React</h1>
      </ThemeProvider>
    </>
  )
}

export default App
