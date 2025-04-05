import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotesService from '../services/notes.service'
import { IFormNote, INote } from '../types/types'

export const useCreateNoteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation<INote, Error, IFormNote>({
		mutationKey: ['createNote'],
		mutationFn: (data: IFormNote) => NotesService.createNote(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] })
		},
	})
}
