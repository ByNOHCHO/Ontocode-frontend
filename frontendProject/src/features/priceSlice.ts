import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type Comment = {
  _id: string;
  text: string;
  userId: string;
  courseId: string;
  comment: string;
};

type CommentState = {
  comment: Comment[];
};

const initialState: CommentState = {
  comment: [],
};

export const fetchComment = createAsyncThunk(
  "comment/fetchComment",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3333/comment");
      const task = await res.json();

      return task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk<
  void,
  Comment,
  { rejectValue: unknown; state: RootState }
>("task/addComment", async({ comment }, thunkAPI) => {
    try{
        const res = await fetch('http://localhost:3333/comment',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                 text: comment,
                //  user: userId,
                //  course: courseId   
            })
        })
        return await res.json()
    }catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});


export const deletedComment = createAsyncThunk<
string,
string,
{ rejectValue: unknown; state: RootState }
>("comments/deletedComments", async(id, thunkAPI) => {
    try{
        const res = await fetch(`http://localhost:3333/comment/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok) {
            return id
        }
    }catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchComment.fulfilled, (state, action) => {
        
        state.comment = action.payload;
      })
      .addCase(deletedComment.fulfilled, (state, action) => {
        state.comment = state.comment.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comment.push(action.payload[0]);
       
      });
  },
});

export default priceSlice.reducer;