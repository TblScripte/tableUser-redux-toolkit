import { configureStore } from '@reduxjs/toolkit'
import  TableTodoReducer  from './tableUser/tableUser'



export const store = configureStore({
	reducer:{
		table:TableTodoReducer
	}
})

export default store