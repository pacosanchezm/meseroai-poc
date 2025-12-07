import { tool } from '@openai/agents/realtime';
import { menuItems, MenuItem } from '@/app/menu/products';

function normalize(text: string) {
  return text.toLowerCase();
}

function matchesQuery(item: MenuItem, query: string) {
  const q = normalize(query);
  if (normalize(item.name).includes(q)) return true;
  if (item.description && normalize(item.description).includes(q)) return true;
  if (item.tags && item.tags.some((t) => normalize(t).includes(q))) return true;
  return false;
}

export const setMenuDisplayTool = tool({
  name: 'set_menu_display',
  description:
    'Actualiza los productos visibles en el panel de menú (UI). Úsalo para mostrar solo los ítems relevantes para el cliente.',
  parameters: {
    type: 'object',
    properties: {
      item_ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'IDs de productos a mostrar. Si se omite, se puede usar query.',
      },
      query: {
        type: 'string',
        description: 'Texto para filtrar por nombre/descripcion cuando no se especifiquen item_ids.',
      },
    },
    required: [],
    additionalProperties: false,
  },
  execute: async (input, details) => {
    const { item_ids, query } = input as { item_ids?: string[]; query?: string };

    let itemsToShow: MenuItem[] = menuItems;
    if (Array.isArray(item_ids) && item_ids.length > 0) {
      itemsToShow = menuItems.filter((item) => item_ids.includes(item.id));
    } else if (query) {
      itemsToShow = menuItems.filter((item) => matchesQuery(item, query));
    }

    const handler = (details?.context as any)?.handleMenuDisplayAction as
      | ((items: MenuItem[]) => void)
      | undefined;
    const panelHandler = (details?.context as any)?.handlePanelViewChange as
      | ((view: 'menu' | 'order' | 'logs') => void)
      | undefined;
    const addBreadcrumb = (details?.context as any)?.addTranscriptBreadcrumb as
      | ((title: string, data?: any) => void)
      | undefined;

    // Ensure UI switches to menu view when showing menu items.
    panelHandler?.('menu');
    handler?.(itemsToShow);
    addBreadcrumb?.('menu_display', {
      item_ids: Array.isArray(item_ids) ? item_ids : undefined,
      query: query || undefined,
      shown: itemsToShow.map((i) => i.id),
    });

    return { items: itemsToShow };
  },
});
