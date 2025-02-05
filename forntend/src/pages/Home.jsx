import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import VideoHistory from "../components/VideoHistory";
import { useAuthStore } from "../store/authStore";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");
  const { getProducts } = useAuthStore();
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Build the query string based on the filters and sorting options
        let queryString = "";
        if (categoryFilter) {
          queryString += `category=${categoryFilter}&`;
        }
        if (brandFilter) {
          queryString += `brand=${brandFilter}&`;
        }
        if (minPrice) {
          queryString += `price_gte=${minPrice}&`;
        }
        if (maxPrice) {
          queryString += `price_lte=${maxPrice}&`;
        }
        if (sortOption) {
          queryString += `sort=${sortOption}&`;
        }
        if (search) {
          queryString += `search=${search}&`;
        }
        // Remove the trailing "&" if it exists
        if (queryString.length > 0) {
          queryString = queryString.slice(0, -1);
        }
        const fetchedProducts = await getProducts(queryString);
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [
    categoryFilter,
    brandFilter,
    getProducts,
    sortOption,
    minPrice,
    maxPrice,
    search,
  ]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrandFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="container min-h-screen mx-auto mt-6 text-center">
      {/* Filters */}
      <div className="mb-4 flex gap-2">
        <select
          className="shadow border rounded"
          value={categoryFilter}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="home">Home Goods</option>
        </select>

        <select
          className="shadow border rounded"
          value={brandFilter}
          onChange={handleBrandChange}
        >
          <option value="">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Nike">Nike</option>
        </select>
        <input
          className="shadow border rounded"
          placeholder="Search"
          onChange={handleSearch}
        />
        <input
          className="shadow border rounded"
          placeholder="Min Price"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="shadow border rounded"
          placeholder="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          className="shadow border rounded"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_asc">Rating: Low to High</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Price: {product.price}</p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-gray-600">تاریخچه ویدیوهای کاربران</p>
      <div>
        <VideoHistory />
      </div>
      <HeroSection />
    </div>
  );
};

export default Home;
