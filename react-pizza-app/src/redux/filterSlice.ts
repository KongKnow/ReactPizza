import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { ParsedQs } from 'qs';

type SortByType = [
    string, string[]
]

interface FilterSliceType {
    activePop: boolean;
    sortBy: SortByType;
    searchValue: string;
    category: number;
}

const initialState: FilterSliceType = {
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
        setSortBy: (state, action: PayloadAction<SortByType>) => {state.sortBy = action.payload},
        setCategory: (state, action: PayloadAction<number>) => {state.category = action.payload},
        setSearchValue: (state, action: PayloadAction<string>) => {state.searchValue = action.payload},
        setFilters: (state, action: PayloadAction<ParsedQs>) => {
            state.category = Number(action.payload.category)
            state.sortBy = action.payload.sortBy as SortByType
        }
    }
})


export default filterSlice.reducer

export const {setActivePop, setNoPop, setSortBy, setCategory, setSearchValue, setFilters} = filterSlice.actions