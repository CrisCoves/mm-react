import './App.css';

// import Components:
import Todoapp from './components/Todoapp.tsx';
import Counter from './components/Counter.tsx';

function App() {
  return (
    <>
      <div className='c-page'>
        <h1 className={'c-page__title'}>TODO App</h1>
        <div className='c-page__content-wp'>
          <div className='c-page__main'>
            <Todoapp />
          </div>

          <div className='c-page__side'>
            <h2 className={'c-headline c-headline--2'}>Content Sidebar</h2>
            <Counter />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
