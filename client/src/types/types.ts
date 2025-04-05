export interface IUser {
	id: string
	username: string
	email: string
}

export interface IAuthFormRegister extends Pick<IUser, 'email' | 'username'> {
	password: string
}

export interface IAuthFormLogin extends Pick<IUser, 'email'> {
	password: string
}

export interface INote {
	id: string
	title: string
	text: string
	userId: string
	createdAt: number
}

export interface INotesResponse {
	list: INote[]
	pageCount: number
}

export interface IFormNote {
	title: string
	text: string
}
