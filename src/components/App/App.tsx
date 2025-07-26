import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../services/noteService';
import type { FetchNotesResponse } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const queryOptions: UseQueryOptions<FetchNotesResponse, Error> = {
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
    // @ts-expect-error: React Query types does not include keepPreviousData
    keepPreviousData: true,
  };

  const { data: response, isLoading, isError } = useQuery(queryOptions);

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearch} />
        <button className={css.button} onClick={() => setShowModal(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {response && (
        <>
          <NoteList notes={response.data} onDelete={mutation.mutate} />
          <Pagination
            totalPages={response.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
