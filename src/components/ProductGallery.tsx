"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); // Initial products shown

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Load more products on scroll
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      setVisibleProducts((prev) => prev + 4); // Show 4 more products on scroll
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="mt-20 px-10">
      <h2 className="text-2xl font-bold text-center mb-6">Discover AI Art</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, visibleProducts).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
