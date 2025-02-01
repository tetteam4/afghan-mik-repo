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

const products = [
  {
    id: 1,
    name: "Product 1",
    price: "1000 AFN",
    image: "https://placekitten.com/200/300",
  },
  {
    id: 2,
    name: "Product 2",
    price: "2000 AFN",
    image: "https://placekitten.com/200/301",
  },
  {
    id: 3,
    name: "Product 3",
    price: "3000 AFN",
    image: "https://placekitten.com/200/302",
  },
  {
    id: 4,
    name: "Product 4",
    price: "4000 AFN",
    image: "https://placekitten.com/200/303",
  },
  {
    id: 5,
    name: "Product 5",
    price: "5000 AFN",
    image: "https://placekitten.com/200/304",
  },
  {
    id: 6,
    name: "Product 6",
    price: "6000 AFN",
    image: "https://placekitten.com/200/305",
  },
];
function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen font-sans">
          <Header />
          <div className="container mx-auto px-4 flex mt-4">
            <NavigationSidebar />
            <main className="flex-1 ml-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <CategoryCard
                        title="Suggested products"
                        products={products}
                      />
                      <CategoryCard title="Most viewed" products={products} />
                      <VideoPlayer />
                    </>
                  }
                />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
export default App;
