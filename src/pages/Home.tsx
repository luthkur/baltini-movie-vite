import { useQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../api/movie";
import MovieCard from "../component/MovieCard";
import { Movie } from "src/types/movie";

export default function Home() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["MovieList"],
    queryFn: () => fetchMovieList("one"),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data</p>;
  }

  const movieList = data?.Search.map((Movie: Movie) => {
    return <MovieCard MovieData={Movie} key={Movie.imdbID} />;
  });

  return <div>{movieList}</div>;
}
