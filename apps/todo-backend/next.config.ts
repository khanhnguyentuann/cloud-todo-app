import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/**/*'],
  },
  transpilePackages: ['@cloud-todo/shared'],
};

export default nextConfig;
