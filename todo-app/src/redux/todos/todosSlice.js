import {createSlice} from '@reduxjs/toolkit'

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
    },
    reducers: {
        addTodo:(state,action)=>{
            state.items.push(action.payload);
        },
        toggle : (state,action)=>{
           const {id}=action.payload;// paylodın icinden id sini buldum
           const item = state.items.find(item => item.id === id);

           item.completed = !item.completed; //true ise false yap false ise true yap.
        }
    },
});

export const {addTodo,toggle} = todosSlice.actions;
export default todosSlice.reducer;