import { useCallback } from 'react';
import { trackAll } from '@/src/lib/tracking/trackers';
import type { TrackFunction } from '@/src/lib/tracking/types';

export function useTracking() {
  const track: TrackFunction = useCallback((eventName, params, options) => {
    trackAll(eventName, params, options);
  }, []);

  return { track };
}

