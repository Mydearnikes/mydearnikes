
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import localfont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import Header from "@/components/basics/Header";
import Footer from "@/components/basics/Footer";
import Image from "next/image";
import SmoothScroll from "@/lib/SmoothScroll";
import Snowfall from "react-snowfall";
import SnowfallEffect from "@/components/Snowfall";
import ScrollToTop from "@/components/ScrollToTop";
import ChristmasMarquee from "@/components/ChristmasMarquee";
// ... (keep all your font and metadata config)

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

const ispire = localfont({
  src: [
    {
      path: "../../public/fonts/OPTISpire.woff2",
      weight: "400",
    },
  ],
  variable: "--font-ispire",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas-neue",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://mydearnikes.com"
  ),
  title: {
    template: "%s | MyDearNikes",
    default: "MyDearNikes - T-shirts and Tops | Shop Online",
  },
  description:
    "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
  keywords: [
    "ecommerce",
    "online store",
    "premium products",
    "fast shipping",
    "quality products",
    "online shopping",
    "statement tees",
    "graphic tees",
    "t-shirts online",
    "bold design shirts",
    "limited edition apparel",
    "MyDearNikes",
    "designer t-shirts",
    "men's tops",
    "women's tees",
    "buy t-shirts online",
  ],
  authors: [{ name: "MyDearNikes Design Team" }],
  creator: "MyDearNikes",
  publisher: "MyDearNikes",
  category: "fashion",
  classification: "Business",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "MyDearNikes",
    title: "T-shirts and Tops | Shop Online - MyDearNikes",
    description:
      "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyDearNikes - Bold Statement Streetwear",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "MyDearNikes Collection",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mydearnikes",
    creator: "@mydearnikes",
    title: "T-shirts and Tops | Shop Online - MyDearNikes",
    description:
      "MyDearNikes offers unique Tees with bold, statements designs. Shop now for premium, limited-edition Tees and look Cool",
    images: [
      {
        url: "/twitter-image.jpg",
        alt: "MyDearNikes Statement Tees",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
    },
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/greenapplejuice.ico", sizes: "any" }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={"scroll-smooth antialiased"}
    >
      <head>
        {/* Critical resource hints for performance */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />

        {/* <link
          rel="preload"
          as="image"
          href="/images/imageHeroNew1.webp"
          fetchPriority="high"
        /> */}

        {/* DNS prefetch for third-party services */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
        <link rel="dns-prefetch" href="//va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        <link rel="dns-prefetch" href="//www.facebook.com" />

        {/* Preload critical CSS/JS if needed */}
        <link
          rel="preload"
          href="/fonts/OPTISpire.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />

        {/* Performance optimizations */}
        <meta name="generator" content="Next.js" />
        <meta name="color-scheme" content="light dark" />
      </head>

      <body
        className={`${inter.variable} ${bebasNeue.variable} ${ispire.variable}`}
      >
        <SmoothScroll />
        <ScrollToTop/>
        {/* <SnowfallEffect/> */}
        {/* Main application structure */}
        <div className="relative flex min-h-screen flex-col">
          {/* <ChristmasMarquee/> */}

          <Header />

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <Footer />
        </div>

        {/* Global UI components */}
        {/* <Toaster position="top-right" expand={true} closeButton />
         */}

        <Toaster
          position="top-center"
          expand={true}
          closeButton
          toastOptions={{
            style: {
              marginTop: "50px", // Below your header
            },
          }}
        />

        {/* ========================================
            ANALYTICS STACK - LOAD IN ORDER
        ======================================== */}

        {/* 1. VERCEL ANALYTICS (loads first, lightest) */}
        <Analytics />

        {/* 2. GOOGLE ANALYTICS (GA4) */}
        <Script
          id="google-analytics"
          src="https://www.googletagmanager.com/gtag/js?id=G-VYB14XHQDZ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VYB14XHQDZ', {
                page_path: window.location.pathname,
                send_page_view: true
              });
              console.log('✅ Google Analytics loaded');
            `,
          }}
        />

        {/* 3. FACEBOOK PIXEL (loads last) */}
        <Script
          id="facebook-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '982652617172806');
              fbq('track', 'PageView');
              console.log('✅ Meta Pixel loaded');
            `,
          }}
        />

        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=982652617172806&ev=PageView&noscript=1"
            alt=""
            unoptimized
          />
        </noscript>

        {/* 4. VERCEL SPEED INSIGHTS */}
        <SpeedInsights
          sampleRate={process.env.NODE_ENV === "production" ? 1 : 0}
        />

        {/* ======================================== */}

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ClothingStore",
              name: "MyDearNikes",
              description:
                "Premium statement tees and streetwear with bold designs",
              url: process.env.NEXT_PUBLIC_APP_URL,
              logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
              sameAs: [
                "https://instagram.com/mydearnikes",
                "https://twitter.com/mydearnikes",
                "https://tiktok.com/@mydearnikes",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
