import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "@/pages/main-page";
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeProvider } from "@/components/ui/theme-provider";
import { genres } from "@/lib/data.js";
import { mockResponse } from "@/lib/mockResponse.js";
import SearchForm from "@/components/SearchForm.jsx";
import SearchResults from "@/components/SearchResults.jsx";
import Favorites from "./components/Favorites";

function App() {
  const [pageName, setPageName] = useState('Page Not Found');
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const props = {
    setPageName,
    setResponse,
    setIsLoading,
    setError
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <MainPage pageName={pageName} >
            <Routes>
              <Route path="/" element={
                <>
                  <SearchForm {...props} />
                  {isLoading && (<> 
                                   <Skeleton className='h-[600px] md:h-[300px]' />
                                   <Skeleton className='h-[600px] md:h-[300px]' />
                                 </>)}
                  {error && <h1 className="text-center mt-10">{error}</h1>}
                  {response && <SearchResults response={response} genres={genres} />}
                </>
              } />
              <Route path="/favorites" element={
                <Favorites {...props} />
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
