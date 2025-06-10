export const buyerDocumentTypes = ['CPF', 'CNPJ'] as const;
export type BuyerDocumentType = typeof buyerDocumentTypes[number];

export type Buyer = {
  id: number;
  name: string;
};