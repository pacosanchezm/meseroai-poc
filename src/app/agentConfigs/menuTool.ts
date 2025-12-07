import { tool } from '@openai/agents/realtime';
import { menuItems } from '@/app/menu/products';

export const getMenuItemsTool = tool({
  name: 'get_menu_items',
  description:
    'Devuelve TODO el menú de Sushi Factory (nombre, descripción, precio en MXN e imagen). No uses filtros; siempre trae el catálogo completo.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Opcional. Se ignora; siempre se devuelve el catálogo completo.',
      },
    },
    required: [],
    additionalProperties: false,
  },
  execute: async (_input) => {
    return {
      items: menuItems.map((item) => ({
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
