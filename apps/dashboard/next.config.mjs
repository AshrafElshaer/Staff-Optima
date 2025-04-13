/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@optima/ui"],
	experimental: {
		useCache: true,
	},
};

export default nextConfig;
