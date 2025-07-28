export type PurchaseDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: string | null;
};

export type PurchaseDetailsResult = {
  hasPurchase: boolean;
  purchase?: PurchaseDetails;
  error?: string;
  errorType?: 'FAILED' | 'REFUNDED' | 'GENERAL';
};
