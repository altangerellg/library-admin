/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "http://206.189.145.130/api/:path*",
      // },
      // {
      //   source: "/public/:path*",
      //   destination: "http://206.189.145.130/public/:path*",
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
