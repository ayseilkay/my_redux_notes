
import {useDispatch, useSelector} from 'react-redux'
import { toggle,destroy,selectFilteredTodos} from '../redux/todos/todosSlice';
// let filtered= [];
function TodoList (){
	// const items = useSelector(selectTodos);
	// // console.log(items)
	// const activeFilter = useSelector((state)=> state.todos.activeFilter);
	
	const dispath = useDispatch();
	const filteredTodos = useSelector(selectFilteredTodos);
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
					<input className="toggle" type="checkbox" checked={item.completed} onChange={()=> dispath(toggle({id: item.id}))}/>
					<label>{item.title}</label>
					<button className="destroy" onClick={()=> dispath(destroy({id:item.id}))}></button>
				</div>
			</li>
			))}
		</ul>
        </>
    )
}
export default TodoList;