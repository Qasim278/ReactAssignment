import React, {useState} from 'react';
// create object({descr, date})
function Todolist() {
    
    const [todo, setTodo] = useState({description: '', date: ''});
    const [todos, setTodos] = useState([]);

    const handleAddTodo = () => {
        setTodos([todo, ...todos]);
        setTodo({description:'', date:''});
    }

    const handleDeleteToDo = (row) => {
        console.log('Delete todo' + row)
        setTodos(todos.filter((todo, index) => index !== row));
    } 

    return (
        <div>
            <h1>My todos</h1>
            <input placeholder='Description' value={todo.description}
             onChange={e => setTodo({...todo, description: e.target.value})}/>
            <input type='date' placeholder='Date' value={todo.date} 
             onChange={e => setTodo({...todo, date: e.target.value})}/>
            <button onClick={handleAddTodo}>Add Todo</button>
            <table>
                <tbody>
                    {
                      todos.map((todo, index) => 
                      <tr key={index}>
                      <td>{todo.description}</td>
                      <td>{todo.date}</td>
                      <td><button onClick={() => handleDeleteToDo(index)}>Done</button></td>
                      </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Todolist;
