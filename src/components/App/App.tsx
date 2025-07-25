import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const queryClient = new QueryClient();

function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={setSearch} />
          <Pagination search={debouncedSearch} page={page} setPage={setPage} />
          <button className={css.button} onClick={() => setShowModal(true)}>
            Create note +
          </button>
        </header>
        <NoteList search={debouncedSearch} page={page} />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <NoteForm onClose={() => setShowModal(false)} />
          </Modal>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
