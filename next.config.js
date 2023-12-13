/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
    externalDir: true,
  },
  output: 'standalone',
};
module.exports = removeImports({
  ...nextConfig,
  productionBrowserSourceMaps: true,
  eslint: {
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      's3.ap-northeast-2.amazonaws.com',
    ],
  },
});
