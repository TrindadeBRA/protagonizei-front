import { useCallback } from 'react';
import { trackAll } from '@/src/lib/tracking/trackers';
import type { TrackFunction } from '@/src/lib/tracking/types';

/**
 * Hook para disparar eventos de tracking no Meta Pixel e GA4
 * 
 * @example
 * ```tsx
 * const { track } = useTracking();
 * 
 * // Evento simples
 * track('ViewContent');
 * 
 * // Com parâmetros
 * track('Lead', { content_name: 'Order Form' }, { eventID: `lead_${orderId}` });
 * 
 * // Purchase com value
 * track('Purchase', { 
 *   value: 49.99, 
 *   currency: 'BRL',
 *   transaction_id: orderId 
 * }, { 
 *   eventID: `purchase_${orderId}` 
 * });
 * ```
 */
export function useTracking() {
  const track: TrackFunction = useCallback((eventName, params, options) => {
    trackAll(eventName, params, options);
  }, []);

  return { track };
}

