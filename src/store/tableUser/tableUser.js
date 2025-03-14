import { createSlice } from '@reduxjs/toolkit'

import img1 from '../../assets/Ellipse 545.png'
import img2 from '../../assets/Ellipse 546.png'
import img3 from '../../assets/Ellipse 548.png'

export const TableTodo = createSlice({
	name: 'table',
	initialState: {
		info: {},
		data: [
			{
				id: 1,
				img: img1,
				name: 'Join',
				email: 'Join@gmail.com',
				city: 'Dushanbe',
				phoneNumber: '975830472',
				completed: false,
			},
			{
				id: 2,
				img: img2,
				name: 'Gils1',
				email: 'Gils1@gmail.com',
				city: 'Khujand',
				phoneNumber: '975550472',
				completed: true,
			},
			{
				id: 3,
				img: img3,
				name: 'Gils2',
				email: 'JoinGirl2@gmail.com',
				city: 'Kulob',
				phoneNumber: '9730474322',
				completed: false,
			},
		],
	},
	reducers: {
		del: (state, action) => {
			state.data = state.data.filter(item => item.id !== action.payload)
			if (state.info.id === action.payload) {
				state.info = {}
			}
		},
		add: (state, action) => {
			state.data = [...state.data, action.payload]
		},
		edit: (state, action) => {
			state.data = state.data.map(el =>
				el.id === action.payload.idx
					? {
							...el,
							img: action.payload.img1,
							name: action.payload.name1,
							email: action.payload.email1,
							city: action.payload.city1,
							phoneNumber: action.payload.phoneNumber1,
							completed: action.payload.status,
					}
					: el
			)

			if (state.info.id === action.payload.idx) {
				state.info = {
					...state.info,
					img: action.payload.img1,
					name: action.payload.name1,
					email: action.payload.email1,
					city: action.payload.city1,
					phoneNumber: action.payload.phoneNumber1,
					completed: action.payload.status,
				}
			}
		},
		cheked1: (state, action) => {
			state.data = state.data.map(el =>
				el.id === action.payload
					? {
							...el,
							completed: !el.completed,
					}
					: el
			)
			if (state.info.id === action.payload) {
				state.info = { ...state.info, completed: !state.info.completed }
			}
		},
		info: (state, action) => {
			const selectedItem = state.data.find(item => item.id === action.payload)
			if (selectedItem) {
				state.info = { ...selectedItem, status: true }
			}
		},
	},
})

export const { del, add, edit, cheked1, info } = TableTodo.actions

export default TableTodo.reducer
