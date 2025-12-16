export interface TrackingParams {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  transaction_id?: string;
  items?: Array<{
    item_id?: string;
    item_name?: string;
    price?: number;
    quantity?: number;
  }>;
  [key: string]: any;
}

export interface TrackingOptions {
  eventID?: string;
}

export type TrackFunction = (
  eventName: string,
  params?: TrackingParams,
  options?: TrackingOptions
) => void;

