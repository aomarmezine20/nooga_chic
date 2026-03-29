export async function trackInteraction(type: 'VISIT' | 'WHATSAPP_CLICK', productId?: string, size?: number) {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, productId, size })
    });
  } catch (error) {
    console.warn('Analytics tracking failed', error);
  }
}
