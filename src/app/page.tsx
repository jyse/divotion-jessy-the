"use client";

import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { WishlistPanel } from "@/components/WishlistPanel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-8">
        <ProductGrid />
      </div>
      <WishlistPanel />
    </main>
  );
}
