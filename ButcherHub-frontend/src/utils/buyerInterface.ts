export type BuyerDocumentType = "CPF" | "CNPJ";
export const buyerDocumentTypes: BuyerDocumentType[] = ["CPF", "CNPJ"];

export interface Buyer {
  id: number;
  name: string;
  documentType: BuyerDocumentType;
  documentNumber: string;
  city: string;
  state: string;
}