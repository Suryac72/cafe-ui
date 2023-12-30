export interface DropDown {
  label: string;
  value: string;
}
export interface Order {
  customerName: string;
  customerEmail: string;
  contactNumber: string;
  paymentMethod: string;
  totalAmount: string;
  productDetails: string;
  isGenerated: string;
  categoryName?:string;
  productName?:string;
}
