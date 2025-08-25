export const LIMITS = {
  MAX_ITEMS: 20,
  MAX_ITEM_VALUE: 20,
  MIN_ITEM_VALUE: 0,
} as const;

export type Limits = typeof LIMITS;
