/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/z-social",
        destination: "/servicos/social-media",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
