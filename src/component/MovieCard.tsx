import { Link } from "react-router-dom";
import { Movie } from "src/types/movie";

export default function MovieCard({ MovieData }: { MovieData: Movie }) {
  return (
    <div className="flex justify-center items-center p-4 border rounded border-solid">
      <Link to={`/movie/${MovieData.imdbID}`}>
        <img
          className="object-contain w-full h-full"
          src={MovieData?.Poster}
          alt={MovieData?.Title}
        />
        <h2>{MovieData?.Title}</h2>
        <h2>{MovieData?.Year}</h2>
        <h2>{MovieData?.Type}</h2>
      </Link>
    </div>
  );
}
