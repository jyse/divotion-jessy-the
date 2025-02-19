"use client";
import { Header } from "@/components/Header";
import { ProductGallery } from "@/components/ProductGallery";
import { WishlistPanel } from "@/components/WishlistPanel";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-8">
        <ProductGallery />
      </div>
      <WishlistPanel />
    </main>
  );
}
