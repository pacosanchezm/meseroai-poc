import { tool } from '@openai/agents/realtime';

export const setPaymentVisibilityTool = tool({
  name: 'set_payment_visibility',
  description:
    'Muestra u oculta la sección de pago (efectivo, tarjeta y Enlace Gourmet) en el panel de orden.',
  parameters: {
    type: 'object',
    properties: {
      visible: {
        type: 'boolean',
        description: 'true para mostrar la sección de pago, false para ocultarla.',
      },
    },
    required: ['visible'],
    additionalProperties: false,
  },
  execute: async (input, details) => {
    const { visible } = input as { visible: boolean };
    const handler = (details?.context as any)?.handlePaymentVisibilityChange as
      | ((visible: boolean) => void)
      | undefined;
    const addBreadcrumb = (details?.context as any)?.addTranscriptBreadcrumb as
      | ((title: string, data?: any) => void)
      | undefined;

    handler?.(visible);
    addBreadcrumb?.('payment_visibility', { visible });

    return { visible };
  },
});
