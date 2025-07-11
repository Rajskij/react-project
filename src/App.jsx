import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/MainPage";
import { ThemeProvider } from "@/components/ui/theme-provider";
import SearchForm from "@/pages/SearchForm.jsx";
import Favorites from "./pages/Favorites";
import FilmDetails from "./pages/FilmDetails";
import { FavoriteContextProvider } from "./context/FavoriteContext";

function App() {
  const [pageName, setPageName] = useState('Page Not Found');

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainPage pageName={pageName} >
            <FavoriteContextProvider>
              <Routes>
                <Route path="/" element={<SearchForm setPageName={setPageName} />} />
                <Route path="/favorites" element={<Favorites setPageName={setPageName} />} />
                <Route path="/details/:id" element={<FilmDetails />} />
                <Route path="*" element={
                  <img src='https://t4.ftcdn.net/jpg/01/55/59/47/360_F_155594729_QxakT4UpwM7hL4lvOWjXnQVevxzhhOky.jpg'
                    alt="404 Page not found" />
                } />
              </Routes>
            </FavoriteContextProvider>
          </MainPage>
        </ThemeProvider>
      </BrowserRouter >
    </>
  )
}

export default App
