import { configureStore, createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: { searchText: "" },
    reducers: {
        set(state, action) {
            state.searchText = action.payload;
        },
    },
});

export const actions = searchSlice.actions;
export default configureStore({
    reducer: searchSlice.reducer,
});
