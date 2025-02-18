"use client";

import { useEffect, useState } from "react";
import { Card } from "./Card"; // ✅ Keeping the Card component named clearly

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  dimensions: string;
}

export function ProductGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(products, "WHERE ARE THE PRODUCTS? 🔥");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              dimensions={product.dimensions}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
