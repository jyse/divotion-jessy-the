"use client";
import products from "@/data/products.json";
import { Card } from "./Card";

export function ProductGrid() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            dimensions={product.dimensions}
          />
        ))}
      </div>
    </div>
  );
}
