import './App.css';
// import Components:
import { Otro } from './components/Otro.jsx';

// import Custom hooks:
import { useFact } from './hooks/useFact.js';
import { useCatImage } from './hooks/useCatImage.js';

export function App() {
  const { fact, handleGetFact } = useFact('');
  const { imageUrl } = useCatImage({ fact });

  return (
    <main className={'c-page'}>
      <h1 className={'c-page__headline-primary'}>App de gatitos</h1>

      <div className={'c-cat-tile'}>
        <div className={'c-cat-tile__wp'}>
          <div className='c-cat-tile__txt-side'>
            <button
              type={'button'}
              className='c-cat-tile__btn'
              onClick={handleGetFact}
            >
              Get new fact
            </button>

            {fact && <p className={'c-cat-tile__txt'}>{fact}</p>}
          </div>

          {imageUrl && (
            <>
              <img
                src={imageUrl}
                className={'c-cat-tile__img'}
                alt={`Image extracted using the first word for ${fact}`}
              />
            </>
          )}
        </div>
      </div>

      {/*<div className='c-cat-tile'>*/}
      {/*  <Otro />*/}
      {/*</div>*/}
    </main>
  );
}
