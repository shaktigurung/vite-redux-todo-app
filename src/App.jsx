import { useDispatch, useSelector } from 'react-redux'
import Todo from './components/todo/Todo'
import { useState } from 'react'
import { editTodos, addToTodos } from './store/slice'
import { BsPlusCircle } from 'react-icons/bs';
import { MdUpdate } from "react-icons/md";
import './App.css'

function App() {
  const [ text, setText ] = useState("");
  const [ selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  // A function to handle the add button.
  const handleAdd = () => {
    // If the input field is empty, return.
    if (text === "") {
      return;
    }
    // Dispatch an action to add a todo.
    dispatch(
      addToTodos({
        id: Math.floor(Math.random() * 1000),
        text,
        status: "incomplete",
      })
    );
  };

  // A function to handle the edit button.
  const handleEdit = (id) => {
    setSelectedId(id)
    // Find the todo with the given id.
    const existingTodo = todos.find((todo) => todo.id === id);
    // Set the text in the input field to the text of the todo.
    setText(existingTodo.text);
  };

  const handleUpdate = (id, text) => {
    const existingTodo = todos.find((todo) => todo.id === id);
    if(text !== existingTodo.text){
      dispatch(editTodos({id: id, text: text }));
    }
  }

  return (
    <div className='app'>
      <div className='content'>
        <h1 className="text-3xl font-bold text-blue-500">
          React with Redux
        </h1> 
        <div className='header'>
          <span className='title'>Todo List</span>
        </div>
        <div className='add'>
          <input 
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
          />
          <button onClick={handleAdd}>
            <BsPlusCircle />
            <span>Add</span>
          </button>
          <button onClick={() => handleUpdate(selectedId, text)}>
          <MdUpdate />
          <span>Update</span>
          </button>
        </div>
        <div className='main'>
        {todos.map((todo, index) => {
          return  <Todo key={index} todo={todo} handleEdit={handleEdit}/>
        })}
        </div>
      </div>
    </div>
  )
}

export default App
