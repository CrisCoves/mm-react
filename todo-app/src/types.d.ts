import { type TODO_FILTERS } from './consts';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Pick: utilidad de typescript.
// Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type
export type TodoId = Pick<Todo, 'id'>;
export type TodoTitle = Pick<Todo, 'title'>;
export type TodoCompleted = Pick<Todo, 'completed'>;

export type ListOfTodos = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
