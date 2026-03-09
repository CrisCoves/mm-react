// import react hooks:

// import custom hooks:
import { useTodos } from '../hooks/useTodos.ts';

// import Components:
import Header from './Header.tsx';
import Todos from './Todos.tsx';
import Footer from './Footer.tsx';

// import mock data:
import { mockTodos } from '../mocks/todos.json';

export default function Todoapp() {
  const {
    handleRemove,
    handleToggleComplete,
    handleRemoveAllCompleted,
    handleAddTodo,
    filterSelected,
    activeCount,
    completedCount,
    handleFilterChange,
    handleUpdateTitle,
    todos,
  } = useTodos({
    dataTodos: mockTodos,
  });

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />

      <Todos
        todos={todos}
        setTitle={handleUpdateTitle}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleToggleComplete}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  );
}
