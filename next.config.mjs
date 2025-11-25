/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["122.45.170.200"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "122.45.170.200",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.suldak.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // 폰트 파일을 위한 rule 추가
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });

    return config;
  },
  reactStrictMode: false,
  // Parallel Routes와 동적 라우팅을 위한 설정
  skipTrailingSlashRedirect: true,
  // Trailing slash 처리
  trailingSlash: false,
  // 프로덕션에서 console.log 제거
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // 패키지 최적화 (트리 쉐이킹 개선)
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "react-slick"],
  },
};

export default nextConfig;
