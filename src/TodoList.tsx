import React from "react";
import { DeleteTodo, EditTodo, Todo, ToggleComplete } from "./types";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
  deleteTodo: DeleteTodo;
  editTodo: EditTodo;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  editTodo,
  deleteTodo
}) => {
  return (
    <ul style={{paddingLeft: 0}}>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
};
