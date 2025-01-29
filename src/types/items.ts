export default interface iItems {
  name: string;
  image: string;
  description: string;
  isTaxable: Boolean;
  tax?: number;
  baseAmount: number;
  discount: number;
  totalAmount: number;

  categoryID?: string;
  subCategoryID?: string;
}
