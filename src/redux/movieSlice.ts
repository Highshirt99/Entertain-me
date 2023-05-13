// import { MovieItemType } from "../Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "redux-thunk";
// import { moviesApiRequest } from "../components/MovieApiRequest";

// type initialState = {
//     movies: MovieItemType[];
//     searchTerm: string | number;
// }

// const initialState = {
//     movies: [] 
// }


// export const searchRequest = createAsyncThunk(

//     async (thunkApi: string) => {
//         const response = await moviesApiRequest.get(`/search/movie?&query=${thunkApi}`)
//         console.log(response.data)
//         return response
//     }
// ) 

// const movieSlice = createSlice({
//     name: "movie",
//     initialState,
//     reducers: {
//         searchMovie:  (builder)=> {
//             builder.addCase(searchRequest.fulfilled, (state, action) => {
//                 state.movies = action.payload.data.results
//             })
    
//         }
//     }})