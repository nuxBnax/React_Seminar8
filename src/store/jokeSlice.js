import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchJoke = createAsyncThunk('joke/fetchJoke',
    //  по сути createAsyncThunk это middleware
    async (url, thunkApi) => {
        // const {rejectWithValue, getState, dispatch} = thunkApi 
        try {
            const response = await fetch(url);
            console.log(response);
            if (!response.ok) {
                throw new Error({ message: response.status });
            }
            const data = await response.json();

            return data.value // в данном случае вернется только value, а не весь объект
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
            // return rejectWithValue(error.message) - если деструктурировано thunkApi
        }
    })

const initialState = {
    value: '',
    loading: false,
    error: null,
};


const jokeSlice = createSlice({
    name: "joke",
    initialState: initialState, // можно просто initialState
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJoke.pending, (state) => { // ожидание
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJoke.fulfilled, (state, action) => { //  успешно выполнено
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(fetchJoke.rejected, (state, action) => { // отклонено, в случае ошибки
                state.loading = false;
                state.error = action.payload; // объект с инфо ошибки
                console.log(action.payload);
            })
    }

}) 
export default jokeSlice.reducer;
