import "./App.css";
import MovieList from "./components Navbar/MovieList/MovieList";
import Navbar from "./components Navbar/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <MovieList />
      </div>
    </>
  );
}

export default App;
