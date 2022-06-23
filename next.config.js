/** @type {import('next').NextConfig} */

// const path = require("path");
const newLocal = 'dotenv';
const dotenv = require(newLocal);

const withSass = require("@zeit/next-sass");

dotenv.config();

module.exports = withSass({
    cssModules: true,
});

module.exports = {
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    plugins: [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
                features: {
                    'custom-properties': false,
                },
            },
        ],
        [
            '@fullhuman/postcss-purgecss',
            {
                content: [
                    './pages/**/*.{js,jsx,ts,tsx}',
                    './components/**/*.{js,jsx,ts,tsx}',
                    './shared/**/*.{js,jsx,ts,tsx}',
                ],
                defaultExtractor: (content) =>
                    content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: ['html', 'body'],
            },
        ],
    ],
    // typescript: {
    //     ignoreBuildErrors: true,
    // },

    images: {
        unoptimized: true,
        formats: ['image/avif', 'image/webp'],
        domains: [
          'storage.googleapis.com',
          'lh3.googleusercontent.com',
          'graph.facebook.com',
          'i.pinimg.com'
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    reactStrictMode: true,
    react: { useSuspense: false }
}
