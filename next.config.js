/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },

    images: {
        dangerouslyAllowSVG: true,
        minimumCacheTTL: 600,
        domains: [
            "via.placeholder.com",
            "lh3.googleusercontent.com",
            "api.yoton.club",
            "platform-lookaside.fbsbx.com",
            "joeschmoe.io",
            "discover.fiverr.com",
            "d31z5416daxb6e.cloudfront.net",
            "dat1dwrbgql2u.cloudfront.net",
            "ymcdao-frontend.vercel.app",
            "localhost",
            "ihcdao-membernfts.s3.eu-central-1.amazonaws.com",
            "d2hp7bo3gw43xp.cloudfront.net",
            "api.auction.ihcdao.io",
            "source.boringavatars.com",
            "source.unsplash.com",
        ],
    },

    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === "development"
                ? "http://localhost:8000" // development api
                : "https://18.140.70.44", // production api
    },
};

module.exports = nextConfig;
