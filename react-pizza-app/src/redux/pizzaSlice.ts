import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'

export const pizzaAsyncThunk = createAsyncThunk(
    'pizza/asyncPizza',
    async (link: string) => {
        const res = await axios.get<PizzaItem[]>(link)

        return res.data
    }
)

type PizzaItem = {
    title: string;
    id: number;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    category: number;
    rating: number;
}

interface PizzaSliceType {
    pizzas: PizzaItem[];
    getStatus: 'loading' | 'success' | 'error' | 'idle';
}

const initialState: PizzaSliceType = {
    pizzas: [],
    getStatus: 'idle'
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(pizzaAsyncThunk.pending, state => {state.getStatus = 'loading'})
            .addCase(pizzaAsyncThunk.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
                state.getStatus = 'success'
                state.pizzas = action.payload
            })
            .addCase(pizzaAsyncThunk.rejected, state => {state.getStatus = 'error'})
    }
})


export default pizzaSlice.reducer