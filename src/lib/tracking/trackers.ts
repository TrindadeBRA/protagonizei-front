import { toSnakeCase } from '../utils';
import type { TrackingParams, TrackingOptions } from './types';

/**
 * Mapeamento de eventos Meta Pixel → GA4 recomendados
 * Usa os nomes de eventos recomendados do GA4 para melhores relatórios
 */
const META_TO_GA4_EVENT_MAP: Record<string, string> = {
  'ViewContent': 'view_item',           // GA4 recomendado para visualização de item
  'Lead': 'generate_lead',              // GA4 recomendado para geração de lead
  'InitiateCheckout': 'begin_checkout', // GA4 recomendado para início de checkout
  'Purchase': 'purchase',               // GA4 recomendado (já é padrão)
  // Adicione outros mapeamentos conforme necessário
};

/**
 * Converte nome do evento Meta para evento GA4 recomendado
 * Se não houver mapeamento, usa snake_case do nome original
 */
function mapMetaEventToGA4(eventName: string): string {
  return META_TO_GA4_EVENT_MAP[eventName] || toSnakeCase(eventName);
}

/**
 * Verifica se o Meta Pixel (fbq) está disponível
 */
function isFbqAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/**
 * Verifica se o GA4 (gtag) está disponível
 */
function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Dispara evento no Meta Pixel
 * @param eventName - Nome do evento (ex: "Purchase", "Lead")
 * @param params - Parâmetros do evento
 * @param options - Opções adicionais (eventID para deduplicação)
 */
export function trackMeta(
  eventName: string,
  params?: TrackingParams,
  options?: TrackingOptions
): void {
  if (!isFbqAvailable()) {
    console.warn('[Meta Pixel] fbq não está disponível');
    return;
  }

  try {
    const metaParams = params ? { ...params } : {};
    const metaOptions = options?.eventID ? { eventID: options.eventID } : {};

    if (Object.keys(metaOptions).length > 0) {
      window.fbq('track', eventName, metaParams, metaOptions);
    } else {
      window.fbq('track', eventName, metaParams);
    }

    console.log('[Meta Pixel] Evento disparado:', eventName, metaParams, metaOptions);
  } catch (error) {
    console.error('[Meta Pixel] Erro ao disparar evento:', error);
  }
}

/**
 * Dispara evento no GA4
 * @param eventName - Nome do evento (será mapeado para evento GA4 recomendado)
 * @param params - Parâmetros do evento
 */
export function trackGA(
  eventName: string,
  params?: TrackingParams
): void {
  if (!isGtagAvailable()) {
    console.warn('[GA4] gtag não está disponível');
    return;
  }

  try {
    // Usa mapeamento para eventos recomendados do GA4
    const ga4EventName = mapMetaEventToGA4(eventName);
    const gaParams = params ? { ...params } : {};

    window.gtag('event', ga4EventName, gaParams);

    console.log('[GA4] Evento disparado:', ga4EventName, gaParams);
  } catch (error) {
    console.error('[GA4] Erro ao disparar evento:', error);
  }
}

/**
 * Dispara evento em ambas as plataformas (Meta Pixel + GA4)
 * @param eventName - Nome do evento
 * @param params - Parâmetros do evento
 * @param options - Opções adicionais (eventID para Meta Pixel)
 */
export function trackAll(
  eventName: string,
  params?: TrackingParams,
  options?: TrackingOptions
): void {
  trackMeta(eventName, params, options);
  trackGA(eventName, params);
}

// Declarações globais para TypeScript
declare global {
  interface Window {
    fbq: (
      command: 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, any>,
      options?: Record<string, any>
    ) => void;
    gtag: (
      command: 'event' | 'config',
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

