import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action) => {
            const itemCheck = state.items.some(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)

            if(itemCheck) {
                state.items.filter(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)[0]['counter'] += 1
            } else {
                state.items.push(action.payload)
            }

            state.totalPrice += +action.payload.price
        },
        removeByOneItem: (state, action) => {
            if (action.payload.counter <= 1) {
                state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            } else {
                state.items.filter(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)[0]['counter'] -= 1
            }

            state.totalPrice -= action.payload.price
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            state.totalPrice -= action.payload.price * action.payload.counter
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        }
    }
})


export default cartSlice.reducer

export const {setItems, removeByOneItem, removeItem, clearItems} = cartSlice.actions