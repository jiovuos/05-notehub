import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const instance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  const res = await instance.get('/notes', {
    params,
  });

  return {
    data: res.data.notes,
    totalPages: res.data.totalPages,
  };
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: NoteTag;
}): Promise<Note> => {
  const res = await instance.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await instance.delete(`/notes/${id}`);
  return res.data;
};
