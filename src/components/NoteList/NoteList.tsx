import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote, fetchNotes } from '../../services/noteService';
import css from './NoteList.module.css';

export interface NoteListProps {
  page: number;
  search: string;
}

function NoteList({ page, search }: NoteListProps) {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
  });

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !response) return <p>Error loading notes</p>;

  return (
    <ul className={css.list}>
      {response.data.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
