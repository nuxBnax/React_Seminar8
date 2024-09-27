import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { fetchJoke } from './store/jokeSlice';
import { fetchConvertation, setAmount, setCurrency } from './store/convertationSlice';
import { useEffect } from 'react';


function App() {

  const url = "https://api.chucknorris.io/jokes/random";
  const { value, loading, error } = useSelector((state) => state.joke)

  const { amount, currency, currencyList, result, loading: loadingConvertation, error: errorConvertation } = useSelector((state) => state.convertation)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConvertation());
  }, [dispatch])

  const handleConvertation = (e) => {
    e.preventDefault();
    if (amount && currency) {
      dispatch(fetchConvertation())
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Jokes from Chuck Norris</h1>
        <button onClick={() => {
          dispatch(fetchJoke(url))
        }} disabled={loading}>{loading ? "loading..." : "Get new joke"}</button>
        <p>{error ? error.message || "Something go wrong try again later" : value}</p>
      </div>

      <div>
        <h2>Currency convertion</h2>
        <form onSubmit={handleConvertation}>
          <input
            placeholder="Enter rubles amoutes"
            value={amount}
            onChange={(e) => { dispatch(setAmount(e.target.value)) }}
            type='number' />
          <select
            onChange={(e) => {
              dispatch(setCurrency(e.target.value))

            }}
            value={currency}>
            <option value=''>Выберите тикер Валюты</option>
            {currencyList.map(value => <option key={value}>{value}</option>)}
          </select>
          <button type='submit'
            disabled={loadingConvertation}>{loadingConvertation ? "loading..." : "Convartate"}
          </button>
        </form>
        <p>{amount} RUB = {result} {currency}</p>
        <p>{errorConvertation ? errorConvertation.message || "Something go wrong try again later" : value}</p>
      </div>
    </div>
  );
}

export default App;
