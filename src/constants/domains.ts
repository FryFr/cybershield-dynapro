export const ALLOWED_DOMAINS = [
  'dynaproco.com',
  'dynaproequipment.com',
] as const

export type AllowedDomain = typeof ALLOWED_DOMAINS[number]
