import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRef } from 'react';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();


  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }
  const columns = [  
    { headerName: "Description", field: 'description', sortable: true, filter: true},
    { headerName: "Date", field: 'date', sortable: true,  filter: true},
    { headerName: "Priority", field: 'priority', sortable: true,  filter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
    ];

    const deleteTodo = () => {
      if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
      index != gridRef.current.getSelectedNodes()[0].id))
      }
      else {
      alert('Select row first');
      }
      };

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="Date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

    <div
    className='ag-theme-material'
    style={{
      height: '700px',
      width: '80%',
      margin: 'auto'
    }}
    >
      <AgGridReact
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowSelection="single"
        columnDefs={columns}
        rowData={todos}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default Todolist;