/* eslint-disable @typescript-eslint/no-var-requires */
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
    env: {
		ApiKeyFirebase: process.env.API_KEY_FIREBASE,
		AuthDomainFirebase: process.env.AUTH_DOMAIN_FIREBASE,
		ProjectIdFirebase: process.env.PROJECT_ID_FIREBASE,
		StorageBucket: process.env.STORAGE_BUCKET,
		MessageSenderId: process.env.MESSAGING_SENDER_ID,
		AppID: process.env.APP_ID,
		ClientID: process.env.CLIENT_ID,

		EnglishCode: process.env.ENGLISH_CODE,
		KhmerCode: process.env.KHMER_CODE,

		ABAPayWayScrip: process.env.ABA_PAY_WAY_SCRIPT,
		ABAPayWayStyle: process.env.ABA_PAY_WAY_STYLE,
		ABAPayWayPlugin: process.env.ABA_PAYWAY_PLUGIN,

		BaseURL: process.env.BASE_URL,
		FacebookID: process.env.FACEBOOK_APP,

		GaTrackingID: process.env.GA_TRACKING_ID,
		ClientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,

		SocketBaseUrl: process.env.SOCKET_URL,
		GoogleApiKey: process.env.GOOGLE_API_KEY,
	},
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
