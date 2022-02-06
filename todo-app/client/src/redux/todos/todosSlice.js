import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

let filtered=[];
export const getTodoAsync = createAsyncThunk('todos/getTodosAsync', async ()=>{
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return response.data;
})

export const addTodoAsync =createAsyncThunk('todos/addTodoAsync',async(payload)=>{
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,payload);
    return response.data;
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleAsync',async ({id,data})=>{
    const response = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,data);
    return response.data;
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',async(id)=>{
     await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return id;
})
export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading:false,
        error: null,
        activeFilter:'all',
        addNewTodoLoading: false,
        addNewTodoError: null
    },
    reducers: {
        // addTodo:{
        //     reducer:(state,action)=>{
        //         state.items.push(action.payload);
        //     },
        //     prepare: ({title})=>{//ilk dipatch calsıır. sonra prepare varsa o çalışır.return edien ifade alınır ve action altına yazılır.
        //         return {
        //             payload:{
        //                 id: nanoid(),
        //                 completed: false,
        //                 title
        //             }
        //         }
        //     }
        // },
        // toggle : (state,action)=>{
        //    const {id}=action.payload;// paylodın icinden id sini buldum
        //    const item = state.items.find(item => item.id === id);

        //    item.completed = !item.completed; //true ise false yap false ise true yap.
        // },
        // destroy: (state,action)=>{
        //     const {id}= action.payload;
        //     // const item = state.items.find(item => item.id === id);
        //     // state.items.pop(item);
        //     const filtered = state.items.filter((item)=> item.id != id);
        //     state.items = filtered;
        // },
        changeActiveFilter: (state,action)=>{
            state.activeFilter = action.payload;
        },
        clearCompleted: (state)=>{
            const filter = state.items.filter(item => item.completed === false);
            state.items = filter;
        }

    },
    extraReducers:{
        //get todos
      [getTodoAsync.pending]:(state,action) =>{
        state.isLoading = true;
      },
      [getTodoAsync.fulfilled] :(state,action)=>{
          state.items = action.payload;
          state.isLoading = false;
      },
      [getTodoAsync.rejected]:(state,action)=>{
          state.isLoading = false;
          state.error = action.error.message;
      },
      // add todos
      [addTodoAsync.fulfilled]:(state,action)=>{
        state.items.push(action.payload);// islem tamamlanır
        state.addNewTodoLoading = false;// islem tamamlandıgında false çekilir
      },
      [addTodoAsync.pending]: (state,action) =>{
          state.addNewTodoLoading = true;
      },
      [addTodoAsync.rejected]: (state,action)=>{
          state.addNewTodoLoading = false;
          state.addNewTodoError = action.error.message;
      },
      // toggle todo
      [toggleTodoAsync.fulfilled]: (state,action)=>{
         const {id,completed} = action.payload;
         const index = state.items.findIndex(item => item.id === id);
         state.items[index].completed = completed;
      },
      // delete todo
      [deleteTodoAsync.fulfilled]:(state,action)=>{
        const id = action.payload;
        filtered = state.items.filter((item)=> item.id != id)
        state.items= filtered;
      }
    }
});
export const selectAddNewTodoLoading = (state)=> state.todos.addNewTodoLoading;
export const selectAddNewTodoError = (state)=> state.todos.addNewTodoError;
export const selectError = (state)=> state.todos.error;
export const selectisLoading = (state)=> state.todos.isLoading;
export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state)=>{
    if(state.todos.activeFilter === "all"){
        return state.todos.items;
    }
filtered = state.todos.items.filter((item)=> state.todos.activeFilter === "active" ? item.completed === false : item.completed === true);
    return filtered
}
export const {changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;