export const meatOrigins = ['Beef', 'Pork', 'Poultry', 'Fish'] as const;
export type MeatOrigin = typeof meatOrigins[number];