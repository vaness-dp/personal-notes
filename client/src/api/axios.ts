import axios, { CreateAxiosDefaults } from 'axios'
import { API_URL } from '../constants/constants'
import { getContentType } from './api.helper'

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
}

export const axiosClassic = axios.create(axiosOptions)
