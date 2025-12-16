/**
 * Tipos para o sistema de tracking
 */

export interface TrackingParams {
  // Parâmetros comuns
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  
  // Para e-commerce
  transaction_id?: string;
  items?: Array<{
    item_id?: string;
    item_name?: string;
    price?: number;
    quantity?: number;
  }>;
  
  // Qualquer outro parâmetro customizado
  [key: string]: any;
}

export interface TrackingOptions {
  /**
   * ID único do evento para deduplicação no Meta Pixel
   * Formato recomendado: `${eventType}_${orderId}`
   */
  eventID?: string;
}

export type TrackFunction = (
  eventName: string,
  params?: TrackingParams,
  options?: TrackingOptions
) => void;

