// import react hooks:
import { useState } from 'react';

// import Components:
import Todo from './Todo.tsx';
// import types
import type { Todo as TodoType } from '../types.ts';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Component props types:
interface TodosProps {
  todos: TodoType[];
  onToggleCompleteTodo: (_params: Pick<TodoType, 'id' | 'completed'>) => void;
  onRemoveTodo: (_id: string) => void;
  setTitle: (_params: Omit<TodoType, 'completed'>) => void;
}

export default function Todos({ todos, onRemoveTodo, onToggleCompleteTodo, setTitle }: TodosProps) {
  const [isEditing, setIsEditing] = useState('');
  const [parent] = useAutoAnimate(/* optional config */);

  return (
    <ul className={'c-todo-list todo-list'} ref={parent}>
      {todos.map((todo) => {
        return (
          <li
            key={todo.id}
            className={`${todo.completed ? 'completed' : ''} c-todo-list__item ${isEditing === todo.id ? 'editing' : ''}`}
            onDoubleClick={() => {
              setIsEditing(todo.id);
            }}
          >
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              todo={todo}
              removeTodo={onRemoveTodo}
              onToggleCompleteTodo={onToggleCompleteTodo}
              setTitle={setTitle}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </li>
        );
      })}
    </ul>
  );
}
