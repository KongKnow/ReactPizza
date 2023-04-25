import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activePop: false,
    sortType: 'популярности (desc)',
    sortBy: ['rating', 'desc'],
    category: 0
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setActivePop: (state) => {state.activePop = !state.activePop},
        setNoPop: (state) => {state.activePop = false},
        setSortType: (state, action) => {state.sortType = action.payload},
        setSortBy: (state, action) => {state.sortBy = action.payload},
        setCategory: (state, action) => {state.category = action.payload}
    }
})


export default filterSlice.reducer

export const {setActivePop, setNoPop, setSortType, setSortBy, setCategory} = filterSlice.actions