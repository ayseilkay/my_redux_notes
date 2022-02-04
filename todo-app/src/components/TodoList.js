
import {useDispatch, useSelector} from 'react-redux'
import { toggle,destroy } from '../redux/todos/todosSlice';
let filtered= [];
function TodoList (){
	const items = useSelector((state) => state.todos.items);
	// console.log(items)
	const activeFilter = useSelector((state)=> state.todos.activeFilter);
	
	const dispath = useDispatch();
	filtered=items;
	if(activeFilter !== "all"){
		filtered = items.filter((item)=> activeFilter === "active" ? item.completed === false  : item.completed === true)
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
			
			
			{filtered.map((item) => (
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