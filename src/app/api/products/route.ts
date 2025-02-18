import { NextResponse } from "next/server";
import products from "@/app/data/products.json";

export async function GET() {
  return NextResponse.json(products);
}
