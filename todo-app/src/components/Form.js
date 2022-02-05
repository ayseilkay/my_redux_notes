import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { addTodo } from '../redux/todos/todosSlice';
import {nanoid} from '@reduxjs/toolkit'

function Form (){
    const [title,setTitle]=useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        if(!title) return; // inputa title girilmemişse bos veri eklemesin
        e.preventDefault();
        dispatch(addTodo({title}));
        setTitle(''); //kaydettiken sonra inputu bosaltalım.
    }
    
    return (
             <form onSubmit={handleSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </form>
    )}

    export default Form; 