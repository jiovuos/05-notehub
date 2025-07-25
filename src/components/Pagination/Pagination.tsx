import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from './Pagination.module.css';

export interface PaginationProps {
  page: number;
  setPage: (value: number) => void;
  search: string;
}

function Pagination({ page, setPage, search }: PaginationProps) {
  const { data } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  const pageCount = data?.totalPages ?? 0;
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      className={css.pagination}
      pageClassName=""
      activeClassName={css.active}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => setPage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      forcePage={page - 1}
    />
  );
}

export default Pagination;
