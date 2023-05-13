import axios from "axios";

// type RequestType = {
//     getMovies: () => void;
// };
// type BaseUrlType = {
//     baseURL: string;
// }

export const moviesApiRequest = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params:{
        api_key: "67a50ce7e043643335cd22866d01d9e7"
    }

},

);