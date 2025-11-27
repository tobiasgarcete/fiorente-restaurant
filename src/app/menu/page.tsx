import type { Metadata } from 'next';
import MenuSection from '@/components/menu/MenuSection';

export const metadata: Metadata = {
  title: 'Menú',
  description:
    'Explorá nuestro menú completo de pizzas artesanales, empanadas, picadas, cafetería, bebidas y tragos. ¡Hacé tu pedido online!',
};

/**
 * Menu Page - Full menu with category filtering and search
 */
export default function MenuPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-fiorente-dark">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-fiorente-primary mb-4">
            Nuestro Menú
          </h1>
          <div className="w-24 h-1 bg-fiorente-primary mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubrí todas nuestras opciones: desde pizzas artesanales hasta los mejores tragos. 
            Todo preparado con ingredientes frescos y mucho amor.
          </p>
        </div>

        {/* Menu Content */}
        <MenuSection />
      </div>
    </div>
  );
}
