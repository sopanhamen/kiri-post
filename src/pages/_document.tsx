import Document, { Head, Html, Main, NextScript } from 'next/document'
// import i18n from '@/utils/i18n';
// import { useTranslation } from 'next-i18next';
export default class extends Document {
    render() {
        /**
         * Here we use _document.js to add a "lang" propery to the HTML object if
         * one is set on the page.
         **/
        //  i18n.useTranslation({
        //     lng: lang
        // });
        // lang={this.props.__NEXT_DATA__.props.pageProps.lang || "en"}

        return (
            <Html lang={this.props.__NEXT_DATA__.props.pageProps.lang || 'en'}>
                <Head>
                    <meta charSet="utf-8" />
                    {/* google fonts */}
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600;700;800;900&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Nokora:wght@400;700&display=swap"
                    />

                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    {/* <scrip
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GaTrackingID}`}
					/> */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', '${process.env.GaTrackingID}', {
                                    page_path: window.location.pathname + window.location.search,
                                    });
                                `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
