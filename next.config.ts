import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
    ],
  },
  // transpilePackages: ["@uiw/react-md-editor"],
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "@uiw/react-md-editor": "@uiw/react-md-editor/dist/index.js",
  //   };
  //   return config;
  // },
};

export default nextConfig;
