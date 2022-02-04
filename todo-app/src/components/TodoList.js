
import {useDispatch, useSelector} from 'react-redux'
import { toggle } from '../redux/todos/todosSlice';

function TodoList (){
	const items = useSelector((state) => state.todos.items);
	// console.log(items)

	const dispath = useDispatch();
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
			
			
			{items.map((item) => (
				<li key={item.id} className={item.completed == true ? "completed" :""}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={item.completed} onChange={()=> dispath(toggle({id: item.id}))}/>
					<label>{item.title}</label>
					<button className="destroy"></button>
				</div>
			</li>
			))}
		</ul>
        </>
    )
}
export default TodoList;