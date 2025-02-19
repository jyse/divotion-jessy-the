import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/data/products.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0, must-revalidate"
    }
  });
}
