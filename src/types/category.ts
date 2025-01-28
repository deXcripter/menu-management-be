export default interface ICategory {
  name: string;
  image: string;
  description: string;
  isTaxable: boolean;
  tax?: number;
  taxType?: string;
}
