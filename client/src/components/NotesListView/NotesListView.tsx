// src/components/NotesListView.tsx
import React from 'react'
import { useNotesQuery } from '../../hooks/useNotesQuery'
import { Loader } from '../Loader'
import { NoteView } from '../NoteView'
import './NotesListView.css'

export const NotesListView: React.FC = () => {
	const { status, data, error } = useNotesQuery()

	if (status === 'pending') {
		return <Loader />
	}

	if (status === 'error') {
		return <div>Ошибка: {error?.message}</div>
	}

	if (status === 'success' && (!data?.list || data.list.length === 0)) {
		return <div>Заметок нет</div>
	}

	return (
		<div>
			<ul className='note-list-view'>
				{data?.list.map(note => (
					<li key={note.id}>
						<NoteView note={note} />
					</li>
				))}
			</ul>
		</div>
	)
}
