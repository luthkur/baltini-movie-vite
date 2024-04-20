import { useOutletContext } from "react-router-dom";
import MovieList from "src/component/MovieList";

export default function Home() {
  const { searchKeyword } = useOutletContext<{ searchKeyword: string }>();
  return (
    <div>
      <MovieList searchKeyword={searchKeyword} />
    </div>
  );
}
