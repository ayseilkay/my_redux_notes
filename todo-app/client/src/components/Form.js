import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { addTodoAsync} from '../redux/todos/services';
import {selectAddNewTodoError,selectAddNewTodoLoading } from '../redux/todos/todosSlice';
import Error from './Error';
import Loading from './Loading';


function Form (){
    const [title,setTitle]=useState('');
    const dispatch = useDispatch();
    const error= useSelector(selectAddNewTodoError);
    const isLoading = useSelector(selectAddNewTodoLoading);
    const handleSubmit = async(e)=>{//bekletebilmek içinde async yazıyoruz
        if(!title) return; // inputa title girilmemişse bos veri eklemesin
        e.preventDefault();
       await dispatch(addTodoAsync({title}));// asenkron bir islem oldugu için await ile onu bekletmeliyiz.
        setTitle(''); //kaydettiken sonra inputu bosaltalım.
    }
    if(error){
        return <Error message={error}/>
    }
    return (
             <form onSubmit={handleSubmit} style={{display:"flex",alignItems:"center"}}>
        <input className="new-todo" placeholder="What needs to be done?" value={title} onChange={(e)=>setTitle(e.target.value)} disabled={isLoading ? true:false}/>
       { isLoading && <Loading/>}
    </form>
    )}

    export default Form; 