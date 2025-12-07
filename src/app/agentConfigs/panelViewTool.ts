import { tool } from '@openai/agents/realtime';

export const setPanelViewTool = tool({
  name: 'set_panel_view',
  description:
    'Cambia el panel lateral visible en la UI. Úsalo para alternar entre ver el menú o la orden.',
  parameters: {
    type: 'object',
    properties: {
      view: {
        type: 'string',
        description: 'Panel a mostrar: "menu" o "order".',
        enum: ['menu', 'order'],
      },
    },
    required: ['view'],
    additionalProperties: false,
  },
  execute: async (input, details) => {
    const { view } = input as { view: 'menu' | 'order' };

    const handler = (details?.context as any)?.handlePanelViewChange as
      | ((view: 'menu' | 'order' | 'logs') => void)
      | undefined;
    const addBreadcrumb = (details?.context as any)?.addTranscriptBreadcrumb as
      | ((title: string, data?: any) => void)
      | undefined;

    handler?.(view);
    addBreadcrumb?.('panel_view', { view });

    return { ok: true, view };
  },
});
