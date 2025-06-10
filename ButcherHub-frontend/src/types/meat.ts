export type MeatOrigin = 'Beef' | 'Pork' | 'Poultry' | 'Fish';

export interface Meat {
  id: number;
  description: string;
  origin: MeatOrigin;
}
