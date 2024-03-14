/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing configuration settings go here

  // Adding image URLs for the specified objects
  images: {
    domains: [
      "cdn.dummyjson.com", // Add the domain for the recipe images
    ],
  },
};

export default nextConfig;
