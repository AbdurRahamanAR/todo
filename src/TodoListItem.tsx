import React, { useState } from "react";
import "./TodoListItem.css";
import { DeleteTodo, EditTodo, Todo, ToggleComplete } from "./types";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
  editTodo,
  deleteTodo,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [newText, setNewText] = useState(todo.text)

  const time = new Date(todo.time)
  let datetime = "(Date - " + time.getDate() + "/"
                + (time.getMonth()+1)  + "/" 
                + time.getFullYear() + " Time - "  
                + time.getHours() + ":"  
                + time.getMinutes() + ":" 
                + time.getSeconds() + ")";

  const toggleEditMode = ()=> setEditMode(state=>!state)

  const handleEdit = ()=>{
    if(editMode) {
      editTodo(newText, todo.id)
      toggleEditMode()
    } else {
      toggleEditMode()
    }
  }

  return (
    <li style={{display: 'flex', marginTop: 15}}>

        <label className={todo.complete ? "complete" : undefined}>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo)}
            checked={todo.complete}
          />
          {editMode ?
            <input 
              value={newText} 
              onKeyUp={e=>{
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleEdit()
                }
              }}
              onChange={e=>setNewText(e.target.value)}  
            />
          : (
            <>
              {todo.text}
              <span> {datetime} </span>
            </>
          )}
          
        </label>
      <div style={{marginLeft: 20}}>
        <button onClick={handleEdit}>
          {editMode ? 'Save': 'Edit'}
        </button>
        <button onClick={()=> deleteTodo(todo.id)}>Delete</button>
      </div>
    </li>
  );
};
