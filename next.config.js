/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: `http://${process.env.BACKEND_URL}/api/:path*`,
      // },
      // {
      //   source: "/public/:path*",
      //   destination: `http://${process.env.BACKEND_URL}/public/:path*`,
      // },
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5050/api/:path*",
      },
      {
        source: "/public/:path*",
        destination: "http://127.0.0.1:5050/public/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
