import { useQuery } from '@tanstack/react-query'
import NotesService from '../services/notes.service'
import { INotesResponse } from '../types/types'

export const useNotesQuery = () => {
	return useQuery<INotesResponse, Error>({
		queryKey: ['notes'],
		queryFn: () => NotesService.getNotes(),
	})
}
