import { axiosClassic } from '../api/axios'
import { IFormNote, INote, INotesResponse } from '../types/types'

class NotesService {
	async getNotes(): Promise<INotesResponse> {
		const response = await axiosClassic.get<INotesResponse>('notes')
		return response.data
	}

	async createNote(data: IFormNote): Promise<INote> {
		const response = await axiosClassic.post<INote>('notes', data)
		return response.data
	}
}

export default new NotesService()
