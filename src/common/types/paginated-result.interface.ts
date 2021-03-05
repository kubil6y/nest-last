export interface PaginatedResult {
  data: any[];
  meta: { total: number; currentPage: number; lastPage: number };
}
