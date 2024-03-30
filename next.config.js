/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.spoonacular.com", "spoonacular.com", "loremflickr.com"],
  },

  env: {
    BASE_URL: process.env.BASE_URL,
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,

    APP_ID: process.env.APP_ID,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    PROJECT_ID: process.env.PROJECT_ID,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,

    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
