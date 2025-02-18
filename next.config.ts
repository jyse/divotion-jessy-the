const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true // Enables API-based data fetching
  },
  async headers() {
    return [
      {
        source: "/api/products",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
