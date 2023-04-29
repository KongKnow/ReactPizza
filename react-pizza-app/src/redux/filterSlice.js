import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activePop: false,
    sortBy: ['популярности (desc)', ['rating', 'desc']],
    searchValue: '',
    category: 0
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActivePop: (state) => {state.activePop = !state.activePop},
        setNoPop: (state) => {state.activePop = false},
        setSortBy: (state, action) => {state.sortBy = action.payload},
        setCategory: (state, action) => {state.category = action.payload},
        setSearchValue: (state, action) => {state.searchValue = action.payload},
        setFilters: (state, action) => {
            state.category = Number(action.payload.category)
            state.sortBy = action.payload.sortBy
        }
    }
})


export default filterSlice.reducer

export const {setActivePop, setNoPop, setSortBy, setCategory, setSearchValue, setFilters} = filterSlice.actions