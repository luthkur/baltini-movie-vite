import { useQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../api/movie";
import MovieCard from "../component/MovieCard";
import { Movie } from "src/types/movie";
import useLocalstorage from "src/hooks/useLocalStorage";
export default function MovieList({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [MyList] = useLocalstorage("MyList", "[]");
  const ArrayList = JSON.parse(MyList);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["MovieList", searchKeyword],
    queryFn: () => fetchMovieList(searchKeyword),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data</p>;
  }

  const movieList = data?.Search
    ? data?.Search.filter((Movie: Movie) => {
        return !ArrayList.find(
          (movieMyList: Movie) => movieMyList.imdbID == Movie.imdbID
        );
      }).map((Movie: Movie) => {
        return <MovieCard MovieData={Movie} key={Movie.imdbID} />;
      })
    : [];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      {movieList}
    </div>
  );
}
