# 🍕 Fiorente Restaurant Website

Sitio web oficial de **Fiorente** - Pizzería, Cafetería y Bar ubicado en Formosa, Argentina.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=flat-square&logo=mongodb)

## 📋 Descripción

Sitio web completo para el restaurante Fiorente con las siguientes funcionalidades:

- 🏠 Página de inicio con secciones de presentación
- 📜 Menú digital con filtros por categoría y búsqueda
- 🛒 Carrito de compras con persistencia en localStorage
- 📝 Checkout sin necesidad de registro
- ✅ Confirmación de pedido con número de seguimiento
- 📱 Diseño responsive (Mobile-First)
- 🎨 Animaciones suaves con Framer Motion

## 🚀 Tecnologías

- **Frontend:** Next.js 14 (App Router) con TypeScript
- **Estilos:** Tailwind CSS
- **Base de datos:** MongoDB (Mongoose)
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Notificaciones:** React Hot Toast
- **Estado:** React Context API

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- MongoDB (local o Atlas)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tobiasgarcete/fiorente-restaurant.git
   cd fiorente-restaurant
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.local.example .env.local
   ```
   Editar `.env.local` con tus valores:
   ```env
   MONGODB_URI=mongodb://localhost:27017/fiorente
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=5493704858785
   ```

4. **Iniciar MongoDB** (si es local)
   ```bash
   # Con MongoDB Compass o desde terminal
   mongod
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
fiorente-restaurant/
├── public/
│   ├── images/           # Imágenes del restaurante
│   └── logo.svg          # Logo del restaurante
│
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página de inicio
│   │   ├── globals.css   # Estilos globales
│   │   ├── menu/         # Página del menú
│   │   ├── checkout/     # Página de checkout
│   │   ├── confirmacion/ # Página de confirmación
│   │   └── api/
│   │       ├── pedidos/  # API de pedidos
│   │       └── menu/     # API del menú
│   │
│   ├── components/
│   │   ├── layout/       # Navbar, Footer
│   │   ├── home/         # Hero, About, Featured, Contact
│   │   ├── menu/         # MenuSection, ProductCard, CategoryFilter
│   │   ├── cart/         # Cart, CartButton, CartItem
│   │   └── checkout/     # CheckoutForm, OrderSummary
│   │
│   ├── contexts/
│   │   └── CartContext.tsx  # Estado global del carrito
│   │
│   ├── lib/
│   │   ├── mongodb.ts    # Conexión a MongoDB
│   │   ├── menu-data.ts  # Datos del menú
│   │   └── types.ts      # TypeScript interfaces
│   │
│   └── models/
│       ├── Order.ts      # Modelo de pedido
│       └── MenuItem.ts   # Modelo de producto
│
├── .env.local.example    # Ejemplo de variables de entorno
├── next.config.js        # Configuración de Next.js
├── tailwind.config.ts    # Configuración de Tailwind CSS
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias del proyecto
```

## 🎨 Colores Corporativos

```css
--primary: #F0A030    /* Naranja/Dorado */
--secondary: #1A1A1A  /* Negro */
--accent: #FFFFFF     /* Blanco */
--dark-bg: #0F0F0F    /* Negro oscuro */
--light-orange: #FFB84D /* Naranja claro */
```

## 📱 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm run start

# Linting
npm run lint
```

## 🔧 Configuración de MongoDB Compass

1. Abrir MongoDB Compass
2. Conectar a `mongodb://localhost:27017`
3. Crear base de datos `fiorente`
4. Las colecciones se crearán automáticamente:
   - `orders` - Pedidos de clientes
   - `menuitems` - Productos del menú (opcional, se usa menu-data.ts por defecto)

## 📍 Información del Local

- **Nombre:** Fiorente
- **Tipo:** Pizzería | Cafetería | Bar
- **Dirección:** Av. 25 de Mayo 368, Formosa, Argentina 3600
- **Teléfono:** 3704858785
- **Instagram:** @fiorentepizzeriabarcafe

## 📝 API Endpoints

### GET /api/menu
Obtiene todos los productos del menú.

Query params:
- `category`: Filtrar por categoría
- `search`: Buscar por nombre/descripción
- `featured`: Solo productos destacados

### POST /api/pedidos
Crea un nuevo pedido.

Body:
```json
{
  "customerName": "Nombre del cliente",
  "customerPhone": "1234567890",
  "customerEmail": "email@ejemplo.com",
  "deliveryType": "retiro" | "envio",
  "deliveryAddress": "Dirección (requerido si es envío)",
  "items": [...],
  "totalAmount": 10000,
  "notes": "Notas adicionales"
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ para **Fiorente** - Formosa, Argentina
