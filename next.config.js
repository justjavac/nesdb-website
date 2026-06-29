/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: false,
  typescript: { ignoreBuildErrors: true },
}

module.exports = nextConfig
