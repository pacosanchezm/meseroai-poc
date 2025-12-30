import { tool } from './types';
import { menuItemsSushiWaiter } from '../menu/products_sushiwaiter';
import { MenuItem } from '../menu/types';

export const getMenuItemsTool = tool({
  name: 'get_menu_items',
  description:
    'Devuelve TODO el menú (nombre, descripción, precio en pesos e imagen). No uses filtros; siempre trae el catálogo completo.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Ignorado; siempre se devuelve el catálogo completo.',
      },
    },
    required: [],
    additionalProperties: false,
  },
  execute: async (_input, details) => {
    const contextMenuItems: MenuItem[] | undefined = (details?.context as any)?.menuItems;
    const items = contextMenuItems && Array.isArray(contextMenuItems) ? contextMenuItems : menuItemsSushiWaiter;

    return {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
        tags: item.tags,
        currency: item.currency,
      })),
    };
  },
});
