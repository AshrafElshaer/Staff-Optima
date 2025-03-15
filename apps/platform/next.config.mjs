/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@optima/ui"],
	experimental: {
		useCache: true,
		nodeMiddleware: true,
	},
};

export default nextConfig;
