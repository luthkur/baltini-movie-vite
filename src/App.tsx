import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MyList from "./pages/MyList";
import "./App.css";
import Layout from "./layout/Layout";
import NoMatch from "./pages/NoMatch";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="my-list" element={<MyList />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
