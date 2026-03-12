import type { TranslatorState, Action, FromLanguage, Language } from '../types.d';
import { useReducer } from 'react';
import { AUTO_LANGUAGE } from '../constants.ts';

// 1. Create a initialState
const initialState: TranslatorState = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

// 2. Create a reducer
function reducer(state: TranslatorState, action: Action) {
  const { type } = action;
  if (type === 'INTERCHANGE_LANGUAGES') {
    // lógica del estado dentro del reducer
    // porque lo evitamos en los componentes
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    const loading = state.fromText !== '';
    return {
      ...state,
      loading,
      result: '',
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state;
    const loading = state.fromText !== '';
    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      loading,
    };
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state;
    const loading = state.fromText !== '';
    return {
      ...state,
      toLanguage: action.payload,
      loading,
    };
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== '';

    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
    };
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }
  return state;
}

export function useStore() {
  // 3 usar el hook useReducer
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(reducer, initialState);

  // Nota!: no devolver directamente el dispatch en el componente. Estariamos atando todos nuestros componentes a un contrato q es usar el reducer de react.
  // si mañana esto lo cambiáramos a usar Zustand, redux...etc, no tiene por qué saberlo el resto de componentes

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' });

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
