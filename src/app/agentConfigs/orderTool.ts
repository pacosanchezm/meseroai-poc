import { tool } from '@openai/agents/realtime';
import { menuItems } from '@/app/menu/products';
import { OrderItem } from '@/app/order/types';

export const setOrderItemsTool = tool({
  name: 'set_order_items',
  description:
    'Actualiza la orden del cliente. Reemplaza la lista completa con los productos y cantidades indicadas.',
  parameters: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        description:
          'Lista de productos con cantidad. Si envías un arreglo vacío, la orden queda vacía.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID del producto (usa los IDs devueltos por get_menu_items).',
            },
            quantity: {
              type: 'number',
              description: 'Cantidad solicitada, debe ser mayor o igual a 1.',
            },
          },
          required: ['id', 'quantity'],
          additionalProperties: false,
        },
      },
    },
    required: ['items'],
    additionalProperties: false,
  },
  execute: async (input, details) => {
    const { items } = input as { items: { id: string; quantity: number }[] };
    const getCurrentOrderItems = (details?.context as any)?.getCurrentOrderItems as
      | (() => OrderItem[])
      | undefined;
    const currentOrder = getCurrentOrderItems?.() ?? [];

    const validItems = Array.isArray(items)
      ? items.filter((it) => it.quantity && it.quantity > 0)
      : [];

    // Deduplicate incoming items and replace quantities for those IDs.
    const incomingMap = new Map<string, OrderItem>();
    validItems.forEach((it) => {
      const product = menuItems.find((p) => p.id === it.id);
      if (!product) return;
      const existing = incomingMap.get(it.id);
      const qty = Math.round(it.quantity);
      incomingMap.set(it.id, {
        id: product.id,
        name: product.name,
        quantity: (existing?.quantity ?? 0) + qty,
        price: product.price,
        currency: product.currency,
        imageUrl: product.imageUrl,
      });
    });

    let newOrder: OrderItem[] = [];
    if (!Array.isArray(items) || items.length === 0) {
      newOrder = [];
    } else {
      const orderMap = new Map<string, OrderItem>();
      currentOrder.forEach((it) => orderMap.set(it.id, { ...it }));
      // Replace quantities for provided IDs
      incomingMap.forEach((incoming, id) => {
        orderMap.set(id, incoming);
      });
      newOrder = Array.from(orderMap.values());
    }

    const handler = (details?.context as any)?.handleOrderUpdate as
      | ((items: OrderItem[]) => void)
      | undefined;
    const panelHandler = (details?.context as any)?.handlePanelViewChange as
      | ((view: 'menu' | 'order' | 'logs') => void)
      | undefined;
    const addBreadcrumb = (details?.context as any)?.addTranscriptBreadcrumb as
      | ((title: string, data?: any) => void)
      | undefined;

    // Switch UI to order view when the order is updated.
    panelHandler?.('order');
    handler?.(newOrder);
    addBreadcrumb?.('order_update', { items: newOrder.map((i) => ({ id: i.id, quantity: i.quantity })) });

    return { items: newOrder };
  },
});
