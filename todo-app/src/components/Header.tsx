import type { TodoTitle } from '../types';

import CreateTodo from './CreateTodo.tsx';

interface HeaderProps {
  onAddTodo: (_params: TodoTitle) => void;
}

export default function Header({ onAddTodo }: HeaderProps) {
  return (
    <header className={'header'}>
      <h1 className={'header__headline'}>
        todos
        <img
          style={{ width: '60px', height: 'auto' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'
        ></img>
      </h1>

      <CreateTodo saveTodo={onAddTodo} />
    </header>
  );
}
