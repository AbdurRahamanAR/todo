import React from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from './useLocalStorage'

import { initialTodos } from "./initialTodos";
import type { Todo, ToggleComplete, AddTodo, DeleteTodo, EditTodo } from "./types";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Array<Todo>>('todos', initialTodos);

  const toggleComplete: ToggleComplete = selectedTodo => {
    const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = (newTodo:string) => {
    console.log(newTodo)
    newTodo.trim() !== "" &&
      // How I add the todo make it sort in descending order
      setTodos([{
        id: uuidv4(), 
        text: newTodo, 
        complete: false, 
        time: new Date().toUTCString()
      }, ...todos]);
  };

  const deleteTodo: DeleteTodo = (id: string)=>{
    setTodos(prevTodos=>{
      return prevTodos.filter(todo=>todo.id !== id)
    })
  }

  const editTodo: EditTodo = (text: string, id: string)=> {
    setTodos(prevTodos=>{
      return prevTodos.map(todo=>{
        if(todo.id === id) {
          return {
            ...todo,
            text,
          }
        }
        return todo;
      })
    })
  }

  return (
    <div 
      style={{
        width: "100vw", 
        display: 'flex', 
        flexDirection: "column", 
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 80
      }}
    >
      <div style={{minWidth: 300, maxWidth: 500}}>
        <AddTodoForm addTodo={addTodo} />
        <TodoList 
          deleteTodo={deleteTodo} 
          todos={todos} 
          toggleComplete={toggleComplete} 
          editTodo={editTodo}
        />
      </div>
    </div>
  );
};

export default App;
