/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
    ],
  },
};

export default nextConfig;
