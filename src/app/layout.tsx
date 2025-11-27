import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';
import './globals.css';

// Viewport configuration
export const viewport: Viewport = {
  themeColor: '#0F0F0F',
};

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: 'Fiorente | Pizzería, Cafetería y Bar en Formosa',
    template: '%s | Fiorente',
  },
  description:
    'Descubrí las mejores pizzas artesanales, café de especialidad y tragos premium en Fiorente. Ubicados en Av. 25 de Mayo 368, Formosa, Argentina.',
  keywords: [
    'pizzería',
    'cafetería',
    'bar',
    'Formosa',
    'Argentina',
    'pizza',
    'café',
    'tragos',
    'Fiorente',
    'restaurante',
  ],
  authors: [{ name: 'Fiorente' }],
  creator: 'Fiorente',
  publisher: 'Fiorente',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://fiorente.com.ar',
    siteName: 'Fiorente',
    title: 'Fiorente | Pizzería, Cafetería y Bar en Formosa',
    description:
      'Descubrí las mejores pizzas artesanales, café de especialidad y tragos premium en Fiorente.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fiorente - Pizzería, Cafetería y Bar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fiorente | Pizzería, Cafetería y Bar en Formosa',
    description:
      'Descubrí las mejores pizzas artesanales, café de especialidad y tragos premium en Fiorente.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

/**
 * RootLayout - Main application layout
 * Provides global providers, navbar, footer, and cart
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans">
        <CartProvider>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1A1A1A',
                color: '#FFFFFF',
                border: '1px solid rgba(240, 160, 48, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#F0A030',
                  secondary: '#1A1A1A',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#1A1A1A',
                },
              },
            }}
          />

          {/* Navigation */}
          <Navbar />

          {/* Cart Sidebar */}
          <Cart />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
