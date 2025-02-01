// frontend/src/App.jsx
import React from "react";
import Header from "./components/Header";
import NavigationSidebar from "./components/NavigationSidebar";
import HeroSection from "./components/HeroSection";
import CategoryCard from "./components/CategoryCard";
import VideoPlayer from "./components/VideoPlayer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { AppProvider } from "./context/AppContext";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";
import VideoHistory from "./components/VideoHistory";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
          <Header />
          <div className="container mx-auto px-4 flex mt-4 flex-1">
            <NavigationSidebar />
            <main className="flex-1 ml-4">
              <VideoHistory />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <CategoryCard title="محصولات پیشنهادی" />
                        <CategoryCard title="پربازدید ترین ها" />
                      </div>
                      <VideoPlayer />
                    </>
                  }
                />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/search/:searchTerm" element={<SearchPage />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
