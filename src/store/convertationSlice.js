import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchConvertation = createAsyncThunk('convertation/fetchConvertation',
    //  по сути createAsyncThunk это middleware
    async (_, { rejectWithValue, getState, dispatch }) => {
        // const {rejectWithValue, getState, dispatch} = thunkApi 

        try {
            const { convertation } = getState();
            const response = await fetch('https://v6.exchangerate-api.com/v6/774761ad2d6689f9ca262c67/latest/RUB');

            if (!response.ok) {
                throw new Error({ message: response.status });
            }
            const data = await response.json();
            if (!convertation.currencyList.length) {
                dispatch(setCurrencyList(Object.keys(data.conversion_rates)))
            }
            return data.conversion_rates // в данном случае вернется только value, а не весь объект
        } catch (error) {
            // return thunkApi.rejectWithValue(error.message)
            return rejectWithValue(error.message) //- если деструктурировано thunkApi
        }
    })

const initialState = {
    amount: '',
    currency: '',
    currencyList: [],
    result: '',
    loading: false,
    error: null,
};


const convertationSlice = createSlice({
    name: "convertation",
    initialState: initialState, // можно просто initialState
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload; // action.payload - то что мы забераем из input (кол-во денег)
        },
        setCurrency: (state, action) => {
            state.currency = action.payload; // action.payload - то что мы забераем из input (валюта)
        },
        setCurrencyList: (state, action) => {
            state.currencyList = action.payload; // action.payload - то что мы забераем из input (валюта)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConvertation.pending, (state) => { // ожидание
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConvertation.fulfilled, (state, action) => { //  успешно выполнено
                state.loading = false;
                if (state.currency && state.amount) {
                    state.result = (action.payload[state.currency] * state.amount).toFixed(2);
                }
                
            })
            .addCase(fetchConvertation.rejected, (state, action) => { // отклонено, в случае ошибки
                state.loading = false;
                state.error = action.payload; // объект с инфо ошибки
                console.error(action.payload);
            })
    }

})
export const { setAmount, setCurrency, setCurrencyList } = convertationSlice.actions;
export default convertationSlice.reducer;
