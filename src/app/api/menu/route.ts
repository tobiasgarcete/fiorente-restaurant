import { NextResponse } from 'next/server';
import { menuItems, categories, getItemsByCategory, searchItems } from '@/lib/menu-data';

/**
 * GET /api/menu - Get menu items
 * Query params:
 *   - category: Filter by category ID
 *   - search: Search by name or description
 *   - featured: Get only featured items (true/false)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    let items = menuItems.filter((item) => item.available);

    // Filter by category
    if (category) {
      items = getItemsByCategory(category);
    }

    // Filter by search query
    if (search) {
      items = searchItems(search);
    }

    // Filter featured items only
    if (featured === 'true') {
      items = items.filter((item) => item.featured);
    }

    return NextResponse.json({
      success: true,
      categories,
      items,
      total: items.length,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Error al obtener el menú' },
      { status: 500 }
    );
  }
}
