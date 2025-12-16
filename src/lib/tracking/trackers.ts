import { toSnakeCase } from '../utils';
import type { TrackingParams, TrackingOptions } from './types';

const META_TO_GA4_EVENT_MAP: Record<string, string> = {
  'ViewContent': 'view_item',
  'Lead': 'generate_lead',
  'InitiateCheckout': 'begin_checkout',
  'Purchase': 'purchase',
};

function mapMetaEventToGA4(eventName: string): string {
  return META_TO_GA4_EVENT_MAP[eventName] || toSnakeCase(eventName);
}

function isFbqAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

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
  } catch (error) {
    console.error('[Meta Pixel] Erro ao disparar evento:', error);
  }
}

export function trackGA(
  eventName: string,
  params?: TrackingParams
): void {
  if (!isGtagAvailable()) {
    console.warn('[GA4] gtag não está disponível');
    return;
  }

  try {
    const ga4EventName = mapMetaEventToGA4(eventName);
    const gaParams = params ? { ...params } : {};
    window.gtag('event', ga4EventName, gaParams);
  } catch (error) {
    console.error('[GA4] Erro ao disparar evento:', error);
  }
}

export function trackAll(
  eventName: string,
  params?: TrackingParams,
  options?: TrackingOptions
): void {
  trackMeta(eventName, params, options);
  trackGA(eventName, params);
}

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

