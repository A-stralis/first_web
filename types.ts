export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
  aspectRatio: number;
  title?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
