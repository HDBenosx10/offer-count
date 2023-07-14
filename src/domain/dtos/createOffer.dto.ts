export interface CreateOfferDTO {
  userId: string;
  sellerWalletId: string;
  tokenId: string;
  amount: number;
  unitPrice: number;
  currency: string;
}
