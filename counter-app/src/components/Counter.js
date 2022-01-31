import { useSelector } from "react-redux";

function Counter(){
    const countValue = useSelector((state) => state.counter.value)
    console.log(countValue);
    return (<div> 
        <h1>{countValue} </h1>
    </div>)
}

export default Counter;