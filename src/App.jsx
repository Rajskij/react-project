import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/main-page";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { genres } from "@/lib/data.js";
import { mockResponse } from "@/lib/mockResponse.js";
import SearchForm from "@/components/search-form.jsx";
import SearchResults from "@/components/search-results.jsx";

function App() {
  const [pageName, setPageName] = useState('Page Not Found');

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainPage pageName={pageName} >
            <Routes>
              <Route path="/" element={
                <>
                  <SearchForm setPageName={setPageName} />
                  <SearchResults response={mockResponse} genres={genres} />
                </>
              } />
              <Route path="*" element={
                <img src='https://t4.ftcdn.net/jpg/01/55/59/47/360_F_155594729_QxakT4UpwM7hL4lvOWjXnQVevxzhhOky.jpg'
                  alt="404 Page not found"
                />
              } />
            </Routes>
          </MainPage>
        </ThemeProvider>
      </BrowserRouter >
    </>
  )
}

export default App
