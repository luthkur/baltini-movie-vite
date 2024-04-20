import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovieList } from "../api/movie";
import MovieCard from "../component/MovieCard";
import { Movie } from "src/types/movie";
import useLocalstorage from "src/hooks/useLocalStorage";
import { useMemo } from "react";
export default function MovieList({
  searchKeyword,
}: {
  searchKeyword: string;
}) {
  const [MyList] = useLocalstorage("MyList", "[]");
  const ArrayList = JSON.parse(MyList);

  const { data, error, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["MovieList", searchKeyword],
      queryFn: ({ pageParam }) => fetchMovieList({ searchKeyword, pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
    });
  const movieData = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      console.log(page.Search);
      return [...acc, ...page.Search];
    }, []);
  }, [data]);

  if (error) {
    return <p>Error fetching data</p>;
  }

  const movieList = movieData
    ? movieData
        ?.filter((Movie: Movie) => {
          return !ArrayList.find(
            (movieMyList: Movie) => movieMyList.imdbID == Movie.imdbID
          );
        })
        .map((Movie: Movie) => {
          return <MovieCard MovieData={Movie} key={Movie.imdbID} />;
        })
    : [];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      {movieList}
      <div className="btn-container">
        <button
          onClick={() => {
            console.log("clicked");
            console.log(data?.pageParams);
            fetchNextPage();
          }}
        >
          Load More
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}
