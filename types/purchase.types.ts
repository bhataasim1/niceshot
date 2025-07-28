export type BillingAddress = {
  line1?: string;
  line2?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
};

export type OrderDetails = {
  id: string;
  productId: string;
  status: string;
  paid: boolean;
  amount: number;
  totalAmount: number;
  currency: string;
  billingReason: string;
  createdAt: Date;
  modifiedAt?: Date | null;
  discountAmount: number;
  discountId?: string | null;
  billingName?: string | null;
  billingAddress?: BillingAddress | null;
};

export type OrderDetailsResult = {
  hasOrder: boolean;
  order?: OrderDetails;
  error?: string;
  errorType?: 'FAILED' | 'REFUNDED' | 'GENERAL';
};
