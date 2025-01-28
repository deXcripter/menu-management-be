export default interface IPagination {
  total: number;
  limit: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
