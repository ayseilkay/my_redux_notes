
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getTodoAsync,toggleTodoAsync,deleteTodoAsync} from '../redux/todos/services';
import{ selectFilteredTodos,selectisLoading,selectError} from '../redux/todos/todosSlice';
import Error from './Error';
import Loading from './Loading';
// let filtered= [];
function TodoList (){
	// const items = useSelector(selectTodos);
	// // console.log(items)
	// const activeFilter = useSelector((state)=> state.todos.activeFilter);
	
	const dispath = useDispatch();
	const filteredTodos = useSelector(selectFilteredTodos);
	const isLoading = useSelector(selectisLoading);
	const error = useSelector(selectError);
	
	useEffect(()=>{
		dispath(getTodoAsync())
	},[dispath])

	const handleToggle = async(id,completed) =>{
		await dispath(toggleTodoAsync({id,data:{completed}}))
	}
	const handleDelete = async(id)=>{
		await dispath(deleteTodoAsync(id))
	}
	if(isLoading){
		return <Loading/>
	}
	if(error){
		return <Error message={error}/>
	}
    return (
        <>
        <ul className="todo-list">
			{/* <li className="completed">
				<div className="view">
					<input className="toggle" type="checkbox"/>
					<label>Learn JavaScript</label>
					<button className="destroy"></button>
				</div>
			</li> */}
			
			
			{filteredTodos.map((item) => (
				<li key={item.id} className={item.completed == true ? "completed" :""}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={item.completed} onChange={()=> handleToggle(item.id,!item.completed)}/>
					<label>{item.title}</label>
					<button className="destroy" onClick={()=> handleDelete(item.id)}></button>
				</div>
			</li>
			))}
		</ul>
        </>
    )
}
export default TodoList;