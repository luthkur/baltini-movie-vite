import { Link } from "react-router-dom";
import { Movie } from "src/types/movie";

export default function MovieCard({ MovieData }: { MovieData: Movie }) {
  return (
    <div>
      <Link to={`/movie/${MovieData.imdbID}`}>{MovieData.Title}</Link>
    </div>
  );
}
