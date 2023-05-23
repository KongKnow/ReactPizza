import {PayloadAction, createSlice} from '@reduxjs/toolkit'

type CartItem = {
    title: string;
    id: number;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    counter: number;
}

interface CartSliceType {
    totalPrice: number;
    items: CartItem[];
}

const initialState: CartSliceType = {
    items: [],
    totalPrice: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<CartItem>) => {
            const itemCheck = state.items.some(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)

            if(itemCheck) {
                state.items.filter(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)[0]['counter'] += 1
            } else {
                state.items.push(action.payload)
            }

            state.totalPrice += +action.payload.price
        },
        removeByOneItem: (state, action: PayloadAction<CartItem>) => {
            if (action.payload.counter <= 1) {
                state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            } else {
                state.items.filter(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)[0]['counter'] -= 1
            }

            state.totalPrice -= action.payload.price
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.type !== action.payload.type)
            state.totalPrice -= action.payload.price * action.payload.counter
        },
        clearItems: (state) => {
            state.items = []
            state.totalPrice = 0
        },
        setAllItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        },
        setTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload
        } 
    }
})


export default cartSlice.reducer

export const {setItems, removeByOneItem, removeItem, clearItems, setAllItems, setTotalPrice} = cartSlice.actions