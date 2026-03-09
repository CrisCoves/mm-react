import { useReducer } from 'react';

interface State {
  count: number;
  error: string | null;
}

interface Action {
  type: 'increment' | 'decrement';
}

function reducer(state: State, action: Action) {
  const { type } = action;

  switch (type) {
    case 'increment': {
      const newCount = state.count + 1;
      const hasError = newCount > 5;
      return { ...state, count: hasError ? state.count : newCount, error: hasError ? 'maximum reached' : null };
    }

    case 'decrement': {
      const newCount = state.count - 1;
      const hasError = newCount < 0;
      return { ...state, count: hasError ? state.count : newCount, error: hasError ? 'minimum reached' : null };
    }

    default:
      return state;
  }
}

export default function Counter() {
  // dispatch sends the action to the given reducer function which will also get the state from the 'useReducer' hook
  // added restrictions to showcase the extra power of useReducer vs useStata:
  // max range 5, min range 0 -> Show error otherwise.
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null,
  });

  return (
    <div className='c-counter'>
      <p className='c-counter__txt c-counter__counter'>Count: {state.count}</p>
      {state.error && <p className={'c-counter__txt c-counter__txt--error'}>{state.error}</p>}
      <div className='c-counter__btn-wp'>
        <button type={'button'} className='c-counter__btn' onClick={() => dispatch({ type: 'increment' })}>
          Increment
        </button>
        <button type={'button'} className='c-counter__btn' onClick={() => dispatch({ type: 'decrement' })}>
          Decrement
        </button>
      </div>
    </div>
  );
}
