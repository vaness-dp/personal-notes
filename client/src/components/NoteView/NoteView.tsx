// Пример изменённого NoteView.tsx
import React from 'react'
import { INote } from '../../types/types'
import './NoteView.css'

const formatDate = (timestamp: number) => {
	const date = new Date(timestamp)
	return date.toLocaleString(undefined, {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

interface NoteViewProps {
	note: INote
}

export const NoteView: React.FC<NoteViewProps> = ({ note }) => {
	return (
		<div className='note-view'>
			<div className='note-view__head'>
				<p className='note-view__datetime'>
					{formatDate(new Date(note.createdAt).getTime())}
				</p>
				<p className='note-view__title'>{note.title}</p>
			</div>
			<p className='note-view__text'>{note.text}</p>
		</div>
	)
}
