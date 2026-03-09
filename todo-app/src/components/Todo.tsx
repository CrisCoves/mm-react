import { useState, useEffect, useRef, type KeyboardEventHandler } from 'react';

// import types
import { type Todo as TodoType } from '../types.ts';
interface TodoProps {
  id: string;
  title: string;
  todo: TodoType;
  removeTodo: (_id: string) => void;
  onToggleCompleteTodo: (_params: Pick<TodoType, 'id' | 'completed'>) => void;
  setTitle: (_params: Omit<TodoType, 'completed'>) => void;
  isEditing: string;
  setIsEditing: (_completed: string) => void;
}

export default function Todo({
  id,
  title,
  todo,
  removeTodo,
  onToggleCompleteTodo,
  setTitle,
  isEditing,
  setIsEditing,
}: TodoProps) {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      console.log('editedTitle:', editedTitle);
      console.log('title:', title);
      setEditedTitle(editedTitle.trim());

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle });
      }

      if (editedTitle === '') removeTodo(id);

      setIsEditing('');
    }

    if (e.key === 'Escape') {
      setEditedTitle(title);
      setIsEditing('');
    }
  };

  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <div className={'c-todo'}>
      <div className='view'>
        <input
          type='checkbox'
          id={`todo_${todo.id}`}
          className='c-todo-list__input-check c-todo__check toggle'
          name={'todos'}
          defaultChecked={todo.completed}
          onChange={(event) => {
            onToggleCompleteTodo({
              id: todo.id,
              completed: event.target.checked,
            });
          }}
        />
        <label htmlFor={`todo_${todo.id}`} className='c-todo-list__title c-todo__title'>
          {title}
        </label>

        <button
          type={'button'}
          className={'c-todo__btn destroy'}
          onClick={() => {
            removeTodo(todo.id);
          }}
        ></button>
      </div>

      <input
        className='edit'
        value={editedTitle}
        onChange={(e) => {
          setEditedTitle(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing('');
        }}
        ref={inputEditTitle}
      />
    </div>
  );
}
