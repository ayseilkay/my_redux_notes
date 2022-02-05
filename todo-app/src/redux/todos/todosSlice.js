import {createSlice} from '@reduxjs/toolkit'
let filtered=[];
export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [{
            id:1,
            title:"Learn React",
            completed:false
        },
        {
            id:2,
            title:"Learn Javascript",
            completed:true
        }
    ],
        activeFilter:'all'
    },
    reducers: {
        addTodo:(state,action)=>{
            state.items.push(action.payload);
        },
        toggle : (state,action)=>{
           const {id}=action.payload;// paylodın icinden id sini buldum
           const item = state.items.find(item => item.id === id);

           item.completed = !item.completed; //true ise false yap false ise true yap.
        },
        destroy: (state,action)=>{
            const {id}= action.payload;
            // const item = state.items.find(item => item.id === id);
            // state.items.pop(item);
            const filtered = state.items.filter((item)=> item.id != id);
            state.items = filtered;
        },
        changeActiveFilter: (state,action)=>{
            state.activeFilter = action.payload;
        },
        clearCompleted: (state)=>{
            const filter = state.items.filter(item => item.completed === false);
            state.items = filter;
        }

    },
});

export const selectActiveFilter = (state) => state.todos.activeFilter;
export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state)=>{
    if(state.todos.activeFilter === "all"){
        return state.todos.items;
    }
filtered = state.todos.items.filter((item)=> state.todos.activeFilter === "active" ? item.completed === false : item.completed === true);
    return filtered
}
export const {addTodo,toggle,destroy,changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;