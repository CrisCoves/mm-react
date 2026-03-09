import { type KeyboardEvent, useState } from 'react';

import type { TodoTitle } from '../types';

interface CreateTodoProps {
  saveTodo: (_params: TodoTitle) => void;
}

export default function CreateTodo({ saveTodo }: CreateTodoProps) {
  const [inputValue, setInputValue] = useState('');

  // const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   saveTodo({ title: inputValue });
  //   setInputValue('');
  // };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue !== '') {
      saveTodo({ title: inputValue });
      setInputValue('');
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <input
      type={'text'}
      className='new-todo'
      value={inputValue}
      placeholder='Qué quieres hacer?'
      onChange={(ev) => {
        setInputValue(ev.target.value);
      }}
      onKeyDown={handleKeyDown}
      autoFocus
    />
    // </form>
  );
}
