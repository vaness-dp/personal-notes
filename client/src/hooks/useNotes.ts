import { useCallback, useEffect, useReducer } from 'react'
import NotesService from '../services/notes.service'
import { INote, INotesResponse } from '../types/types'

type State =
	| { status: 'idle'; data?: undefined; error?: undefined }
	| { status: 'loading'; data?: undefined; error?: undefined }
	| { status: 'success'; data: INote[]; error?: undefined }
	| { status: 'error'; data?: undefined; error: string }

type Action =
	| { type: 'FETCH' }
	| { type: 'SUCCESS'; payload: INote[] }
	| { type: 'ERROR'; payload: string }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'FETCH':
			return { status: 'loading' }
		case 'SUCCESS':
			return { status: 'success', data: action.payload }
		case 'ERROR':
			return { status: 'error', error: action.payload }
		default:
			return state
	}
}

export const useNotes = () => {
	const [state, dispatch] = useReducer(reducer, { status: 'idle' })

	const fetchNotes = useCallback(async () => {
		dispatch({ type: 'FETCH' })
		try {
			const response: INotesResponse = await NotesService.getNotes()
			if (response && Array.isArray(response.list)) {
				dispatch({ type: 'SUCCESS', payload: response.list })
			} else {
				dispatch({ type: 'ERROR', payload: 'Неверный формат данных' })
			}
		} catch (error: any) {
			dispatch({
				type: 'ERROR',
				payload: error.message || 'Неизвестная ошибка',
			})
		}
	}, [])

	useEffect(() => {
		fetchNotes()
	}, [fetchNotes])

	return { ...state, refetch: fetchNotes }
}
