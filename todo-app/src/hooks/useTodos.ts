import { useState } from 'react';

// import types:
import { type Todo as Todotype, type TodoTitle, type FilterValue } from '../types';
import { TODO_FILTERS } from '../consts.ts';

type UseTodosProps = {
  dataTodos: Todotype[];
};

export function useTodos({ dataTodos }: UseTodosProps) {
  const [todos, setTodos] = useState(dataTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

  const handleFilterChange = (filter: FilterValue) => {
    setFilterSelected(filter);
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search);
    params.set('filter', filter);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  };

  const handleRemove = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleToggleComplete = ({ id, completed }: Pick<Todotype, 'id' | 'completed'>): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  // const handleUpdateTitle = (id: string, title: string): void => {
  //   console.log('handleUpdateTitle, id, title:', id, title);
  //   const newTodos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         title,
  //       };
  //     }
  //     return todo;
  //   });
  //
  //   console.log('newTodos:', newTodos);
  //   //setTodos(newTodos);
  // };

  const handleUpdateTitle = ({ id, title }: { id: string; title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    console.log('newTodos:', newTodos);
    setTodos(newTodos);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    activeCount,
    completedCount,
    filterSelected,
    handleRemove,
    handleToggleComplete,
    handleRemoveAllCompleted,
    handleAddTodo,
    handleFilterChange,
    handleUpdateTitle,
  };
}
