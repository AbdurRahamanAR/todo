export type Todo = {
  id: string;
  text: string;
  complete: boolean;
  time: string;
};

export type ToggleComplete = (selectedTodo: Todo) => void;

export type DeleteTodo = (id: string) => void

export type EditTodo = (text: string, id: string) => void

export type AddTodo = (newTodo: string) => void;
