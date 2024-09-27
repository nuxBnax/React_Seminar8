import './App.css';
import { useState } from 'react';

function App() {
  const url = "https://api.chucknorris.io/jokes/random";
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    try {
      if (loading) {
        return
      }
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error({ message: response.message });
      }
      const data = await response.json();
      console.log(data);
      setJoke(data.value);
    } catch (error) {
      setJoke('Failed to fetch');
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App2">
      <h1>Jokes from Chuck Norris</h1>
      <button onClick={fetchJoke} disabled={loading}>{loading ? "loading..." : "Get new joke"}</button>
      <p>{joke}</p>
    </div>
  );
}

export default App;
