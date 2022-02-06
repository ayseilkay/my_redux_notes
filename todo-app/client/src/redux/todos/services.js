import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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