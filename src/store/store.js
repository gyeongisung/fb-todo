import { configureStore } from "@reduxjs/toolkit";
import fbAuthSlice from "../reducers/fbAuthSlice";

// reducer 들을 모아줌.
const store = configureStore({
  reducer: {
    fbAuth: fbAuthSlice.reducer,
  },
});

export default store;

// const initialState = {
//     goods: []
// }

// const bucketSlice = createSlice({
//     name: "bucketSlice",
//     initialState,
//     reducers: {
//         addBucket: (state, action) => {
//             goods.push(action.payload)
//         },
//         removeBucket: (state, action) => {
//             goods.fillter(item => item.id !== action.id)
//         },
//         resetBucket: (state, action) => {},
//     }
// })

// export default
